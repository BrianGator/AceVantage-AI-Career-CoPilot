import React, { useState } from "react";
import {
  Upload,
  FileText,
  CheckCircle2,
  Download,
  RefreshCw,
  Link as LinkIcon,
  Calendar,
} from "lucide-react";
import { cn } from "../lib/utils";

export const CoverLetter = () => {
  const [resumeText, setResumeText] = useState("");
  const [jobDescriptionUrl, setJobDescriptionUrl] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const [savedCoverLetters, setSavedCoverLetters] = useState<
    { id: string; title: string; date: string; content: string }[]
  >([]);

  const handleGenerate = () => {
    if (!resumeText || (!jobDescription && !jobDescriptionUrl)) return;
    setIsGenerating(true);

    // Mock generation
    setTimeout(() => {
      const dateStr = new Date().toISOString().split("T")[0];
      const resultName = `CoverLetter_${dateStr}`;

      const generatedContent =
        `Dear Hiring Manager,\n\n` +
        `I am writing to express my strong interest in the open position. With my background detailed in my resume, I believe I am an excellent fit for the role.\n\n` +
        `Throughout my career, I have consistently delivered results. The requirements outlined in your job description align perfectly with my skill set.\n\n` +
        `I would welcome the opportunity to discuss how my experience and vision can contribute to your team's success.\n\n` +
        `Sincerely,\n[Your Name]`;

      setCoverLetter(generatedContent);

      const newLetter = {
        id: Date.now().toString(),
        title: resultName,
        date: dateStr,
        content: generatedContent,
      };

      setSavedCoverLetters((prev) => {
        const updated = [newLetter, ...prev];
        return updated.slice(0, 20);
      });
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="h-full w-full p-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h2 className="text-3xl font-bold mb-2">AI Cover Letter</h2>
          <p className="text-neutral-400">
            Generate customized cover letters tailored to your resume and a specific job description.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="panel-border rounded-3xl p-6 bg-neutral-900 border border-neutral-800">
              <h3 className="text-lg font-bold mb-4">Input Details</h3>

              <div className="space-y-4">
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

                <div className="relative">
                   <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
                     <span className="bg-neutral-900 px-2 text-xs font-bold uppercase text-neutral-600">Company Position</span>
                   </div>
                   <hr className="border-neutral-800 my-6" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase mb-2 flex items-center justify-between">
                    <span>Job Description URL (Optional)</span>
                    <LinkIcon size={12} />
                  </label>
                  <input
                    type="url"
                    value={jobDescriptionUrl}
                    onChange={(e) => setJobDescriptionUrl(e.target.value)}
                    placeholder="e.g. https://company.com/careers/job-123"
                    className="input-field w-full"
                  />
                </div>

                <div className="text-center text-xs text-neutral-600 font-bold uppercase my-2">OR</div>

                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase mb-2">
                    Job Description (Text)
                  </label>
                  <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste the full job description here..."
                    className="input-field w-full h-40 resize-none font-mono text-sm leading-relaxed"
                  />
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={!resumeText || (!jobDescription && !jobDescriptionUrl) || isGenerating}
                  className="primary-button w-full flex items-center justify-center gap-2"
                >
                  {isGenerating ? (
                    <RefreshCw className="animate-spin" size={18} />
                  ) : (
                    <CheckCircle2 size={18} />
                  )}
                  {isGenerating
                    ? "Drafting Cover Letter..."
                    : "Generate Cover Letter"}
                </button>
              </div>
            </div>

            {coverLetter && (
              <div className="panel-border rounded-3xl p-6 bg-neutral-900 border border-neutral-800">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-green-400">
                    Your Cover Letter
                  </h3>
                  <div className="flex gap-2">
                    <button className="glass-button text-xs flex items-center gap-2">
                      <Download size={14} /> PDF
                    </button>
                    <button className="glass-button text-xs flex items-center gap-2">
                      <Download size={14} /> DOCX
                    </button>
                  </div>
                </div>
                <textarea
                  readOnly
                  value={coverLetter}
                  className="input-field w-full h-64 resize-none font-mono text-sm leading-relaxed"
                />
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="panel-border rounded-3xl p-6 bg-neutral-900 border border-neutral-800">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <FileText size={18} /> History
              </h3>

              {savedCoverLetters.length === 0 ? (
                <div className="text-center py-8 text-neutral-500 text-sm">
                  No cover letters generated yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {savedCoverLetters.map((letter) => (
                    <div
                      key={letter.id}
                      className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 cursor-pointer hover:bg-neutral-800 transition-colors group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-sm text-white group-hover:text-blue-400 transition-colors truncate pr-2">
                          {letter.title}
                        </h4>
                        <Download
                          size={14}
                          className="text-neutral-500 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                        />
                      </div>
                      <div className="flex items-center gap-2 text-xs text-neutral-500">
                        <Calendar size={12} /> {letter.date}
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
