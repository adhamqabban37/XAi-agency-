import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import { RetellWebClient } from "retell-client-js-sdk";
import "../src/index.css";

const AGENT_ID = "agent_43634ab95cd280debc97ed2f6d";

type CallState = "idle" | "connecting" | "live" | "ended" | "error";

const menuItems = [
  {
    name: "Brisket Platter",
    price: "$18.99",
    description: "12-hour smoked Texas-style brisket with two sides",
    emoji: "🥩",
    popular: true,
    details: "Post oak smoked • Served with pickles & onions",
  },
  {
    name: "Pulled Pork Sandwich",
    price: "$12.99",
    description: "Hand-pulled pork with house slaw on brioche",
    emoji: "🥪",
    popular: false,
    details: "Carolina-style • House-made BBQ sauce",
  },
  {
    name: "Baby Back Ribs",
    price: "$24.99",
    description: "Fall-off-the-bone ribs with signature dry rub",
    emoji: "🍖",
    popular: true,
    details: "Full rack • Memphis dry rub or wet",
  },
  {
    name: "Smoked Wings",
    price: "$14.99",
    description: "Jumbo wings with choice of sauce",
    emoji: "🍗",
    popular: false,
    details: "8 pieces • Ranch or blue cheese included",
  },
  {
    name: "BBQ Sampler",
    price: "$32.99",
    description: "Brisket, ribs, pulled pork, sausage & three sides",
    emoji: "🔥",
    popular: true,
    details: "Feeds 2-3 • Best seller",
  },
  {
    name: "Smoked Sausage",
    price: "$10.99",
    description: "House-made beef & pork sausage links",
    emoji: "🌭",
    popular: false,
    details: "Two links • Jalapeño cheddar available",
  },
];

const sides = [
  { name: "Mac & Cheese", price: "$4.99", emoji: "🧀" },
  { name: "Coleslaw", price: "$3.49", emoji: "🥗" },
  { name: "Baked Beans", price: "$3.99", emoji: "🫘" },
  { name: "Cornbread", price: "$2.99", emoji: "🍞" },
  { name: "Potato Salad", price: "$3.99", emoji: "🥔" },
  { name: "Collard Greens", price: "$4.49", emoji: "🥬" },
];

const reviews = [
  {
    name: "Mike T.",
    rating: 5,
    text: "Best brisket in Texas! The smoke ring is perfect.",
    avatar: "🤠",
  },
  {
    name: "Sarah L.",
    rating: 5,
    text: "Joe the AI helped me order the perfect sampler for our party!",
    avatar: "👩",
  },
  {
    name: "Carlos R.",
    rating: 5,
    text: "Fall-off-the-bone ribs. Worth the drive from Houston.",
    avatar: "👨",
  },
];

const hours = [
  { day: "Monday - Thursday", time: "11 AM - 9 PM" },
  { day: "Friday - Saturday", time: "11 AM - 10 PM" },
  { day: "Sunday", time: "12 PM - 8 PM" },
];

