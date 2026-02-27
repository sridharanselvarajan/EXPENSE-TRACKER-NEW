import { useEffect, useRef, useState } from 'react'
import styled, { keyframes } from 'styled-components'

/**
 * AnimatedSelect – A fully custom animated dropdown that replaces <select>
 * Props:
 *   value        – currently selected value
 *   onChange     – (value: string) => void
 *   options      – [{ value, label }]
 *   placeholder  – placeholder text
 *   accentColor  – hex/rgba for focus glow (default purple)
 */
function AnimatedSelect({
    value, onChange, options, placeholder = 'Select an option',
    accentColor = 'rgba(167,139,250,0.5)',
}) {
    const [open, setOpen] = useState(false)
    const [focused, setFocused] = useState(false)
    const ref = useRef(null)

    const selected = options.find(o => o.value === value)

    // Close on outside click
    useEffect(() => {
        const handler = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false)
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [])

    const handleSelect = (val) => {
        onChange({ target: { value: val } })
        setOpen(false)
    }

    return (
        <SelectWrapper ref={ref} accent={accentColor} className={`${open ? 'open' : ''} ${focused ? 'focused' : ''}`}>
            <div
                className="select-trigger"
                onClick={() => { setOpen(o => !o); setFocused(true); }}
                onBlur={() => setFocused(false)}
                tabIndex={0}
            >
                <span className={`trigger-label ${!selected ? 'placeholder' : ''}`}>
                    {selected ? selected.label : placeholder}
                </span>
                <span className="trigger-arrow">›</span>
            </div>

            {open && (
                <div className="select-menu">
                    {options.map((opt, i) => (
                        <div
                            key={opt.value}
                            className={`select-option ${value === opt.value ? 'active' : ''}`}
                            onClick={() => handleSelect(opt.value)}
                            style={{ animationDelay: `${i * 0.03}s` }}
                        >
                            <span className="opt-label">{opt.label}</span>
                            {value === opt.value && <span className="opt-check">✓</span>}
                        </div>
                    ))}
                </div>
            )}
        </SelectWrapper>
    )
}

/* ── Keyframes ─── */
const menuIn = keyframes`
  from { opacity:0; transform: translateY(-8px) scaleY(0.95); }
  to   { opacity:1; transform: translateY(0)    scaleY(1); }
`
const optIn = keyframes`
  from { opacity:0; transform: translateX(-6px); }
  to   { opacity:1; transform: translateX(0); }
`

/* ── Styles ─── */
const SelectWrapper = styled.div`
    position: relative;
    user-select: none;

    .select-trigger {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.65rem 1rem;
        border-radius: 12px;
        border: 1px solid rgba(255,255,255,0.12);
        background: rgba(255,255,255,0.07);
        cursor: pointer;
        transition: all 0.25s ease;
        outline: none;

        .trigger-label {
            font-size: 0.9rem;
            font-weight: 500;
            color: rgba(255,255,255,0.85);
            font-family: 'Outfit', sans-serif;
            &.placeholder { color: rgba(255,255,255,0.25); }
        }

        .trigger-arrow {
            font-size: 1.1rem;
            color: rgba(255,255,255,0.5);
            transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
            line-height: 1;
            display: inline-block;
        }

        &:focus {
            border-color: ${p => p.accent};
            background: rgba(255,255,255,0.1);
            box-shadow: 0 0 0 3px ${p => p.accent.replace('0.5)', '0.12)')};
        }
    }

    &.open .select-trigger {
        border-color: ${p => p.accent};
        background: rgba(255,255,255,0.1);
        box-shadow: 0 0 0 3px ${p => p.accent.replace('0.5)', '0.12)')};
        border-radius: 12px 12px 0 0;

        .trigger-arrow { transform: rotate(90deg); }
    }

    .select-menu {
        position: absolute;
        top: 100%; left: 0; right: 0;
        background: rgba(20,12,60,0.97);
        border: 1px solid ${p => p.accent};
        border-top: none;
        border-radius: 0 0 14px 14px;
        overflow: hidden;
        z-index: 999;
        animation: ${menuIn} 0.22s cubic-bezier(0.16,1,0.3,1) both;
        box-shadow: 0 16px 40px rgba(0,0,0,0.4);
        max-height: 220px;
        overflow-y: auto;

        /* Custom scrollbar */
        &::-webkit-scrollbar { width: 4px; }
        &::-webkit-scrollbar-track { background: transparent; }
        &::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 4px; }
    }

    .select-option {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.65rem 1rem;
        font-size: 0.88rem;
        font-family: 'Outfit', sans-serif;
        color: rgba(255,255,255,0.65);
        cursor: pointer;
        transition: all 0.2s ease;
        border-bottom: 1px solid rgba(255,255,255,0.05);
        animation: ${optIn} 0.25s ease both;

        &:last-child { border-bottom: none; }

        .opt-check {
            font-size: 0.75rem;
            color: ${p => p.accent};
        }

        &.active {
            background: ${p => p.accent.replace('0.5)', '0.12)')};
            color: #fff;
            font-weight: 600;
        }

        &:hover:not(.active) {
            background: rgba(255,255,255,0.07);
            color: rgba(255,255,255,0.9);
            padding-left: 1.3rem;
        }
    }
`

export default AnimatedSelect
