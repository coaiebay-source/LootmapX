"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Gavel, Clock, MapPin, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase";

interface AuctionCardProps {
    id: string;
    title: string;
    image: string;
    currentBid: number;
    endTime: string;
    location: string;
    lotCount: number;
}

export default function AuctionCard({ id, title, image, currentBid: initialBid, endTime, location, lotCount }: AuctionCardProps) {
    const [currentBid, setCurrentBid] = useState(initialBid);
    const [pulse, setPulse] = useState(false);
    const supabase = createClient();

    useEffect(() => {
        if (!supabase) return;

        // 1. Listen for REAL-TIME updates on this specific lot
        const channel = supabase
            .channel(`lot-${id}`)
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'lots',
                    filter: `id=eq.${id}`,
                },
                (payload: any) => {
                    setCurrentBid(payload.new.current_bid);
                    setPulse(true);
                    setTimeout(() => setPulse(false), 1000);
                }
            )
            .subscribe();

        // 2. Simulation for demo if no Supabase keys are active
        const simInterval = setInterval(() => {
            if (process.env.NODE_ENV === 'development' && Math.random() > 0.8) {
                setCurrentBid(prev => prev + Math.floor(Math.random() * 50) + 10);
                setPulse(true);
                setTimeout(() => setPulse(false), 1000);
            }
        }, 8000);

        return () => {
            supabase.removeChannel(channel);
            clearInterval(simInterval);
        };
    }, [id, supabase]);

    return (
        <div className="glass-card group p-0 overflow-hidden flex flex-col h-full bg-white/[0.03] hover:bg-white/[0.08]">
            <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                <div className="absolute top-4 left-4 flex gap-2">
                    <div className="px-3 py-1 rounded-full glass bg-black/50 border-white/10 text-[10px] font-bold flex items-center gap-1.5 backdrop-blur-md">
                        <Clock size={12} className="text-accent" />
                        LIVE
                    </div>
                    <div className="px-3 py-1 rounded-full glass bg-black/50 border-white/10 text-[10px] font-bold flex items-center gap-1.5 backdrop-blur-md">
                        <Gavel size={12} className="text-accent" />
                        {lotCount} LOTS
                    </div>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                    <div>
                        <div className="text-[10px] text-white/50 uppercase font-bold tracking-wider mb-1">Current Bid</div>
                        <div className={cn(
                            "text-2xl font-black text-white transition-all duration-300",
                            pulse ? "text-accent scale-110" : ""
                        )}>
                            ${currentBid.toLocaleString()}
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-[10px] text-white/50 uppercase font-bold tracking-wider mb-1">Ends In</div>
                        <div className="text-sm font-bold text-accent">04:12:55</div>
                    </div>
                </div>
            </div>

            <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-lg font-bold mb-2 group-hover:text-accent transition-colors line-clamp-1">{title}</h3>
                <div className="flex items-center gap-1.5 text-xs text-white/40 mb-6">
                    <MapPin size={14} />
                    {location}
                </div>

                <button className="mt-auto w-full py-3 rounded-xl bg-white/5 border border-white/10 font-bold text-sm transition-all duration-300 hover:bg-accent hover:border-accent group-hover:shadow-[0_0_20px_rgba(255,61,0,0.2)] flex items-center justify-center gap-2">
                    View Auction
                    <Zap size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
            </div>
        </div>
    );
}
