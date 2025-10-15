import React from "react";
// To add icons, uncomment the line below and run: npm install react-icons
// import { FiMail, FiPhone, FiLinkedin, FiGithub, FiExternalLink, FiMapPin } from 'react-icons/fi';

// A helper component for section titles for consistency
const SectionTitle = ({ children }) => (
  <h2 className="text-xl font-bold text-slate-700 border-b-2 border-slate-300 pb-2 mb-4">
    {children}
  </h2>
);

// A helper component for each section block
const Section = ({ children }) => (
  <section className="mb-6">
    {children}
  </section>
);


export default function ResumePreview({ formData }) {
  // Use provided data or fall back to placeholder text for the preview
  var _formData_education, _formData_experience, _formData_skills, _formData_projects;
  const data = {
    name: formData?.name || "Hardik",
    title: formData?.title || "Full Stack Developer",
    bio: formData?.bio || "A highly motivated and results-oriented software developer with a passion for building robust and scalable web applications. Proficient in front-end and back-end technologies.",
    email: formData?.email || "your.email@example.com",
    phone: formData?.phone || "+91 12345 67890",
    linkedin: formData?.linkedin || "linkedin.com/in/yourprofile",
    github: formData?.github || "github.com/yourusername",
    portfolio: formData?.portfolio || "your-portfolio.com",

    education: (formData === null || formData === void 0 ? void 0 : (_formData_education = formData.education) === null || _formData_education === void 0 ? void 0 : _formData_education.length) > 0 ? formData.education : [
            {
                college: "Indian Institute of Technology",
                degree: "B.Tech in Computer Science",
                eduStart: "2021",
                eduEnd: "2025",
                cgpa: "9.0/10"
            }
        ],

    experience: (formData === null || formData === void 0 ? void 0 : (_formData_experience = formData.experience) === null || _formData_experience === void 0 ? void 0 : _formData_experience.length) > 0 ? formData.experience : [
            {
                company: "Tech Solutions Inc.",
                role: "Software Engineer Intern",
                expStart: "May 2024",
                expEnd: "Aug 2024",
                expDesc: "• Developed and maintained key features for a client-facing web application using React and Node.js.\n• Collaborated with a team of 5 engineers in an Agile environment to deliver high-quality code.\n• Improved API response time by 15% through query optimization."
            }
        ],

    skills: (formData === null || formData === void 0 ? void 0 : (_formData_skills = formData.skills) === null || _formData_skills === void 0 ? void 0 : _formData_skills.length) > 0 ? formData.skills : [
            { name: "JavaScript" }, { name: "React" }, { name: "Node.js" }, { name: "Tailwind CSS" }
        ],

    projects: (formData === null || formData === void 0 ? void 0 : (_formData_projects = formData.projects) === null || _formData_projects === void 0 ? void 0 : _formData_projects.length) > 0 ? formData.projects : [
            {
                projectName: "AI-Powered Resume Builder",
                projectTech: "Next.js, Tailwind CSS, OpenAI",
                projectLink: "github.com/your-repo/resume-builder",
                projectDesc: "A web application that leverages AI to help users create, customize, and optimize their resumes. Features include real-time previews and AI-driven content suggestions."
            }
        ],
  };

  // Split skills string into an array for nice formatting
  const skillsList = data.skills.map(skill => skill.name).filter(name => name);

  return (
    <div className="bg-white text-slate-800 font-sans shadow-2xl rounded-lg w-full max-w-4xl p-10 mx-auto">
      {/* ========== Header ========== */}
      <header className="text-center mb-10">
        <h1 className="text-5xl font-extrabold tracking-tight text-slate-800">{data.name}</h1>
        <p className="text-2xl mt-2 text-indigo-600 font-semibold">{data.title}</p>
        
        <div className="flex justify-center items-center gap-x-6 gap-y-2 mt-4 text-sm text-slate-600 flex-wrap">
          {data.email && <a href={`mailto:${data.email}`} className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors">
            {/* <FiMail /> */}
            <span>{data.email}</span>
          </a>}
          {data.phone && <a href={`tel:${data.phone}`} className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors">
             {/* <FiPhone /> */}
            <span>{data.phone}</span>
          </a>}
          {data.linkedin && <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors">
             {/* <FiLinkedin /> */}
            <span>{data.linkedin}</span>
          </a>}
          {data.github && <a href={data.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors">
             {/* <FiGithub /> */}
            <span>{data.github}</span>
          </a>}
           {data.portfolio && <a href={data.portfolio} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors">
             {/* <FiExternalLink /> */}
            <span>{data.portfolio}</span>
          </a>}
        </div>
      </header>

      {/* ========== Summary ========== */}
      <Section>
        <SectionTitle>Summary</SectionTitle>
        <p className="text-slate-600 leading-relaxed">{data.bio}</p>
      </Section>

      {/* ========== Experience ========== */}
      <Section>
        <SectionTitle>Experience</SectionTitle>
        <div className="space-y-4">
          {data.experience.map((exp, index) => (
            <div key={index}>
              <div className="flex justify-between items-baseline">
                <h3 className="text-lg font-semibold text-slate-700">{exp.role || "Your Role"}</h3>
                <p className="text-sm font-medium text-slate-500">{exp.expStart || "Start"} - {exp.expEnd || "End"}</p>
              </div>
              <p className="text-md text-slate-600 italic">{exp.company || "Company Name"}</p>
              <ul className="list-disc list-inside mt-2 text-slate-600 space-y-1 whitespace-pre-line">
                {(exp.expDesc || "").split('\n').map((line, i) => (
                  line && <li key={i}>{line.replace('•','').trim()}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>
      
      {/* ========== Projects ========== */}
      <Section>
        <SectionTitle>Projects</SectionTitle>
        <div className="space-y-4">
          {data.projects.map((proj, index) => (
            <div key={index}>
              <div className="flex justify-between items-baseline">
                <h3 className="text-lg font-semibold text-slate-700">{proj.projectName || "Project Name"}</h3>
                {proj.projectLink && <a href={proj.projectLink} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-indigo-600 hover:underline">
                  <span>{proj.projectLink}</span>
                </a>}
              </div>
              <p className="text-md text-slate-600 italic font-medium">Tech Stack: {proj.projectTech || "Tech Used"}</p>
              <p className="mt-2 text-slate-600">{proj.projectDesc || "Project description..."}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ========== Education ========== */}
      <Section>
        <SectionTitle>Education</SectionTitle>
        {data.education.map((edu, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between items-baseline">
              <h3 className="text-lg font-semibold text-slate-700">{edu.college || "College Name"}</h3>
              <p className="text-sm font-medium text-slate-500">{edu.eduStart || "Start"} - {edu.eduEnd || "End"}</p>
            </div>
            <p className="text-md text-slate-600 italic">{edu.degree || "Degree"}</p>
            {edu.cgpa && <p className="text-slate-600 mt-1">CGPA: {edu.cgpa}</p>}
          </div>
        ))}
      </Section>

      {/* ========== Skills ========== */}
      <Section>
        <SectionTitle>Skills</SectionTitle>
        <div className="flex flex-wrap gap-2">
          {skillsList.map((skill, index) => (
            <span key={index} className="bg-slate-200 text-slate-700 text-sm font-medium px-3 py-1 rounded-full">
              {skill}
            </span>
          ))}
        </div>
      </Section>

    </div>
  );
}