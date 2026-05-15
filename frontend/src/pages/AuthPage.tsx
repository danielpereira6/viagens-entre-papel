import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../services/user';

export default function AuthPage() {
  const { login } = useAuth();

  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const logoUrl = '/images/vep-logo.png';

  const styles = `
    :root {
      --cream: #FFFFFF;
      --warm: #F5EFE8;
      --ink: #261708;
      --muted: #8C7B6E;
      --accent: #7C4F2F;
      --rose: #A8694A;
      --border: rgba(38, 23, 8, 0.12);
      --serif: 'Playfair Display', Georgia, serif;
      --sans: 'Inter', sans-serif;
    }

    #loginPage {
      position: fixed;
      inset: 0;
      background: #fff;
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center
    }

    #loginPage.hidden {
      display: none
    }

    .lp-box {
      background: #fff;
      border: 0.5px solid rgba(124, 79, 47, .22);
      padding: 3rem 2.5rem;
      width: 90%;
      max-width: 380px;
      text-align: center
    }

    .lp-box img {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      object-fit: cover;
      margin: 0 auto 1.25rem;
      display: block
    }

    .lp-titulo {
      font-family: var(--serif);
      font-size: 24px;
      font-weight: 400;
      font-style: italic;
      color: var(- -ink);
      margin-bottom: .25rem
    }

    .lp-sub {
      font-size: 10px;
      letter-spacing: .16em;
      text-transform: uppercase;
      color: var(-- muted);
      margin-bottom: 1.75rem;
      display: block
    }

    .lp-input {
      width: 100%;
      padding: 11px 14px;
      font-family: var(--sans);
      font-size: 14px;
      color: var(- -ink);
      background: var(--warm);
      border: 0.5px solid var(--border);
      outline: none;
      margin-bottom: 1rem;
      transition: border-color .2s
    }

    .lp-input:focus {
      border-color: var(--accent)
    }

    .lp-btn {
      width: 100%;
      padding: 13px;
      font-family: var(--sans);
      font-size: 11px;
      letter-spacing: .16em;
      text-transform: uppercase;
      color: #fff;
      background: var(--accent);
      border: none;
      cursor: pointer;
      margin-bottom: .75rem;
      transition: opacity .2s;
      display: block
    }

    .lp-btn:hover {
      opacity: .85
    }

    .lp-skip {
      background: none;
      border: none;
      font-family: var(--sans);
      font-size: 11px;
      letter-spacing: .1em;
      text-transform: uppercase;
      color: var(--muted);
      cursor: pointer;
      transition: color .2s
    }

    .lp-skip:hover {
      color: var(--ink)
    }

    .lp-erro {
      color: #b94a3a;
      font-size: 12px;
      margin-top: .75rem;
      display: none
    }
  `;

  async function handleLogin() {
    setError('');
    setIsLoading(true);

    try {
      const data = await loginUser(password);

      if (!data) return

      localStorage.setItem('user', data);

      // Update context
      login(data);
    } catch (err) {
      setError('Password incorreta. Tenta novamente.');
    } finally {
      setIsLoading(false);
    }
  }

  function entrarVisitante() {
    login(null); // handle guest mode
  }

  return (
    <div id="loginPage">
      <style>{styles}</style>

      <div className="lp-box">
        <img src={logoUrl} alt="Viagens entre Papel" />
        <h2 className="lp-titulo">Viagens entre Papel</h2>
        <span className="lp-sub">Livros · Viagens · Amor</span>

        <input
          className="lp-input"
          type="password"
          placeholder="Password de edição"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="lp-btn"
          onClick={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? 'A entrar...' : 'Entrar para editar'}
        </button>

        <button
          className="lp-skip"
          onClick={entrarVisitante}
        >
          Continuar como visitante
        </button>

        {error && (
          <p className="lp-erro" style={{ display: 'block' }}>
            {error}
          </p>
        )}
      </div>
    </div>
  );
}