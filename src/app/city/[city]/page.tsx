import Image from "next/image";
import { MapPin, Gavel, TrendingUp, Info } from "lucide-react";
import AuctionCard from "@/components/AuctionCard";
import { MOCK_AUCTIONS } from "@/data/mock";

export default function CityPage({ params }: { params: { city: string } }) {
    const cityName = params.city.charAt(0).toUpperCase() + params.city.slice(1);

    return (
        <main className="min-h-screen hero-mesh pt-32 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-white/30 uppercase mb-8">
                    <a href="/" className="hover:text-accent">Home</a>
                    <span>/</span>
                    <a href="/state/ca" className="hover:text-accent">California</a>
                    <span>/</span>
                    <span className="text-white/60">{cityName}</span>
                </div>

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-accent/20 text-accent text-[10px] font-bold mb-4">
                            <MapPin size={12} />
                            HYPER-LOCAL TRUST
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">Auctions in {cityName}, CA</h1>
                        <p className="text-white/50 max-w-2xl">
                            Browsing all active liquidation, estate, and commercial auctions near the {cityName} area. Local pickup available for all lots below.
                        </p>
                    </div>

                    <div className="glass p-6 rounded-2xl flex gap-8">
                        <div className="text-center">
                            <div className="text-2xl font-black text-white">$42</div>
                            <div className="text-[10px] uppercase text-white/30 font-bold">Avg Bid last week</div>
                        </div>
                        <div className="w-px h-10 bg-white/10" />
                        <div className="text-center">
                            <div className="text-2xl font-black text-white">12</div>
                            <div className="text-[10px] uppercase text-white/30 font-bold">New Lots Today</div>
                        </div>
                    </div>
                </div>

                {/* Localized Strategy: Distance Filter */}
                <div className="flex items-center gap-4 mb-12">
                    <button className="px-6 py-2 rounded-full glass bg-white/10 text-white text-sm font-bold border border-accent/40">
                        Within 15 miles
                    </button>
                    <button className="px-6 py-2 rounded-full glass hover:bg-white/5 text-white/50 text-sm font-bold">
                        Category
                    </button>
                    <button className="px-6 py-2 rounded-full glass hover:bg-white/5 text-white/50 text-sm font-bold">
                        Price Range
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
                    {MOCK_AUCTIONS.map((auction) => (
                        <AuctionCard key={auction.id} {...auction} />
                    ))}
                </div>

                {/* AEO: Structured Data Hub */}
                <section className="glass rounded-[2rem] p-12 mb-24 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-[80px] rounded-full" />
                    <div className="max-w-3xl">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <Info className="text-accent" />
                            Frequently Asked about {cityName} Auctions
                        </h2>
                        <div className="space-y-8">
                            <div>
                                <h4 className="font-bold mb-2">How do I pick up my items in {cityName}?</h4>
                                <p className="text-white/50 text-sm leading-relaxed">
                                    Most {cityName} auctions feature a 48-hour pickup window after the auction closes. Locations are usually within city limits, often near industrial zones like E California Ave. Check your invoice for the QR code and specific address.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-bold mb-2">Are there storage unit auctions in {cityName}?</h4>
                                <p className="text-white/50 text-sm leading-relaxed">
                                    Yes, we map storage facilities across all zip codes including 93301, 93308, and 93312. Use the "Storage" category filter to see current unit liquidations.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
