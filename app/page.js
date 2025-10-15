"use client";
import { useState, useEffect, useMemo } from "react";
import "./globals.css";
import TemplateForm from "./_components/Templete"; // Renamed for clarity
import { PDFDownloadLink } from "@react-pdf/renderer";

// Import all template components
import { ClassicPreview, ClassicPdf } from "./_components/ClassicTemplate";
import { ModernPreview, ModernPdf } from "./_components/ModernTemplate";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "", title: "", bio: "", email: "", phone: "", linkedin: "", github: "", portfolio: "",
    
    education: [
      { college: "", degree: "", eduStart: "", eduEnd: "", cgpa: "" }
    ],
    
    experience: [
      { company: "", role: "", expStart: "", expEnd: "", expDesc: "" }
    ],
    
    skills: [
      { name: "React" }, { name: "JavaScript" }, { name: "Next.js" }
    ],
    
    projects: [
      { projectName: "", projectDesc: "", projectTech: "", projectLink: "" }
    ],
  });

  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Define template components
  const templates = {
    classic: {
      preview: ClassicPreview,
      pdf: ClassicPdf,
    },
    modern: {
      preview: ModernPreview,
      pdf: ModernPdf,
    },
  };

  const SelectedPreview = templates[selectedTemplate].preview;
  const SelectedPdf = templates[selectedTemplate].pdf;



  return (
    <>
      <div className="flex h-screen overflow-hidden bg-[#0D1117] text-gray-100 font-sans">
        {/* Left side - Form */}
        <div className="w-full lg:w-1/2 overflow-y-auto min-h-0">
          <TemplateForm 
            formData={formData} 
            setFormData={setFormData} 
            selectedTemplate={selectedTemplate}
            setSelectedTemplate={setSelectedTemplate}
          />
        </div>
        {/* Right side - Resume Preview */}
        <div className="hidden lg:block lg:w-1/2 bg-gray-800/20 p-10 overflow-y-auto min-h-0">
          <div className="w-full max-w-4xl mx-auto">
            {isClient && (
              <div className="sticky top-6 z-10 mb-4">
                <PDFDownloadLink
                  document={<SelectedPdf formData={formData} />}
                  fileName={`${formData.name || "resume"}.pdf`}
                  className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                >
                  {({ loading }) =>
                    loading ? 'Generating PDF...' : 'Download as PDF'
                  }
                </PDFDownloadLink>
              </div>
            )}
            <SelectedPreview key={selectedTemplate} formData={formData} />
          </div>
        </div>
      </div>
    </>
  );
}