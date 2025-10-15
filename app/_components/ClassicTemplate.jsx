'use client'
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Link } from '@react-pdf/renderer';
import { FiMail, FiPhone, FiLinkedin, FiGithub, FiExternalLink } from 'react-icons/fi';

// --- PDF Document Component ---
const pdfStyles = StyleSheet.create({
  page: { padding: 48, fontFamily: 'Helvetica', fontSize: 10, lineHeight: 1.5, color: '#475569' },
  header: { textAlign: 'center', marginBottom: 24 },
  name: { fontSize: 28, fontFamily: 'Helvetica-Bold', color: '#1e293b' },
  title: { fontSize: 14, color: '#475569', marginTop: 6, fontFamily: 'Helvetica-Bold' },
  contactInfo: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', columnGap: 12, rowGap: 4, marginTop: 16, fontSize: 9, color: '#64748b' },
  link: { color: '#475569', textDecoration: 'none' },
  section: { marginBottom: 20, ':last-child': { marginBottom: 0 } },
  sectionTitle: { fontSize: 12, fontFamily: 'Helvetica-Bold', color: '#334155', marginBottom: 12, textTransform: 'uppercase' },
  subsection: { marginBottom: 16, ':last-child': { marginBottom: 0 } },
  subsectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  subheading: { fontSize: 10.5, fontFamily: 'Helvetica-Bold', color: '#1e293b' },
  date: { fontSize: 9, color: '#64748b' },
  italic: { fontFamily: 'Helvetica-Oblique', color: '#475569' },
  description: { marginTop: 5, fontSize: 9.5 },
  bulletPoint: { flexDirection: 'row', marginLeft: 10 },
  bullet: { width: 10, fontSize: 10 },
  bulletText: { flex: 1 },
  skillsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  skill: { backgroundColor: '#e2e8f0', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, fontSize: 9 },
});

