"use client";
import React, { useState } from "react";

// You can create a reusable component for this or define it here
const FormInput = ({ id, name, label, placeholder, value, onChange, type = "text", span = "col-span-1" }) => (
  <div className={span}>
    <label htmlFor={id} className="block text-sm font-medium text-gray-400 mb-2">
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full bg-gray-800/80 border border-gray-700 rounded-lg py-2.5 px-4 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
    />
  </div>
);

const FormTextarea = ({ id, name, label, placeholder, value, onChange, rows = 3, span = "col-span-2" }) => (
  <div className={span}>
    <label htmlFor={id} className="block text-sm font-medium text-gray-400 mb-2">
      {label}
    </label>
    <textarea
      id={id}
      name={name}
      rows={rows}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full bg-gray-800/80 border border-gray-700 rounded-lg py-2.5 px-4 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
    />
  </div>
);


export default function Template({ formData, setFormData }) {
  const handleChange = (e) => { // Handles simple fields
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handles changes in array fields (education, experience, etc.)
  const handleArrayChange = (section, index, e) => {
    const { name, value } = e.target;
    const list = [...formData[section]];
    list[index][name] = value;
    setFormData(prev => ({ ...prev, [section]: list }));
  };

  // Adds a new empty item to an array section
  const addArrayItem = (section, newItem) => {
    setFormData(prev => ({
      ...prev,
      [section]: [...prev[section], newItem]
    }));
  };

  // Removes an item from an array section
  const removeArrayItem = (section, index) => {
    if (formData[section].length <= 1) return; // Prevent removing the last item
    const list = [...formData[section]];
    list.splice(index, 1);
    setFormData(prev => ({ ...prev, [section]: list }));
  };

  const renderSection = (title, children) => (
    <section className="mb-10">
      <h2 className="text-2xl font-bold text-gray-200 mb-6 border-l-4 border-blue-500 pl-4">
        {title}
      </h2>
      <div className="bg-gray-900/70 p-6 md:p-8 rounded-xl shadow-lg backdrop-blur-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
          {children}
        </div>
      </div>
    </section>
  );

  return (
    <div className="w-full lg:w-1/2 p-6 sm:p-10 overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          <header className="mb-12 text-center">
            <h1 className="text-5xl font-extrabold text-white tracking-tight">
              Resume <span className="text-blue-500">Builder</span>
            </h1>
            <p className="mt-4 text-lg text-gray-400">
              Fill in your details to generate a professional resume.
            </p>
          </header>

          {renderSection("Personal Information", <>
            <FormInput id="name" name="name" label="Full Name" placeholder="e.g., Charan Sai" value={formData.name} onChange={handleChange} />
            <FormInput id="title" name="title" label="Job Title" placeholder="e.g., Full Stack Developer" value={formData.title} onChange={handleChange} />
            <FormInput id="email" name="email" label="Email Address" placeholder="you@example.com" value={formData.email} onChange={handleChange} />
            <FormInput id="phone" name="phone" label="Phone Number" placeholder="+91 12345 67890" value={formData.phone} onChange={handleChange} />
            <FormInput id="linkedin" name="linkedin" label="LinkedIn URL" placeholder="linkedin.com/in/..." value={formData.linkedin} onChange={handleChange} />
            <FormInput id="github" name="github" label="GitHub URL" placeholder="github.com/..." value={formData.github} onChange={handleChange} />
            <FormInput id="portfolio" name="portfolio" label="Portfolio Website" placeholder="your-portfolio.com" value={formData.portfolio} onChange={handleChange} span="col-span-2"/>
            <FormTextarea id="bio" name="bio" label="Short Bio / Summary" placeholder="A brief professional summary about yourself..." value={formData.bio} onChange={handleChange} />
          </>)}

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-200 mb-6 border-l-4 border-blue-500 pl-4">Education</h2>
            {formData.education.map((edu, index) => (
              <div key={index} className="bg-gray-900/70 p-6 md:p-8 rounded-xl shadow-lg backdrop-blur-sm mb-6 relative">
                {formData.education.length > 1 && <button onClick={() => removeArrayItem('education', index)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500">&times;</button>}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                  <FormInput id={`college-${index}`} name="college" label="College / University" placeholder="e.g., IIT Bombay" value={edu.college} onChange={(e) => handleArrayChange('education', index, e)} span="col-span-2"/>
                  <FormInput id={`degree-${index}`} name="degree" label="Degree / Major" placeholder="e.g., B.Tech in Computer Science" value={edu.degree} onChange={(e) => handleArrayChange('education', index, e)} />
                  <FormInput id={`cgpa-${index}`} name="cgpa" label="CGPA / Percentage" placeholder="e.g., 8.5 or 85%" value={edu.cgpa} onChange={(e) => handleArrayChange('education', index, e)} />
                  <FormInput id={`eduStart-${index}`} name="eduStart" label="Start Year" placeholder="e.g., 2021" value={edu.eduStart} onChange={(e) => handleArrayChange('education', index, e)} />
                  <FormInput id={`eduEnd-${index}`} name="eduEnd" label="End Year" placeholder="e.g., 2025" value={edu.eduEnd} onChange={(e) => handleArrayChange('education', index, e)} />
                </div>
              </div>
            ))}
            <button onClick={() => addArrayItem('education', { college: "", degree: "", eduStart: "", eduEnd: "", cgpa: "" })} className="w-full mt-2 bg-blue-600/20 text-blue-300 hover:bg-blue-600/40 font-semibold py-2 px-4 rounded-lg transition">Add More Education</button>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-200 mb-6 border-l-4 border-blue-500 pl-4">Experience</h2>
            {formData.experience.map((exp, index) => (
              <div key={index} className="bg-gray-900/70 p-6 md:p-8 rounded-xl shadow-lg backdrop-blur-sm mb-6 relative">
                {formData.experience.length > 1 && <button onClick={() => removeArrayItem('experience', index)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500">&times;</button>}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                  <FormInput id={`company-${index}`} name="company" label="Company Name" placeholder="e.g., Google" value={exp.company} onChange={(e) => handleArrayChange('experience', index, e)} />
                  <FormInput id={`role-${index}`} name="role" label="Your Role" placeholder="e.g., Software Engineer Intern" value={exp.role} onChange={(e) => handleArrayChange('experience', index, e)} />
                  <FormInput id={`expStart-${index}`} name="expStart" label="Start Date" placeholder="e.g., Jan 2024" value={exp.expStart} onChange={(e) => handleArrayChange('experience', index, e)} />
                  <FormInput id={`expEnd-${index}`} name="expEnd" label="End Date" placeholder="e.g., Present" value={exp.expEnd} onChange={(e) => handleArrayChange('experience', index, e)} />
                  <FormTextarea id={`expDesc-${index}`} name="expDesc" label="Responsibilities & Achievements" placeholder="Describe your key contributions..." value={exp.expDesc} onChange={(e) => handleArrayChange('experience', index, e)} rows={4} />
                </div>
              </div>
            ))}
            <button onClick={() => addArrayItem('experience', { company: "", role: "", expStart: "", expEnd: "", expDesc: "" })} className="w-full mt-2 bg-blue-600/20 text-blue-300 hover:bg-blue-600/40 font-semibold py-2 px-4 rounded-lg transition">Add More Experience</button>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-200 mb-6 border-l-4 border-blue-500 pl-4">Skills</h2>
            <div className="bg-gray-900/70 p-6 md:p-8 rounded-xl shadow-lg backdrop-blur-sm">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {formData.skills.map((skill, index) => (
                  <div key={index} className="relative">
                    <FormInput
                      id={`skill-${index}`}
                      name="name"
                      label={`Skill ${index + 1}`}
                      placeholder="e.g., React"
                      value={skill.name}
                      onChange={(e) => handleArrayChange('skills', index, e)}
                      span="col-span-1"
                    />
                     {formData.skills.length > 1 && <button onClick={() => removeArrayItem('skills', index)} className="absolute top-0 right-0 mt-1 mr-1 text-gray-500 hover:text-red-400 text-xs">&times;</button>}
                  </div>
                ))}
              </div>
              <button onClick={() => addArrayItem('skills', { name: "" })} className="w-full mt-6 bg-blue-600/20 text-blue-300 hover:bg-blue-600/40 font-semibold py-2 px-4 rounded-lg transition">Add Skill</button>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-200 mb-6 border-l-4 border-blue-500 pl-4">Projects</h2>
            {formData.projects.map((project, index) => (
              <div key={index} className="bg-gray-900/70 p-6 md:p-8 rounded-xl shadow-lg backdrop-blur-sm mb-6 relative">
                {formData.projects.length > 1 && <button onClick={() => removeArrayItem('projects', index)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500">&times;</button>}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                  <FormInput id={`projectName-${index}`} name="projectName" label="Project Name" placeholder="e.g., E-commerce Website" value={project.projectName} onChange={(e) => handleArrayChange('projects', index, e)} span="col-span-2"/>
                  <FormInput id={`projectTech-${index}`} name="projectTech" label="Tech Stack Used" placeholder="e.g., Next.js, Stripe, PostgreSQL" value={project.projectTech} onChange={(e) => handleArrayChange('projects', index, e)} />
                  <FormInput id={`projectLink-${index}`} name="projectLink" label="Project Link / GitHub" placeholder="Link to your live project or repository" value={project.projectLink} onChange={(e) => handleArrayChange('projects', index, e)} />
                  <FormTextarea id={`projectDesc-${index}`} name="projectDesc" label="Project Description" placeholder="Briefly describe what your project does..." value={project.projectDesc} onChange={(e) => handleArrayChange('projects', index, e)} rows={4} />
                </div>
              </div>
            ))}
            <button onClick={() => addArrayItem('projects', { projectName: "", projectDesc: "", projectTech: "", projectLink: "" })} className="w-full mt-2 bg-blue-600/20 text-blue-300 hover:bg-blue-600/40 font-semibold py-2 px-4 rounded-lg transition">Add More Projects</button>
          </section>

        </div>
    </div>
  );
}