const BBQDemo: React.FC = () => {
  const [callState, setCallState] = useState<CallState>("idle");
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const retellClientRef = useRef<RetellWebClient | null>(null);

  useEffect(() => {
    // Initialize Retell client
    const client = new RetellWebClient();
    retellClientRef.current = client;

    client.on("call_started", () => {
      console.log("Retell call started");
      setCallState("live");
    });

    client.on("call_ended", () => {
      console.log("Retell call ended");
      setCallState("ended");
      setTimeout(() => setCallState("idle"), 2000);
    });

    client.on("error", (err) => {
      console.error("Retell error:", err);
      setCallState("error");
      setError(err.message || "Voice call error occurred");
    });

    return () => {
      client.stopCall();
    };
  }, []);

  const startCall = useCallback(async () => {
    if (!retellClientRef.current) return;

    try {
      setError(null);
      setCallState("connecting");

      // Call our backend to register the call and get access token
      const response = await fetch("/.netlify/functions/retell-create-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agentId: AGENT_ID }),
      });

      if (!response.ok) {
        throw new Error("Failed to register call with Retell");
      }

      const { access_token } = await response.json();

      await retellClientRef.current.startCall({
        accessToken: access_token,
        sampleRate: 24000,
        captureDeviceId: "default",
      });
    } catch (err) {
      console.error("Retell start error:", err);
      setCallState("error");
      setError(
        err instanceof Error
          ? err.message
          : "Failed to connect to voice agent.",
      );
    }
  }, []);

  const endCall = useCallback(() => {
    try {
      retellClientRef.current?.stopCall();
    } catch (err) {
      console.error("Retell stop error:", err);
    }
  }, []);

  const statusLabel: Record<CallState, string> = {
    idle: "Ready to help",
    connecting: "Connecting...",
    live: "Speaking with Joe",
    ended: "Call ended",
    error: "Connection issue",
  };

  const statusColor: Record<CallState, string> = {
    idle: "bg-amber-500",
    connecting: "bg-yellow-400 animate-pulse",
    live: "bg-green-500 animate-pulse",
    ended: "bg-stone-500",
    error: "bg-red-500",
  };

  return (
    <div className="min-h-screen bg-[#0f0a06] text-stone-100 font-sans">
      {/* Floating Call Button - Always visible */}
      <button
        onClick={() => setIsWidgetOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-full text-lg font-bold shadow-2xl shadow-orange-500/40 hover:scale-110 transition-all group"
      >
        <span className="text-2xl animate-bounce">🔥</span>
        <span className="hidden sm:inline">Talk to Joe</span>
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-ping" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full" />
      </button>

      {/* Hero */}
      <header className="relative overflow-hidden min-h-[90vh] flex flex-col">
        {/* Background layers */}
        <div className="absolute inset-0 bg-gradient-to-b from-orange-950/80 via-[#0f0a06]/95 to-[#0f0a06]" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=1920&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay" />

        {/* Smoke effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0a06] via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0f0a06] to-transparent" />

        {/* Fire embers decoration */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-orange-400 rounded-full animate-pulse opacity-60" />
        <div className="absolute top-40 right-20 w-3 h-3 bg-orange-500 rounded-full animate-pulse opacity-40 animation-delay-200" />
        <div className="absolute top-60 left-1/4 w-2 h-2 bg-red-400 rounded-full animate-pulse opacity-50 animation-delay-500" />

        <nav className="relative z-10 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-4">
            <span className="text-5xl filter drop-shadow-lg">🔥</span>
            <div>
              <span className="text-3xl font-extrabold tracking-tight text-orange-400 drop-shadow-lg">
                Smoky Joe's BBQ
              </span>
              <p className="text-xs uppercase tracking-[0.3em] text-orange-200/70 font-semibold">
                Est. 1974 • Austin, TX
              </p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-10">
            <a
              href="#menu"
              className="text-sm uppercase tracking-widest text-[#e8dbce] hover:text-orange-400 transition font-bold"
            >
              Menu
            </a>
            <a
              href="#sides"
              className="text-sm uppercase tracking-widest text-[#e8dbce] hover:text-orange-400 transition font-bold"
            >
              Sides
            </a>
            <a
              href="#reviews"
              className="text-sm uppercase tracking-widest text-[#e8dbce] hover:text-orange-400 transition font-bold"
            >
              Reviews
            </a>
            <a
              href="#hours"
              className="text-sm uppercase tracking-widest text-[#e8dbce] hover:text-orange-400 transition font-bold"
            >
              Hours
            </a>
            <button
              onClick={() => setIsWidgetOpen(true)}
              className="px-6 py-2.5 bg-orange-600 hover:bg-orange-500 rounded-full text-sm font-bold uppercase tracking-wider text-white transition shadow-lg shadow-orange-600/20"
            >
              Order Now
            </button>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 py-16">
          <div className="mb-6 flex items-center gap-3 text-orange-200/80 text-sm uppercase tracking-[0.4em] font-bold">
            <span className="w-16 h-px bg-orange-500/50" />
            <span>Since 1974</span>
            <span className="w-16 h-px bg-orange-500/50" />
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-6 leading-none">
            <span className="block text-[#fdf8f4] drop-shadow-2xl">SLOW</span>
            <span className="block bg-gradient-to-r from-orange-400 via-red-500 to-orange-400 bg-clip-text text-transparent drop-shadow-lg">
              SMOKED
            </span>
            <span className="block text-[#fdf8f4] drop-shadow-2xl">
              PERFECTION
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-[#e8dbce] mb-8 max-w-2xl mx-auto leading-relaxed font-medium">
            Authentic Texas-style barbecue crafted with{" "}
            <span className="text-orange-400 font-bold">
              50 years of tradition.
            </span>
            <br />
            Order ahead or talk to Joe, our AI assistant.
          </p>

          {/* Feature badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <span className="px-5 py-2.5 bg-[#1f1610]/90 border border-orange-500/30 rounded-full text-sm text-[#e8dbce] font-bold shadow-lg">
              🪵 Post Oak Smoked
            </span>
            <span className="px-5 py-2.5 bg-[#1f1610]/90 border border-orange-500/30 rounded-full text-sm text-[#e8dbce] font-bold shadow-lg">
              ⏱️ 12-Hour Smoke
            </span>
            <span className="px-5 py-2.5 bg-[#1f1610]/90 border border-orange-500/30 rounded-full text-sm text-[#e8dbce] font-bold shadow-lg">
              🏆 Award Winning
            </span>
          </div>

          <button
            onClick={() => setIsWidgetOpen(true)}
            className="group inline-flex items-center gap-4 px-10 py-5 bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 rounded-full text-xl font-bold text-white shadow-2xl shadow-orange-600/40 hover:scale-105 hover:shadow-orange-500/60 transition-all border border-orange-400/20"
          >
            <span className="text-2xl group-hover:animate-bounce">🎤</span>
            Talk to Joe - Order Now
          </button>

          <p className="mt-8 text-orange-200/60 text-sm font-medium">
            Our AI assistant can take your order, answer questions, and make
            reservations
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-stone-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </header>

      {/* Menu Section */}
      <section id="menu" className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0a06] via-[#140e0a] to-[#0f0a06] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="text-orange-500 text-sm uppercase tracking-[0.4em] font-bold">
              Smoked Daily
            </span>
            <h2 className="text-5xl md:text-6xl font-black mt-3 mb-4">
              <span className="text-[#fdf8f4]">THE</span>{" "}
              <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                MENU
              </span>
            </h2>
            <p className="text-[#e8dbce] max-w-2xl mx-auto text-lg font-medium">
              Every cut is smoked low and slow over post oak wood for that
              authentic Texas flavor you crave.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {menuItems.map((item) => (
              <div
                key={item.name}
                className={`relative group bg-[#160f0a] border rounded-2xl p-8 hover:border-orange-500/60 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-900/20 hover:-translate-y-1 ${
                  item.popular
                    ? "border-orange-500/50 shadow-lg shadow-orange-900/10"
                    : "border-[#2a1d13]"
                }`}
              >
                {item.popular && (
                  <span className="absolute -top-4 left-6 px-4 py-1.5 bg-gradient-to-r from-orange-600 to-red-600 rounded-full text-xs font-bold uppercase tracking-widest text-white shadow-md">
                    🔥 Popular
                  </span>
                )}

                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl filter drop-shadow-lg">
                      {item.emoji}
                    </span>
                    <div>
                      <h3 className="text-2xl font-black text-[#fdf8f4] group-hover:text-orange-400 transition tracking-tight">
                        {item.name}
                      </h3>
                      <p className="text-xs text-[#a89582] mt-1 font-bold uppercase tracking-wider">
                        {item.details}
                      </p>
                    </div>
                  </div>
                  <span className="text-3xl font-black text-orange-500 drop-shadow-sm">
                    {item.price}
                  </span>
                </div>

                <p className="text-[#d4c3b3] text-base leading-relaxed font-medium">
                  {item.description}
                </p>

                <button
                  onClick={() => setIsWidgetOpen(true)}
                  className="mt-6 w-full py-3.5 bg-[#1f1610] hover:bg-orange-600 border border-[#3a281c] hover:border-orange-500 rounded-xl text-sm font-bold text-orange-400 hover:text-white transition-all flex items-center justify-center gap-2 uppercase tracking-wide"
                >
                  <span className="text-lg">🎤</span> Order with Joe
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sides Section */}
      <section
        id="sides"
        className="py-20 px-6 bg-gradient-to-b from-[#0f0a06] to-[#160f0a]"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-orange-500 text-sm uppercase tracking-[0.4em] font-bold">
              Complete Your Meal
            </span>
            <h2 className="text-4xl md:text-5xl font-black mt-3">
              <span className="text-[#fdf8f4]">SIDES &</span>{" "}
              <span className="text-orange-400">EXTRAS</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {sides.map((side) => (
              <div
                key={side.name}
                className="bg-[#1f1610] border border-[#2a1d13] rounded-2xl p-5 text-center hover:border-orange-500/40 transition-all hover:-translate-y-1 shadow-md hover:shadow-orange-900/20"
              >
                <span className="text-4xl block mb-3 drop-shadow-sm">
                  {side.emoji}
                </span>
                <h4 className="font-bold text-[#fdf8f4] mb-1">{side.name}</h4>
                <span className="text-orange-400 font-bold">{side.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-24 px-6 bg-[#160f0a]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-orange-500 text-sm uppercase tracking-[0.4em] font-bold">
              What People Say
            </span>
            <h2 className="text-4xl md:text-5xl font-black mt-3">
              <span className="text-[#fdf8f4]">RAVE</span>{" "}
              <span className="text-orange-400">REVIEWS</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((review, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-[#1f1610] to-[#140e0a] border border-[#2a1d13] rounded-2xl p-8 hover:border-orange-500/30 transition shadow-lg shadow-black/50"
              >
                <div className="flex items-center gap-4 mb-5">
                  <span className="text-4xl">{review.avatar}</span>
                  <div>
                    <h4 className="font-bold text-[#fdf8f4] text-lg">
                      {review.name}
                    </h4>
                    <div className="flex gap-1 text-orange-400">
                      {[...Array(review.rating)].map((_, j) => (
                        <span key={j}>⭐</span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-[#d4c3b3] italic font-medium leading-relaxed">
                  "{review.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hours Section */}
      <section
        id="hours"
        className="py-24 px-6 bg-gradient-to-b from-[#160f0a] to-[#0f0a06]"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-orange-500 text-sm uppercase tracking-[0.4em] font-bold">
              Visit Us
            </span>
            <h2 className="text-4xl md:text-5xl font-black mt-3">
              <span className="text-[#fdf8f4]">HOURS &</span>{" "}
              <span className="text-orange-400">LOCATION</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[#1f1610] border border-[#2a1d13] rounded-3xl p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-8">
                <span className="text-3xl">🕐</span>
                <h3 className="text-2xl font-black text-orange-400">
                  Business Hours
                </h3>
              </div>
              {hours.map((h) => (
                <div
                  key={h.day}
                  className="flex justify-between py-4 border-b border-[#2a1d13] last:border-0"
                >
                  <span className="text-[#d4c3b3] font-bold">{h.day}</span>
                  <span className="text-[#fdf8f4] font-black">{h.time}</span>
                </div>
              ))}
            </div>

            <div className="bg-[#1f1610] border border-[#2a1d13] rounded-3xl p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-8">
                <span className="text-3xl">📍</span>
                <h3 className="text-2xl font-black text-orange-400">
                  Location
                </h3>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-[#fdf8f4] text-xl font-bold">
                    123 Pitmaster Lane
                  </p>
                  <p className="text-[#d4c3b3] font-medium mt-1">
                    Austin, TX 78701
                  </p>
                </div>

                <div className="flex items-center gap-2 text-[#a89582] text-sm font-bold uppercase tracking-wider">
                  <span>🅿️</span>
                  <span>Free parking available in rear lot</span>
                </div>

                <div className="pt-6 space-y-3">
                  <a
                    href="tel:+15551234567"
                    className="flex items-center justify-center gap-3 py-3 rounded-xl bg-[#140e0a] text-orange-400 hover:text-orange-300 border border-[#2a1d13] hover:border-orange-500/50 transition text-lg font-bold"
                  >
                    <span>📞</span> (555) 123-4567
                  </a>
                  <button
                    onClick={() => setIsWidgetOpen(true)}
                    className="w-full py-3.5 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl text-white font-bold hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-lg shadow-orange-600/20"
                  >
                    <span>🎤</span> Talk to Joe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 relative overflow-hidden bg-[#0f0a06]">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-radial from-orange-600/10 via-transparent to-transparent" />

        <div className="relative max-w-4xl mx-auto text-center">
          <span className="text-6xl block mb-6 drop-shadow-2xl">🔥</span>
          <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">
            <span className="text-[#fdf8f4]">READY TO</span>{" "}
            <span className="text-orange-500">ORDER?</span>
          </h2>
          <p className="text-xl text-[#d4c3b3] mb-10 max-w-2xl mx-auto font-medium">
            Talk directly with our AI assistant Joe to place orders, make
            reservations, or ask about our award-winning BBQ.
          </p>
          <button
            onClick={() => setIsWidgetOpen(true)}
            className="group inline-flex items-center gap-4 px-12 py-6 bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 rounded-full text-2xl font-bold shadow-2xl shadow-orange-500/40 hover:scale-105 hover:shadow-orange-500/60 transition-all"
          >
            <span className="text-3xl group-hover:animate-pulse">🎤</span>
            Start Voice Order
          </button>
          <p className="mt-6 text-stone-500">
            Powered by Xenlix AI Voice Agents
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-stone-800 bg-stone-950">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🔥</span>
              <span className="text-xl font-bold text-orange-400">
                Smoky Joe's BBQ
              </span>
            </div>
            <p className="text-stone-500 text-center">
              © 2026 Smoky Joe's BBQ. Demo site powered by{" "}
              <span className="text-orange-400 font-semibold">Xenlix AI</span>{" "}
              voice agents.
            </p>
            <p className="text-xs text-stone-600 font-mono">
              Agent: {AGENT_ID}
            </p>
          </div>
        </div>
      </footer>

      {/* Voice Widget Overlay */}
      {isWidgetOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="w-full max-w-lg bg-gradient-to-br from-[#160f0a] via-[#110e0c] to-[#0f0a06] border border-[#2a1d13] rounded-3xl p-10 shadow-2xl shadow-orange-500/10">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-600 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-3xl">🔥</span>
                </div>
                <div>
                  <h3 className="text-2xl font-black text-[#fdf8f4]">
                    Talk to Joe
                  </h3>
                  <p className="text-sm text-[#a89582] font-bold uppercase tracking-wider">
                    AI Voice Assistant • Smoky Joe's
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  if (callState === "live") endCall();
                  setIsWidgetOpen(false);
                }}
                className="text-[#a89582] hover:text-white transition p-2 hover:bg-[#1f1610] rounded-xl border border-transparent hover:border-[#2a1d13]"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Voice Interface */}
            <div className="text-center py-10">
              <div className="relative inline-block mb-8">
                {/* Outer rings for live state */}
                {callState === "live" && (
                  <>
                    <span className="absolute inset-0 w-40 h-40 -left-4 -top-4 rounded-full border-2 border-green-500/30 animate-ping" />
                    <span className="absolute inset-0 w-36 h-36 -left-2 -top-2 rounded-full border border-green-500/20 animate-pulse" />
                  </>
                )}

                <div
                  className={`w-32 h-32 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 ${
                    callState === "live"
                      ? "bg-gradient-to-br from-green-500 to-emerald-600 shadow-green-500/50 scale-110"
                      : "bg-gradient-to-br from-orange-500 to-red-600 shadow-orange-500/40"
                  }`}
                >
                  {callState === "live" ? (
                    <svg
                      className="w-14 h-14 text-white animate-pulse"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                      />
                    </svg>
                  ) : callState === "connecting" ? (
                    <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <span className="text-5xl">🎤</span>
                  )}
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center justify-center gap-3 mb-8">
                <span
                  className={`w-3 h-3 rounded-full ${statusColor[callState]}`}
                />
                <span className="text-lg text-[#d4c3b3] font-bold">
                  {statusLabel[callState]}
                </span>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 bg-red-900/30 border border-red-500/30 rounded-2xl p-5">
                  <p className="text-sm text-red-300">{error}</p>
                </div>
              )}

              {/* Live Call Info */}
              {callState === "live" && (
                <div className="mb-6 bg-green-900/20 border border-green-500/30 rounded-2xl p-5">
                  <p className="text-green-300 font-medium">
                    🎤 Your microphone is active
                  </p>
                  <p className="text-sm text-green-400/70 mt-1">
                    Speak naturally to place your order
                  </p>
                </div>
              )}

              {/* Action Button */}
              {callState === "live" ? (
                <button
                  onClick={endCall}
                  className="w-full py-5 bg-red-600 hover:bg-red-700 rounded-2xl text-white font-bold text-lg transition flex items-center justify-center gap-3"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  End Call
                </button>
              ) : (
                <button
                  onClick={startCall}
                  disabled={callState === "connecting"}
                  className={`w-full py-5 rounded-2xl text-white font-bold text-lg transition flex items-center justify-center gap-3 ${
                    callState === "connecting"
                      ? "bg-stone-700 cursor-wait"
                      : "bg-gradient-to-r from-orange-500 to-red-600 hover:scale-105 shadow-lg shadow-orange-500/30"
                  }`}
                >
                  {callState === "connecting" ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    <>
                      <span className="text-xl">🎤</span>
                      Start Voice Call
                    </>
                  )}
                </button>
              )}

              <p className="mt-6 text-sm text-[#a89582] font-medium">
                {callState === "idle"
                  ? "Click to speak with Joe about orders, menu items, or reservations"
                  : "Powered by Xenlix AI Voice Technology"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const rootElement = document.getElementById("bbq-root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <BBQDemo />
    </React.StrictMode>,
  );
}

export default BBQDemo;
