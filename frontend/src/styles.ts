// Theme colors - same as original design
export const theme = {
  colors: {
    cream: '#FFFFFF',
    warm: '#FAF6F0',
    warm2: '#F0E8DC',
    ink: '#1C1A18',
    muted: '#7A6E62',
    accent: '#8B5E3C',
    rose: '#C4856A',
    border: 'rgba(28,26,24,0.1)',
  },
  fonts: {
    serif: "'Playfair Display', Georgia, serif",
    sans: "'Inter', sans-serif",
  },
};

export const globalStyles = `
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: ${theme.fonts.sans};
    background: ${theme.colors.cream};
    color: ${theme.colors.ink};
    font-weight: 400;
    line-height: 1.6;
    overflow-x: hidden;
  }

  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500&family=Inter:wght@300;400;500&display=swap');
`;

export const navStyles = `
  nav {
    position: sticky;
    top: 0;
    z-index: 100;
    background: rgba(255,255,255,0.97);
    border-bottom: 0.5px solid ${theme.colors.border};
    padding: 0 2.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 68px;
    backdrop-filter: blur(8px);
  }

  .nav-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
  }

  .nav-logo img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 50%;
  }

  .nav-logo span {
    font-family: ${theme.fonts.serif};
    font-size: 17px;
    font-weight: 400;
    font-style: italic;
    color: ${theme.colors.accent};
    letter-spacing: 0.02em;
  }

  .nav-links {
    display: flex;
    gap: 2.5rem;
    list-style: none;
  }

  .nav-links a {
    font-size: 10px;
    font-weight: 400;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${theme.colors.muted};
    cursor: pointer;
    text-decoration: none;
    transition: color 0.2s;
    padding-bottom: 2px;
  }

  .nav-links a:hover,
  .nav-links a.active {
    color: ${theme.colors.ink};
    border-bottom: 0.5px solid ${theme.colors.ink};
  }

  .nav-toggle {
    display: none;
    flex-direction: column;
    gap: 5px;
    cursor: pointer;
    background: none;
    border: none;
    padding: 4px;
  }

  .nav-toggle span {
    display: block;
    width: 22px;
    height: 0.5px;
    background: ${theme.colors.ink};
  }

  @media (max-width: 768px) {
    nav {
      padding: 0 1.5rem;
    }

    .nav-links {
      display: none;
    }

    .nav-links.open {
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 68px;
      left: 0;
      right: 0;
      background: #fff;
      padding: 1.5rem;
      border-bottom: 0.5px solid ${theme.colors.border};
      gap: 1.5rem;
      z-index: 99;
    }

    .nav-toggle {
      display: flex;
    }
  }
`;

export const heroStyles = `
  @keyframes fadeUp {
    from {
      opacity: 0;
      transform: translateY(18px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .fu {
    opacity: 0;
    animation: fadeUp 0.7s ease forwards;
  }

  .d1 { animation-delay: 0.08s; }
  .d2 { animation-delay: 0.2s; }
  .d3 { animation-delay: 0.34s; }

  .hero {
    min-height: 88vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    padding: 5rem 4rem 4rem;
    gap: 5rem;
  }

  .hero-tag {
    font-size: 10px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: ${theme.colors.rose};
    margin-bottom: 1.5rem;
  }

  .hero-h1 {
    font-family: ${theme.fonts.serif};
    font-size: clamp(54px, 7vw, 90px);
    font-weight: 300;
    line-height: 1;
    color: ${theme.colors.ink};
    margin-bottom: 1.5rem;
  }

  .hero-h1 em {
    font-style: italic;
    color: ${theme.colors.accent};
  }

  .hero-sub {
    font-size: 14px;
    color: ${theme.colors.muted};
    line-height: 1.65;
  }

  .hero-quote-box {
    width: 100%;
    height: 100%;
    min-height: 480px;
    background: ${theme.colors.warm};
    border: 0.5px solid ${theme.colors.border};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    padding: 3rem;
    position: relative;
  }

  .hero-quote-line {
    width: 2px;
    height: 60px;
    background: rgba(139, 94, 60, 0.18);
  }

  .hero-quote-box p {
    font-family: ${theme.fonts.serif};
    font-size: 16px;
    font-style: italic;
    color: ${theme.colors.muted};
    text-align: center;
    line-height: 1.6;
  }

  .hero-quote-box small {
    font-size: 10px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${theme.colors.rose};
  }

  .hero-frame {
    position: absolute;
    inset: 0;
    border: 0.5px solid rgba(139, 94, 60, 0.2);
    transform: translate(14px, 14px);
    pointer-events: none;
  }

  @media (max-width: 768px) {
    .hero {
      grid-template-columns: 1fr;
      padding: 3rem 1.5rem;
      min-height: auto;
      gap: 2rem;
    }

    .hero-quote-box {
      min-height: 260px;
    }
  }
`;

export const homeCardsStyles = `
  .home-cards {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    border-top: 0.5px solid ${theme.colors.border};
  }

  .home-card {
    padding: 3rem 2.5rem;
    border-right: 0.5px solid ${theme.colors.border};
    cursor: pointer;
    transition: background 0.2s;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .home-card:last-child {
    border-right: none;
  }

  .home-card:hover {
    background: ${theme.colors.warm};
  }

  .hcn {
    font-family: ${theme.fonts.serif};
    font-size: 11px;
    color: ${theme.colors.rose};
    letter-spacing: 0.1em;
  }

  .hct {
    font-family: ${theme.fonts.serif};
    font-size: 28px;
    font-weight: 300;
    font-style: italic;
    color: ${theme.colors.ink};
  }

  .hcd {
    font-size: 14px;
    color: ${theme.colors.muted};
    line-height: 1.6;
  }

  .hca {
    font-size: 20px;
    color: ${theme.colors.rose};
    margin-top: auto;
    transition: transform 0.2s;
  }

  .home-card:hover .hca {
    transform: translateX(6px);
  }

  @media (max-width: 768px) {
    .home-cards {
      grid-template-columns: 1fr;
    }

    .home-card {
      border-right: none !important;
      border-bottom: 0.5px solid ${theme.colors.border};
    }

    .home-card:last-child {
      border-bottom: none;
    }
  }
`;

export const footerStyles = `
  footer {
    background: ${theme.colors.ink};
    color: ${theme.colors.cream};
    padding: 3rem 4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .footer-logo {
    font-family: ${theme.fonts.serif};
    font-size: 18px;
    font-weight: 300;
    font-style: italic;
    color: ${theme.colors.cream};
  }

  .footer-logo span {
    color: ${theme.colors.rose};
  }

  .footer-links {
    display: flex;
    gap: 2rem;
    list-style: none;
  }

  .footer-links a {
    font-size: 10px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(249, 245, 239, 0.45);
    cursor: pointer;
    text-decoration: none;
    transition: color 0.2s;
  }

  .footer-links a:hover {
    color: ${theme.colors.cream};
  }

  .footer-copy {
    font-size: 11px;
    color: rgba(249, 245, 239, 0.25);
  }

  @media (max-width: 768px) {
    footer {
      flex-direction: column;
      gap: 1.5rem;
      text-align: center;
      padding: 2.5rem 1.5rem;
    }

    .footer-links {
      flex-wrap: wrap;
      justify-content: center;
    }
  }
`;