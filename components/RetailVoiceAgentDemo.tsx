import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RetellWebClient } from "retell-client-js-sdk";
import { Section } from "./Section";

const AGENT_ID = "agent_43634ab95cd280debc97ed2f6d";
const LLM_ID = "llm_204fcfd5a16219bcb8adc950b775";

type VoiceCallState = "idle" | "connecting" | "live" | "error";

const voiceStatusCopy: Record<VoiceCallState, string> = {
  idle: "Idle",
  connecting: "Connecting",
  live: "Live",
  error: "Needs attention",
};

const voiceStatusTone: Record<VoiceCallState, string> = {
  idle: "border border-white/20 bg-white/10 text-white/80",
  connecting: "border border-orange-400/40 bg-orange-500/15 text-orange-200",
  live: "border border-emerald-400/60 bg-emerald-500/15 text-emerald-200",
  error: "border border-red-500/50 bg-red-500/15 text-red-200",
};

const callFlow = [
  {
    title: "Instant greeting",
    detail:
      "Retail Voice Agent wakes within 400 ms and references the caller's last order history.",
  },
  {
    title: "Need discovery",
    detail:
      "Clarifies SKU demand, timeline, and budget tolerances in natural language.",
  },
  {
    title: "Inventory sync",
    detail:
      "Streams real-time stock levels from the commerce stack before presenting options.",
  },
  {
    title: "Smart escalation",
    detail:
      "Pushes qualified opportunities to humans with context-rich notes inside AA Demo.",
  },
];

const transcript = [
  {
    speaker: "Shopper",
    text: "I need to restock the holiday capsule and want confirmed ship dates.",
  },
  {
    speaker: "Retail Voice Agent",
    text: "Pulling your last allocation now. We have 420 units ready in the Dallas node shipping within 48 hours.",
  },
  {
    speaker: "Shopper",
    text: "Great. Can we split the shipment across two boutiques?",
  },
  {
    speaker: "Retail Voice Agent",
    text: "Absolutely. I can stage 250 units for Fifth Avenue and 170 for SoMa. Want me to sync that to your buyer's queue?",
  },
];

const metrics = [
  { label: "Wake latency", value: "0.8 s" },
  { label: "Intent confidence", value: "92%" },
  { label: "Hand-off ready", value: "Under 3 min" },
];

