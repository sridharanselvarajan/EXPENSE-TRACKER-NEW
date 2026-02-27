import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

function Auth({ setIsLoggedIn, setUsername, initialMode = "login" }) {
  const [mode, setMode] = useState(initialMode);
  const [username, setLocalUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    setError(""); setSuccess("");
    setLocalUsername(""); setPassword(""); setConfirmPassword("");
  }, [mode]);

  const handleAuth = async () => {
    if (!username.trim() || !password.trim()) {
      setError("Please fill in all fields."); return;
    }
    if (mode === "signup" && password !== confirmPassword) {
      setError("Passwords do not match."); return;
    }
    if (password.length < 4) {
      setError("Password must be at least 4 characters."); return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);

    if (mode === "signup") {
      if (users[username]) {
        setError("Username already exists. Try signing in.");
      } else {
        setUsers((prev) => ({ ...prev, [username]: password }));
        setSuccess("Account created! Please sign in.");
        setTimeout(() => setMode("login"), 1200);
      }
    } else {
      if (users[username] === password) {
        setUsername(username);
        setIsLoggedIn(true);
      } else {
        setError("Invalid username or password.");
      }
    }
  };

  const handleKeyDown = (e) => { if (e.key === "Enter") handleAuth(); };

  return (
    <AuthStyled className={mounted ? "mounted" : ""}>
      <div className="backdrop" />
      <div className="modal">
        <div className="modal-header">
          <div className="logo-mark">💰</div>
          <h2>{mode === "login" ? "Welcome Back" : "Get Started"}</h2>
          <p className="modal-sub">
            {mode === "login"
              ? "Sign in to manage your finances"
              : "Create your free account today"}
          </p>
        </div>

        <div className="tab-switcher">
          <button className={mode === "login" ? "tab active" : "tab"} onClick={() => setMode("login")} id="tab-login">Sign In</button>
          <button className={mode === "signup" ? "tab active" : "tab"} onClick={() => setMode("signup")} id="tab-signup">Create Account</button>
          <div className={`tab-slider ${mode === "signup" ? "right" : ""}`} />
        </div>

        {error && <div className="msg error-msg">⚠ {error}</div>}
        {success && <div className="msg success-msg">✓ {success}</div>}

        <div className="form-group">
          <div className="input-wrap">
            <span className="input-icon">👤</span>
            <input type="text" placeholder="Username" value={username}
              onChange={(e) => { setLocalUsername(e.target.value); setError(""); }}
              onKeyDown={handleKeyDown} id="auth-username" />
          </div>
          <div className="input-wrap">
            <span className="input-icon">🔒</span>
            <input type="password" placeholder="Password" value={password}
              onChange={(e) => { setPassword(e.target.value); setError(""); }}
              onKeyDown={handleKeyDown} id="auth-password" />
          </div>
          {mode === "signup" && (
            <div className="input-wrap animate-in">
              <span className="input-icon">🔑</span>
              <input type="password" placeholder="Confirm Password" value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value); setError(""); }}
                onKeyDown={handleKeyDown} id="auth-confirm-password" />
            </div>
          )}
        </div>

        <button className={`submit-btn ${loading ? "loading" : ""}`} onClick={handleAuth} disabled={loading} id="auth-submit-btn">
          {loading ? <span className="spinner" /> : (
            <><span>{mode === "login" ? "Sign In" : "Create Account"}</span><span className="btn-arrow">→</span></>
          )}
        </button>

        <p className="switch-link">
          {mode === "login" ? (
            <>Don't have an account? <span onClick={() => setMode("signup")}>Sign up free</span></>
          ) : (
            <>Already have an account? <span onClick={() => setMode("login")}>Sign in</span></>
          )}
        </p>
      </div>
    </AuthStyled>
  );
}

const fadeIn = keyframes`from { opacity:0; } to { opacity:1; }`;
const slideUp = keyframes`
  from { opacity:0; transform: translateY(60px) scale(0.96); }
  to   { opacity:1; transform: translateY(0) scale(1); }
`;
const slideIn = keyframes`
  from { opacity:0; transform: translateY(16px); }
  to   { opacity:1; transform: translateY(0); }
`;
const spinAnim = keyframes`from { transform: rotate(0deg); } to { transform: rotate(360deg); }`;
const shimmerAnim = keyframes`
  0%   { background-position: -200% center; }
  100% { background-position:  200% center; }
`;

