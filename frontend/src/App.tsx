import { useState } from 'react';
import { globalStyles, navStyles, heroStyles, homeCardsStyles, footerStyles } from './styles';
import HomePage from './pages/HomePage';
import BooksPage from './pages/BookPage';
import TripsPage from './pages/TripsPage';
import LovePage from './pages/LovePage';
import AboutPage from './pages/AboutPage';
import AuthPage from './pages/AuthPage';
import { useAuth } from './context/AuthContext';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'livros' | 'viagens' | 'amor' | 'sobre' | 'login'>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleNavClick = (page: typeof currentPage) => {
    if (page === "login" && user) {
      logout();
    }
    else {
      setCurrentPage(page);
      setMobileMenuOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const logoUrl = '/images/vep-logo.png'

  return (
    <div className="app-container">
      <style>{globalStyles}</style>
      <style>{navStyles}</style>
      <style>{heroStyles}</style>
      <style>{homeCardsStyles}</style>
      <style>{footerStyles}</style>

      {/* Navigation */}
      <nav>
        <button className="nav-logo" onClick={() => handleNavClick('home')}>
          <img src={logoUrl} alt="Viagens entre Papel" />
          <span>Viagens entre Papel</span>
        </button>

        <ul className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
          <li>
            <a
              onClick={() => handleNavClick('home')}
              className={currentPage === 'home' ? 'active' : ''}
            >
              Home
            </a>
          </li>
          <li>
            <a
              onClick={() => handleNavClick('livros')}
              className={currentPage === 'livros' ? 'active' : ''}
            >
              Livros
            </a>
          </li>
          <li>
            <a
              onClick={() => handleNavClick('viagens')}
              className={currentPage === 'viagens' ? 'active' : ''}
            >
              Viagens
            </a>
          </li>
          <li>
            <a
              onClick={() => handleNavClick('amor')}
              className={currentPage === 'amor' ? 'active' : ''}
            >
              Amor
            </a>
          </li>
          <li>
            <a
              onClick={() => handleNavClick('sobre')}
              className={currentPage === 'sobre' ? 'active' : ''}
            >
              Sobre mim
            </a>
          </li>
          <li>
            <a
              onClick={() => handleNavClick('login')}
              className={currentPage === 'login' ? 'active' : ''}
            >
              <i>
                {(user && user.user) ? user.user.username : "login"}
              </i>
            </a>
          </li>
        </ul>

        <button className="nav-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      {/* Pages */}
      {currentPage === 'home' && <HomePage onNavigate={handleNavClick} />}
      {currentPage === 'livros' && <BooksPage />}
      {currentPage === 'viagens' && <TripsPage />}
      {currentPage === 'amor' && <LovePage />}
      {currentPage === 'sobre' && <AboutPage />}
      {currentPage === 'login' && <AuthPage />}
    </div>
  );
}