export const ClassicPdf = ({ formData }) => {
  const cleanAndValidateUrl = (url = '') => url.replace(/^(https?:\/\/)?(www\.)?/, '');
  const createAbsoluteUrl = (url = '') => {
    if (!url) return '';
    return `https://${cleanAndValidateUrl(url)}`;
  };

  return <Document>
    <Page size="A4" style={pdfStyles.page}>
      <View style={pdfStyles.header}>
        <Text style={pdfStyles.name}>{formData.name || 'Your Name'}</Text>
        <Text style={pdfStyles.title}>{formData.title || 'Your Title'}</Text>
        <View style={pdfStyles.contactInfo} wrap={false}>
          {formData.email && <Link style={pdfStyles.link} src={`mailto:${formData.email}`}>{formData.email.replace('mailto:', '')}</Link>}
          {formData.phone && <Text> | </Text>}{formData.phone && <Link style={pdfStyles.link} src={`tel:${formData.phone}`}>{formData.phone.replace('tel:', '')}</Link>}
          {formData.linkedin && <Text> | </Text>}{formData.linkedin && <Link style={pdfStyles.link} src={createAbsoluteUrl(formData.linkedin)}>{cleanAndValidateUrl(formData.linkedin)}</Link>}
          {formData.github && <Text> | </Text>}{formData.github && <Link style={pdfStyles.link} src={createAbsoluteUrl(formData.github)}>{cleanAndValidateUrl(formData.github)}</Link>}
          {formData.portfolio && <Text> | </Text>}{formData.portfolio && <Link style={pdfStyles.link} src={createAbsoluteUrl(formData.portfolio)}>{cleanAndValidateUrl(formData.portfolio)}</Link>}
        </View>
      </View>

      {formData.bio && <View style={pdfStyles.section}><Text style={pdfStyles.description}>{formData.bio}</Text></View>}

      <View style={pdfStyles.section}>
        <Text style={pdfStyles.sectionTitle}>Experience</Text>
        {formData.experience.map((exp, index) => (
          <View key={index} style={pdfStyles.subsection}>
            <View style={pdfStyles.subsectionHeader}>
              <Text style={pdfStyles.subheading}>{exp.role || 'Role'}</Text>
              <Text style={pdfStyles.date}>{exp.expStart} - {exp.expEnd}</Text>
            </View>
            <Text style={[pdfStyles.italic, { fontSize: 10, marginTop: 2 }]}>{exp.company || 'Company'}</Text>
            <View style={pdfStyles.description}>
              {(exp.expDesc || '').split('\n').map((line, i) => line && (
                <View key={i} style={pdfStyles.bulletPoint}><Text style={pdfStyles.bullet}>•</Text><Text style={pdfStyles.bulletText}>{line.replace('•', '').trim()}</Text></View>
              ))}
            </View>
          </View>
        ))}
      </View>

      <View style={pdfStyles.section}>
        <Text style={pdfStyles.sectionTitle}>Projects</Text>
        {formData.projects.map((proj, index) => (
          <View key={index} style={pdfStyles.subsection}>
            <View style={pdfStyles.subsectionHeader}>
              <Text style={pdfStyles.subheading}>{proj.projectName || 'Project Name'}</Text>
              {proj.projectLink && <Link style={pdfStyles.link} src={createAbsoluteUrl(proj.projectLink)}>{cleanAndValidateUrl(proj.projectLink)}</Link>}
            </View>
            <Text style={[pdfStyles.italic, { fontSize: 10, marginTop: 2 }]}>Tech Stack: {proj.projectTech || 'Technologies'}</Text>
            <Text style={[pdfStyles.description, { marginTop: 8 }]}>{proj.projectDesc || 'Project description...'}</Text>
          </View>
        ))}
      </View>

      <View style={pdfStyles.section}>
        <Text style={pdfStyles.sectionTitle}>Education</Text>
        {formData.education.map((edu, index) => (
          <View key={index} style={pdfStyles.subsection}>
            <View style={pdfStyles.subsectionHeader}>
              <Text style={pdfStyles.subheading}>{edu.college || 'College Name'}</Text>
              <Text style={pdfStyles.date}>{edu.eduStart} - {edu.eduEnd}</Text>
            </View>
            <Text style={[pdfStyles.italic, { marginTop: 2, fontSize: 10 }]}>{edu.degree || 'Degree'}</Text>
            {edu.cgpa && <Text style={{ fontSize: 9.5, marginTop: 2 }}>CGPA: {edu.cgpa}</Text>}
          </View>
        ))}
      </View>

      <View style={pdfStyles.section}>
        <Text style={pdfStyles.sectionTitle}>Skills</Text>
        <View style={pdfStyles.skillsContainer}>
          {formData.skills.map((skill, index) => skill.name && (<Text key={index} style={pdfStyles.skill}>{skill.name}</Text>))}
        </View>
      </View>
    </Page>
  </Document>
};

// --- Preview Component ---
const SectionTitle = ({ children }) => <h2 className="text-lg font-bold text-slate-700 uppercase tracking-wide mb-4">{children}</h2>;
const Section = ({ children }) => <section className="mb-8">{children}</section>;

const getInitialData = (formData) => ({
    name: formData?.name || "Charan Sai",
    title: formData?.title || "Full Stack Developer",
    bio: formData?.bio || "A highly motivated and results-oriented software developer with a passion for building robust and scalable web applications.",
    email: formData?.email || "your.email@example.com",
    phone: formData?.phone || "+91 12345 67890",
    linkedin: formData?.linkedin || "linkedin.com/in/yourprofile",
    github: formData?.github || "github.com/yourusername",
    portfolio: formData?.portfolio || "your-portfolio.com",
    education: formData?.education?.some(edu => edu.college) ? formData.education : [{ college: "Indian Institute of Technology", degree: "B.Tech in Computer Science", eduStart: "2021", eduEnd: "2025", cgpa: "9.0/10" }],
    experience: formData?.experience?.some(exp => exp.company) ? formData.experience : [{ company: "Tech Solutions Inc.", role: "Software Engineer Intern", expStart: "May 2024", expEnd: "Aug 2024", expDesc: "• Developed and maintained key features for a client-facing web application using React and Node.js.\n• Collaborated with a team of 5 engineers in an Agile environment." }],
    skills: formData?.skills?.some(skill => skill.name) ? formData.skills : [{ name: "JavaScript" }, { name: "React" }, { name: "Node.js" }],
    projects: formData?.projects?.some(proj => proj.projectName) ? formData.projects : [{ projectName: "AI-Powered Resume Builder", projectTech: "Next.js, Tailwind CSS, OpenAI", projectLink: "github.com/your-repo/resume-builder", projectDesc: "A web application that leverages AI to help users create, customize, and optimize their resumes." }],
});