const AuthStyled = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  animation: ${fadeIn} 0.4s ease both;

  .backdrop {
    position: absolute;
    inset: 0;
    background: rgba(10, 8, 30, 0.82);
    backdrop-filter: blur(14px);
  }

  .modal {
    position: relative;
    z-index: 10;
    width: min(420px, 92vw);
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.14);
    border-radius: 24px;
    padding: 2.2rem 2rem 2rem;
    backdrop-filter: blur(30px);
    box-shadow: 0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(167,139,250,0.15);
    animation: ${slideUp} 0.55s cubic-bezier(0.16, 1, 0.3, 1) both;

    &::before {
      content: '';
      position: absolute;
      top: 0; left: 50%;
      transform: translateX(-50%);
      width: 60%; height: 1px;
      background: linear-gradient(90deg, transparent, rgba(167,139,250,0.8), transparent);
      border-radius: 50%;
    }
  }

  .modal-header {
    text-align: center;
    margin-bottom: 1.6rem;

    .logo-mark {
      font-size: 2.4rem;
      margin-bottom: 0.5rem;
      display: block;
      filter: drop-shadow(0 0 12px rgba(167,139,250,0.6));
    }

    h2 {
      font-size: 1.7rem;
      font-weight: 800;
      color: #ffffff;
      margin-bottom: 0.3rem;
    }

    .modal-sub {
      font-size: 0.85rem;
      color: rgba(255,255,255,0.5);
    }
  }

  .tab-switcher {
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1fr;
    background: rgba(255,255,255,0.08);
    border-radius: 12px;
    padding: 4px;
    margin-bottom: 1.4rem;

    .tab {
      position: relative;
      z-index: 2;
      padding: 0.55rem;
      border: none;
      background: transparent;
      color: rgba(255,255,255,0.5);
      font-size: 0.9rem;
      font-weight: 600;
      cursor: pointer;
      border-radius: 9px;
      transition: color 0.25s ease;
      font-family: 'Outfit', sans-serif;

      &.active { color: #ffffff; }
    }

    .tab-slider {
      position: absolute;
      top: 4px; left: 4px;
      width: calc(50% - 4px);
      height: calc(100% - 8px);
      background: linear-gradient(135deg, #7C3AED, #A78BFA);
      border-radius: 9px;
      transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      box-shadow: 0 4px 15px rgba(124,58,237,0.4);

      &.right { transform: translateX(100%); }
    }
  }

  .msg {
    padding: 0.6rem 1rem;
    border-radius: 10px;
    font-size: 0.85rem;
    font-weight: 500;
    margin-bottom: 1rem;
    animation: ${slideIn} 0.3s ease;
  }
  .error-msg {
    background: rgba(244,63,94,0.15);
    border: 1px solid rgba(244,63,94,0.3);
    color: #FB7185;
  }
  .success-msg {
    background: rgba(16,185,129,0.15);
    border: 1px solid rgba(16,185,129,0.3);
    color: #34D399;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
    margin-bottom: 1.4rem;
  }

  .input-wrap {
    position: relative;
    display: flex;
    align-items: center;

    &.animate-in { animation: ${slideIn} 0.35s ease both; }

    .input-icon {
      position: absolute;
      left: 1rem;
      font-size: 1rem;
      pointer-events: none;
      z-index: 2;
    }

    input {
      width: 100%;
      padding: 0.85rem 1rem 0.85rem 2.8rem;
      background: rgba(255,255,255,0.07);
      border: 1px solid rgba(255,255,255,0.15);
      border-radius: 12px;
      color: #ffffff;
      font-size: 0.95rem;
      font-family: 'Outfit', sans-serif;
      transition: all 0.25s ease;
      outline: none;

      &::placeholder { color: rgba(255,255,255,0.35); }
      &:focus {
        border-color: rgba(167,139,250,0.7);
        background: rgba(167,139,250,0.1);
        box-shadow: 0 0 0 3px rgba(124,58,237,0.2);
      }
    }
  }

  .submit-btn {
    width: 100%;
    padding: 0.9rem 1.5rem;
    border: none;
    border-radius: 14px;
    background: linear-gradient(135deg, #7C3AED 0%, #A78BFA 50%, #7C3AED 100%);
    background-size: 200% auto;
    color: white;
    font-size: 1rem;
    font-weight: 700;
    font-family: 'Outfit', sans-serif;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
    transition: all 0.3s ease;
    box-shadow: 0 8px 25px rgba(124,58,237,0.4);
    margin-bottom: 1.2rem;

    &:hover:not(:disabled) {
      background-position: right center;
      transform: translateY(-2px);
      box-shadow: 0 15px 35px rgba(124,58,237,0.55);
      animation: ${shimmerAnim} 1.5s linear infinite;
    }
    &:active:not(:disabled) { transform: scale(0.98); }
    &:disabled { opacity: 0.7; cursor: not-allowed; }
    &.loading { pointer-events: none; }

    .btn-arrow { transition: transform 0.3s; font-size: 1.1rem; }
    &:hover .btn-arrow { transform: translateX(4px); }

    .spinner {
      width: 20px; height: 20px;
      border: 2px solid rgba(255,255,255,0.3);
      border-top-color: white;
      border-radius: 50%;
      animation: ${spinAnim} 0.7s linear infinite;
    }
  }

  .switch-link {
    text-align: center;
    font-size: 0.85rem;
    color: rgba(255,255,255,0.45);

    span {
      color: #A78BFA;
      cursor: pointer;
      font-weight: 600;
      transition: color 0.2s;

      &:hover { color: #C4B5FD; text-decoration: underline; }
    }
  }
`;

export default Auth;