export const RetailVoiceAgentDemo: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [callState, setCallState] = useState<VoiceCallState>("idle");
  const [voiceError, setVoiceError] = useState<string | null>(null);
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
      setCallState("idle");
    });

    client.on("error", (err) => {
      console.error("Retell error:", err);
      setCallState("error");
      setVoiceError(err.message || "Voice call error occurred");
    });

    return () => {
      client.stopCall();
    };
  }, []);

  const stopVoiceDemo = useCallback(() => {
    try {
      retellClientRef.current?.stopCall();
    } catch (error) {
      console.error("Unable to stop Retell session", error);
    }
  }, []);

  const startVoiceDemo = useCallback(async () => {
    if (!retellClientRef.current) return;

    try {
      setVoiceError(null);
      setCallState("connecting");

      // Call backend to register the call and get access token
      const response = await fetch("/api/retell-create-call", {
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
    } catch (error) {
      console.error("Unable to start Retell session", error);
      setCallState("error");
      setVoiceError(
        error instanceof Error
          ? error.message
          : "Unable to establish the live agent session.",
      );
    }
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  useEffect(() => {
    if (!isModalOpen && callState === "live") {
      stopVoiceDemo();
    }
  }, [isModalOpen, callState, stopVoiceDemo]);

  return (
    <Section id="retail-voice-agent" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-slate-900/50 to-slate-950" />
        <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.08),_transparent_55%)]" />
        <div className="absolute inset-x-1/4 top-1/3 h-72 blur-3xl bg-gradient-to-r from-orange-500/20 via-cyan-500/20 to-transparent" />
      </div>

      <div className="max-w-5xl mx-auto text-center space-y-6">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">
          AA Demo Environment
        </p>
        <h2 className="text-3xl md:text-5xl font-bold text-white">
          Retail Voice Agent
        </h2>
        <p className="text-lg text-slate-300 max-w-3xl mx-auto">
          A tactile preview of our autonomous associate that moves at the speed
          of retail ops. Tap the control to simulate how the agent greets
          customers, qualifies the request, and orchestrates fulfilment without
          breaking the brand tone.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
          <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/80">
            Agent ID: {AGENT_ID}
          </span>
          <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/80">
            LLM Stack: {LLM_ID}
          </span>
        </div>

        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => (window.location.href = "/demo/bbq.html")}
          className="relative mx-auto flex flex-col items-center gap-2 rounded-full px-16 py-8 bg-gradient-to-r from-orange-500 to-cyan-500 text-white font-semibold shadow-[0_10px_60px_rgba(8,145,178,0.45)]"
        >
          <span className="text-xl tracking-wide">
            Get your Voice Agent Now
          </span>
          <span className="absolute -inset-0.5 rounded-full border border-white/20 opacity-40 animate-pulse" />
        </motion.button>

        <p className="text-slate-400 text-sm">
          Button centered deliberately—mirroring the single-touch activation
          inside the AA demo control room.
        </p>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            key="retail-voice-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur"
            aria-modal="true"
            role="dialog"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-[95vw] max-w-5xl rounded-3xl bg-slate-950/90 border border-white/10 p-8 shadow-2xl"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-cyan-300/70">
                    Live AA Demo
                  </p>
                  <h3 className="text-2xl font-semibold text-white">
                    Retail Voice Agent Command Surface
                  </h3>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-sm uppercase tracking-widest text-white/70 hover:text-white"
                >
                  Close
                </button>
              </div>

              <div className="mb-10 rounded-3xl border border-white/10 bg-white/5 p-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="text-left">
                    <p className="text-xs uppercase tracking-[0.4em] text-cyan-300/70">
                      Live voice channel
                    </p>
                    <p className="text-base text-white/80">
                      Launch a real call with agent {AGENT_ID} powered by stack{" "}
                      {LLM_ID}.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <span
                      className={`px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] rounded-full ${voiceStatusTone[callState]}`}
                    >
                      {voiceStatusCopy[callState]}
                    </span>
                    {callState === "live" ? (
                      <button
                        onClick={stopVoiceDemo}
                        className="rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold uppercase tracking-[0.4em] text-white hover:bg-white/20"
                      >
                        End live demo
                      </button>
                    ) : (
                      <button
                        onClick={startVoiceDemo}
                        disabled={callState === "connecting"}
                        className={`rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-[0.4em] text-white transition ${
                          callState === "connecting"
                            ? "bg-white/20 text-white/70"
                            : "bg-gradient-to-r from-orange-500 to-cyan-500"
                        }`}
                      >
                        {callState === "connecting"
                          ? "Connecting"
                          : "Speak to agent"}
                      </button>
                    )}
                  </div>
                </div>
                {voiceError && (
                  <p className="mt-4 text-sm text-red-300">{voiceError}</p>
                )}
              </div>

              <div className="grid gap-8 lg:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="text-white/90 font-semibold text-lg text-left">
                    Flow orchestration
                  </h4>
                  <div className="space-y-3">
                    {callFlow.map((item, index) => (
                      <div
                        key={item.title}
                        className="rounded-2xl border border-white/5 bg-white/5 p-4 text-left"
                      >
                        <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/70 mb-1">
                          Step {index + 1}
                        </p>
                        <p className="text-white font-semibold">{item.title}</p>
                        <p className="text-slate-300 text-sm mt-1 leading-relaxed">
                          {item.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-white/90 font-semibold text-lg text-left">
                    Live transcript preview
                  </h4>
                  <div className="rounded-3xl border border-white/5 bg-gradient-to-b from-slate-900/80 to-slate-950 p-6 h-full">
                    <div className="space-y-4">
                      {transcript.map((line, index) => (
                        <div key={`${line.speaker}-${index}`}>
                          <p className="text-xs uppercase tracking-[0.3em] text-orange-300/70">
                            {line.speaker}
                          </p>
                          <p className="text-white/90 text-base leading-relaxed">
                            {line.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-2xl border border-white/5 bg-white/5 p-4 text-center"
                  >
                    <p className="text-3xl font-bold text-white">
                      {metric.value}
                    </p>
                    <p className="text-sm uppercase tracking-[0.3em] text-slate-300">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
};

export default RetailVoiceAgentDemo;
