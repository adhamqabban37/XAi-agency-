import React, { Suspense, lazy, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { SchemaMarkup } from "./components/SchemaMarkup";
import { Footer } from "./components/Footer";
import { SpaceBackground } from "./components/SpaceBackground";
import { ShatteringRocket } from "./components/ShatteringRocket";
import { ScrollProgressBar } from "./components/ScrollProgressBar";

const ProblemSolution = lazy(() =>
  import("./components/ProblemSolution").then((m) => ({
    default: m.ProblemSolution,
  })),
);
const ValueProp = lazy(() =>
  import("./components/ValueProp").then((m) => ({ default: m.ValueProp })),
);
const UseCases = lazy(() =>
  import("./components/UseCases").then((m) => ({ default: m.UseCases })),
);
const Methodology = lazy(() =>
  import("./components/Methodology").then((m) => ({
    default: m.Methodology,
  })),
);
const AgenticImpact = lazy(() =>
  import("./components/AgenticImpact").then((m) => ({
    default: m.AgenticImpact,
  })),
);
const WhyXenlix = lazy(() =>
  import("./components/WhyXenlix").then((m) => ({ default: m.WhyXenlix })),
);
const CaseStudies = lazy(() =>
  import("./components/CaseStudies").then((m) => ({ default: m.CaseStudies })),
);
const ROICalculator = lazy(() =>
  import("./components/ROICalculator").then((m) => ({
    default: m.ROICalculator,
  })),
);
const Vision = lazy(() =>
  import("./components/Vision").then((m) => ({ default: m.Vision })),
);
const BookingPage = lazy(() =>
  import("./components/BookingPage").then((m) => ({
    default: m.BookingPage,
  })),
);
const ProjectShowcase = lazy(() => import("./components/ProjectShowcase"));
const FAQ = lazy(() =>
  import("./components/FAQ").then((m) => ({ default: m.FAQ })),
);
const FlagshipSystem = lazy(() => import("./components/FlagshipSystem"));

type View = "main" | "booking";

const SectionFallback = () => (
  <div className="py-20 text-center text-slate-500">Loading experience...</div>
);

const pageVariants = {
  initial: { opacity: 0, y: 30 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -30 },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.7,
};

const App: React.FC = () => {
  const [view, setView] = useState<View>("main");

  const showBookingPage = () => setView("booking");
  const showMainPage = () => setView("main");

  return (
    <div className="min-h-screen bg-[#010101] text-white selection:bg-orange-500/30 overflow-x-hidden">
      <ScrollProgressBar />
      <SpaceBackground />
      {view === "main" && <ShatteringRocket />}

      <AnimatePresence mode="wait">
        {view === "main" ? (
          <motion.div
            key="main"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <SchemaMarkup />
            <Header />
            <main className="relative z-10">
              <Hero onBookSession={showBookingPage} />
              <Suspense fallback={<SectionFallback />}>
                <ProblemSolution />
              </Suspense>
              <Suspense fallback={<SectionFallback />}>
                <ValueProp />
              </Suspense>
              <Suspense fallback={<SectionFallback />}>
                <UseCases />
              </Suspense>
              <Suspense fallback={<SectionFallback />}>
                <Methodology />
              </Suspense>
              <Suspense fallback={<SectionFallback />}>
                <AgenticImpact />
              </Suspense>
              <Suspense fallback={<SectionFallback />}>
                <WhyXenlix />
              </Suspense>
              <Suspense fallback={<SectionFallback />}>
                <CaseStudies />
              </Suspense>
              <Suspense fallback={<SectionFallback />}>
                <ProjectShowcase />
              </Suspense>
              <Suspense fallback={<SectionFallback />}>
                <FlagshipSystem />
              </Suspense>
              <Suspense fallback={<SectionFallback />}>
                <ROICalculator />
              </Suspense>
              <Suspense fallback={<SectionFallback />}>
                <FAQ />
              </Suspense>
              <Suspense fallback={<SectionFallback />}>
                <Vision />
              </Suspense>
            </main>
            <Footer onBookSession={showBookingPage} />
          </motion.div>
        ) : (
          <motion.div
            key="booking"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <Suspense
              fallback={
                <div className="min-h-screen flex items-center justify-center text-slate-400">
                  Loading booking experience...
                </div>
              }
            >
              <BookingPage onGoBack={showMainPage} />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
