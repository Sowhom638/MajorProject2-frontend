import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

        :root {
          --an-indigo: #6366f1;
          --an-indigo-dark: #4f46e5;
          --an-indigo-light: #a5b4fc;
          --an-bg: #f8fafc;
          --an-card: #ffffff;
          --an-text: #0f172a;
          --an-muted: #64748b;
          --an-border: #e2e8f0;
          --an-green: #22c55e;
          --an-orange: #f97316;
          --an-radius: 16px;
          --an-radius-sm: 10px;
          --an-shadow: 0 1px 3px 0 rgba(0,0,0,0.06), 0 1px 2px -1px rgba(0,0,0,0.04);
          --an-shadow-md: 0 4px 6px -1px rgba(0,0,0,0.07), 0 2px 4px -2px rgba(0,0,0,0.05);
          --an-shadow-lg: 0 10px 25px -3px rgba(0,0,0,0.08), 0 4px 6px -4px rgba(0,0,0,0.04);
          --an-gradient: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
        }

        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          margin: 0;
          background: var(--an-bg);
          color: var(--an-text);
          line-height: 1.6;
          -webkit-font-smoothing: antialiased;
        }

        .an-landing { min-height: 100vh; }

        /* ===== NAVBAR ===== */
        .an-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--an-border);
          padding: 1rem 0;
        }
        .an-nav-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .an-brand {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
        }
        .an-brand-icon {
          width: 40px;
          height: 40px;
          background: var(--an-gradient);
          border-radius: var(--an-radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 800;
          font-size: 1.1rem;
          box-shadow: 0 2px 8px rgba(99,102,241,0.3);
        }
        .an-brand-text {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--an-text);
        }
        .an-nav-links {
          display: flex;
          align-items: center;
          gap: 2rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .an-nav-links a {
          text-decoration: none;
          color: var(--an-muted);
          font-weight: 500;
          font-size: 0.95rem;
          transition: color 0.2s;
        }
        .an-nav-links a:hover { color: var(--an-indigo); }
        .an-nav-btn {
          background: var(--an-gradient);
          color: white !important;
          padding: 0.65rem 1.5rem !important;
          border-radius: 50px;
          font-weight: 600 !important;
          transition: all 0.2s ease !important;
          box-shadow: 0 2px 8px rgba(99,102,241,0.25);
        }
        .an-nav-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(99,102,241,0.35) !important;
        }

        /* ===== HERO ===== */
        .an-hero {
          padding: 140px 0 80px;
          background: linear-gradient(180deg, #f1f5f9 0%, var(--an-bg) 100%);
          position: relative;
          overflow: hidden;
        }
        .an-hero::before {
          content: '';
          position: absolute;
          top: -150px;
          left: 50%;
          transform: translateX(-50%);
          width: 800px;
          height: 800px;
          background: radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%);
          pointer-events: none;
        }
        .an-hero-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          text-align: center;
          position: relative;
          z-index: 1;
        }
        .an-hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(99,102,241,0.08);
          border: 1px solid rgba(99,102,241,0.15);
          padding: 0.4rem 1rem;
          border-radius: 50px;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--an-indigo);
          margin-bottom: 1.5rem;
        }
        .an-hero h1 {
          font-size: 3.2rem;
          font-weight: 800;
          line-height: 1.15;
          margin-bottom: 1.25rem;
          color: var(--an-text);
        }
        .an-hero h1 span {
          background: var(--an-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .an-hero-desc {
          font-size: 1.2rem;
          color: var(--an-muted);
          max-width: 650px;
          margin: 0 auto 2.5rem;
          line-height: 1.7;
        }
        .an-hero-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 2rem;
        }
        .an-btn-primary {
          background: var(--an-gradient);
          color: white;
          border: none;
          padding: 0.85rem 2rem;
          border-radius: 50px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          box-shadow: 0 2px 10px rgba(99,102,241,0.25);
        }
        .an-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(99,102,241,0.35);
          color: white;
        }
        .an-btn-secondary {
          background: var(--an-card);
          color: var(--an-text);
          border: 1px solid var(--an-border);
          padding: 0.8rem 2rem;
          border-radius: 50px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          box-shadow: var(--an-shadow);
        }
        .an-btn-secondary:hover {
          border-color: var(--an-indigo-light);
          color: var(--an-indigo);
          transform: translateY(-2px);
        }

        /* Google Button */
        .an-divider {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin: 1.5rem 0;
          justify-content: center;
        }
        .an-divider hr {
          width: 60px;
          border: none;
          border-top: 1px solid var(--an-border);
        }
        .an-divider span {
          color: var(--an-muted);
          font-size: 0.8rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .an-google-btn {
          background: var(--an-card);
          border: 1.5px solid var(--an-border);
          color: var(--an-text);
          padding: 0.7rem 1.5rem;
          border-radius: 50px;
          font-weight: 500;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          min-width: 220px;
          justify-content: center;
          box-shadow: var(--an-shadow);
        }
        .an-google-btn:hover {
          border-color: var(--an-indigo-light);
          box-shadow: var(--an-shadow-lg);
          transform: translateY(-2px);
        }

        /* Hero Mockup - Dashboard Style */
        .an-mockup-container {
          margin-top: 4rem;
          max-width: 1050px;
          margin-left: auto;
          margin-right: auto;
          position: relative;
        }
        .an-mockup-card {
          background: var(--an-card);
          border-radius: var(--an-radius);
          box-shadow: var(--an-shadow-lg);
          border: 1px solid var(--an-border);
          overflow: hidden;
        }
        .an-mockup-header {
          background: var(--an-bg);
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid var(--an-border);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .an-mockup-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--an-text);
        }
        .an-mockup-subtitle {
          font-size: 0.85rem;
          color: var(--an-muted);
          margin-top: 2px;
        }
        .an-mockup-badge {
          background: var(--an-gradient);
          color: white;
          padding: 0.4rem 1rem;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 600;
        }
        .an-mockup-body {
          padding: 1.5rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        .an-mockup-stat {
          background: var(--an-bg);
          border-radius: var(--an-radius-sm);
          padding: 1rem 1.25rem;
          border: 1px solid var(--an-border);
        }
        .an-mockup-stat-label {
          font-size: 0.8rem;
          color: var(--an-muted);
          margin-bottom: 0.25rem;
        }
        .an-mockup-stat-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--an-text);
        }
        .an-mockup-chart {
          grid-column: 1 / -1;
          background: var(--an-bg);
          border-radius: var(--an-radius-sm);
          padding: 1.5rem;
          border: 1px solid var(--an-border);
          min-height: 180px;
          display: flex;
          flex-direction: column;
        }
        .an-mockup-chart-title {
          font-size: 0.95rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }
        .an-chart-bars {
          display: flex;
          align-items: flex-end;
          gap: 1rem;
          height: 100px;
          margin-top: auto;
        }
        .an-chart-bar {
          flex: 1;
          background: var(--an-gradient);
          border-radius: 6px 6px 0 0;
          min-height: 20px;
          transition: opacity 0.3s;
          opacity: 0.8;
        }
        .an-chart-bar:hover { opacity: 1; }

        /* ===== FEATURES ===== */
        .an-section {
          padding: 5rem 0;
        }
        .an-section-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }
        .an-section-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        .an-section-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(99,102,241,0.08);
          border: 1px solid rgba(99,102,241,0.12);
          padding: 0.35rem 0.9rem;
          border-radius: 50px;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--an-indigo);
          margin-bottom: 1rem;
        }
        .an-section-header h2 {
          font-size: 2.2rem;
          font-weight: 800;
          margin-bottom: 0.75rem;
        }
        .an-section-header p {
          color: var(--an-muted);
          font-size: 1.1rem;
          max-width: 550px;
          margin: 0 auto;
        }
        .an-features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        .an-feature-card {
          background: var(--an-card);
          border: 1px solid var(--an-border);
          border-radius: var(--an-radius);
          padding: 2rem;
          transition: all 0.25s ease;
          position: relative;
        }
        .an-feature-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--an-shadow-lg);
          border-color: var(--an-indigo-light);
        }
        .an-feature-icon {
          width: 48px;
          height: 48px;
          background: rgba(99,102,241,0.08);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
          color: var(--an-indigo);
        }
        .an-feature-card h3 {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }
        .an-feature-card p {
          color: var(--an-muted);
          font-size: 0.95rem;
          line-height: 1.6;
          margin: 0;
        }

        /* ===== PIPELINE SECTION ===== */
        .an-pipeline {
          background: var(--an-bg);
          border-top: 1px solid var(--an-border);
          border-bottom: 1px solid var(--an-border);
        }
        .an-pipeline-stages {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 1rem;
          margin-top: 2.5rem;
        }
        .an-stage-card {
          background: var(--an-card);
          border: 1px solid var(--an-border);
          border-radius: var(--an-radius);
          padding: 1.5rem;
          text-align: center;
          transition: all 0.25s;
        }
        .an-stage-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--an-shadow-md);
        }
        .an-stage-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          margin: 0 auto 0.75rem;
        }
        .an-stage-dot.new { background: #94a3b8; }
        .an-stage-dot.contacted { background: #60a5fa; }
        .an-stage-dot.qualified { background: var(--an-green); }
        .an-stage-dot.proposal { background: var(--an-orange); }
        .an-stage-dot.closed { background: var(--an-indigo); }
        .an-stage-card h4 {
          font-size: 0.95rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }
        .an-stage-count {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--an-text);
        }

        /* ===== STATS ===== */
        .an-stats {
          background: var(--an-gradient);
          position: relative;
          overflow: hidden;
        }
        .an-stats::before {
          content: '';
          position: absolute;
          inset: 0;
          background: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2l2 3.5-2 3z' fill='%23fff' fill-opacity='0.04' fill-rule='evenodd'/%3E%3C/svg%3E");
        }
        .an-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
          text-align: center;
          position: relative;
          z-index: 1;
        }
        .an-stat-item h3 {
          font-size: 2.5rem;
          font-weight: 800;
          color: white;
          margin-bottom: 0.25rem;
        }
        .an-stat-item p {
          color: rgba(255,255,255,0.85);
          font-weight: 500;
          font-size: 0.95rem;
          margin: 0;
        }

        /* ===== TESTIMONIALS ===== */
        .an-testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        .an-testimonial-card {
          background: var(--an-card);
          border: 1px solid var(--an-border);
          border-radius: var(--an-radius);
          padding: 2rem;
          transition: all 0.25s;
        }
        .an-testimonial-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--an-shadow-lg);
        }
        .an-testimonial-stars { color: #f59e0b; font-size: 0.9rem; margin-bottom: 1rem; letter-spacing: 2px; }
        .an-testimonial-text {
          color: var(--an-text);
          font-size: 0.95rem;
          line-height: 1.7;
          margin-bottom: 1.5rem;
          font-style: italic;
        }
        .an-testimonial-author {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .an-testimonial-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: var(--an-gradient);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 700;
          font-size: 0.9rem;
        }
        .an-testimonial-name { font-weight: 600; font-size: 0.95rem; }
        .an-testimonial-role { font-size: 0.8rem; color: var(--an-muted); }

        /* ===== CTA ===== */
        .an-cta-card {
          background: var(--an-gradient);
          border-radius: var(--an-radius);
          padding: 4rem 3rem;
          color: white;
          text-align: center;
          position: relative;
          overflow: hidden;
          max-width: 800px;
          margin: 0 auto;
        }
        .an-cta-card::before {
          content: '';
          position: absolute;
          top: -80px;
          right: -80px;
          width: 280px;
          height: 280px;
          background: rgba(255,255,255,0.07);
          border-radius: 50%;
        }
        .an-cta-card::after {
          content: '';
          position: absolute;
          bottom: -60px;
          left: -60px;
          width: 200px;
          height: 200px;
          background: rgba(255,255,255,0.04);
          border-radius: 50%;
        }
        .an-cta-card h2 {
          font-size: 2rem;
          font-weight: 800;
          margin-bottom: 0.75rem;
          position: relative;
          z-index: 1;
        }
        .an-cta-card p {
          opacity: 0.9;
          font-size: 1.1rem;
          margin-bottom: 2rem;
          position: relative;
          z-index: 1;
        }
        .an-cta-btn {
          background: white;
          color: var(--an-indigo);
          border: none;
          padding: 0.9rem 2.5rem;
          border-radius: 50px;
          font-weight: 700;
          font-size: 1.05rem;
          cursor: pointer;
          transition: all 0.25s ease;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          position: relative;
          z-index: 1;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .an-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.15);
        }

        /* ===== FOOTER ===== */
        .an-footer {
          background: var(--an-text);
          color: rgba(255,255,255,0.6);
          padding: 3rem 0 2rem;
        }
        .an-footer-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }
        .an-footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 3rem;
          margin-bottom: 2.5rem;
        }
        .an-footer-brand {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }
        .an-footer-icon {
          width: 36px;
          height: 36px;
          background: var(--an-gradient);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 800;
          font-size: 0.9rem;
        }
        .an-footer h4 { color: white; font-size: 0.95rem; font-weight: 600; margin-bottom: 1rem; }
        .an-footer ul { list-style: none; padding: 0; margin: 0; }
        .an-footer ul li { margin-bottom: 0.5rem; }
        .an-footer ul a { color: rgba(255,255,255,0.6); text-decoration: none; font-size: 0.9rem; transition: color 0.2s; }
        .an-footer ul a:hover { color: white; }
        .an-footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.1);
          padding-top: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.85rem;
        }
        .an-footer-social { display: flex; gap: 1rem; }
        .an-footer-social a { color: rgba(255,255,255,0.5); text-decoration: none; transition: color 0.2s; }
        .an-footer-social a:hover { color: white; }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 1024px) {
          .an-features-grid { grid-template-columns: repeat(2, 1fr); }
          .an-pipeline-stages { grid-template-columns: repeat(3, 1fr); }
          .an-stats-grid { grid-template-columns: repeat(2, 1fr); }
          .an-testimonials-grid { grid-template-columns: repeat(2, 1fr); }
          .an-footer-grid { grid-template-columns: repeat(2, 1fr); }
          .an-mockup-body { grid-template-columns: 1fr; }
        }
        @media (max-width: 768px) {
          .an-hero h1 { font-size: 2.2rem; }
          .an-section-header h2 { font-size: 1.8rem; }
          .an-features-grid { grid-template-columns: 1fr; }
          .an-pipeline-stages { grid-template-columns: repeat(2, 1fr); }
          .an-stats-grid { grid-template-columns: repeat(2, 1fr); }
          .an-testimonials-grid { grid-template-columns: 1fr; }
          .an-footer-grid { grid-template-columns: 1fr; }
          .an-nav-links { display: none; }
          .an-cta-card { padding: 3rem 2rem; }
        }
      `}</style>
      <ToastContainer
        position="bottom-right"
        theme="colored"
        autoClose={3000}
      />
      {/* ===== NAVBAR ===== */}
      <nav className="an-nav">
        <div className="an-nav-inner">
          <Link to="/" className="an-brand">
            <span className="an-brand-text">Anvaya CRM</span>
          </Link>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section className="an-hero">
        <div className="an-hero-inner">
          <div className="an-hero-badge">
            📊 Pipeline Management Made Simple
          </div>
          <h1>
            Track Leads.
            <br />
            Close Deals.
            <br />
            <span>Grow Faster.</span>
          </h1>
          <p className="an-hero-desc">
            A full-stack CRM application that helps your sales team track leads,
            visualize pipeline performance, and make data-driven decisions — all
            in one clean, intuitive dashboard.
          </p>
          <div className="an-hero-buttons">
            <Link to="/home" className="an-btn-primary">
              Start Free Trial
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <a href="#pipeline" className="an-btn-secondary">
              View Demo
            </a>
          </div>

          {/* Dashboard Mockup */}
          <div className="an-mockup-container">
            <div className="an-mockup-card">
              <div className="an-mockup-header">
                <div>
                  <div className="an-mockup-title">Pipeline Overview</div>
                  <div className="an-mockup-subtitle">4 leads found</div>
                </div>
                <div className="an-mockup-badge">+ New Lead</div>
              </div>
              <div className="an-mockup-body">
                <div className="an-mockup-stat">
                  <div className="an-mockup-stat-label">Total Leads</div>
                  <div
                    className="an-mockup-stat-value"
                    style={{ color: "#6366f1" }}
                  >
                    4
                  </div>
                </div>
                <div className="an-mockup-stat">
                  <div className="an-mockup-stat-label">In Pipeline</div>
                  <div
                    className="an-mockup-stat-value"
                    style={{ color: "#22c55e" }}
                  >
                    3
                  </div>
                </div>
                <div className="an-mockup-stat">
                  <div className="an-mockup-stat-label">Closed</div>
                  <div
                    className="an-mockup-stat-value"
                    style={{ color: "#1e293b" }}
                  >
                    1
                  </div>
                </div>
                <div className="an-mockup-stat">
                  <div className="an-mockup-stat-label">Sales Agents</div>
                  <div
                    className="an-mockup-stat-value"
                    style={{ color: "#6366f1" }}
                  >
                    3
                  </div>
                </div>
                <div className="an-mockup-chart">
                  <div className="an-mockup-chart-title">
                    Leads Closed by Sales Agent
                  </div>
                  <div className="an-chart-bars">
                    <div
                      className="an-chart-bar"
                      style={{ height: "20%", opacity: 0.3 }}
                    ></div>
                    <div
                      className="an-chart-bar"
                      style={{ height: "100%" }}
                    ></div>
                    <div
                      className="an-chart-bar"
                      style={{ height: "60%" }}
                    ></div>
                    <div
                      className="an-chart-bar"
                      style={{ height: "40%", opacity: 0.5 }}
                    ></div>
                    <div
                      className="an-chart-bar"
                      style={{ height: "80%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section id="features" className="an-section">
        <div className="an-section-inner">
          <div className="an-section-header">
            <div className="an-section-badge">✨ Features</div>
            <h2>Everything Your Sales Team Needs</h2>
            <p>
              Powerful tools designed to streamline lead tracking, boost team
              performance, and close deals faster.
            </p>
          </div>
          <div className="an-features-grid">
            {[
              {
                icon: "🎯",
                title: "Lead Tracking",
                desc: "Capture, categorize, and manage leads through every stage of your sales pipeline with ease.",
              },
              {
                icon: "📈",
                title: "Visual Analytics",
                desc: "Interactive charts and dashboards powered by Recharts give you instant insights into pipeline health.",
              },
              {
                icon: "👥",
                title: "Team Management",
                desc: "Assign leads to agents, track individual performance, and optimize team workload distribution.",
              },
              {
                icon: "🔔",
                title: "Smart Reporting",
                desc: "Comprehensive reports that help you make data-driven decisions and forecast revenue accurately.",
              },
              {
                icon: "⚡",
                title: "Fast & Lightweight",
                desc: "Optimized for speed with instant filtering, sorting, and real-time status updates.",
              },
              {
                icon: "🔒",
                title: "Secure & Reliable",
                desc: "Enterprise-grade security with role-based access control and encrypted data storage.",
              },
            ].map((f, i) => (
              <div className="an-feature-card" key={i}>
                <div className="an-feature-icon">
                  {f.icon}
                </div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PIPELINE STAGES ===== */}
      <section id="pipeline" className="an-section an-pipeline">
        <div className="an-section-inner">
          <div className="an-section-header">
            <div className="an-section-badge">🔄 Pipeline</div>
            <h2>Visualize Your Sales Pipeline</h2>
            <p>
              Track every lead from first contact to closed deal with clear
              stage indicators.
            </p>
          </div>
          <div className="an-pipeline-stages">
            {[
              { name: "New", count: 0, color: "new" },
              { name: "Contacted", count: 0, color: "contacted" },
              { name: "Qualified", count: 2, color: "qualified" },
              { name: "Proposal Sent", count: 1, color: "proposal" },
              { name: "Closed", count: 1, color: "closed" },
            ].map((stage, i) => (
              <div className="an-stage-card" key={i}>
                <div className={`an-stage-dot ${stage.color}`}></div>
                <h4>{stage.name}</h4>
                <div className="an-stage-count">{stage.count}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section id="cta" className="an-section">
        <div className="an-section-inner">
          <div className="an-cta-card">
            <h2>Ready to Close More Deals?</h2>
            <p>
              Join thousands of sales teams using Anvaya CRM to manage their
              pipeline and accelerate growth.
            </p>
            <a href="#" className="an-cta-btn">
              Get Started Free
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="an-footer">
        <div className="an-footer-inner">
          <div className="an-footer-grid">
            <div>
              <div className="an-footer-brand">
                <span
                  style={{
                    color: "white",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                  }}
                >
                  Anvaya CRM
                </span>
              </div>
              <p
                style={{
                  fontSize: "0.9rem",
                  lineHeight: 1.6,
                  marginBottom: "1rem",
                }}
              >
                A modern CRM built for sales teams that want to track leads,
                visualize pipelines, and close deals faster.
              </p>
            </div>
          </div>
          <div className="an-footer-bottom">
            <span>
              &copy; {new Date().getFullYear()} Anvaya CRM. All rights reserved.
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
