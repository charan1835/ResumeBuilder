"use client";
import { useState, useEffect } from "react";
import "./globals.css";
import Templete from "./_components/Templete";
import ResumePreview from "./_components/ResumePreview";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PdfDocument } from "./_components/PdfDocument";

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

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <div className="flex h-screen overflow-hidden bg-[#0D1117] text-gray-100 font-sans">
        {/* Left side - Form */}
        <Templete formData={formData} setFormData={setFormData} />
        {/* Right side - Resume Preview */}
        <div className="hidden lg:block lg:w-1/2 bg-gray-800/20 p-10 overflow-y-auto">
          <div className="sticky top-6 flex flex-col items-center gap-4 w-full max-w-4xl mx-auto h-10">
            {isClient && (
              <PDFDownloadLink
                document={<PdfDocument formData={formData} />}
                fileName={`${formData.name || "resume"}.pdf`}
                className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
              >
                {({ loading }) =>
                  loading ? 'Generating PDF...' : 'Download as PDF'
                }
              </PDFDownloadLink>
            )}
            <div className="w-full">
              <ResumePreview formData={formData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
