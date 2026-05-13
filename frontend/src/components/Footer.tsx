
export default function Footer() {
  return (
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
  )
}