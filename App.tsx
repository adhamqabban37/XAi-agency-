import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { ProblemSolution } from "./components/ProblemSolution";
import { ValueProp } from "./components/ValueProp";
import { UseCases } from "./components/UseCases";
import { Methodology } from "./components/Methodology";
import { AgenticImpact } from "./components/AgenticImpact";
import { WhyXenlix } from "./components/WhyXenlix";
import { CaseStudies } from "./components/CaseStudies";
import { ROICalculator } from "./components/ROICalculator";
import { Vision } from "./components/Vision";
import { Footer } from "./components/Footer";
import { BookingPage } from "./components/BookingPage";
import ProjectShowcase from "./components/ProjectShowcase";
import { SchemaMarkup } from "./components/SchemaMarkup";
import { FAQ } from "./components/FAQ";
import FlagshipSystem from "./components/FlagshipSystem";

type View = "main" | "booking";

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
    <div className="min-h-screen bg-slate-950 overflow-x-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]"></div>

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
              <ProblemSolution />
              <ValueProp />
              <UseCases />
              <Methodology />
              <AgenticImpact />
              <WhyXenlix />
              <CaseStudies />
              <ProjectShowcase />
              <FlagshipSystem />
              <ROICalculator />
              <FAQ />
              <Vision />
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
            <BookingPage onGoBack={showMainPage} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
