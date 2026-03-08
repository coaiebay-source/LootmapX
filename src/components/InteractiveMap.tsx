"use client";

import { useEffect, useRef } from "react";
import { Search, MapPin, Target, Zap } from "lucide-react";

export default function InteractiveMap() {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div className="relative w-full h-[600px] rounded-[2rem] overflow-hidden glass border border-white/10 group bg-[#080808] shadow-2xl">
            {/* Search Overlay */}
            <div className="absolute top-6 left-6 z-20 flex gap-2">
                <div className="glass bg-black/60 backdrop-blur-xl border-white/10 rounded-xl p-1.5 flex items-center gap-2 pr-4 shadow-xl">
                    <div className="bg-accent rounded-lg p-2 text-white">
                        <Search size={16} />
                    </div>
                    <input
                        type="text"
                        placeholder="Search Zip Code..."
                        className="bg-transparent border-none outline-none text-xs font-bold text-white placeholder:text-white/30 w-32"
                    />
                </div>
                <div className="glass bg-black/60 backdrop-blur-xl border-white/10 rounded-xl px-4 py-2 flex items-center gap-2 text-xs font-bold text-white/50 shadow-xl">
                    <MapPin size={14} className="text-accent" />
                    Bakersfield, CA
                </div>
            </div>

            {/* Map Content Simulation (SVG + Tailwind) */}
            <div className="absolute inset-0 opacity-40 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v11/static/-119.0187,35.3733,11,0/1200x600?access_token=none')] bg-cover" />

            {/* Custom Grid / Scanlines */}
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff10_1px,transparent_1px)] [background-size:40px_40px] opacity-20" />

            {/* Live Pins */}
            <div className="absolute inset-0 z-10 p-20">
                {/* Bakersfield Core Cluster */}
                <div className="absolute top-[45%] left-[48%] group/pin cursor-pointer">
                    <div className="w-4 h-4 bg-accent rounded-full animate-ping opacity-75" />
                    <div className="w-3 h-3 bg-accent rounded-full border-2 border-white absolute top-0.5 left-0.5" />
                    <div className="absolute top-0 left-8 whitespace-nowrap opacity-0 group-hover/pin:opacity-100 transition-all scale-95 group-hover/pin:scale-100 bg-black/80 backdrop-blur-md border border-white/10 p-3 rounded-xl shadow-2xl pointer-events-none">
                        <div className="text-[10px] uppercase font-black text-accent mb-1">Ending in 4h</div>
                        <div className="text-xs font-bold text-white">Heavy Equipment Mega-Lot</div>
                        <div className="text-[10px] text-white/40 mt-1">2115 E California Ave</div>
                    </div>
                </div>

                <div className="absolute top-[35%] left-[42%]">
                    <div className="w-4 h-4 bg-accent rounded-full animate-ping opacity-50" style={{ animationDelay: '1s' }} />
                    <div className="w-3 h-3 bg-accent rounded-full border-2 border-white absolute top-0.5 left-0.5 opacity-50" />
                </div>

                <div className="absolute top-[55%] left-[55%]">
                    <div className="w-4 h-4 bg-accent rounded-full animate-ping opacity-50" style={{ animationDelay: '2s' }} />
                    <div className="w-3 h-3 bg-accent rounded-full border-2 border-white absolute top-0.5 left-0.5 opacity-50" />
                </div>
            </div>

            {/* Legend / Stats */}
            <div className="absolute bottom-6 left-6 z-20 flex flex-col gap-3">
                <div className="glass bg-accent/10 border-accent/20 rounded-2xl px-5 py-3 shadow-xl">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black text-accent uppercase tracking-[0.2em]">Map Pulse Active</span>
                            <span className="text-lg font-black text-white">42 Active Near You</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scanning Reveal Effect */}
            <div className="absolute inset-x-0 h-40 bg-gradient-to-b from-transparent via-accent/5 to-transparent top-0 animate-[scan_8s_linear_infinite]" />

            <style jsx>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(600px); }
        }
      `}</style>
        </div>
    );
}
