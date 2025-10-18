import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/Apiresponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
const registerUser = async (req, res, next) => {
    let { email, password, username, firstName, middleName, lastName, gender, addressLine1, addressLine2, city, state, country, zip, mobile ,ConsumerId ,Distributor} = req.body;
console.log("Email:",email,"Password:",password,"Address Line 1",addressLine1);
    // Trim all string fields to remove leading/trailing spaces
    email = email.trim();
    password = password.trim();
    username = username.trim();
    firstName = firstName.trim();
    middleName = middleName.trim();
    lastName = lastName.trim();
    gender = gender.trim();
    addressLine1 = addressLine1.trim();
    addressLine2 = addressLine2.trim();
    city = city.trim();
    state = state.trim();
    country = country.trim();
    zip = zip.trim();
    mobile = mobile.trim();
    ConsumerId = ConsumerId.trim();
    Distributor = Distributor.trim();

    console.log(req.body); // Validating the fields
    if ([email, password, username, firstName, middleName, lastName, gender, addressLine1, addressLine2, mobile].includes('')) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({
        $or: [{ username }, { email }]
    });

    // Checking if the user exists
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
        email,
        password,
        username,
        firstName,
        middleName,
        lastName,
        gender,
        address: {
            addressLine1,
            addressLine2,
            state,
            country,
            city,
            zip
        },
        mobile,
        ConsumerId,
        Distributor
    });

    // Removing sensitive fields and sending response to client
    const createdUser = await User.findById(user._id).select("-password -refreshToken");
    if (!createdUser) {
        return res.status(500).json({ message: "Something went wrong while registering the user", status: 500 });
    }

    res.status(201).json({ message: "User registered successfully", status: 201, data: createdUser });
}


const generateAccessTokenAndRefreshToken = async (userId) => {

    try {

        const user = await User.findById(userId);
        const RefreshToken = user.generateRefreshToken();
        const AccessToken = user.generateAccessToken();
        user.refreshToken = RefreshToken;
        await user.save({validateBeforeSave : false});
        return {AccessToken,RefreshToken};


        
    } catch (error) {
        throw new ApiError(500, "Something went wrong while Generating Tokens",error);        
    }


}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
console.log(email,password);
    // Validating the fields
    if([email, password].includes(undefined)){
        return res.status(400).json({ message: "All fields are required" });
    }

    const sanitizedEmail = email.trim().toLowerCase();
    console.log("Hello")
    // / Check if the user exists in the database
    const user = await User.findOne({ email: sanitizedEmail });
    console.log(user);

    if (!user) {
        console.log("User does not exist!");
        
        return res.status(404).json({ message: "User does not exist!", status: 404 });
        // throw new ApiError("User does not exist!", 404);
    }


    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid credentials", status: 400 });
        // throw new ApiError("Invalid credentials", 400);
    }

    const { AccessToken, RefreshToken } = await generateAccessTokenAndRefreshToken(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken -address -mobile -gender ");
    const {role} = loggedInUser
    console.log(role);

    const option = {
        httpOnly: true,       // Prevents client-side JavaScript from accessing the cookie (XSS protection)
        secure: true,         // Ensures cookies are sent over HTTPS only (set to true in production)
        sameSite :"none",
        path:'/'
        // Ensures cookies are sent only to the same site (prevents CSRF attacks)
    };
    

    return res.status(200).cookie("accessToken", AccessToken, option).cookie("refreshToken", RefreshToken, option).json({ message: "Login successful", status: 200, data: {user: loggedInUser, AccessToken, RefreshToken, role:role,status:200} });

}


const logOutUser = async (req, res) => {
console.log(req.userdetails)
    await User.findByIdAndUpdate(req.user._id, {
        $set : {
            refreshToken :undefined
    }},
        {
            new : true
        })
        const option = {
            httpOnly: true,       // Prevents client-side JavaScript from accessing the cookie (XSS protection)
            secure: true,         // Ensures cookies are sent over HTTPS only (set to true in production)
            sameSite :"none",
            path: '/'
        };
        
        
       return res.status(200).clearCookie("accessToken",option).clearCookie("refreshToken",option).json({
            status: 200,
            message: "User logged out successfully"
        });
       
}


const refreshAcessToken = async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if(!incomingRefreshToken){
        throw new ApiError(401,"unauthorised Request")
    }

    try {const decodedToken = jwt.verify(incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(decodedToken._id);
        if(!user){
            throw new ApiError(401,"Invalid RefreshToken")
        }

        if(incomingRefreshToken!==user?.refreshToken){
            throw new ApiError(401,"refresh token is Expired or used")
            
        }

        const options={
            httpOnly:true,
            secure:false,
            sameSite :"none"
        }
        
        const {AccessToken,newRefreshToken}=await generateAccessAndRefreshTokens(user._id)
        return res.status(200)
        .cookie("accessToken",AccessToken,options)
        .cookie("refreshToken",newRefreshToken,options)
        .json(
            new ApiResponse(200,{
                accessToken:AccessToken,refreshToken:newRefreshToken,
                
            },"Access Token Refreshed")
            
        )

        
    } catch (error) {
        throw new ApiError(404,error?.message||"Invalid refresh TOken")

        
    }

}


const getUser = asyncHandler(async (req, res, next) => {
        try {
            const {applicantId} = req.body;
            console.log(`I am in get user ${applicantId}`)
            const user = await User.findById(applicantId).select("-password -refreshToken  -createdAt -updatedAt  -role");
            if (!user) {
                throw new ApiError(404, "User not found");
            }
            res.status(200).json({ success: true, user });
            
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, error: error.message });
            
        }
})
export {registerUser,loginUser,generateAccessTokenAndRefreshToken,logOutUser,refreshAcessToken,getUser} ;