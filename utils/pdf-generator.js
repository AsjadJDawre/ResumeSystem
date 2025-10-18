import PDFDocument from "pdfkit";

export const generateResumePDF = async (user, resume) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: "A4",
        margins: {
          top: 50,
          bottom: 50,
          left: 50,
          right: 50,
        },
      });

      const buffers = [];
      doc.on("data", buffers.push.bind(buffers));
      doc.on("end", () => {
        const pdfData = Buffer.concat(buffers);
        resolve(pdfData);
      });

      // Helper function to add section with underline
      const addSection = (title, content, skipIfEmpty = false) => {
        if (skipIfEmpty && (!content || content.length === 0)) {
          return;
        }

        // Add section title with underline
        doc.fontSize(12)
           .font("Helvetica-Bold")
           .text(title, 0, doc.y, { underline: true });
        
        doc.moveDown(0.5);

        // Add content
        if (content && content.length > 0) {
          doc.fontSize(10)
             .font("Helvetica")
             .text(content, 0, doc.y);
        } else {
          doc.fontSize(10)
             .font("Helvetica")
             .text("Not Available", 0, doc.y);
        }

        doc.moveDown(1.5);
      };

      // Helper function to format date range
      const formatDateRange = (start, end) => {
        if (start && end) {
          return `${start} - ${end}`;
        } else if (start) {
          return `${start} - Present`;
        }
        return "";
      };

      // Header - User Name
      doc.fontSize(18)
         .font("Helvetica-Bold")
         .text(user.name, 0, 0, { align: "center" });
      
      doc.moveDown(1);

      // Contact Information (if available)
      if (user.email) {
        doc.fontSize(10)
           .font("Helvetica")
           .text(`Email: ${user.email}`, 0, doc.y, { align: "center" });
        doc.moveDown(0.5);
      }

      doc.moveDown(1);

      // SUMMARY Section
      const summaryText = resume.summary || "A passionate learner and developer.";
      addSection("SUMMARY", summaryText);

      // TECHNICAL SKILLS Section
      let skillsText = "Not Available";
      if (resume.skills && resume.skills.length > 0) {
        const skillNames = resume.skills.map(skill => skill.name).join(", ");
        skillsText = skillNames;
      }
      addSection("TECHNICAL SKILLS", skillsText);

      // EXPERIENCE Section (optional - skip if empty)
      if (resume.experience && resume.experience.length > 0) {
        let experienceText = "";
        resume.experience.forEach((exp, index) => {
          if (index > 0) experienceText += "\n\n";
          experienceText += `${exp.title || "Position"}`;
          if (exp.company) experienceText += ` at ${exp.company}`;
          if (exp.duration) experienceText += ` (${exp.duration})`;
          if (exp.description) {
            experienceText += `\n${exp.description}`;
          }
        });
        addSection("EXPERIENCE", experienceText, true);
      }

      // PROJECTS Section (top 2 max)
      let projectsText = "Not Available";
      if (resume.projects && resume.projects.length > 0) {
        // Sort projects by verified status first, then by creation date
        const sortedProjects = resume.projects.sort((a, b) => {
          if (a.verified && !b.verified) return -1;
          if (!a.verified && b.verified) return 1;
          return new Date(b.createdAt) - new Date(a.createdAt);
        });

        // Take top 2 projects
        const topProjects = sortedProjects.slice(0, 2);
        
        projectsText = "";
        topProjects.forEach((project, index) => {
          if (index > 0) projectsText += "\n\n";
          projectsText += `${project.title || "Project"}`;
          if (project.description) {
            projectsText += `\n${project.description}`;
          }
          if (project.technologies && project.technologies.length > 0) {
            projectsText += `\nTechnologies: ${project.technologies.join(", ")}`;
          }
          if (project.githubLink) {
            projectsText += `\nGitHub: ${project.githubLink}`;
          }
          if (project.liveLink) {
            projectsText += `\nLive Demo: ${project.liveLink}`;
          }
        });
      }
      addSection("PROJECTS", projectsText);

      // EDUCATION Section
      let educationText = "Not Available";
      if (resume.education && resume.education.length > 0) {
        educationText = "";
        resume.education.forEach((edu, index) => {
          if (index > 0) educationText += "\n\n";
          educationText += `${edu.degree || "Degree"}`;
          if (edu.institute) educationText += ` from ${edu.institute}`;
          const dateRange = formatDateRange(edu.startYear, edu.endYear);
          if (dateRange) educationText += ` (${dateRange})`;
        });
      }
      addSection("EDUCATION", educationText);

      // ACHIEVEMENTS Section (optional - skip if empty)
      if (resume.achievements && resume.achievements.length > 0) {
        let achievementsText = "";
        resume.achievements.forEach((achievement, index) => {
          if (index > 0) achievementsText += "\n\n";
          achievementsText += `${achievement.title || "Achievement"}`;
          if (achievement.organization) {
            achievementsText += ` from ${achievement.organization}`;
          }
          if (achievement.date) {
            achievementsText += ` (${achievement.date})`;
          }
          if (achievement.certificateLink) {
            achievementsText += `\nCertificate: ${achievement.certificateLink}`;
          }
        });
        addSection("ACHIEVEMENTS", achievementsText, true);
      }

      // Finalize PDF
      doc.end();

    } catch (error) {
      reject(error);
    }
  });
};
