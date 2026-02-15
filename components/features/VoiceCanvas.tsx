
"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Mic, Send, PenTool, Globe } from "lucide-react";
import { getGeminiFeedback } from "@/lib/ai/gemini";
import { AiMirror } from "./AiMirror";
import { useGlobalEcho } from "@/context/GlobalEchoContext";

export function VoiceCanvas() {
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState<any>(null);
    const [isListening, setIsListening] = useState(false);
    const originalContent = useRef("");
    const { addPost } = useGlobalEcho();

    const handleSpeak = async () => {
        if (!input.trim()) return;

        setLoading(true);
        setFeedback(null);

        // Simulate API call for now or use real one
        const response = await getGeminiFeedback(input);

        setFeedback(response);
        setLoading(false);
    };

    const handleShare = () => {
        if (!input.trim()) return;
        addPost(input, "Korea"); // Default country for now
        alert("Your voice has been shared with the world!");
        // Optional: clear input or keep it? Let's keep it but maybe hide feedback button
    };

    const handleStartListening = () => {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            alert("Your browser does not support speech recognition. Please try Chrome.");
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();

        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'en-US'; // Default to English for now

        recognition.onstart = () => {
            setIsListening(true);
            originalContent.current = input; // Snapshot current text
        };

        recognition.onresult = (event: any) => {
            const transcript = Array.from(event.results)
                .map((result: any) => result[0])
                .map((result) => result.transcript)
                .join('');

            // Update input: Original Text + Space (if needed) + New Transcript
            const spacing = originalContent.current && !originalContent.current.endsWith(' ') ? ' ' : '';
            setInput(originalContent.current + spacing + transcript);
        };

        recognition.onerror = (event: any) => {
            console.error("Speech recognition error", event.error);
            setIsListening(false);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognition.start();
    };

    return (
        <div className="flex flex-col items-center w-full max-w-3xl mx-auto p-4 md:p-6 space-y-6 md:space-y-8">
            <div className="w-full space-y-4">
                <h2 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 text-center mb-2">
                    Voice Canvas
                </h2>
                <p className="text-center text-slate-500 mb-6">
                    Speak your mind. Let your words take shape.
                </p>

                <div className="relative group">
                    {/* Paper stack effect */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
                        <div className="h-8 bg-slate-50 border-b border-slate-100 flex items-center px-4 space-x-2">
                            <div className="w-3 h-3 rounded-full bg-red-300"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-300"></div>
                            <div className="w-3 h-3 rounded-full bg-green-300"></div>
                        </div>
                        <Textarea
                            placeholder="Today I feel... / I want to change..."
                            className="min-h-[200px] text-lg p-6 border-none focus-visible:ring-0 resize-none shadow-none bg-transparent placeholder:text-slate-300 text-slate-700 leading-relaxed"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <div className="flex justify-between items-center p-4 bg-slate-50/50 border-t border-slate-100">
                            <div className="text-xs text-slate-400 font-medium">
                                {input.length} characters
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={handleStartListening}
                                    className={`relative transition-all duration-300 rounded-full w-10 h-10 ${isListening
                                        ? 'bg-red-100 text-red-500 hover:bg-red-200 shadow-[0_0_15px_rgba(239,68,68,0.5)]'
                                        : 'hover:bg-indigo-50 text-slate-400 hover:text-indigo-500'}`}
                                >
                                    <Mic className={`w-5 h-5 ${isListening ? 'animate-pulse' : ''}`} />
                                    {isListening && (
                                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                        </span>
                                    )}
                                </Button>
                                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 rounded-full w-10 h-10">
                                    <PenTool className="w-5 h-5" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto items-center justify-center">
                <Button
                    onClick={handleSpeak}
                    disabled={loading || !input.trim()}
                    className="w-full sm:w-auto px-8 py-6 rounded-full text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-indigo-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                    <Send className="w-5 h-5 mr-2" />
                    Analyze Voice
                </Button>

                {feedback && (
                    <Button
                        onClick={handleShare}
                        className="w-full sm:w-auto px-8 py-6 rounded-full text-lg font-semibold bg-white text-indigo-600 border-2 border-indigo-100 hover:border-indigo-200 hover:bg-indigo-50 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                    >
                        <Globe className="w-5 h-5 mr-2" />
                        Share to Echo
                    </Button>
                )}
            </div>

            <AiMirror feedback={feedback} loading={loading} />
        </div>
    );
}
