"use client";

import { Brain, TrendingUp, Info, Zap, Sparkles, Target } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function BidIntelligence() {
    const [pulse, setPulse] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            if (Math.random() > 0.9) {
                setPulse(true);
                setTimeout(() => setPulse(false), 1000);
            }
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="glass border-white/10 rounded-[2rem] overflow-hidden shadow-2xl relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent pointer-events-none" />

            <div className="px-8 py-6 flex items-center justify-between border-b border-white/5 relative z-10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-accent/20 flex items-center justify-center border border-accent/20">
                        <Brain size={20} className="text-accent" />
                    </div>
                    <div>
                        <span className="block text-sm font-black text-white uppercase tracking-widest">Bid Intelligence</span>
                        <span className="block text-[10px] text-accent font-black uppercase tracking-[0.2em] animate-pulse">Live Market Scan</span>
                    </div>
                </div>
                <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black text-white/40">
                    BETA v2.4
                </div>
            </div>

            <div className="p-8 space-y-8 relative z-10">
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-5 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-accent/20 transition-all">
                        <div className="text-[10px] text-white/30 font-black uppercase mb-1 flex items-center gap-1.5">
                            <Target size={12} className="text-accent" /> Market Target
                        </div>
                        <div className={cn("text-2xl font-black text-white transition-all duration-300", pulse ? "text-accent scale-105" : "")}>
                            $680.00
                        </div>
                    </div>
                    <div className="p-5 rounded-3xl bg-white/[0.02] border border-white/5">
                        <div className="text-[10px] text-white/30 font-black uppercase mb-1">Resale Potential</div>
                        <div className="text-2xl font-black text-green-400">+114%</div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-xl bg-orange-400/10 flex items-center justify-center shrink-0 border border-orange-400/10">
                            <TrendingUp size={16} className="text-orange-400" />
                        </div>
                        <div>
                            <div className="text-xs font-bold text-white/40 uppercase mb-1">Resale Probability</div>
                            <p className="text-sm text-white/70 leading-relaxed font-medium">
                                High demand in <span className="text-white">Kern County</span>. Similar items moved in <span className="text-accent">4 days</span> on average last month.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-xl bg-blue-400/10 flex items-center justify-center shrink-0 border border-blue-400/10">
                            <Sparkles size={16} className="text-blue-400" />
                        </div>
                        <div>
                            <div className="text-xs font-bold text-white/40 uppercase mb-1">AI Batch Identification</div>
                            <p className="text-sm text-white/70 leading-relaxed font-medium">
                                Detected minor cosmetic wear on base. Mechanical integrity appears 100% based on high-res photo 4.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
                        <span className="text-[10px] text-white/20 uppercase font-black tracking-widest leading-none">Powered by LootMapX Vision</span>
                    </div>
                    <button className="text-[10px] text-accent font-black uppercase tracking-widest hover:underline flex items-center gap-1">
                        Full Report <Zap size={10} />
                    </button>
                </div>
            </div>
        </div>
    );
}
