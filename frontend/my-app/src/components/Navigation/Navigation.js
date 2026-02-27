import styled, { keyframes } from "styled-components";
import avatar from "../../img/avatar.png";
import { menuItems } from "../../utils/menuItems";

function Navigation({ active, setActive, isLoggedIn, setIsLoggedIn, username }) {
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <NavStyled>
      {/* User profile section */}
      <div className="user-con">
        <div className="avatar-wrap">
          <img src={avatar} alt="User Avatar" />
          <div className="online-dot" />
        </div>
        <div className="text">
          <h2>{username ? username : "User"}</h2>
          <p>💰 My Finance Hub</p>
        </div>
      </div>

      {/* Menu items */}
      <ul className="menu-items">
        {menuItems.map((item) => (
          <li
            key={item.id}
            onClick={() => setActive(item.id)}
            className={active === item.id ? "active" : ""}
          >
            <span className="menu-icon">{item.icon}</span>
            <span className="menu-label">{item.title}</span>
            {active === item.id && <span className="active-indicator" />}
          </li>
        ))}
      </ul>

      {/* Bottom: sign out */}
      <div className="bottom-nav">
        <div className="divider" />
        <button className="sign-out" onClick={handleLogout} id="nav-signout-btn">
          <span>🚪</span>
          <span>Sign Out</span>
        </button>
      </div>
    </NavStyled>
  );
}

/* ─── Keyframes ─── */
const slideInLeft = keyframes`
  from { opacity: 0; transform: translateX(-30px); }
  to   { opacity: 1; transform: translateX(0); }
`;
const glowPulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(167,139,250,0.4); }
  50%       { box-shadow: 0 0 0 8px rgba(167,139,250,0); }
`;
const shimmerItem = keyframes`
  0%   { background-position: -200% center; }
  100% { background-position:  200% center; }
`;

/* ─── Styles ─── */
const NavStyled = styled.nav`
  padding: 2rem 1.5rem;
  width: 280px;
  min-width: 280px;
  height: 100%;
  background: linear-gradient(160deg, rgba(22,15,60,0.97) 0%, rgba(35,22,90,0.95) 100%);
  border: 1px solid rgba(167,139,250,0.2);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.5rem;
  box-shadow: 0 20px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08);
  animation: ${slideInLeft} 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
  position: relative;
  overflow: hidden;

  /* Subtle top glow */
  &::before {
    content: '';
    position: absolute;
    top: 0; left: 50%;
    transform: translateX(-50%);
    width: 80%; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(167,139,250,0.6), transparent);
  }

  /* Background orb */
  &::after {
    content: '';
    position: absolute;
    bottom: -80px; right: -80px;
    width: 200px; height: 200px;
    background: radial-gradient(circle, rgba(124,58,237,0.2), transparent 70%);
    border-radius: 50%;
    pointer-events: none;
  }

  /* ── User Section ── */
  .user-con {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.5rem;
    border-radius: 16px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.08);
    transition: all 0.3s ease;

    &:hover {
      background: rgba(167,139,250,0.1);
      border-color: rgba(167,139,250,0.25);
      transform: translateX(3px);
    }

    .avatar-wrap {
      position: relative;
      flex-shrink: 0;

      img {
        width: 52px; height: 52px;
        border-radius: 50%;
        object-fit: cover;
        border: 2px solid rgba(167,139,250,0.5);
        padding: 2px;
        animation: ${glowPulse} 3s ease-in-out infinite;
      }

      .online-dot {
        position: absolute;
        bottom: 2px; right: 2px;
        width: 10px; height: 10px;
        background: #10B981;
        border-radius: 50%;
        border: 2px solid rgba(22,15,60,1);
      }
    }

    .text {
      h2 {
        color: #ffffff;
        font-size: 1rem;
        font-weight: 700;
        margin-bottom: 2px;
      }
      p {
        color: rgba(167,139,250,0.8);
        font-size: 0.75rem;
        font-weight: 500;
      }
    }
  }

  /* ── Menu Items ── */
  .menu-items {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;

    li {
      display: flex;
      align-items: center;
      gap: 0.9rem;
      font-weight: 500;
      padding: 0.75rem 1rem;
      border-radius: 12px;
      cursor: pointer;
      color: rgba(255,255,255,0.55);
      transition: all 0.25s ease;
      position: relative;
      overflow: hidden;

      .menu-icon {
        font-size: 1.1rem;
        transition: transform 0.3s ease;
        flex-shrink: 0;
      }

      .menu-label {
        font-size: 0.92rem;
        color: inherit;
        transition: color 0.25s;
      }

      .active-indicator {
        position: absolute;
        right: 0.8rem;
        width: 6px; height: 6px;
        background: #A78BFA;
        border-radius: 50%;
        box-shadow: 0 0 8px rgba(167,139,250,0.8);
      }

      &:hover {
        background: rgba(167,139,250,0.1);
        color: rgba(255,255,255,0.85);
        transform: translateX(4px);

        .menu-icon { transform: scale(1.15); }
      }

      &.active {
        background: linear-gradient(135deg, rgba(124,58,237,0.35), rgba(167,139,250,0.15));
        color: #ffffff;
        border: 1px solid rgba(167,139,250,0.25);
        box-shadow: 0 4px 15px rgba(124,58,237,0.2);

        &::before {
          content: '';
          position: absolute;
          left: 0; top: 0;
          width: 3px; height: 100%;
          background: linear-gradient(180deg, #A78BFA, #7C3AED);
          border-radius: 0 3px 3px 0;
        }

        .menu-icon { transform: scale(1.1); }
      }
    }
  }

  /* ── Bottom ── */
  .bottom-nav {
    .divider {
      height: 1px;
      background: rgba(255,255,255,0.08);
      margin-bottom: 1rem;
    }

    .sign-out {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.6rem;
      padding: 0.75rem;
      background: rgba(244,63,94,0.1);
      border: 1px solid rgba(244,63,94,0.25);
      color: rgba(244,63,94,0.85);
      font-size: 0.92rem;
      font-weight: 700;
      font-family: 'Outfit', sans-serif;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background: rgba(244,63,94,0.2);
        border-color: rgba(244,63,94,0.5);
        color: #FB7185;
        transform: translateY(-1px);
        box-shadow: 0 8px 20px rgba(244,63,94,0.2);
      }
      &:active { transform: scale(0.98); }
    }
  }
`;

export default Navigation;
