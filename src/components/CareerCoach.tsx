import React, { useState, useEffect, useRef } from "react";
import { Mic, Send, Calendar, CheckSquare, Settings, Plus, Play, RefreshCw, CalendarDays, BrainCircuit, MicOff, Volume2 } from "lucide-react";

export const CareerCoach = () => {
  const [messages, setMessages] = useState<{ id: string; sender: "user" | "coach"; text: string }[]>([
    {
      id: "1",
      sender: "coach",
      text: "Good morning! I'm your AI Career Coach. Ready to tackle your job search strategy for today? Let's review your goals and start with a quick pep talk.",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [syncedCalendar, setSyncedCalendar] = useState<"google" | "apple" | null>(null);
  const recognitionRef = useRef<any>(null);
  
  const [tasks] = useState([
    { id: 1, title: "Review QA Engineering job posts on LinkedIn", time: "10:00 AM", completed: false },
    { id: 2, title: "Submit 2 applications using the Job Apply tool", time: "11:30 AM", completed: false },
    { id: 3, title: "Mock Interview Practice - 1 session", time: "2:00 PM", completed: false },
    { id: 4, title: "Update Resume based on recent feedback", time: "4:00 PM", completed: true },
  ]);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onresult = (event: any) => {
        const results = event.results;
        const lastResult = results[results.length - 1];
        const text = lastResult[0].transcript;
        // Optional: append interim results or just update whole
        if (lastResult.isFinal) {
          setInputMessage((prev) => prev + (prev.length > 0 ? " " : "") + text.trim());
        }
      };

      recognitionRef.current = recognition;
    }
  }, []);

  useEffect(() => {
    if (isRecording) {
      recognitionRef.current?.start();
    } else {
      recognitionRef.current?.stop();
    }
  }, [isRecording]);

  const toggleRecording = () => {
      setIsRecording(!isRecording);
  };

  const playAudio = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    const newMsg = { id: Date.now().toString(), sender: "user" as const, text: inputMessage };
    setMessages([...messages, newMsg]);
    setInputMessage("");
    if (isRecording) setIsRecording(false);
    
    // Mock response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "coach",
          text: "That sounds like a solid approach! Remember, quality over quantity when applying. Let me know if you need help tailoring your pitch.",
        },
      ]);
    }, 1000);
  };

  const handleSyncCalendar = (type: "google" | "apple") => {
    alert(`Syncing with ${type === 'google' ? 'Google Calendar' : 'Apple Calendar'}...`);
    setTimeout(() => {
      setSyncedCalendar(type);
      alert('Calendar synced successfully! Your daily job search schedule has been updated.');
    }, 800);
  };

  return (
    <div className="flex h-full w-full bg-black text-white gap-6 p-8">
      {/* Left Column: Chat & Coaching */}
      <div className="flex-1 flex flex-col bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/10">
        <div className="p-6 border-b border-neutral-800 bg-neutral-900/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600/20 p-2 rounded-full text-blue-400">
              <BrainCircuit size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Dynamic Career Coach
              </h2>
              <p className="text-xs text-neutral-400">Guidance • Strategy • Pep Talks</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="glass-button p-2 text-neutral-400 hover:text-white" title="Settings">
              <Settings size={18} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed shadow-sm relative group ${
                  msg.sender === "user"
                    ? "bg-blue-600 text-white rounded-tr-sm"
                    : "bg-neutral-800 border border-neutral-700 text-neutral-200 rounded-tl-sm"
                }`}
              >
                <p>{msg.text}</p>
                {msg.sender === "coach" && (
                    <button 
                      onClick={() => playAudio(msg.text)} 
                      className="absolute -right-10 top-2 opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-neutral-800 text-neutral-400 hover:text-white rounded-full border border-neutral-700"
                      title="Play Audio"
                    >
                      <Volume2 size={16} />
                    </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-neutral-950 border-t border-neutral-800">
          <div className="flex items-center gap-2">
            <button
              onClick={toggleRecording}
              title={isRecording ? "Stop Recording" : "Start Voice Input"}
              className={`p-4 rounded-xl flex-shrink-0 transition-colors ${
                isRecording ? "bg-red-500/20 text-red-500 animate-pulse border border-red-500/50" : "bg-neutral-800 border border-neutral-700 text-neutral-400 hover:text-white hover:bg-neutral-700"
              }`}
            >
              {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
            </button>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask for advice, strategy or a pep talk..."
              className="flex-1 bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-4 text-sm focus:outline-none focus:border-blue-500 transition-colors text-white placeholder-neutral-500"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSendMessage();
              }}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              className="bg-blue-600 disabled:opacity-50 hover:bg-blue-500 text-white p-4 rounded-xl flex-shrink-0 transition-colors"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Right Column: Daily Plan & Calendar */}
      <div className="w-[380px] flex flex-col gap-6">
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-xl">
          <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
            <CalendarDays size={20} className="text-green-400" />
            Calendar Sync
          </h3>
          <p className="text-xs text-neutral-400 mb-6 leading-relaxed">
            Import your availability and automatically schedule upcoming interviews, mock sessions, and daily job searching focus blocks.
          </p>
          <div className="space-y-3">
            <button 
              onClick={() => handleSyncCalendar("google")}
              className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${
                syncedCalendar === "google" 
                ? "bg-green-500/10 border-green-500/30 text-green-400" 
                : "bg-neutral-800 border-neutral-700 hover:border-neutral-500 text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-white flex items-center justify-center">
                  <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                </div>
                <span className="font-medium text-sm">Google Calendar</span>
              </div>
              {syncedCalendar === "google" && <RefreshCw size={16} className="animate-spin" />}
            </button>
            <button 
              onClick={() => handleSyncCalendar("apple")}
              className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${
                syncedCalendar === "apple" 
                ? "bg-blue-500/10 border-blue-500/30 text-blue-400" 
                : "bg-neutral-800 border-neutral-700 hover:border-neutral-500 text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-neutral-200 flex items-center justify-center">
                  <svg className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.04 2.26-.74 3.58-.8 2.03-.04 3.48.91 4.54 2.37-3.9 2.1-3.21 7.02.6 8.52-.77 2.1-2.05 4.38-3.8 6.08zM12.03 7.25c-.15-2.23 1.62-4.22 3.8-4.52.28 2.34-1.66 4.35-3.8 4.52z"/></svg>
                </div>
                <span className="font-medium text-sm">Apple Calendar</span>
              </div>
              {syncedCalendar === "apple" && <RefreshCw size={16} className="animate-spin" />}
            </button>
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-xl flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <CheckSquare size={20} className="text-blue-400" />
              Daily Plan
            </h3>
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">{new Date().toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</span>
          </div>

          <div className="space-y-4 flex-1 overflow-y-auto pr-2">
            {tasks.map((task) => (
              <div 
                key={task.id} 
                className={`p-4 rounded-2xl border transition-all ${
                  task.completed 
                  ? "bg-neutral-950 border-neutral-800 opacity-60" 
                  : "bg-neutral-800/50 border-neutral-700 hover:border-blue-500/50"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h4 className={`text-sm font-medium ${task.completed ? "line-through text-neutral-500" : "text-white"}`}>
                      {task.title}
                    </h4>
                    <span className="text-xs text-neutral-400 mt-2 block flex items-center gap-1">
                      <Calendar size={12} /> {task.time}
                    </span>
                  </div>
                  <div className={`h-5 w-5 rounded border flex flex-shrink-0 items-center justify-center ${
                    task.completed ? "bg-blue-600 border-blue-600" : "border-neutral-500"
                  }`}>
                    {task.completed && <CheckSquare size={12} className="text-white" />}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button className="primary-button w-full flex items-center justify-center gap-2 mt-4 text-sm h-12">
            <Plus size={16} /> Add Task
          </button>
        </div>
      </div>
    </div>
  );
};
