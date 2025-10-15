import React from 'react';
import { Page, Text, View, Document, StyleSheet, Link } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 48, // Increased padding
    fontFamily: 'Helvetica',
    fontSize: 10,
    lineHeight: 1.5,
    color: '#475569', // slate-600
  },
  header: {
    textAlign: 'center',
    marginBottom: 36,
  },
  name: {
    fontSize: 28, // text-4xl
    fontFamily: 'Helvetica-Bold',
    color: '#1e293b', // slate-800
  },
  title: {
    fontSize: 14, // text-lg
    color: '#4f46e5', // indigo-600
    marginTop: 6, // mt-2
    fontFamily: 'Helvetica-Bold',
  },
  contactInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    columnGap: 20, // gap-x-5
    rowGap: 6, // gap-y-2
    marginTop: 24, // mt-6
    fontSize: 9, // text-sm
    color: '#64748b', // slate-500
  },
  link: {
    color: '#475569', // slate-600
    textDecoration: 'none',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 12, // text-lg
    fontFamily: 'Helvetica-Bold',
    color: '#1e293b', // slate-800
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 16,
    borderBottomColor: '#f1f5f9', // slate-100
    paddingBottom: 6,
    marginBottom: 14,
    textTransform: 'uppercase',
  },
  subsection: {
    marginBottom: 16,
  },
  subsectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  subheading: {
    fontSize: 10.5, // text-base
    fontFamily: 'Helvetica-Bold',
    color: '#334155', // slate-700
  },
  date: {
    fontSize: 9,
    color: '#64748b', // slate-500,
  },
  italic: {
    fontFamily: 'Helvetica-Oblique',
    color: '#475569',
  },
  description: {
    marginTop: 4,
    marginTop: 6,
    fontSize: 9.5,
  },
  bulletPoint: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  bullet: {
    width: 10,
    fontSize: 10,
  },
  bulletText: {
    flex: 1,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  skill: {
    backgroundColor: '#f1f5f9', // slate-100
    paddingHorizontal: 8,
    borderRadius: 12,
    paddingVertical: 4,
    borderRadius: 6, // rounded-md
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: '#475569', // slate-600
  },
});
// Create Document Component
export const PdfDocument = ({ formData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{formData.name || 'Your Name'}</Text>
        <Text style={styles.title}>{formData.title || 'Your Title'}</Text>
        <View style={styles.contactInfo}>
          {formData.email && <Link style={styles.link} src={`mailto:${formData.email}`}>{formData.email}</Link>}
          {formData.phone && <Link style={styles.link} src={`tel:${formData.phone}`}>{formData.phone}</Link>}
          {formData.linkedin && <Link style={styles.link} src={formData.linkedin}>{formData.linkedin}</Link>}
          {formData.github && <Link style={styles.link} src={formData.github}>{formData.github}</Link>}
          {formData.portfolio && <Link style={styles.link} src={formData.portfolio}>{formData.portfolio}</Link>}
        </View>
      </View>

      {/* Summary */}
      <View style={styles.section}>
        {formData.bio && <>
          <Text style={styles.sectionTitle}>Summary</Text>
          <Text style={styles.description}>{formData.bio}</Text>
        </>}
      </View>

      {/* Experience */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Experience</Text>
        {formData.experience.map((exp, index) => (
          <View key={index} style={styles.subsection}>
            <View style={styles.subsectionHeader}>
              <Text style={styles.subheading}>{exp.role || 'Role'}</Text>
              <Text style={styles.date}>{exp.expStart} - {exp.expEnd}</Text>
            </View>
            <Text style={[styles.italic, { fontSize: 9, marginTop: 1 }]}>{exp.company || 'Company'}</Text>
            <View style={styles.description}>
              {(exp.expDesc || '').split('\n').map((line, i) => line && (
                <View key={i} style={styles.bulletPoint}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>{line.replace('•', '').trim()}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>

      {/* Projects */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Projects</Text>
        {formData.projects.map((proj, index) => (
          <View key={index} style={styles.subsection}>
            <View style={styles.subsectionHeader}>
              <Text style={styles.subheading}>{proj.projectName || 'Project Name'}</Text>
              {proj.projectLink && <Link style={styles.link} src={proj.projectLink}>{proj.projectLink}</Link>}
            </View>
            <Text style={[styles.italic, { fontSize: 9, marginTop: 1 }]}>Tech Stack: {proj.projectTech || 'Technologies'}</Text>
            <Text style={[styles.description, { marginTop: 8 }]}>{proj.projectDesc || 'Project description...'}</Text>
          </View>
        ))}
      </View>

      {/* Education */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Education</Text>
        {formData.education.map((edu, index) => (
          <View key={index} style={styles.subsection}>
            <View style={styles.subsectionHeader}>
              <Text style={styles.subheading}>{edu.college || 'College Name'}</Text>
              <Text style={styles.date}>{edu.eduStart} - {edu.eduEnd}</Text>
            </View>
            <Text style={[styles.italic, { marginTop: 2, fontSize: 9.5 }]}>{edu.degree || 'Degree'}</Text>
            {edu.cgpa && <Text>CGPA: {edu.cgpa}</Text>}
          </View>
        ))}
      </View>

      {/* Skills */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Skills</Text>
        <View style={styles.skillsContainer}>
          {formData.skills.map((skill, index) => skill.name && (
            <Text key={index} style={styles.skill}>{skill.name}</Text>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);