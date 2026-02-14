import React from "react";
import { motion } from "framer-motion";

interface TechBadgeProps {
  name: string;
}

const TechBadge: React.FC<TechBadgeProps> = ({ name }) => (
  <span className="tech-badge">{name}</span>
);

const ProjectShowcase: React.FC = () => {
  const techStack = ["React", "Node.js", "OpenAI API", "MongoDB"];

  return (
    <section className="project-showcase">
      <div className="project-glass" aria-hidden="true" />
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="project-content"
        >
          {/* Project Header */}
          <div className="project-header">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="project-title"
            >
              Featured Project
            </motion.h2>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="project-name"
            >
              XenlixAI
            </motion.h3>
          </div>

          {/* Project Grid */}
          <div className="project-grid">
            {/* Project Image/Thumbnail */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="project-thumbnail"
            >
              <a
                href="https://www.xenlixai.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://i.imgur.com/jjcCsJp.png"
                  alt="XenlixAI - AI Analytics Dashboard"
                  width={960}
                  height={600}
                  loading="lazy"
                  decoding="async"
                  className="project-image"
                />
              </a>
            </motion.div>

            {/* Project Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="project-details"
            >
              {/* Description */}
              <div className="project-description">
                <p>
                  XenlixAI is an AI-driven optimization platform designed to
                  help businesses improve search visibility, streamline
                  automation, and unlock powerful analytics. Built with
                  cutting-edge technology, it delivers actionable insights that
                  drive measurable results.
                </p>
              </div>

              {/* Role & Contributions */}
              <div className="project-role">
                <h4>Role</h4>
                <p className="role-text">Full Stack Development</p>
              </div>

              {/* Tech Stack */}
              <div className="project-tech">
                <h4>Tech Stack & Features</h4>
                <div className="tech-stack">
                  {techStack.map((tech, index) => (
                    <motion.div
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <TechBadge name={tech} />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="project-cta">
                <motion.a
                  href="https://www.xenlixai.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="cta-primary"
                >
                  Visit Project
                </motion.a>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="cta-secondary"
                >
                  View Case Study
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <style>{`
        .project-showcase {
          padding: 100px 0;
          background: transparent;
          position: relative;
          z-index: 10;
          overflow: hidden;
        }

        .project-glass {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 20% 50%, rgba(251, 146, 60, 0.08) 0%, transparent 45%),
            radial-gradient(circle at 80% 50%, rgba(239, 68, 68, 0.08) 0%, transparent 45%),
            rgba(1, 1, 1, 0.72);
          backdrop-filter: blur(16px);
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          pointer-events: none;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          position: relative;
          z-index: 1;
        }

        .project-content {
          position: relative;
        }

        .project-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .project-title {
          font-size: 1rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 2px;
          background: linear-gradient(135deg, #fb923c 0%, #ef4444 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 10px;
        }

        .project-name {
          font-size: 3.5rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0;
        }

        .project-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        .project-thumbnail {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          transition: all 0.3s ease;
        }

        .project-thumbnail a {
          display: block;
          cursor: pointer;
        }

        .project-thumbnail:hover {
          transform: scale(1.02);
          box-shadow: 0 25px 70px rgba(0, 0, 0, 0.4);
        }

        .project-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          border: 2px solid rgba(251, 146, 60, 0.2);
          border-radius: 20px;
        }

        .project-details {
          color: #e2e8f0;
        }

        .project-description {
          margin-bottom: 30px;
        }

        .project-description p {
          font-size: 1.1rem;
          line-height: 1.8;
          color: #9ca3af;
          margin: 0;
        }

        .project-role,
        .project-tech {
          margin-bottom: 30px;
        }

        .project-role h4,
        .project-tech h4 {
          font-size: 1.2rem;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 15px;
          position: relative;
          display: inline-block;
        }

        .project-role h4::after,
        .project-tech h4::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 40px;
          height: 3px;
          background: linear-gradient(90deg, #fb923c, #ef4444);
          border-radius: 2px;
        }

        .role-text {
          color: #9ca3af;
          font-size: 1.1rem;
        }

        .project-role ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .project-role li {
          padding: 8px 0 8px 25px;
          position: relative;
          color: #9ca3af;
          font-size: 1rem;
          line-height: 1.6;
        }

        .project-role li::before {
          content: '→';
          position: absolute;
          left: 0;
          color: #fb923c;
          font-weight: bold;
        }

        .tech-stack {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .tech-badge {
          display: inline-block;
          padding: 8px 16px;
          background: rgba(251, 146, 60, 0.05);
          border: 1px solid rgba(251, 146, 60, 0.2);
          border-radius: 20px;
          color: #fdba74;
          font-size: 0.9rem;
          font-weight: 500;
          transition: all 0.3s ease;
          cursor: default;
        }

        .tech-badge:hover {
          background: rgba(251, 146, 60, 0.1);
          border-color: rgba(251, 146, 60, 0.4);
          transform: translateY(-2px);
        }

        .project-cta {
          display: flex;
          gap: 15px;
          margin-top: 40px;
        }

        .cta-primary,
        .cta-secondary {
          padding: 14px 32px;
          font-size: 1rem;
          font-weight: 600;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
          outline: none;
          text-decoration: none;
          display: inline-block;
          text-align: center;
        }

        .cta-primary {
          background: linear-gradient(135deg, #fb923c 0%, #ef4444 100%);
          color: #ffffff;
          box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);
        }

        .cta-primary:hover {
          box-shadow: 0 6px 25px rgba(239, 68, 68, 0.5);
          transform: translateY(-2px);
        }

        .cta-secondary {
          background: transparent;
          color: #fdba74;
          border: 2px solid rgba(251, 146, 60, 0.3);
        }

        .cta-secondary:hover {
          background: rgba(251, 146, 60, 0.05);
          border-color: rgba(251, 146, 60, 0.6);
          transform: translateY(-2px);
        }

        /* Responsive Design */
        @media (max-width: 968px) {
          .project-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .project-name {
            font-size: 2.5rem;
          }
        }

        @media (max-width: 640px) {
          .project-showcase {
            padding: 60px 0;
          }

          .project-name {
            font-size: 2rem;
          }

          .project-description p {
            font-size: 1rem;
          }

          .project-cta {
            flex-direction: column;
          }

          .cta-primary,
          .cta-secondary {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
};

export default ProjectShowcase;
