"use client";

import Image from "next/image";
import { ChevronLeft, Share2, Heart, Gavel, Clock, MapPin, ShieldCheck, Zap, Loader2 } from "lucide-react";
import BidIntelligence from "@/components/BidIntelligence";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";

export default function LotPage({ params }: { params: { id: string } }) {
    const [currentBid, setCurrentBid] = useState(432);
    const [bidAmount, setBidAmount] = useState<number>(437);
    const [isBidding, setIsBidding] = useState(false);
    const [pulse, setPulse] = useState(false);
    const supabase = createClient();

    useEffect(() => {
        // Listen for bid updates on this lot
        const channel = supabase
            .channel(`bid-stream-${params.id}`)
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'bids', filter: `lot_id=eq.${params.id}` },
                (payload) => {
                    setCurrentBid(payload.new.amount);
                    setBidAmount(payload.new.amount + 5);
                    setPulse(true);
                    setTimeout(() => setPulse(false), 1000);
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [params.id, supabase]);

    const handlePlaceBid = async () => {
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
            // Demo mode
            setIsBidding(true);
            setTimeout(() => {
                setCurrentBid(bidAmount);
                setBidAmount(bidAmount + 5);
                setPulse(true);
                setIsBidding(false);
                setTimeout(() => setPulse(false), 1000);
            }, 1000);
            return;
        }

        setIsBidding(true);
        const { error } = await supabase
            .from('bids')
            .insert({
                lot_id: params.id,
                amount: bidAmount,
            });

        if (error) {
            alert(error.message);
        }
        setIsBidding(false);
    };
    return (
        <main className="min-h-screen hero-mesh pb-20">
            {/* Detail Nav */}
            <nav className="fixed top-0 w-full z-50 glass border-b border-white/5 px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <a href="/" className="flex items-center gap-2 text-sm font-bold text-white/50 hover:text-white transition-colors">
                        <ChevronLeft size={16} /> Back to Auction
                    </a>
                    <div className="flex items-center gap-4">
                        <button className="p-2 rounded-xl glass hover:bg-white/10 text-white/50">
                            <Share2 size={18} />
                        </button>
                        <button className="p-2 rounded-xl glass hover:bg-white/10 text-white/50">
                            <Heart size={18} />
                        </button>
                    </div>
                </div>
            </nav>

            <div className="pt-24 px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
                {/* Left: Photos */}
                <div className="space-y-4">
                    <div className="relative aspect-square rounded-3xl overflow-hidden glass border border-white/10">
                        <Image
                            src="https://images.unsplash.com/photo-1579412690850-bd41cd0af397?auto=format&fit=crop&q=80&w=1200"
                            alt="Milwaukee Tool Set"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute bottom-6 left-6 px-4 py-2 rounded-xl glass bg-black/50 border-accent/20 text-accent text-xs font-black flex items-center gap-2">
                            <ShieldCheck size={16} /> AI VERIFIED CONDITION
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="aspect-square rounded-xl overflow-hidden glass border border-white/5 hover:border-accent/50 cursor-pointer transition-colors relative">
                                <Image src="https://images.unsplash.com/photo-1579412690850-bd41cd0af397?auto=format&fit=crop&q=80&w=300" alt="thumb" fill className="object-cover opacity-60 hover:opacity-100" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Bidding & Intelligence */}
                <div className="space-y-6">
                    <div>
                        <div className="text-xs font-black text-accent uppercase tracking-[0.2em] mb-2">Lot #142 • Heavy Equipment</div>
                        <h1 className="text-4xl font-black mb-4 leading-tight">Milwaukee M18 Fuel Combo Kit (16-Piece)</h1>
                        <div className="flex items-center gap-4 text-sm text-white/40">
                            <span className="flex items-center gap-1.5"><MapPin size={14} /> Bakersfield, CA</span>
                            <span className="flex items-center gap-1.5"><Gavel size={14} /> 24 Bids</span>
                        </div>
                    </div>

                    <div className="glass p-8 rounded-[2rem] border-white/10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4">
                            <div className="flex items-center gap-1.5 text-xs text-accent font-bold animate-pulse">
                                <div className="w-2 h-2 rounded-full bg-accent" />
                                LIVE
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-8 mb-8">
                            <div>
                                <div className="text-[10px] uppercase font-black text-white/30 tracking-widest mb-2">Current Bid</div>
                                <div className={cn(
                                    "text-5xl font-black text-white transition-all duration-300",
                                    pulse ? "text-accent scale-110" : ""
                                )}>
                                    ${currentBid.toLocaleString()}
                                </div>
                            </div>
                            <div>
                                <div className="text-[10px] uppercase font-black text-white/30 tracking-widest mb-2">Time Remaining</div>
                                <div className="text-3xl font-black text-accent">04:12:15</div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <input
                                    type="number"
                                    value={bidAmount}
                                    onChange={(e) => setBidAmount(Number(e.target.value))}
                                    className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold outline-none focus:border-accent/50 transition-colors"
                                />
                                <button
                                    onClick={handlePlaceBid}
                                    disabled={isBidding}
                                    className="btn-primary py-4 px-10 rounded-2xl flex items-center gap-2"
                                >
                                    {isBidding ? <Loader2 className="animate-spin" /> : <>Place Bid <Zap size={18} /></>}
                                </button>
                            </div>
                            <div className="text-center text-[10px] text-white/20 font-bold uppercase tracking-wider">
                                Next Minimum Bid: ${currentBid + 5} • 12% Buyer's Premium Applies
                            </div>
                        </div>
                    </div>

                    <BidIntelligence />

                    <div className="glass-card bg-transparent border-white/5">
                        <h4 className="font-bold mb-4">Description</h4>
                        <p className="text-sm text-white/50 leading-relaxed">
                            Professionally maintained Milwaukee M18 Fuel series kit. Includes 2x 5.0Ah batteries, rapid charger, and original hard case. AI Vision scan confirms zero structural damage. Recommended for general contractors or high-intensity DIY use.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
