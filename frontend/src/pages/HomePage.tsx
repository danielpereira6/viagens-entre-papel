import { theme } from '../styles';
// import { Footer } from "../components/Footer";

interface HomePageProps {
  onNavigate: (page: 'home' | 'livros' | 'viagens' | 'amor' | 'sobre') => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const styles = `
    .home-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

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
      animation: fadeUp 0.7s ease forwards;
      animation-delay: 0.08s;
      opacity: 0;
    }

    .hero-h1 {
      font-family: ${theme.fonts.serif};
      font-size: clamp(54px, 7vw, 90px);
      font-weight: 300;
      line-height: 1;
      color: ${theme.colors.ink};
      margin-bottom: 1.5rem;
      animation: fadeUp 0.7s ease forwards;
      animation-delay: 0.2s;
      opacity: 0;
    }

    .hero-h1 em {
      font-style: italic;
      color: ${theme.colors.accent};
    }

    .hero-sub {
      font-size: 14px;
      color: ${theme.colors.muted};
      line-height: 1.65;
      animation: fadeUp 0.7s ease forwards;
      animation-delay: 0.34s;
      opacity: 0;
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
      animation: fadeUp 0.7s ease forwards;
      animation-delay: 0.2s;
      opacity: 0;
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

    footer {
      background: ${theme.colors.ink};
      color: ${theme.colors.cream};
      padding: 3rem 4rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: auto;
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

  const cards = [
    {
      number: '01',
      title: 'Livros',
      description: 'Reviews, leituras e os livros que me partiram o coração — das melhores formas.',
      page: 'livros' as const,
    },
    {
      number: '02',
      title: 'Viagens',
      description: 'De Aveiro ao mundo — lugares que me ensinaram a olhar de forma diferente.',
      page: 'viagens' as const,
    },
    {
      number: '03',
      title: 'Amor',
      description: 'Palavras sobre sentimentos, pessoas e tudo o que fica quando o resto muda.',
      page: 'amor' as const,
    },
    {
      number: '04',
      title: 'Sobre mim',
      description: 'Por trás das páginas: a minha história, aquilo em que acredito e o que me move.',
      page: 'sobre' as const,
    },
  ];

  return (
    <div className="home-container">
      <style>{styles}</style>

      {/* Hero Section */}
      <div className="hero">
        <div>
          <p className="hero-tag">Livros · Viagens · Amor</p>
          <h1 className="hero-h1">
            Viagens<br />
            entre<br />
            <em>Papel</em>
          </h1>
          <p className="hero-sub">
            Um espaço onde as páginas se tornam destinos — e cada destino guarda uma história.
          </p>
        </div>

        <div style={{ position: 'relative', height: '100%' }}>
          <div className="hero-quote-box">
            <div className="hero-quote-line"></div>
            <p>"Um livro é um sonho que seguras nas mãos."</p>
            <small>Neil Gaiman</small>
            <div className="hero-quote-line"></div>
            <div className="hero-frame"></div>
          </div>
        </div>
      </div>

      {/* Cards Section */}
      <div className="home-cards">
        {cards.map((card) => (
          <div
            key={card.number}
            className="home-card"
            onClick={() => onNavigate(card.page)}
          >
            <span className="hcn">{card.number}</span>
            <h2 className="hct">{card.title}</h2>
            <p className="hcd">{card.description}</p>
            <span className="hca">→</span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer>
        <div className="footer-logo">
          Viagens entre <span>Papel</span>
        </div>
        <ul className="footer-links">
          <li>
            <a onClick={() => onNavigate('home')}>Home</a>
          </li>
          <li>
            <a onClick={() => onNavigate('livros')}>Livros</a>
          </li>
          <li>
            <a onClick={() => onNavigate('viagens')}>Viagens</a>
          </li>
          <li>
            <a onClick={() => onNavigate('amor')}>Amor</a>
          </li>
          <li>
            <a onClick={() => onNavigate('sobre')}>Sobre mim</a>
          </li>
        </ul>
        <span className="footer-copy">&copy; 2026 Viagens entre Papel</span>
      </footer>
    </div>
  );
}