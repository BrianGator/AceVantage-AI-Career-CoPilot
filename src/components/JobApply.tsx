import React, { useState } from "react";
import { 
  User, Briefcase, FileText, Send, BarChart3, Database, 
  Settings, Link as LinkIcon, Download, LayoutGrid, CheckSquare 
} from "lucide-react";
import { cn } from "../lib/utils";

export const JobApply = () => {
  const [activeTab, setActiveTab] = useState<"training" | "automation" | "crm">("training");

  // Tab 1: Training
  const [linkedInUrl, setLinkedInUrl] = useState("");
  
  // Tab 2: Automation
  const [autoApplyLevel, setAutoApplyLevel] = useState<"review" | "autopilot">("review");
  const [queue] = useState([
    { role: "Frontend Engineer", company: "Acme Corp", match: "92%" },
    { role: "React Developer", company: "Globex", match: "88%" },
    { role: "UI Engineer", company: "Stark Ind.", match: "85%" },
  ]);

  // Tab 3: CRM
  const [applications] = useState([
    { id: 1, role: "Senior Developer", company: "TechNova", status: "Interviewing", date: "Oct 12" },
    { id: 2, role: "Frontend Lead", company: "Innovate INC", status: "Applied", date: "Oct 14" },
    { id: 3, role: "Software Engineer III", company: "CloudWorks", status: "Saved", date: "Oct 15" },
  ]);

  return (
    <div className="h-full w-full p-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h2 className="text-3xl font-bold mb-2">AI Job Apply</h2>
          <p className="text-neutral-400">
            Automate your job search. Train your AI, set your criteria, and track your pipeline.
          </p>
        </div>

        <div className="flex gap-4 border-b border-neutral-800 pb-2">
          <button
            onClick={() => setActiveTab("training")}
            className={cn(
              "px-4 py-2 text-sm font-bold border-b-2 transition-colors flex items-center gap-2",
              activeTab === "training"
                ? "border-blue-500 text-blue-400"
                : "border-transparent text-neutral-500 hover:text-neutral-300",
            )}
          >
            <Database size={16} /> 1. The Profile & Resume Tab
          </button>
          <button
            onClick={() => setActiveTab("automation")}
            className={cn(
              "px-4 py-2 text-sm font-bold border-b-2 transition-colors flex items-center gap-2",
              activeTab === "automation"
                ? "border-blue-500 text-blue-400"
                : "border-transparent text-neutral-500 hover:text-neutral-300",
            )}
          >
            <Send size={16} /> 2. The Auto-Apply & Job Board
          </button>
          <button
            onClick={() => setActiveTab("crm")}
            className={cn(
              "px-4 py-2 text-sm font-bold border-b-2 transition-colors flex items-center gap-2",
              activeTab === "crm"
                ? "border-blue-500 text-blue-400"
                : "border-transparent text-neutral-500 hover:text-neutral-300",
            )}
          >
            <LayoutGrid size={16} /> 3. The Tracker & History
          </button>
        </div>

        {activeTab === "training" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="panel-border bg-neutral-900 rounded-3xl p-6">
                <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                  <User size={18} className="text-blue-400" /> Master Profile
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-neutral-500 font-bold uppercase pl-1">Personal Details</label>
                    <input type="text" placeholder="Full Name" className="input-field w-full mt-1 mb-2" />
                    <input type="email" placeholder="Email Address" className="input-field w-full mb-2" />
                    <input type="text" placeholder="Phone Number" className="input-field w-full" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input type="text" placeholder="Target Salary" className="input-field w-full" />
                    <select className="input-field w-full">
                       <option value="">Work Auth</option>
                       <option value="citizen">US Citizen</option>
                       <option value="visa">Require Visa</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="panel-border bg-neutral-900 rounded-3xl p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                    <LinkIcon size={18} className="text-purple-400" /> LinkedIn Importer
                  </h3>
                   <div className="flex gap-2">
                     <input 
                       value={linkedInUrl}
                       onChange={(e) => setLinkedInUrl(e.target.value)}
                       placeholder="https://linkedin.com/in/you"
                       className="input-field flex-1" 
                     />
                     <button className="primary-button truncate px-4">Fast Sync</button>
                   </div>
                   <p className="text-xs text-neutral-500 mt-2">
                     Extracts work history and skills securely into the AI brain.
                   </p>
                </div>
                
                <div className="pt-4 border-t border-neutral-800">
                  <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                    <FileText size={18} className="text-yellow-400" /> Resume / CV Manager
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-neutral-950 border border-neutral-800 rounded-xl">
                      <div className="flex items-center gap-2 text-sm"><FileText size={14} className="text-neutral-500"/> Default_Master.pdf</div>
                      <span className="text-[10px] uppercase font-bold text-green-500 bg-green-500/10 px-2 py-0.5 rounded">Active</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-neutral-800/50 border border-neutral-800 rounded-xl">
                      <div className="flex items-center gap-2 text-sm text-neutral-400"><FileText size={14}/> Frontend_Focused.pdf</div>
                    </div>
                    <button className="glass-button w-full mt-2 py-2 text-sm">Upload New Iteration</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "automation" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="panel-border bg-neutral-900 rounded-3xl p-6 col-span-1 space-y-6">
                 <div>
                   <h3 className="font-bold flex items-center gap-2 mb-4">
                     <Settings size={18} className="text-blue-400" /> Search Filters
                   </h3>
                   <div className="space-y-3">
                     <input type="text" placeholder="Job Title (e.g. Frontend Engineer)" className="input-field w-full text-sm" />
                     <select className="input-field w-full text-sm">
                        <option>Industry: Any</option>
                        <option>Tech / SaaS</option>
                        <option>Finance</option>
                     </select>
                     <select className="input-field w-full text-sm">
                        <option>Location: Remote</option>
                        <option>Hybrid</option>
                        <option>On-site</option>
                     </select>
                   </div>
                 </div>

                 <div className="pt-4 border-t border-neutral-800">
                   <h3 className="font-bold flex items-center gap-2 mb-4">
                     <CheckSquare size={18} className="text-cyan-400" /> Options
                   </h3>
                   <div className="space-y-2">
                     <label className="flex items-center gap-3 p-3 rounded-xl border border-neutral-800 bg-neutral-950 cursor-pointer">
                        <input 
                          type="radio" 
                          name="autoApply" 
                          checked={autoApplyLevel === "review"}
                          onChange={() => setAutoApplyLevel("review")}
                          className="text-blue-500" 
                        />
                        <div className="flex flex-col">
                           <span className="text-sm font-bold">Review Mode</span>
                           <span className="text-[10px] text-neutral-500">Stop and let me review before applying.</span>
                        </div>
                     </label>
                     <label className="flex items-center gap-3 p-3 rounded-xl border border-neutral-800 bg-neutral-950 cursor-pointer">
                        <input 
                          type="radio" 
                          name="autoApply" 
                          checked={autoApplyLevel === "autopilot"}
                          onChange={() => setAutoApplyLevel("autopilot")}
                          className="text-blue-500" 
                        />
                        <div className="flex flex-col">
                           <span className="text-sm font-bold">Full Autopilot</span>
                           <span className="text-[10px] text-neutral-500">Submit on matching roles immediately.</span>
                        </div>
                     </label>
                   </div>
                 </div>
              </div>

              <div className="panel-border bg-neutral-900 rounded-3xl p-6 col-span-2 flex flex-col">
                 <div className="flex items-center justify-between mb-4">
                   <h3 className="font-bold flex items-center gap-2">
                     <Briefcase size={18} className="text-green-400" /> Queue / Bot Hub
                   </h3>
                   <span className="text-xs bg-blue-500/10 text-blue-400 px-2 py-1 rounded font-bold uppercase tracking-wider">{queue.length} Finding Match</span>
                 </div>
                 
                 <div className="flex-1 space-y-3 overflow-y-auto">
                   {queue.map((q, i) => (
                     <div key={i} className="p-4 border border-neutral-800 rounded-xl bg-neutral-950 flex items-center justify-between">
                        <div>
                          <p className="font-bold text-sm text-white">{q.role}</p>
                          <p className="text-xs text-neutral-400">{q.company}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <span className="text-xs text-green-400 font-bold bg-green-500/10 px-2 py-0.5 rounded">{q.match} Match</span>
                          </div>
                          {autoApplyLevel === "review" ? (
                            <button className="primary-button text-xs py-1.5 px-4">Review App</button>
                          ) : (
                            <span className="text-xs text-neutral-500 italic">Queued...</span>
                          )}
                        </div>
                     </div>
                   ))}
                 </div>
              </div>

            </div>
          </div>
        )}

        {activeTab === "crm" && (
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-6 mb-6">
              <div className="panel-border bg-neutral-900 rounded-3xl p-6 flex flex-col items-center justify-center text-center">
                 <h4 className="text-3xl font-bold text-white mb-1">34</h4>
                 <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider">Total Applications</p>
              </div>
              <div className="panel-border bg-neutral-900 rounded-3xl p-6 flex flex-col items-center justify-center text-center">
                 <h4 className="text-3xl font-bold text-blue-400 mb-1">6</h4>
                 <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider">Interviewing</p>
              </div>
              <div className="panel-border bg-neutral-900 rounded-3xl p-6 flex flex-col items-center justify-center text-center">
                 <h4 className="text-3xl font-bold text-green-400 mb-1">17%</h4>
                 <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider">Conversion Rate</p>
              </div>
            </div>

            <div className="panel-border bg-neutral-900 rounded-3xl p-6">
               <h3 className="font-bold flex items-center gap-2 mb-6">
                 <BarChart3 size={18} className="text-purple-400" /> Pipeline Status
               </h3>
               
               <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                 {/* Stages Columns */}
                 {["Saved", "Applied", "Interviewing", "Offers"].map(stage => (
                   <div key={stage} className="bg-neutral-950 border border-neutral-800 rounded-2xl p-4 min-h-[300px]">
                      <h4 className="text-sm font-bold mb-4 flex items-center justify-between">
                         {stage}
                         <span className="text-[10px] text-neutral-500 bg-neutral-800 px-2 py-0.5 rounded capitalize">{applications.filter(a => a.status === stage).length}</span>
                      </h4>
                      <div className="space-y-3">
                        {applications.filter(a => a.status === stage).map(app => (
                           <div key={app.id} className="p-3 bg-neutral-900 border border-neutral-800 rounded-xl group cursor-pointer hover:border-neutral-600 transition-colors">
                              <p className="text-xs font-bold text-white">{app.role}</p>
                              <p className="text-[10px] text-neutral-400 mb-2">{app.company}</p>
                              
                              <div className="flex items-center justify-between mt-2 pt-2 border-t border-neutral-800 opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-[9px] text-neutral-500">{app.date}</span>
                                <button className="text-[10px] flex items-center gap-1 text-blue-400 hover:text-blue-300">
                                   <Download size={10} /> Docs
                                </button>
                              </div>
                           </div>
                        ))}
                      </div>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

