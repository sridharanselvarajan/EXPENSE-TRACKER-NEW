import { useMemo, useState } from "react";
import styled, { keyframes } from "styled-components";
import Dashboard from "./components/Dashboard/Dashboard";
import Expenses from "./components/Expenses/Expenses";
import Income from "./components/Income/Income";
import Landing from "./components/Landing/Landing";
import Login from "./components/Login/Login";
import Navigation from "./components/Navigation/Navigation";
import Orb from "./components/Orb/Orb";
import { useGlobalContext } from "./context/globalContext";
import bg from "./img/bg.png";
import { MainLayout } from "./styles/Layouts";

// views: "landing" | "auth" | "app"
function App() {
  const [view, setView] = useState("landing");
  const [authMode, setAuthMode] = useState("login"); // "login" | "signup"
  const [active, setActive] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const global = useGlobalContext();

  const orbMemo = useMemo(() => <Orb />, []);

  // Called by Landing page buttons
  const handleLandingAction = (mode) => {
    setAuthMode(mode); // "login" or "signup"
    setView("auth");
  };

  // Called by Auth when login is successful
  const handleLoggedIn = (value) => {
    setIsLoggedIn(value);
    if (value) setView("app");
  };

  // Called by Navigation Sign Out
  const handleSignOut = () => {
    setIsLoggedIn(false);
    setUsername("");
    setActive(1);
    setView("landing");
  };

  if (view === "landing") {
    return (
      <AppStyled bg={bg} className="App">
        {orbMemo}
        <Landing onAction={handleLandingAction} />
      </AppStyled>
    );
  }

  if (view === "auth") {
    return (
      <AppStyled bg={bg} className="App">
        {orbMemo}
        <Login
          setIsLoggedIn={handleLoggedIn}
          setUsername={setUsername}
          initialMode={authMode}
        />
      </AppStyled>
    );
  }

  // view === "app"
  return (
    <AppStyled bg={bg} className="App app-view">
      {orbMemo}
      <MainLayout>
        <Navigation
          active={active}
          setActive={setActive}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={handleSignOut}
          username={username}
        />
        <main>
          {active === 1 && <Dashboard />}
          {active === 2 && <Dashboard />}
          {active === 3 && <Income />}
          {active === 4 && <Expenses />}
        </main>
      </MainLayout>
    </AppStyled>
  );
}

const fadeInApp = keyframes`
  from { opacity: 0; transform: scale(0.98); }
  to   { opacity: 1; transform: scale(1); }
`;

const AppStyled = styled.div`
  height: 100vh;
  background: linear-gradient(135deg, #0a0520 0%, #0d0a2e 40%, #0f0830 70%, #080520 100%);
  position: relative;
  overflow: hidden;

  /* Subtle deep glow layers */
  &::before {
    content: '';
    position: fixed;
    top: -10vh; left: -10vw;
    width: 50vw; height: 50vh;
    background: radial-gradient(ellipse, rgba(76,29,149,0.25) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }
  &::after {
    content: '';
    position: fixed;
    bottom: -10vh; right: -10vw;
    width: 50vw; height: 50vh;
    background: radial-gradient(ellipse, rgba(5,150,105,0.12) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }

  &.app-view {
    animation: ${fadeInApp} 0.5s ease both;
  }

  main {
    flex: 1;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(167,139,250,0.15);
    backdrop-filter: blur(24px);
    border-radius: 28px;
    overflow-x: hidden;
    box-shadow: 0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05);
    position: relative;
    z-index: 1;
  }
`;

export default App;
