import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function AuthPage() {
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError('Por favor, preenche todos os campos.');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Email inválido.');
      return false;
    }
    if (formData.password.length < 6) {
      setError('A palavra-passe deve ter pelo menos 6 caracteres.');
      return false;
    }
    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError('As palavras-passe não correspondem.');
      return false;
    }
    if (!isLogin && !formData.name) {
      setError('Por favor, preenche o teu nome.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1200));

    const userData = {
      name: isLogin ? 'Utilizador' : formData.name,
      token: `token_${Date.now()}`,
      isAdmin: false
    };

    login(userData);
    setIsLoading(false);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    setError('');
  };

  return (
    <div className="auth-wrapper">
      {/* Decorative background elements */}
      <div className="auth-blob auth-blob-1"></div>
      <div className="auth-blob auth-blob-2"></div>
      <div className="auth-blob auth-blob-3"></div>

      <div className="auth-container">
        {/* Left side - Literary quote & branding */}
        <div className="auth-side auth-side-left">
          <div className="auth-brand">
            <div className="auth-logo">VP</div>
            <h1 className="auth-brand-title">Viagens entre<br /><em>Papel</em></h1>
            <p className="auth-brand-tagline">Um espaço onde as páginas se tornam destinos</p>
          </div>

          <div className="auth-quote-container">
            <div className="auth-quote-accent"></div>
            <blockquote className="auth-quote">
              {isLogin
                ? '"Voltar é encontrar-se a si mesmo numa página conhecida, mas lida com outros olhos."'
                : '"O começo é a parte mais corajosa de qualquer história — e a tua está por começar."'
              }
            </blockquote>
            <p className="auth-quote-source">— do diário</p>
          </div>

          <p className="auth-side-cta">
            {isLogin
              ? 'Ainda não tens conta? '
              : 'Já tens conta? '
            }
            <button className="auth-toggle-link" onClick={toggleMode}>
              {isLogin ? 'Cria uma aqui' : 'Entra aqui'}
            </button>
          </p>
        </div>

        {/* Right side - Form */}
        <div className="auth-side auth-side-right">
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-form-header">
              <h2 className="auth-form-title">
                {isLogin ? 'Bem-vinda de volta' : 'Bem-vinda ao cantinho'}
              </h2>
              <p className="auth-form-subtitle">
                {isLogin
                  ? 'Continua a tua jornada entre páginas e destinos'
                  : 'Comça a partilhar as tuas histórias'
                }
              </p>
            </div>

            {error && (
              <div className="auth-error">
                <span className="auth-error-icon">⚠</span>
                {error}
              </div>
            )}

            {!isLogin && (
              <div className="auth-input-group">
                <label htmlFor="name" className="auth-label">Nome completo</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nome"
                  className="auth-input"
                  disabled={isLoading}
                />
              </div>
            )}

            <div className="auth-input-group">
              <label htmlFor="email" className="auth-label">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="tu@exemplo.pt"
                className="auth-input"
                disabled={isLoading}
              />
            </div>

            <div className="auth-input-group">
              <label htmlFor="password" className="auth-label">Palavra-passe</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="auth-input"
                disabled={isLoading}
              />
            </div>

            {!isLogin && (
              <div className="auth-input-group">
                <label htmlFor="confirmPassword" className="auth-label">Confirma a palavra-passe</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="auth-input"
                  disabled={isLoading}
                />
              </div>
            )}

            <button
              type="submit"
              className={`auth-submit ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="auth-spinner"></span>
                  {isLogin ? 'A entrar...' : 'A criar conta...'}
                </>
              ) : (
                isLogin ? 'Entrar' : 'Criar conta'
              )}
            </button>

            <p className="auth-footer-text">
              {isLogin
                ? 'A tua privacidade é sagrada. Os teus dados estão seguros connosco.'
                : 'Ao criar uma conta, concordas com os nossos termos.'
              }
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
