import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

const particles = ["💰", "📊", "💳", "📈", "💎", "🏦", "💵", "📉", "🪙", "💹"];

function Landing({ onAction }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <LandingStyled>
      {/* Animated gradient orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* Floating emoji particles */}
      <div className="particles">
        {particles.map((emoji, i) => (
          <span
            key={i}
            className="particle"
            style={{
              left: `${5 + (i * 9.5) % 90}%`,
              top: `${10 + (i * 17) % 75}%`,
              animationDelay: `${i * 0.6}s`,
              fontSize: `${1.2 + (i % 3) * 0.5}rem`,
            }}
          >
            {emoji}
          </span>
        ))}
      </div>

      {/* Grid lines background */}
      <div className="grid-bg" />

      {/* Main hero content */}
      <div className={`hero-content ${mounted ? "visible" : ""}`}>
        <div className="badge">✨ Smart Finance Management</div>

        <h1 className="headline">
          Take Control of
          <span className="gradient-text"> Your Money</span>
        </h1>

        <p className="subtitle">
          Track every penny, visualize your wealth, and build a better
          financial future — all in one beautiful dashboard.
        </p>

        <div className="stats-row">
          <div className="stat">
            <span className="stat-num">10K+</span>
            <span className="stat-label">Users</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-num">$2M+</span>
            <span className="stat-label">Tracked</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-num">99%</span>
            <span className="stat-label">Uptime</span>
          </div>
        </div>

        <div className="cta-group">
          <button
            className="btn-primary"
            onClick={() => onAction("login")}
            id="landing-signin-btn"
          >
            <span>Sign In</span>
            <span className="btn-icon">→</span>
          </button>
          <button
            className="btn-secondary"
            onClick={() => onAction("signup")}
            id="landing-signup-btn"
          >
            <span>Create Account</span>
            <span className="btn-icon">✦</span>
          </button>
        </div>

        <p className="footnote">Free forever · No credit card required</p>
      </div>

      {/* Feature cards */}
      <div className={`feature-cards ${mounted ? "visible" : ""}`}>
        <div className="feat-card" style={{ animationDelay: "0.2s" }}>
          <span className="feat-icon">📊</span>
          <span className="feat-title">Live Analytics</span>
        </div>
        <div className="feat-card" style={{ animationDelay: "0.4s" }}>
          <span className="feat-icon">🔒</span>
          <span className="feat-title">Secure Data</span>
        </div>
        <div className="feat-card" style={{ animationDelay: "0.6s" }}>
          <span className="feat-icon">⚡</span>
          <span className="feat-title">Instant Sync</span>
        </div>
      </div>
    </LandingStyled>
  );
}

/* ─── Keyframes ─────────────────────────────────────────────── */
const orbMove1 = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(80px, 60px) scale(1.1); }
`;
const orbMove2 = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(-60px, 80px) scale(0.9); }
`;
const orbMove3 = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1.05); }
  50% { transform: translate(40px, -60px) scale(0.95); }
`;
const floatParticle = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.6; }
  50% { transform: translateY(-25px) rotate(15deg); opacity: 1; }
`;
const heroFadeUp = keyframes`
  from { opacity: 0; transform: translateY(50px); }
  to { opacity: 1; transform: translateY(0); }
`;
const cardPop = keyframes`
  from { opacity: 0; transform: translateY(30px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;
const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;
const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;
const pulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(167, 139, 250, 0.5); }
  50% { box-shadow: 0 0 0 12px rgba(167, 139, 250, 0); }
`;

