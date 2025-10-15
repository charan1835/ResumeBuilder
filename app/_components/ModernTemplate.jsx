import React from 'react';
import { Page, Text, View, Document, StyleSheet, Link } from '@react-pdf/renderer';
import { FiMail, FiPhone, FiLinkedin, FiGithub, FiExternalLink } from 'react-icons/fi';

// --- PDF Document Component ---
const pdfStyles = StyleSheet.create({
  page: { flexDirection: 'row', backgroundColor: '#FFFFFF', fontFamily: 'Helvetica' },
  leftColumn: { width: '33%', backgroundColor: '#2d3748', color: 'white', padding: 30, fontFamily: 'Helvetica-Bold' },
  rightColumn: { width: '67%', padding: 30 },
  name: { fontSize: 24, textTransform: 'uppercase', marginBottom: 5 },
  title: { fontSize: 12, color: '#a0aec0', textTransform: 'uppercase' },
  sidebarSection: { marginBottom: 20 },
  sidebarTitle: { fontSize: 12, textTransform: 'uppercase', marginBottom: 10, borderBottomWidth: 1, borderBottomColor: '#4a5568', paddingBottom: 5 },
  contactItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, fontSize: 9 },
  contactText: { color: '#cbd5e0', textDecoration: 'none' },
  skill: { backgroundColor: '#4a5568', color: 'white', padding: '4 8', borderRadius: 4, fontSize: 9, marginBottom: 5 },
  mainSection: { marginBottom: 24 },
  mainTitle: { fontSize: 14, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase', color: '#2d3748', marginBottom: 12 },
  bio: { fontSize: 10, color: '#4a5568', lineHeight: 1.4, marginBottom: 20 },
  itemHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 2 },
  itemRole: { fontSize: 11, fontFamily: 'Helvetica-Bold', color: '#2d3748' },
  itemDate: { fontSize: 9, color: '#718096' },
  itemCompany: { fontSize: 10, fontFamily: 'Helvetica-Oblique', color: '#4a5568' },
  itemDescription: { fontSize: 9.5, color: '#4a5568', marginTop: 6 },
  bulletPoint: { flexDirection: 'row', marginLeft: 10 },
  bullet: { width: 10, fontSize: 10 },
  bulletText: { flex: 1 },
});

