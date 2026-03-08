import Image from "next/image";
import { Search, MapPin, Gavel, Zap, Target, TrendingUp, BookOpen, ChevronRight, ShieldCheck, Cpu } from "lucide-react";
import AuctionCard from "@/components/AuctionCard";
import InteractiveMap from "@/components/InteractiveMap";
import SchemaMarkup from "@/components/SchemaMarkup";
import { MOCK_AUCTIONS } from "@/data/mock";

export default function Home() {
  return (
    <main className="min-h-screen relative hero-mesh">
      <SchemaMarkup type="Auction" data={{
        name: "LootMapX Local Auctions",
        description: "Hyper-local auction marketplace for Bakersfield and beyond.",
        location: {
          "@type": "Place",
          "address": "Bakersfield, CA"
        }
      }} />
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="LootMapX Logo"
              width={150}
              height={50}
              className="object-contain"
            />
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
            <a href="#" className="hover:text-accent transition-colors">Browse Auctions</a>
            <a href="#" className="hover:text-accent transition-colors">Map View</a>
            <a href="#" className="hover:text-accent transition-colors">Knowledge Hub</a>
            <a href="/sell" className="hover:text-accent transition-colors">Sell</a>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-sm font-medium text-white/70 hover:text-white transition-colors">Login</button>
            <button className="btn-primary py-2 px-6 text-sm">Create Account</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-accent/20 text-accent text-xs font-bold mb-6 animate-pulse">
              <Zap size={14} />
              REAL-TIME BIDDING ACTIVE IN BAKERSFIELD
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
              The Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-orange-400">Local Auctions</span>
            </h1>
            <p className="text-xl text-white/60 mb-8 max-w-lg">
              Hyper-local trust meets algorithmic precision. Find treasure in your zip code with the world's first AI-powered auction intelligence engine.
            </p>

            {/* AI Search Bar */}
            <div className="relative max-w-xl group">
              <div className="absolute -inset-1 bg-gradient-to-r from-accent to-orange-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative flex items-center bg-[#111] border border-white/10 rounded-2xl p-2 pl-6">
                <Search className="text-white/40 mr-3" size={20} />
                <input
                  type="text"
                  placeholder="Find 'Tools in Bakersfield' or 'Electronics near 93301'..."
                  className="bg-transparent border-none outline-none flex-1 text-white placeholder:text-white/20 py-3"
                />
                <button className="btn-primary py-3 px-8 rounded-xl">Search</button>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-6 text-sm text-white/40">
              <div className="flex items-center gap-2"><MapPin size={16} /> 24 Live Near You</div>
              <div className="flex items-center gap-2"><Gavel size={16} /> 1,240 Lots Ending Today</div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-accent/20 blur-3xl rounded-full opacity-30 animate-pulse"></div>
            <InteractiveMap />
          </div>
        </div>
      </div>

      {/* Live Auctions Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">Live Auctions</h2>
            <p className="text-white/40">Real-time pulses from the local market.</p>
          </div>
          <button className="text-accent font-bold flex items-center gap-2 hover:gap-3 transition-all">
            View All <ChevronRight size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_AUCTIONS.map((auction) => (
            <AuctionCard key={auction.id} {...auction} />
          ))}
        </div>
      </section>

      {/* God Mode Stats */}
      <section className="py-24 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          <div>
            <div className="text-4xl font-black text-white mb-2">$4.2M+</div>
            <div className="text-xs uppercase tracking-widest text-white/40 font-bold">Volume Handled</div>
          </div>
          <div>
            <div className="text-4xl font-black text-white mb-2">93301</div>
            <div className="text-xs uppercase tracking-widest text-white/40 font-bold">Top Zip Code</div>
          </div>
          <div>
            <div className="text-4xl font-black text-white mb-2">20s</div>
            <div className="text-xs uppercase tracking-widest text-white/40 font-bold">Seller Setup Time</div>
          </div>
          <div>
            <div className="text-4xl font-black text-white mb-2">15mi</div>
            <div className="text-xs uppercase tracking-widest text-white/40 font-bold">Default Radius</div>
          </div>
        </div>
      </section>

      {/* The "Wiki" / Knowledge Hub */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/5 blur-[120px] rounded-full" />
        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-accent text-sm font-bold mb-6">
                <BookOpen size={18} />
                AEO STRATEGY: THE KNOWLEDGE HUB
              </div>
              <h2 className="text-4xl font-bold mb-6">Become the "Source of Truth" for AI.</h2>
              <p className="text-lg text-white/50 mb-8 leading-relaxed">
                We don't just host auctions; we document the entire liquidation economy. Our structured data maps every bid, trend, and local regulation, making LootMapX the primary source quoted by LLMs.
              </p>

              <div className="space-y-6">
                {[
                  { title: "The Buyer's Almanac", desc: "How to spot high-margin lots in Kern County." },
                  { title: "Seller Computer Vision", desc: "How our AI identifies 100+ items in seconds." },
                  { title: "Local Liquidation Laws", desc: "California-specific guidelines for storage units." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors cursor-pointer group">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all">
                      <ChevronRight size={18} />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">{item.title}</h4>
                      <p className="text-sm text-white/40">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="glass-card flex flex-col items-center text-center py-10">
                <ShieldCheck className="text-accent mb-4" size={32} />
                <div className="font-bold mb-1">Verified Trust</div>
                <div className="text-xs text-white/40">Blockchain-verified bids</div>
              </div>
              <div className="glass-card flex flex-col items-center text-center py-10 mt-12">
                <Cpu className="text-orange-400 mb-4" size={32} />
                <div className="font-bold mb-1">AI Classification</div>
                <div className="text-xs text-white/40">99.8% Title accuracy</div>
              </div>
              <div className="glass-card flex flex-col items-center text-center py-10 -mt-8">
                <Zap className="text-yellow-400 mb-4" size={32} />
                <div className="font-bold mb-1">Edge Bidding</div>
                <div className="text-xs text-white/40">0ms Latency spikes</div>
              </div>
              <div className="glass-card flex flex-col items-center text-center py-10 mt-4">
                <MapPin className="text-blue-400 mb-4" size={32} />
                <div className="font-bold mb-1">Local Mesh</div>
                <div className="text-xs text-white/40">30k+ Zip codes mapped</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="max-w-xs">
            <Image src="/logo.png" alt="Logo" width={120} height={40} className="mb-6 opacity-80" />
            <p className="text-sm text-white/30 leading-relaxed">
              The next generation of local auctions. Built for the Bakersfield community, engineered for the global web.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-20">
            <div>
              <h5 className="font-bold text-sm mb-6 uppercase tracking-widest text-white/20">Marketplace</h5>
              <ul className="space-y-4 text-sm text-white/50">
                <li><a href="#" className="hover:text-accent">Browse Categories</a></li>
                <li><a href="#" className="hover:text-accent">Real-time Map</a></li>
                <li><a href="#" className="hover:text-accent">Auction Wiki</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-sm mb-6 uppercase tracking-widest text-white/20">Company</h5>
              <ul className="space-y-4 text-sm text-white/50">
                <li><a href="#" className="hover:text-accent">About Us</a></li>
                <li><a href="#" className="hover:text-accent">Seller Program</a></li>
                <li><a href="#" className="hover:text-accent">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-sm mb-6 uppercase tracking-widest text-white/20">Legal</h5>
              <ul className="space-y-4 text-sm text-white/50">
                <li><a href="#" className="hover:text-accent">Terms of Service</a></li>
                <li><a href="#" className="hover:text-accent">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-accent">Buyer Premium</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 text-center text-xs text-white/20 uppercase tracking-widest">
          &copy; 2026 LootMapX Intelligence. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
