import React, { useState } from "react";
import {
  Upload,
  FileText,
  CheckCircle2,
  Download,
  RefreshCw,
  Briefcase,
  Calendar,
  Plus,
} from "lucide-react";
import { cn } from "../lib/utils";

export const ResumeOptimizer = () => {
  const [resumeText, setResumeText] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizedResume, setOptimizedResume] = useState("");
  const [savedResumes, setSavedResumes] = useState<
    { id: string; title: string; date: string; content: string }[]
  >([]);

  const handleOptimize = () => {
    if (!resumeText || !jobTitle || !jobDescription) return;
    setIsOptimizing(true);

    // Mock generation
    setTimeout(() => {
      const dateStr = new Date().toISOString().split("T")[0];
      const resultName = `${jobTitle.replace(/[^a-zA-Z0-9]/g, "_")}_${dateStr}`;

      const optimizedContent =
        `[ATS OPTIMIZED FOR: ${jobTitle}]\n\n` +
        `Keywords Added: ${jobTitle}, Collaboration, Automation, Testing\n` +
        `=========================\n\n` +
        `${resumeText}\n\n[Optimized bullet points targeting: ${jobTitle} based on description]`;

      setOptimizedResume(optimizedContent);

      const newResume = {
        id: Date.now().toString(),
        title: resultName,
        date: dateStr,
        content: optimizedContent,
      };

      setSavedResumes((prev) => {
        const updated = [newResume, ...prev];
        // Keep last 20
        return updated.slice(0, 20);
      });
      setIsOptimizing(false);
    }, 2000);
  };

  return (
    <div className="h-full w-full p-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h2 className="text-3xl font-bold mb-2">AI Resume Optimizer</h2>
          <p className="text-neutral-400">
            Tailor your resume for specific job descriptions and pass ATS
            filters.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="panel-border rounded-3xl p-6 bg-neutral-900 border border-neutral-800">
              <h3 className="text-lg font-bold mb-4">Optimization Details</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase mb-2">
                    Target Job Title
                  </label>
                  <input
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="e.g. Senior QA Automation Engineer"
                    className="input-field w-full"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase mb-2">
                    Job Description
                  </label>
                  <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste the full job description here..."
                    className="input-field w-full h-40 resize-none font-mono text-sm leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase mb-2">
                    Current Resume (Text)
                  </label>
                  <textarea
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    placeholder="Paste your current resume here..."
                    className="input-field w-full h-40 resize-none font-mono text-sm leading-relaxed"
                  />
                </div>

                <button
                  onClick={handleOptimize}
                  disabled={
                    !resumeText || !jobTitle || !jobDescription || isOptimizing
                  }
                  className="primary-button w-full flex items-center justify-center gap-2"
                >
                  {isOptimizing ? (
                    <RefreshCw className="animate-spin" size={18} />
                  ) : (
                    <CheckCircle2 size={18} />
                  )}
                  {isOptimizing
                    ? "Optimizing Resume & Adding Keywords..."
                    : "Optimize & Make ATS Friendly"}
                </button>
              </div>
            </div>

            {optimizedResume && (
              <div className="panel-border rounded-3xl p-6 bg-neutral-900 border border-neutral-800">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-green-400">
                    Optimized Resume Generation
                  </h3>
                  <button className="glass-button text-xs flex items-center gap-2">
                    <Download size={14} /> Download
                  </button>
                </div>
                <textarea
                  readOnly
                  value={optimizedResume}
                  className="input-field w-full h-64 resize-none font-mono text-sm leading-relaxed"
                />
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="panel-border rounded-3xl p-6 bg-neutral-900 border border-neutral-800">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <FileText size={18} /> Saved Resumes ({savedResumes.length}/20)
              </h3>

              {savedResumes.length === 0 ? (
                <div className="text-center py-8 text-neutral-500 text-sm">
                  No optimized resumes saved yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {savedResumes.map((resume) => (
                    <div
                      key={resume.id}
                      className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 cursor-pointer hover:bg-neutral-800 transition-colors group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-sm text-white group-hover:text-blue-400 transition-colors truncate pr-2">
                          {resume.title}
                        </h4>
                        <Download
                          size={14}
                          className="text-neutral-500 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                        />
                      </div>
                      <div className="flex items-center gap-2 text-xs text-neutral-500">
                        <Calendar size={12} /> {resume.date}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
