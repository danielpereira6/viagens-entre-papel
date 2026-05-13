import { useState } from 'react';
import { theme } from '../styles';
import { useAuth } from '../context/AuthContext';

export default function AboutMePage() {
  const { isAdmin } = useAuth();
  const [name, setName] = useState('Cátia');
  const [bio, setBio] = useState(`Sou leitora compulsiva, viajante apaixonada e acredito que o amor se encontra em todo o lado — nas páginas de um livro, numa esplanada em Paris ou num passeio de moliceiro em Aveiro.

Este blog nasceu da vontade de partilhar as histórias que me moldaram: os livros que li, os lugares que me surpreenderam e os sentimentos que ficaram a meio do caminho, à espera de palavras.

Bem-vinda — ou bem-vindo — ao meu cantinho.`);
  const [tags, setTags] = useState(['Leitora', 'Viajante', 'Escritora', 'Aveiro, Portugal', 'Amante de café']);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({ name, bio, tags: tags.join(', ') });

  const handleSaveEdit = () => {
    setName(editForm.name);
    setBio(editForm.bio);
    setTags(editForm.tags.split(',').map(t => t.trim()).filter(Boolean));
    setIsEditModalOpen(false);
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

    .sobre-layout {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 5rem;
      align-items: start;
    }

    .sobre-portrait {
      position: relative;
    }

    .portrait-wrap {
      width: 100%;
      aspect-ratio: 3 / 4;
      background: ${theme.colors.warm};
      border: 0.5px solid ${theme.colors.border};
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      cursor: pointer;
    }

    .portrait-wrap img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .portrait-ph {
      font-family: ${theme.fonts.serif};
      font-size: 80px;
      font-weight: 300;
      font-style: italic;
      color: rgba(139, 94, 60, 0.15);
      user-select: none;
    }

    .portrait-hint {
      position: absolute;
      bottom: -1.2rem;
      left: 1rem;
      font-size: 11px;
      color: ${theme.colors.muted};
      background: ${theme.colors.cream};
      padding: 3px 10px;
      border: 0.5px solid ${theme.colors.border};
    }

    .portrait-frame {
      position: absolute;
      inset: 0;
      border: 0.5px solid rgba(139, 94, 60, 0.18);
      transform: translate(-10px, -10px);
      pointer-events: none;
    }

    .sobre-greeting {
      font-family: ${theme.fonts.serif};
      font-size: 13px;
      font-style: italic;
      color: ${theme.colors.rose};
      margin-bottom: 0.8rem;
    }

    .sobre-name {
      font-family: ${theme.fonts.serif};
      font-size: 40px;
      font-weight: 400;
      line-height: 1.2;
      color: ${theme.colors.ink};
      margin-bottom: 1.5rem;
    }

    .sobre-name em {
      font-style: italic;
      color: ${theme.colors.accent};
    }

    .sobre-bio {
      font-size: 14px;
      color: ${theme.colors.muted};
      line-height: 1.65;
      margin-bottom: 2rem;
      white-space: pre-line;
    }

    .sobre-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 2rem;
    }

    .sobre-tag {
      font-size: 10px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: ${theme.colors.accent};
      border: 0.5px solid rgba(139, 94, 60, 0.4);
      padding: 5px 12px;
    }

    .sobre-edit-btn {
      font-size: 11px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: ${theme.colors.muted};
      background: none;
      border: 0.5px solid ${theme.colors.border};
      padding: 9px 20px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .sobre-edit-btn:hover {
      border-color: ${theme.colors.muted};
      color: ${theme.colors.ink};
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
      min-height: 160px;
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

    .page-rule {
      margin: 2rem 4rem 0;
      height: 0.5px;
      background: ${theme.colors.border};
    }

    @media (max-width: 768px) {
      .sobre-layout {
        grid-template-columns: 1fr;
        gap: 3rem;
      }
    }
  `;

  return (
    <div className="page-container">
      <style>{styles}</style>

      <div className="page-top">
        <button className="back-btn">← Voltar</button>
      </div>

      <div className="page-hero">
        <p className="page-tag">Quem está por trás das páginas</p>
        <h1 className="page-h1">Sobre <em>mim</em></h1>
      </div>

      <div className="page-rule"></div>

      <div className="page-body">
        <div className="sobre-layout">
          <div className="sobre-portrait">
            <div className="portrait-wrap">
              <span className="portrait-ph">C</span>
            </div>
            <div className="portrait-frame"></div>
            {isAdmin &&
            <span className="portrait-hint">Clica para adicionar a tua foto</span>}
          </div>

          <div>
            <p className="sobre-greeting">olá, eu sou</p>
            <h2 className="sobre-name">
              {name}<br />
              <em>Viagens entre Papel</em>
            </h2>
            <div className="sobre-bio">{bio}</div>
            <div className="sobre-tags">
              {tags.map((tag, i) => (
                <span key={i} className="sobre-tag">{tag}</span>
              ))}
            </div>
            {/* <button className="sobre-edit-btn" onClick={() => {
              setEditForm({ name, bio, tags: tags.join(', ') });
              setIsEditModalOpen(true);
            }}>
              Editar sobre mim
            </button> */}
          </div>
        </div>
      </div>

      <div className={`modal-overlay ${isEditModalOpen ? 'open' : ''}`}>
        <div className="modal">
          <button className="modal-close" onClick={() => setIsEditModalOpen(false)}>×</button>
          <h3>Editar sobre mim</h3>

          <label>O teu nome</label>
          <input
            type="text"
            value={editForm.name}
            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
          />

          <label>Bio</label>
          <textarea
            value={editForm.bio}
            onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
          />

          <label>Tags (separa com vírgula)</label>
          <input
            type="text"
            value={editForm.tags}
            onChange={(e) => setEditForm({ ...editForm, tags: e.target.value })}
          />

          <div className="modal-actions">
            <button className="btn-save" onClick={handleSaveEdit}>Guardar</button>
            <button className="btn-cancel" onClick={() => setIsEditModalOpen(false)}>Cancelar</button>
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