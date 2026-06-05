import React, { useState } from "react";
import {
  Globe,
  Monitor,
  Link as LinkIcon,
  Search,
  MessageSquare,
  Send,
  RefreshCw,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";
import { cn } from "../lib/utils";

export const WebTestSolver = () => {
  const [browser, setBrowser] = useState("Chrome");
  const [tabName, setTabName] = useState("");
  const [url, setUrl] = useState("");
  const [isSyncing, setIsSyncing] = useState(false);
  const [synced, setSynced] = useState(false);

  const [inputQuery, setInputQuery] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const [messages, setMessages] = useState<{ id: string; role: "user" | "ai" | "system"; content: string }[]>([
    {
      id: "init",
      role: "system",
      content: "Web Test Solver initialized. Configure your browser, tab, and URL to begin."
    }
  ]);

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setSynced(true);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "system",
          content: `Synced to ${browser} - Tab: "${tabName || '[Active Tab]'}" at URL: ${url}`
        },
        {
          id: (Date.now() + 1).toString(),
          role: "ai",
          content: "I have accessed the page. I found 5 multiple choice questions. \n\n1. What is the output of `typeof null` in JS?\n   **ANSWER: C) \"object\"**\n\n2. Which method adds an element to the end of an array?\n   **ANSWER: B) push()**\n\nLet me know if you need any answers revised or if there are manual questions you want to paste."
        }
      ]);
    }, 1500);
  };

  const handleSend = () => {
    if (!inputQuery.trim()) return;
    const msg = inputQuery;
    setInputQuery("");
    
    setMessages(prev => [
      ...prev,
      { id: Date.now().toString(), role: "user", content: msg }
    ]);

    setIsGenerating(true);
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "ai",
          content: "Understood. Based on your feedback/manual input, here is the updated solution:\n\n**ANSWER: A) The DOM is rebuilt entirely.**\n\nLet me know if this needs further modification."
        }
      ]);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="h-full w-full p-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h2 className="text-3xl font-bold mb-2">AI Web Test Solver</h2>
          <p className="text-neutral-400">
            Real-time analysis and solutions for online technical tests and coding assessments.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="panel-border rounded-3xl p-6 bg-neutral-900 border border-neutral-800">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Globe size={18} className="text-blue-400" /> Connection Settings
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase mb-2">Browser</label>
                  <select 
                    value={browser} 
                    onChange={e => setBrowser(e.target.value)}
                    className="input-field w-full"
                  >
                    <option value="Chrome">Google Chrome</option>
                    <option value="Firefox">Mozilla Firefox</option>
                    <option value="Safari">Safari</option>
                    <option value="Edge">Microsoft Edge</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase mb-2">Tab Name</label>
                  <div className="flex items-center gap-2">
                    <Monitor size={14} className="text-neutral-500" />
                    <input 
                      type="text" 
                      value={tabName}
                      onChange={e => setTabName(e.target.value)}
                      placeholder="e.g. HackerRank Assessment" 
                      className="input-field w-full text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase mb-2">URL</label>
                  <div className="flex items-center gap-2">
                    <LinkIcon size={14} className="text-neutral-500" />
                    <input 
                      type="text" 
                      value={url}
                      onChange={e => setUrl(e.target.value)}
                      placeholder="https://..." 
                      className="input-field w-full text-sm"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button 
                    onClick={handleSync}
                    disabled={isSyncing}
                    className="primary-button w-full flex items-center justify-center gap-2"
                  >
                    {isSyncing ? <RefreshCw size={16} className="animate-spin" /> : <Search size={16} />}
                    {isSyncing ? "Syncing Window..." : "Copy Questions & Solve"}
                  </button>
                </div>
              </div>
            </div>

            {synced && (
              <div className="p-4 rounded-xl border border-green-500/30 bg-green-500/10 flex items-start gap-3">
                <CheckCircle2 className="text-green-400 mt-0.5 shrink-0" size={18} />
                <div>
                  <h4 className="text-sm font-bold text-green-400">Connection Active</h4>
                  <p className="text-xs text-neutral-400 mt-1">
                    AI is monitoring the test environment.
                  </p>
                </div>
              </div>
            )}
            
            <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 flex items-start gap-3">
              <AlertTriangle className="text-amber-400 mt-0.5 shrink-0" size={18} />
              <div>
                <h4 className="text-sm font-bold text-amber-400">Anti-Cheat Warning</h4>
                <p className="text-xs text-neutral-400 mt-1">
                  Ensure stealth mode is activated if the assessment platform utilizes screen-recording or DOM integrity checks.
                </p>
              </div>
            </div>

          </div>

          <div className="lg:col-span-2 flex flex-col min-h-[600px] panel-border rounded-3xl bg-neutral-900 border border-neutral-800 overflow-hidden">
            <div className="p-4 border-b border-neutral-800 bg-neutral-950 flex items-center gap-2">
              <MessageSquare size={16} className="text-neutral-400" />
              <h3 className="font-bold text-sm text-neutral-300">AI Communication Feed</h3>
            </div>
            
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}>
                  <div className={cn(
                    "max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed whitespace-pre-wrap",
                    msg.role === "user" 
                      ? "bg-blue-600 text-white rounded-br-sm" 
                      : msg.role === "system"
                        ? "bg-neutral-800/50 border border-neutral-700 text-neutral-400 text-xs font-mono w-full"
                        : "bg-neutral-800 border border-neutral-700 text-neutral-200 rounded-tl-sm"
                  )}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isGenerating && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] rounded-2xl p-4 bg-neutral-800 border border-neutral-700 text-neutral-400 rounded-tl-sm flex items-center gap-2">
                    <RefreshCw size={14} className="animate-spin" /> Processing...
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 bg-neutral-950 border-t border-neutral-800">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={inputQuery}
                  onChange={e => setInputQuery(e.target.value)}
                  placeholder="Paste questions manually, correct previous answers, or ask for modifications..." 
                  className="input-field flex-1"
                  onKeyDown={e => {
                    if (e.key === "Enter") handleSend();
                  }}
                />
                <button 
                  onClick={handleSend}
                  disabled={!inputQuery.trim() || isGenerating}
                  className="primary-button h-10 w-10 p-0 flex items-center justify-center disabled:opacity-50"
                >
                  <Send size={16} />
                </button>
              </div>
              <p className="text-[10px] text-neutral-500 mt-2 text-center">
                Use the text box to interact manually with the solver if automatic copying fails.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
