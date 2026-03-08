"use client";

import { useState } from "react";
import Image from "next/image";
import { Upload, Camera, Zap, Sparkles, CheckCircle2, Loader2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SellerOnboarding() {
    const [step, setStep] = useState(1);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [aiData, setAiData] = useState<any>(null);

    const startAnalysis = async () => {
        setIsAnalyzing(true);
        try {
            const response = await fetch('/api/analyze-items', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ images: ['mock_image_url'] }),
            });
            const data = await response.json();
            setAiData(data);
            setStep(2);
        } catch (err) {
            alert("AI analysis failed! Please check your network.");
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <main className="min-h-screen hero-mesh pt-32 px-6">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-accent/20 text-accent text-xs font-bold mb-4">
                        <Sparkles size={14} />
                        AI SELLER AUTOMATION
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black mb-6">List Your Inventory in <span className="text-accent underline decoration-accent/30 underline-offset-8">20 Seconds</span></h1>
                    <p className="text-white/40 text-lg">Stop wasting hours on data entry. Our AI handles the titles, descriptions, and pricing.</p>
                </div>

                <div className="glass-card p-1 pb-1 relative overflow-hidden">
                    {/* Progress Bar */}
                    <div className="h-1.5 w-full bg-white/5 flex">
                        <div className={cn("h-full bg-accent transition-all duration-700", step === 1 ? "w-1/2" : "w-full")} />
                    </div>

                    <div className="p-12">
                        {step === 1 ? (
                            <div className="text-center">
                                <div className="mb-12 relative inline-block">
                                    <div className="absolute -inset-4 bg-accent/20 blur-2xl rounded-full opacity-50 animate-pulse" />
                                    <div className="w-32 h-32 rounded-[2.5rem] glass border-2 border-dashed border-accent/20 flex flex-col items-center justify-center text-accent/50 group hover:border-accent hover:text-accent transition-all cursor-pointer bg-white/[0.02]">
                                        <Upload size={32} className="mb-2" />
                                        <span className="text-[10px] font-black uppercase">Upload Photos</span>
                                    </div>
                                </div>

                                <div className="max-w-md mx-auto space-y-4">
                                    <div className="p-4 rounded-2xl glass bg-white/5 border-white/10 flex items-center justify-between group cursor-pointer hover:bg-accent/5 hover:border-accent/40 transition-all" onClick={startAnalysis}>
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-accent overflow-hidden relative">
                                                <Image src="https://images.unsplash.com/photo-1579412690850-bd41cd0af397?w=100" fill alt="prev" className="object-cover opacity-80" />
                                            </div>
                                            <div className="text-left">
                                                <div className="text-sm font-bold">pallet_batch_01.jpg</div>
                                                <div className="text-[10px] text-white/30 uppercase font-bold">14.2 MB • Ready for AI Parse</div>
                                            </div>
                                        </div>
                                        <ArrowRight size={18} className="text-white/20 group-hover:text-accent transition-colors" />
                                    </div>
                                </div>

                                <button
                                    onClick={startAnalysis}
                                    disabled={isAnalyzing}
                                    className="btn-primary mt-12 w-full py-5 rounded-2xl text-lg flex items-center justify-center gap-3"
                                >
                                    {isAnalyzing ? (
                                        <>
                                            <Loader2 className="animate-spin" />
                                            Vision AI Analyzing Items...
                                        </>
                                    ) : (
                                        <>
                                            <Zap size={20} />
                                            Generate Listing with AI
                                        </>
                                    )}
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                                <div className="flex items-center gap-4 p-4 rounded-2xl bg-accent/10 border border-accent/20 text-accent font-bold">
                                    <CheckCircle2 size={24} />
                                    AI Result: {aiData?.category}
                                </div>

                                <div className="grid gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase font-black text-white/30 tracking-widest pl-2">Generated Title</label>
                                        <input
                                            defaultValue={aiData?.title}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold outline-none focus:border-accent/50 transition-colors"
                                        />
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase font-black text-white/30 tracking-widest pl-2">Suggested Starting Bid</label>
                                            <input
                                                defaultValue={`$${aiData?.suggested_bid}`}
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-accent font-bold outline-none focus:border-accent/50 transition-colors"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase font-black text-white/30 tracking-widest pl-2">Condition Grading</label>
                                            <div className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold border-green-500/30 text-green-400">
                                                {aiData?.condition}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase font-black text-white/30 tracking-widest pl-2">AI-Generated Description</label>
                                        <textarea
                                            rows={4}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white/70 text-sm leading-relaxed outline-none focus:border-accent/50 transition-colors"
                                            defaultValue={aiData?.description}
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <button className="flex-1 py-4 rounded-2xl glass border-white/10 font-bold hover:bg-white/5 transition-all" onClick={() => setStep(1)}>
                                        Scan New Item
                                    </button>
                                    <button className="flex-[2] btn-primary py-4 rounded-2xl">
                                        Confirm & Push to Marketplace
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
