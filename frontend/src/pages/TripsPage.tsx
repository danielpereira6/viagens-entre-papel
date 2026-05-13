import { useState } from 'react';
import { theme } from '../styles';
import { useAuth } from '../context/AuthContext';

interface Trip {
  id: string;
  title: string;
  date?: string;
  description: string;
}

export default function TripsPage() {
  const { isAdmin } = useAuth();
  const [trips, setTrips] = useState<Trip[]>([
    {
      id: '1',
      title: 'Lisboa em Abril',
      date: 'Abril 2024',
      description: 'Uma viagem mágica pela capital portuguesa, entre pastéis de Belém e vistas do Tejo.',
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', date: '', description: '' });

  const handleAddTrip = () => {
    if (formData.title && formData.description) {
      setTrips([...trips, { id: Date.now().toString(), ...formData }]);
      setFormData({ title: '', date: '', description: '' });
      setIsModalOpen(false);
    }
  };

  const styles = `
    .page-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .page-body {
      padding: 3rem 4rem 5rem;
      flex: 1;
    }

    .stories {
      display: flex;
      flex-direction: column;
      gap: 3.5rem;
    }

    .story-card {
      display: grid;
      gap: 2.5rem;
    }

    .story-date {
      font-size: 10px;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: ${theme.colors.rose};
      margin-bottom: 0.6rem;
    }

    .story-title {
      font-family: ${theme.fonts.serif};
      font-size: 24px;
      font-weight: 400;
      color: ${theme.colors.ink};
      line-height: 1.3;
      margin-bottom: 0.9rem;
    }

    .story-body {
      font-size: 14px;
      color: ${theme.colors.muted};
      line-height: 1.65;
    }

    .story-del {
      font-size: 10px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: ${theme.colors.muted};
      cursor: pointer;
      background: none;
      border: none;
      margin-top: 1rem;
      padding: 0;
      opacity: 0.5;
      transition: opacity 0.2s;
    }

    .story-del:hover {
      opacity: 1;
    }

    .empty-state {
      text-align: center;
      padding: 4rem 2rem;
      border: 0.5px dashed rgba(139, 94, 60, 0.25);
    }

    .empty-state p {
      font-family: ${theme.fonts.serif};
      font-size: 22px;
      font-style: italic;
      color: ${theme.colors.muted};
      margin-bottom: 0.5rem;
    }

    .empty-state small {
      font-size: 12px;
      color: ${theme.colors.muted};
      opacity: 0.7;
    }

    .add-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-family: ${theme.fonts.sans};
      font-size: 11px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: ${theme.colors.accent};
      cursor: pointer;
      background: none;
      border: 0.5px solid rgba(139, 94, 60, 0.4);
      padding: 10px 20px;
      transition: all 0.2s;
      margin-bottom: 2.5rem;
    }

    .add-btn:hover {
      background: ${theme.colors.warm};
      border-color: ${theme.colors.accent};
    }

    .modal-overlay {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(28, 26, 24, 0.5);
      z-index: 200;
      align-items: center;
      justify-content: center;
    }

    .modal-overlay.open {
      display: flex;
    }

    .modal {
      background: #fff;
      width: 90%;
      max-width: 600px;
      padding: 2.5rem;
      position: relative;
    }

    .modal h3 {
      font-family: ${theme.fonts.serif};
      font-size: 24px;
      font-weight: 400;
      color: ${theme.colors.ink};
      margin-bottom: 1.5rem;
    }

    .modal label {
      display: block;
      font-size: 10px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: ${theme.colors.muted};
      margin-bottom: 6px;
      margin-top: 1.25rem;
    }

    .modal input,
    .modal textarea {
      width: 100%;
      font-family: ${theme.fonts.sans};
      font-size: 14px;
      color: ${theme.colors.ink};
      background: ${theme.colors.warm};
      border: 0.5px solid ${theme.colors.border};
      padding: 10px 14px;
      outline: none;
    }

    .modal input:focus,
    .modal textarea:focus {
      border-color: ${theme.colors.accent};
    }

    .modal textarea {
      min-height: 120px;
      resize: vertical;
    }

    .modal-actions {
      display: flex;
      gap: 12px;
      margin-top: 2rem;
    }

    .btn-save {
      font-family: ${theme.fonts.sans};
      font-size: 11px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #fff;
      background: ${theme.colors.accent};
      border: none;
      padding: 12px 28px;
      cursor: pointer;
    }

    .btn-cancel {
      font-family: ${theme.fonts.sans};
      font-size: 11px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: ${theme.colors.muted};
      background: none;
      border: 0.5px solid ${theme.colors.border};
      padding: 12px 28px;
      cursor: pointer;
    }

    .modal-close {
      position: absolute;
      top: 1.25rem;
      right: 1.5rem;
      font-size: 24px;
      color: ${theme.colors.muted};
      cursor: pointer;
      background: none;
      border: none;
    }

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
    }

    .page-top {
      padding: 2rem 4rem 0;
    }

    .back-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 10px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: ${theme.colors.muted};
      cursor: pointer;
      background: none;
      border: none;
      padding: 0;
    }

    .page-hero {
      padding: 2.5rem 4rem 0;
    }

    .page-tag {
      font-size: 10px;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: ${theme.colors.rose};
      margin-bottom: 0.75rem;
    }

    .page-h1 {
      font-family: ${theme.fonts.serif};
      font-size: clamp(46px, 6vw, 78px);
      font-weight: 300;
      line-height: 1;
      color: ${theme.colors.ink};
      margin-bottom: 1rem;
    }

    .page-h1 em {
      font-style: italic;
      color: ${theme.colors.accent};
    }

    .page-sub {
      font-size: 14px;
      color: ${theme.colors.muted};
      line-height: 1.65;
      max-width: 500px;
      margin: auto;
    }

    .page-rule {
      margin: 2rem 4rem 0;
      height: 0.5px;
      background: ${theme.colors.border};
    }
  `;

  return (
    <div className="page-container">
      <style>{styles}</style>

      <div className="page-top">
        <button className="back-btn">← Voltar</button>
      </div>

      <div className="page-hero">
        <p className="page-tag">De Aveiro ao mundo</p>
        <h1 className="page-h1">As minhas <em>Viagens</em></h1>
        <p className="page-sub">
          Cada lugar tem uma história para contar — e eu estou aqui para a escrever.
        </p>
      </div>

      <div className="page-rule"></div>

      <div className="page-body">
        {isAdmin &&
          <button className="add-btn" onClick={() => setIsModalOpen(true)}>
            + Adicionar viagem
          </button>}

        {trips.length === 0 ? (
          <div className="empty-state">
            <p>Ainda sem viagens</p>
            <small>Clica em "Adicionar viagem" para começar</small>
          </div>
        ) : (
          <div className="stories">
            {trips.map((trip) => (
              <div key={trip.id} className="story-card">
                {trip.date && <p className="story-date">{trip.date}</p>}
                <h3 className="story-title">{trip.title}</h3>
                <p className="story-body">{trip.description}</p>
                {isAdmin &&
                  <button
                    className="story-del"
                    onClick={() => setTrips(trips.filter(t => t.id !== trip.id))}
                  >
                    remover
                  </button>}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={`modal-overlay ${isModalOpen ? 'open' : ''}`}>
        <div className="modal">
          <button className="modal-close" onClick={() => setIsModalOpen(false)}>×</button>
          <h3>Adicionar viagem</h3>

          <label>Título</label>
          <input
            type="text"
            placeholder="O título da tua viagem"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />

          <label>Data (opcional)</label>
          <input
            type="text"
            placeholder="ex: Abril 2025"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />

          <label>Descrição</label>
          <textarea
            placeholder="Escreve a tua viagem aqui..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />

          <div className="modal-actions">
            <button className="btn-save" onClick={handleAddTrip}>Guardar</button>
            <button className="btn-cancel" onClick={() => setIsModalOpen(false)}>Cancelar</button>
          </div>
        </div>
      </div>

      <footer>
        <div className="footer-logo">Viagens entre <span>Papel</span></div>
        <ul className="footer-links">
          <li><a>Home</a></li>
          <li><a>Livros</a></li>
          <li><a>Viagens</a></li>
          <li><a>Amor</a></li>
          <li><a>Sobre mim</a></li>
        </ul>
        <span className="footer-copy">&copy; 2024 Viagens entre Papel</span>
      </footer>
    </div>
  );
}