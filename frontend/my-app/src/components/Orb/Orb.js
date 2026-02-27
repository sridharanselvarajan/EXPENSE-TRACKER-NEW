import styled, { keyframes } from 'styled-components'
import { useWindowSize } from '../../utils/useWindowSize'

function Orb() {
    const { width, height } = useWindowSize()

    return (
        <OrbContainer>
            {/* Primary orb – purple/violet, slow diagonal drift */}
            <OrbOne w={width} h={height} />
            {/* Secondary orb – teal/green, different path */}
            <OrbTwo w={width} h={height} />
            {/* Accent orb – pink/rose, small and fast */}
            <OrbThree w={width} h={height} />
            {/* Deep glow orb – indigo, static glow in corner */}
            <OrbFour />
        </OrbContainer>
    )
}

/* ── Animations ─────────────────────────────────── */
const move1 = (w, h) => keyframes`
    0%   { transform: translate(0, 0)          scale(1); }
    25%  { transform: translate(${w * 0.6}px, ${h * 0.3}px) scale(1.1); }
    50%  { transform: translate(${w * 0.3}px, ${h * 0.7}px) scale(0.9); }
    75%  { transform: translate(${w * 0.8}px, ${h * 0.1}px) scale(1.05); }
    100% { transform: translate(0, 0)          scale(1); }
`

const move2 = (w, h) => keyframes`
    0%   { transform: translate(${w}px, 0)             scale(1); }
    33%  { transform: translate(${w * 0.2}px, ${h * 0.6}px) scale(1.15); }
    66%  { transform: translate(${w * 0.7}px, ${h * 0.4}px) scale(0.85); }
    100% { transform: translate(${w}px, 0)             scale(1); }
`

const move3 = (w, h) => keyframes`
    0%   { transform: translate(${w * 0.5}px, ${h}px)       rotate(0deg);   }
    50%  { transform: translate(${w * 0.1}px, ${h * 0.1}px) rotate(180deg); }
    100% { transform: translate(${w * 0.5}px, ${h}px)       rotate(360deg); }
`

const pulseGlow = keyframes`
    0%, 100% { opacity: 0.35; transform: scale(1); }
    50%       { opacity: 0.55; transform: scale(1.12); }
`

/* ── Styled components ─────────────────────────── */
const OrbContainer = styled.div`
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    overflow: hidden;
`

const OrbOne = styled.div`
    position: absolute;
    top: -20vh; left: -20vh;
    width: 65vh; height: 65vh;
    border-radius: 50%;
    background: radial-gradient(circle at 40% 40%,
        rgba(139,92,246,0.55) 0%,
        rgba(124,58,237,0.35) 40%,
        rgba(76,29,149,0.1)  100%);
    filter: blur(80px);
    animation: ${props => move1(props.w, props.h)} 20s ease-in-out infinite;
`

const OrbTwo = styled.div`
    position: absolute;
    bottom: -15vh; right: -15vh;
    width: 55vh; height: 55vh;
    border-radius: 50%;
    background: radial-gradient(circle at 60% 60%,
        rgba(16,185,129,0.4)  0%,
        rgba(5,150,105,0.2)   50%,
        rgba(6,78,59,0.05)   100%);
    filter: blur(90px);
    animation: ${props => move2(props.w, props.h)} 25s ease-in-out infinite;
`

const OrbThree = styled.div`
    position: absolute;
    top: 40vh; left: 40vw;
    width: 35vh; height: 35vh;
    border-radius: 50%;
    background: radial-gradient(circle at 50% 50%,
        rgba(244,63,94,0.35)  0%,
        rgba(251,113,133,0.15) 50%,
        transparent           100%);
    filter: blur(70px);
    animation: ${props => move3(props.w, props.h)} 18s linear infinite;
`

const OrbFour = styled.div`
    position: absolute;
    top: 20vh; right: 20vw;
    width: 40vh; height: 40vh;
    border-radius: 50%;
    background: radial-gradient(circle at 50% 50%,
        rgba(59,130,246,0.25) 0%,
        rgba(37,99,235,0.1)  60%,
        transparent          100%);
    filter: blur(100px);
    animation: ${pulseGlow} 8s ease-in-out infinite;
`

export default Orb