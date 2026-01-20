import React from "react";
import { motion } from "framer-motion";

interface QuickAnswerProps {
  question: string;
  answer: string;
  stats?: { label: string; value: string }[];
}

/**
 * Quick Answer Box Component
 * Optimized for AI-powered search engines and featured snippets
 * Use this component to provide direct answers to common questions
 */
export const QuickAnswer: React.FC<QuickAnswerProps> = ({
  question,
  answer,
  stats,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="quick-answer-container"
    >
      <div className="quick-answer-box">
        <div className="quick-answer-header">
          <svg
            className="quick-answer-icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="quick-answer-question">{question}</h3>
        </div>

        <p className="quick-answer-text">
          <strong>Quick Answer:</strong> {answer}
        </p>

        {stats && stats.length > 0 && (
          <div className="quick-answer-stats">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .quick-answer-container {
          margin: 2rem 0;
        }

        .quick-answer-box {
          background: linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%);
          border: 2px solid rgba(6, 182, 212, 0.3);
          border-left: 6px solid #06b6d4;
          border-radius: 12px;
          padding: 1.5rem;
          backdrop-filter: blur(10px);
        }

        .quick-answer-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .quick-answer-icon {
          width: 24px;
          height: 24px;
          color: #06b6d4;
          flex-shrink: 0;
        }

        .quick-answer-question {
          font-size: 1.125rem;
          font-weight: 600;
          color: #ffffff;
          margin: 0;
        }

        .quick-answer-text {
          font-size: 1rem;
          line-height: 1.6;
          color: #cbd5e1;
          margin: 0;
        }

        .quick-answer-text strong {
          color: #06b6d4;
          font-weight: 600;
        }

        .quick-answer-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 1rem;
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(6, 182, 212, 0.2);
        }

        .stat-item {
          text-align: center;
        }

        .stat-value {
          font-size: 1.75rem;
          font-weight: 700;
          color: #06b6d4;
          line-height: 1;
        }

        .stat-label {
          font-size: 0.875rem;
          color: #94a3b8;
          margin-top: 0.25rem;
        }

        @media (max-width: 640px) {
          .quick-answer-box {
            padding: 1rem;
          }

          .quick-answer-question {
            font-size: 1rem;
          }

          .quick-answer-stats {
            grid-template-columns: repeat(2, 1fr);
            gap: 0.75rem;
          }

          .stat-value {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </motion.div>
  );
};

// Example usage in components:
/*
<QuickAnswer 
  question="How much can AI automation reduce business costs?"
  answer="AI automation typically reduces business costs by 40-60% by eliminating manual tasks, reducing errors by 90%, and operating 24/7 without breaks or overtime."
  stats={[
    { label: "Cost Reduction", value: "40-60%" },
    { label: "Error Reduction", value: "90%" },
    { label: "Uptime", value: "24/7" }
  ]}
/>
*/
