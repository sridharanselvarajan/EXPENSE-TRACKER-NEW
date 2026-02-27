import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');

    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
    }

    :root{
        --primary-color: #222260;
        --primary-color2: rgba(34, 34, 96, .6);
        --primary-color3: rgba(34, 34, 96, .4);

        /* New premium palette */
        --accent-purple: #7C3AED;
        --accent-purple-light: #A78BFA;
        --accent-purple-dark: #5B21B6;
        --color-green: #10B981;
        --color-green-light: #34D399;
        --color-pink: #F43F5E;
        --color-pink-light: #FB7185;
        --color-blue: #3B82F6;
        --color-blue-light: #60A5FA;
        --color-gold: #F59E0B;
        --color-grey: #aaa;
        --color-delete: #FF0000;

        --glass-bg: rgba(255,255,255,0.08);
        --glass-border: rgba(255,255,255,0.18);
        --shadow-lg: 0 25px 50px rgba(0,0,0,0.25);
    }

    body{
        font-family: 'Outfit', 'Nunito', sans-serif;
        font-size: clamp(1rem, 1.5vw, 1.2rem);
        overflow: hidden;
        color: rgba(34, 34, 96, .6);
    }

    h1, h2, h3, h4, h5, h6{
        color: var(--primary-color);
    }

    .error{
        color: #F43F5E;
        animation: shake 0.5s ease-in-out;
    }

    @keyframes shake {
        0%{ transform: translateX(0); }
        25%{ transform: translateX(10px); }
        50%{ transform: translateX(-10px); }
        75%{ transform: translateX(10px); }
        100%{ transform: translateX(0); }
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes slideUp {
        from { opacity: 0; transform: translateY(40px); }
        to { opacity: 1; transform: translateY(0); }
    }

    @keyframes slideDown {
        from { opacity: 0; transform: translateY(-40px); }
        to { opacity: 1; transform: translateY(0); }
    }

    @keyframes pulse {
        0%, 100% { box-shadow: 0 0 0 0 rgba(124, 58, 237, 0.4); }
        50% { box-shadow: 0 0 0 15px rgba(124, 58, 237, 0); }
    }

    @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        33% { transform: translateY(-20px) rotate(5deg); }
        66% { transform: translateY(10px) rotate(-5deg); }
    }

    @keyframes shimmer {
        0% { background-position: -200% center; }
        100% { background-position: 200% center; }
    }

    @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }

    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;