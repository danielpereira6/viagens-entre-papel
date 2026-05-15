import { useState, useEffect } from 'react';
import { theme } from '../styles';
import { useAuth } from '../context/AuthContext';
import { getPosts, addPost } from '../services/love';

interface LovePost {
  id: number;
  title: string;
  content: string;
  author: string;
  // quote: string;
}

export default function LovePage() {
  const { isAdmin } = useAuth();
  const [posts, setPosts] = useState<LovePost[]>([
    {
      id: 1,
      author: 'Diário',
      title: '\"Amar é encontrar na outra pessoa a tua palavra favorita.\"',
      content: 'Amar é encontrar na outra pessoa a tua palavra favorita. Aquela que guarda tudo o que nunca conseguiste dizer com clareza, mas que ele percebe à primeira.',
    },
    {
      id: 2,
      author: 'Diário',
      title: '\"Este rapaz invervou-me.\"',
      content: 'Tão querido e tão irritante. Ele tem um coração enorme, daqueles que dá vontade de guardar num frasquinho, mas também consegue testar a minha paciência...',
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ author: '', title: '', content: '' });

  async function getPostsFromDB() {
    const loadedPost = await getPosts();
    setPosts(loadedPost);
  }

  useEffect(() => {
    getPostsFromDB();
  }, []);

  const handleAddPost = () => {
    if (
      formData.author &&
      formData.title &&
      formData.content
    ) {
      // setPosts((prev) => [...prev, { id: Date.now(), ...formData }]);
      console.log('new quote', formData)
      addPost(formData);

      setFormData({ author: '', title: '', content: '' });
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

    .amor-layout {
      /*display: grid;
      grid-template-columns: 1fr 2fr;
      gap: 1rem;
      margin-bottom: 1rem;
      align-items: start;*/
      margin-bottom: 1rem;
    }

    .amor-content {
      display: flex;
      gap: 2rem;
      align-items: start;
    }

    .amor-sidebar {
      position: sticky;
      top: 80px;
      width: 40%;
    }

    .amor-quote {
      font-family: ${theme.fonts.serif};
      font-size: 22px;
      font-weight: 400;
      font-style: italic;
      color: ${theme.colors.ink};
      line-height: 1.5;
      margin-bottom: 1.5rem;
      padding-left: 1rem;
      border-left: 1.5px solid ${theme.colors.rose};
    }

    .amor-qauthor {
      font-size: 11px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: ${theme.colors.muted};
      padding-left: 1rem;
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
      white-space: pre-line;
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

    .story-divider {
      height: 0.5px;
      background: ${theme.colors.border};
      margin: 0.5rem;
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
      margin: 10px 0;
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

    @media (max-width: 768px) {
      .amor-layout {
        grid-template-columns: 1fr;
        gap: 2rem;
      }

      .amor-sidebar {
        position: static;
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
        <p className="page-tag">Palavras do coração</p>
        <h1 className="page-h1"><em>Amor</em></h1>
        <p className="page-sub">
          Sobre sentimentos, pessoas e as coisas que ficam mesmo quando tudo muda.
        </p>
      </div>

      <div className="page-rule"></div>

      <div className="page-body">

        {posts.length === 0 ? (
          <div className="empty-state">
            <p>Ainda sem textos</p>
          </div>
        ) : posts.map((post, index) => (
          <div key={"amor-" + index} className="amor-layout">
            <div className="amor-content">
              <div className="amor-sidebar">
                <blockquote className="amor-quote">
                  {post.title}
                </blockquote>
                <p className="amor-qauthor">— {post.author}</p>
              </div>

              <div>
                <div className="stories">
                  <div key={post.id} className="story-card">
                    {/* <h3 className="story-title">{post.author}</h3> */}
                    <p className="story-body">{post.content}</p>
                  </div>
                </div>
              </div>
            </div>

            {isAdmin &&
              <div>
                <button
                  className="story-del"
                  onClick={() => setPosts(posts.filter(p => p.id !== post.id))}
                >
                  remover
                </button>
              </div>
            }
            <div className="story-divider"></div>
          </div>
        ))}

        {isAdmin &&
          <button className="add-btn" onClick={() => setIsModalOpen(true)}>
            + Adicionar texto
          </button>
        }
      </div>

      <div className={`modal-overlay ${isModalOpen ? 'open' : ''}`}>
        <div className="modal">
          <button className="modal-close" onClick={() => setIsModalOpen(false)}>×</button>
          <h3>Adicionar texto</h3>

          <label>Título</label>
          <input
            type="text"
            placeholder="título / quote"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />

          <label>Autor</label>
          <input
            type="text"
            placeholder="Diário"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
          />

          <label>Conteúdo</label>
          <textarea
            placeholder="Expressa os teus sentimentos..."
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          />

          <div className="modal-actions">
            <button className="btn-save" onClick={handleAddPost}>Guardar</button>
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