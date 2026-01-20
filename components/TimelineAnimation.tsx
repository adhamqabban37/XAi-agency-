import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export const TimelineAnimation: React.FC = () => {
  return (
    <div className="w-full max-w-md mx-auto">
      <DotLottieReact
        src="/timeline.lottie"
        loop
        autoplay
        style={{ height: "400px", width: "400px" }}
      />
    </div>
  );
};