export const ClassicPreview = ({ formData }) => {
  const data = getInitialData(formData);
  const skillsList = data.skills.map(skill => skill.name).filter(name => name);

  const cleanLink = (url) => url.replace(/^(https?:\/\/)?(www\.)?/, '');

  return (
    <div className="bg-white text-slate-800 font-sans shadow-2xl rounded-lg w-full max-w-4xl p-12 mx-auto">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-800">{data.name}</h1>
        <p className="text-lg mt-2 text-slate-600 font-semibold">{data.title}</p>
        <div className="flex justify-center items-center gap-x-5 gap-y-2 mt-6 text-sm text-slate-500 flex-wrap">
          {data.email && <a href={`mailto:${data.email}`} className="flex items-center gap-1.5 hover:text-indigo-600"><FiMail /><span>{cleanLink(data.email)}</span></a>}
          {data.phone && <a href={`tel:${data.phone}`} className="flex items-center gap-1.5 hover:text-indigo-600"><FiPhone /><span>{data.phone}</span></a>}
          {data.linkedin && <a href={`https://${cleanLink(data.linkedin)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-indigo-600"><FiLinkedin /><span>{cleanLink(data.linkedin)}</span></a>}
          {data.github && <a href={`https://${cleanLink(data.github)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-indigo-600"><FiGithub /><span>{cleanLink(data.github)}</span></a>}
          {data.portfolio && <a href={`https://${cleanLink(data.portfolio)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-indigo-600"><FiExternalLink /><span>{cleanLink(data.portfolio)}</span></a>}
        </div>
      </header>

      {data.bio && <Section><p className="text-slate-600 leading-relaxed text-center">{data.bio}</p></Section>}

      <Section>
        <SectionTitle>Experience</SectionTitle>
        <div className="space-y-6">
          {data.experience.map((exp, index) => (
            <div key={index}>
              <div className="flex justify-between items-baseline">
                <h3 className="text-base font-bold text-slate-800">{exp.role || "Your Role"}</h3>
                <p className="text-sm font-medium text-slate-500">{exp.expStart || "Start"} - {exp.expEnd || "End"}</p>
              </div>
              <p className="text-sm text-slate-600 italic mt-1">{exp.company || "Company Name"}</p>
              <ul className="list-disc list-outside mt-2 ml-4 text-slate-600 space-y-1.5 text-sm whitespace-pre-line">
                {(exp.expDesc || "").split('\n').map((line, i) => (line && <li key={i}>{line.replace('•','').trim()}</li>))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionTitle>Projects</SectionTitle>
        <div className="space-y-6">
          {data.projects.map((proj, index) => (
            <div key={index}>
              <div className="flex justify-between items-baseline">
                <h3 className="text-base font-bold text-slate-800">{proj.projectName || "Project Name"}</h3>
                {proj.projectLink && <a href={`https://${cleanLink(proj.projectLink)}`} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-indigo-600 hover:underline">{cleanLink(proj.projectLink)}</a>}
              </div>
              <p className="text-sm text-slate-600 italic font-medium mt-1">Tech Stack: {proj.projectTech || "Tech Used"}</p>
              <p className="mt-2 text-slate-600 text-sm">{proj.projectDesc || "Project description..."}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionTitle>Education</SectionTitle>
        {data.education.map((edu, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between items-baseline mb-1">
              <h3 className="text-base font-bold text-slate-800">{edu.college || "College Name"}</h3>
              <p className="text-sm font-medium text-slate-500">{edu.eduStart || "Start"} - {edu.eduEnd || "End"}</p>
            </div>
            <p className="text-sm text-slate-600 italic">{edu.degree || "Degree"}</p>
            {edu.cgpa && <p className="text-slate-600 mt-1 text-sm">CGPA: {edu.cgpa}</p>}
          </div>
        ))}
      </Section>

      <Section>
        <SectionTitle>Skills</SectionTitle>
        <div className="flex flex-wrap gap-2.5">
          {skillsList.map((skill, index) => (
            <span key={index} className="bg-slate-100 text-slate-700 text-sm font-medium px-3 py-1.5 rounded-md">{skill}</span>
          ))}
        </div>
      </Section>
    </div>
  );
};