export const ModernPdf = ({ formData }) => (
  <Document>
    <Page size="A4" style={pdfStyles.page}>
      <View style={pdfStyles.leftColumn}>
        <View style={{ marginBottom: 30 }}>
          <Text style={pdfStyles.name}>{formData.name || 'Your Name'}</Text>
          <Text style={pdfStyles.title}>{formData.title || 'Your Title'}</Text>
        </View>

        <View style={pdfStyles.sidebarSection}>
          <Text style={pdfStyles.sidebarTitle}>Contact</Text>
          {formData.email && <Link style={pdfStyles.contactText} src={`mailto:${formData.email}`}><Text style={pdfStyles.contactItem}>{formData.email}</Text></Link>}
          {formData.phone && <Link style={pdfStyles.contactText} src={`tel:${formData.phone}`}><Text style={pdfStyles.contactItem}>{formData.phone}</Text></Link>}
          {formData.linkedin && <Link style={pdfStyles.contactText} src={`https://${formData.linkedin.replace('https://', '')}`}><Text style={pdfStyles.contactItem}>{formData.linkedin.replace('https://', '')}</Text></Link>}
          {formData.github && <Link style={pdfStyles.contactText} src={`https://${formData.github.replace('https://', '')}`}><Text style={pdfStyles.contactItem}>{formData.github.replace('https://', '')}</Text></Link>}
          {formData.portfolio && <Link style={pdfStyles.contactText} src={`https://${formData.portfolio.replace('https://', '')}`}><Text style={pdfStyles.contactItem}>{formData.portfolio.replace('https://', '')}</Text></Link>}
        </View>

        <View style={pdfStyles.sidebarSection}>
          <Text style={pdfStyles.sidebarTitle}>Education</Text>
          {formData.education.map((edu, i) => (
            <View key={i} style={{ marginBottom: 10 }}>
              <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold' }}>{edu.college || 'College'}</Text>
              <Text style={{ fontSize: 9, color: '#a0aec0' }}>{edu.degree || 'Degree'}</Text>
              <Text style={{ fontSize: 9, color: '#a0aec0' }}>{edu.eduStart} - {edu.eduEnd}</Text>
            </View>
          ))}
        </View>

        <View style={pdfStyles.sidebarSection}>
          <Text style={pdfStyles.sidebarTitle}>Skills</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 5 }}>
            {formData.skills.map((skill, i) => skill.name && <Text key={i} style={pdfStyles.skill}>{skill.name}</Text>)}
          </View>
        </View>
      </View>

      <View style={pdfStyles.rightColumn}>
        {formData.bio && <View style={pdfStyles.mainSection}><Text style={pdfStyles.mainTitle}>Summary</Text><Text style={pdfStyles.bio}>{formData.bio}</Text></View>}

        <View style={pdfStyles.mainSection}>
          <Text style={pdfStyles.mainTitle}>Experience</Text>
          {formData.experience.map((exp, i) => (
            <View key={i} style={{ marginBottom: 16 }}>
              <View style={pdfStyles.itemHeader}><Text style={pdfStyles.itemRole}>{exp.role}</Text><Text style={pdfStyles.itemDate}>{exp.expStart} - {exp.expEnd}</Text></View>
              <Text style={pdfStyles.itemCompany}>{exp.company}</Text>
              <View style={pdfStyles.itemDescription}>
                {(exp.expDesc || '').split('\n').map((line, j) => line && (
                  <View key={j} style={pdfStyles.bulletPoint}><Text style={pdfStyles.bullet}>•</Text><Text style={pdfStyles.bulletText}>{line.replace('•', '').trim()}</Text></View>
                ))}
              </View>
            </View>
          ))}
        </View>

        <View style={pdfStyles.mainSection}>
          <Text style={pdfStyles.mainTitle}>Projects</Text>
          {formData.projects.map((proj, i) => (
            <View key={i} style={{ marginBottom: 16 }}>
              <View style={pdfStyles.itemHeader}><Text style={pdfStyles.itemRole}>{proj.projectName}</Text></View>
              <Text style={pdfStyles.itemCompany}>Tech Stack: {proj.projectTech}</Text>
              <Text style={pdfStyles.itemDescription}>{proj.projectDesc}</Text>
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

// --- Preview Component ---
const getInitialData = (formData) => ({
    name: formData?.name || "Charan Sai",
    title: formData?.title || "Full Stack Developer",
    bio: formData?.bio || "A highly motivated and results-oriented software developer with a passion for building robust and scalable web applications.",
    email: formData?.email || "your.email@example.com",
    phone: formData?.phone || "+91 12345 67890",
    linkedin: formData?.linkedin || "linkedin.com/in/yourprofile",
    github: formData?.github || "github.com/yourusername",
    portfolio: formData?.portfolio || "your-portfolio.com",
    education: formData?.education?.length > 0 && formData.education[0].college ? formData.education : [{ college: "Indian Institute of Technology", degree: "B.Tech in Computer Science", eduStart: "2021", eduEnd: "2025", cgpa: "9.0/10" }],
    experience: formData?.experience?.length > 0 && formData.experience[0].company ? formData.experience : [{ company: "Tech Solutions Inc.", role: "Software Engineer Intern", expStart: "May 2024", expEnd: "Aug 2024", expDesc: "• Developed and maintained key features for a client-facing web application using React and Node.js.\n• Collaborated with a team of 5 engineers in an Agile environment." }],
    skills: formData?.skills?.length > 0 && formData.skills[0].name ? formData.skills : [{ name: "JavaScript" }, { name: "React" }, { name: "Node.js" }],
    projects: formData?.projects?.length > 0 && formData.projects[0].projectName ? formData.projects : [{ projectName: "AI-Powered Resume Builder", projectTech: "Next.js, Tailwind CSS, OpenAI", projectLink: "github.com/your-repo/resume-builder", projectDesc: "A web application that leverages AI to help users create, customize, and optimize their resumes." }],
});

export const ModernPreview = ({ formData }) => {
  const data = getInitialData(formData);
  const skillsList = data.skills.map(skill => skill.name).filter(name => name);
  const cleanLink = (url) => url.replace(/^(https?:\/\/)?(www\.)?/, '');

  const SidebarSection = ({ title, children }) => (
    <div className="mb-8">
      <h3 className="text-sm font-bold uppercase tracking-wider mb-4 border-b border-gray-600 pb-2">{title}</h3>
      {children}
    </div>
  );

  const MainSection = ({ title, children }) => (
    <section className="mb-8">
      <h2 className="text-xl font-bold text-gray-700 uppercase tracking-wide mb-4">{title}</h2>
      {children}
    </section>
  );

  return (
    <div className="bg-white text-gray-800 font-sans shadow-2xl rounded-lg w-full max-w-4xl mx-auto flex">
      {/* Left Column */}
      <aside className="w-1/3 bg-gray-800 text-white p-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold uppercase tracking-wide">{data.name}</h1>
          <p className="text-md text-gray-400 mt-2">{data.title}</p>
        </div>

        <SidebarSection title="Contact">
          <div className="space-y-3 text-sm">
            {data.email && <a href={`mailto:${data.email}`} className="flex items-center gap-2 text-gray-300 hover:text-white"><FiMail /><span className="truncate">{cleanLink(data.email)}</span></a>}
            {data.phone && <div className="flex items-center gap-2 text-gray-300"><FiPhone /><span>{data.phone}</span></div>}
            {data.linkedin && <a href={`https://${cleanLink(data.linkedin)}`} className="flex items-center gap-2 text-gray-300 hover:text-white"><FiLinkedin /><span className="truncate">{cleanLink(data.linkedin)}</span></a>}
            {data.github && <a href={`https://${cleanLink(data.github)}`} className="flex items-center gap-2 text-gray-300 hover:text-white"><FiGithub /><span className="truncate">{cleanLink(data.github)}</span></a>}
            {data.portfolio && <a href={`https://${cleanLink(data.portfolio)}`} className="flex items-center gap-2 text-gray-300 hover:text-white"><FiExternalLink /><span className="truncate">{cleanLink(data.portfolio)}</span></a>}
          </div>
        </SidebarSection>

        <SidebarSection title="Education">
          {data.education.map((edu, i) => (
            <div key={i} className="mb-4">
              <h4 className="font-semibold text-sm">{edu.college}</h4>
              <p className="text-xs text-gray-400">{edu.degree}</p>
              <p className="text-xs text-gray-400">{edu.eduStart} - {edu.eduEnd}</p>
            </div>
          ))}
        </SidebarSection>

        <SidebarSection title="Skills">
          <div className="flex flex-wrap gap-2">
            {skillsList.map((skill, i) => (
              <span key={i} className="bg-gray-700 text-gray-200 text-xs font-medium px-2.5 py-1 rounded">{skill}</span>
            ))}
          </div>
        </SidebarSection>
      </aside>

      {/* Right Column */}
      <main className="w-2/3 p-10">
        {data.bio && (
          <MainSection title="Summary">
            <p className="text-gray-600 text-sm leading-relaxed">{data.bio}</p>
          </MainSection>
        )}

        <MainSection title="Experience">
          <div className="space-y-6">
            {data.experience.map((exp, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-lg font-bold text-gray-800">{exp.role}</h3>
                  <p className="text-sm font-medium text-gray-500">{exp.expStart} - {exp.expEnd}</p>
                </div>
                <p className="text-md text-gray-600 italic">{exp.company}</p>
                <ul className="list-disc list-outside mt-2 ml-4 text-gray-600 space-y-1.5 text-sm whitespace-pre-line">
                  {(exp.expDesc || "").split('\n').map((line, j) => (line && <li key={j}>{line.replace('•','').trim()}</li>))}
                </ul>
              </div>
            ))}
          </div>
        </MainSection>

        <MainSection title="Projects">
          <div className="space-y-6">
            {data.projects.map((proj, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-lg font-bold text-gray-800">{proj.projectName}</h3>
                  {proj.projectLink && <a href={`https://${cleanLink(proj.projectLink)}`} className="text-sm font-medium text-blue-600 hover:underline">{cleanLink(proj.projectLink)}</a>}
                </div>
                <p className="text-md text-gray-600 italic font-medium">Tech Stack: {proj.projectTech}</p>
                <p className="mt-2 text-gray-600 text-sm">{proj.projectDesc}</p>
              </div>
            ))}
          </div>
        </MainSection>
      </main>
    </div>
  );
};