/* ─── Styled Component ──────────────────────────────────────── */
const LandingStyled = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: linear-gradient(135deg, #0f0c29, #1a1040, #302b63, #24243e);
  background-size: 400% 400%;
  animation: ${gradientShift} 12s ease infinite;

  /* ── Grid background ───────────────── */
  .grid-bg {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(167,139,250,0.07) 1px, transparent 1px),
      linear-gradient(90deg, rgba(167,139,250,0.07) 1px, transparent 1px);
    background-size: 60px 60px;
    pointer-events: none;
  }

  /* ── Orbs ──────────────────────────── */
  .orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    pointer-events: none;
  }
  .orb-1 {
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(124,58,237,0.5), transparent 70%);
    top: -100px; left: -100px;
    animation: ${orbMove1} 18s ease-in-out infinite;
  }
  .orb-2 {
    width: 400px; height: 400px;
    background: radial-gradient(circle, rgba(244,63,94,0.4), transparent 70%);
    bottom: -80px; right: -80px;
    animation: ${orbMove2} 22s ease-in-out infinite;
  }
  .orb-3 {
    width: 300px; height: 300px;
    background: radial-gradient(circle, rgba(59,130,246,0.35), transparent 70%);
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    animation: ${orbMove3} 15s ease-in-out infinite;
  }

  /* ── Particles ─────────────────────── */
  .particles { position: absolute; inset: 0; pointer-events: none; }
  .particle {
    position: absolute;
    animation: ${floatParticle} 4s ease-in-out infinite;
    opacity: 0.5;
    filter: blur(0.5px);
  }

  /* ── Hero Content ──────────────────── */
  .hero-content {
    position: relative;
    z-index: 10;
    text-align: center;
    padding: 0 2rem;
    opacity: 0;
    transform: translateY(50px);
    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);

    &.visible {
      opacity: 1;
      transform: translateY(0);
    }

    .badge {
      display: inline-block;
      padding: 0.4rem 1.2rem;
      background: rgba(167,139,250,0.15);
      border: 1px solid rgba(167,139,250,0.4);
      border-radius: 50px;
      color: #A78BFA;
      font-size: 0.85rem;
      font-weight: 600;
      letter-spacing: 0.5px;
      margin-bottom: 1.5rem;
      animation: ${heroFadeUp} 0.8s ease 0.1s both;
    }

    .headline {
      font-size: clamp(2.5rem, 5vw, 4.2rem);
      font-weight: 800;
      color: #ffffff;
      line-height: 1.1;
      margin-bottom: 1.2rem;
      animation: ${heroFadeUp} 0.8s ease 0.2s both;
    }

    .gradient-text {
      background: linear-gradient(135deg, #A78BFA, #F472B6, #60A5FA);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: ${shimmer} 3s linear infinite;
    }

    .subtitle {
      font-size: 1.05rem;
      color: rgba(255,255,255,0.65);
      max-width: 500px;
      margin: 0 auto 2rem;
      line-height: 1.7;
      animation: ${heroFadeUp} 0.8s ease 0.3s both;
    }

    .stats-row {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 2rem;
      margin-bottom: 2.5rem;
      animation: ${heroFadeUp} 0.8s ease 0.4s both;

      .stat {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.2rem;

        .stat-num {
          font-size: 1.6rem;
          font-weight: 800;
          color: #A78BFA;
        }
        .stat-label {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.5);
          text-transform: uppercase;
          letter-spacing: 1px;
        }
      }

      .stat-divider {
        width: 1px;
        height: 40px;
        background: rgba(255,255,255,0.15);
      }
    }

    .cta-group {
      display: flex;
      gap: 1rem;
      justify-content: center;
      margin-bottom: 1.2rem;
      animation: ${heroFadeUp} 0.8s ease 0.5s both;

      .btn-primary {
        display: flex;
        align-items: center;
        gap: 0.6rem;
        padding: 0.9rem 2.2rem;
        background: linear-gradient(135deg, #7C3AED, #A78BFA);
        color: white;
        font-size: 1rem;
        font-weight: 700;
        border: none;
        border-radius: 14px;
        cursor: pointer;
        transition: all 0.3s ease;
        animation: ${pulse} 2.5s ease-in-out infinite;
        box-shadow: 0 8px 30px rgba(124,58,237,0.4);

        &:hover {
          transform: translateY(-3px) scale(1.04);
          box-shadow: 0 15px 40px rgba(124,58,237,0.6);
        }
        &:active { transform: scale(0.97); }

        .btn-icon { font-size: 1.1rem; transition: transform 0.3s; }
        &:hover .btn-icon { transform: translateX(4px); }
      }

      .btn-secondary {
        display: flex;
        align-items: center;
        gap: 0.6rem;
        padding: 0.9rem 2.2rem;
        background: rgba(255,255,255,0.08);
        color: white;
        font-size: 1rem;
        font-weight: 700;
        border: 1.5px solid rgba(255,255,255,0.25);
        border-radius: 14px;
        cursor: pointer;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);

        &:hover {
          background: rgba(255,255,255,0.15);
          border-color: rgba(167,139,250,0.6);
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        &:active { transform: scale(0.97); }
      }
    }

    .footnote {
      font-size: 0.8rem;
      color: rgba(255,255,255,0.35);
      animation: ${heroFadeUp} 0.8s ease 0.6s both;
    }
  }

  /* ── Feature Cards ─────────────────── */
  .feature-cards {
    position: absolute;
    bottom: 2.5rem;
    display: flex;
    gap: 1rem;
    z-index: 10;
    opacity: 0;
    transition: all 1s ease 0.5s;

    &.visible {
      opacity: 1;
    }

    .feat-card {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.6rem 1.2rem;
      background: rgba(255,255,255,0.07);
      border: 1px solid rgba(255,255,255,0.15);
      border-radius: 50px;
      backdrop-filter: blur(10px);
      animation: ${cardPop} 0.6s ease both;

      .feat-icon { font-size: 1rem; }
      .feat-title {
        font-size: 0.8rem;
        font-weight: 600;
        color: rgba(255,255,255,0.75);
      }

      &:hover {
        background: rgba(167,139,250,0.15);
        border-color: rgba(167,139,250,0.4);
        transform: translateY(-2px);
        transition: all 0.2s ease;
      }
    }
  }
`;

export default Landing;
