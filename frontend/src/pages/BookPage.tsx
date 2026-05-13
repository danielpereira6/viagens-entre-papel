import { useState, useEffect } from 'react';
import { theme } from '../styles';
import { useAuth } from '../context/AuthContext';
import { getBooks, addBook } from '../services/book';

interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  rating: number;
  opinion?: string;
}

export default function BooksPage() {
  const { isAdmin } = useAuth();
  const [books, setBooks] = useState<Book[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '',
    rating: 0,
    opinion: '',
  });

  async function getBooksFromDB() {
    const loadedBooks = await getBooks();
    setBooks(loadedBooks);
  }

  useEffect(() => {
    getBooksFromDB();
  }, []);

  const handleAddBook = () => {
    if (formData.title && formData.author && formData.category) {
      // setBooks([
      //   ...books,
      //   {
      //     id: Date.now().toString(),
      //     ...formData,
      //   },
      // ]);

      console.log('new book', formData)
      addBook(formData);

      setFormData({ title: '', author: '', category: '', rating: 0, opinion: '' });
      setIsModalOpen(false);

      setTimeout(() => {
        getBooksFromDB();
      }, 1000);
    }
  };

  const handleDeleteBook = (id: string) => {
    setBooks(books.filter(b => b.id !== id));
  };

  const renderStars = (rating: number) => {
    return '⭐'.repeat(rating);
  };

  const styles = `
    .page-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
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
      transition: color 0.2s;
      padding: 0;
    }

    .back-btn:hover {
      color: ${theme.colors.ink};
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

    .page-body {
      padding: 3rem 4rem 5rem;
      flex: 1;
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

    .books-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
    }

    .book-card {
      cursor: default;
    }

    .book-cover {
      aspect-ratio: 2 / 3;
      background: ${theme.colors.warm};
      border: 0.5px solid ${theme.colors.border};
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      margin-bottom: 1rem;
      min-height: 300px;
    }

    .book-cover-inner {
      width: 72%;
      height: 78%;
      border: 0.5px solid rgba(139, 94, 60, 0.25);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      text-align: center;
      gap: 8px;
    }

    .book-cover-title {
      font-family: ${theme.fonts.serif};
      font-size: 16px;
      font-style: italic;
      color: ${theme.colors.ink};
      line-height: 1.4;
    }

    .book-cover-author {
      font-size: 10px;
      letter-spacing: 0.1em;
      color: ${theme.colors.muted};
      text-transform: uppercase;
    }

    .book-title {
      font-family: ${theme.fonts.serif};
      font-size: 17px;
      font-weight: 400;
      color: ${theme.colors.ink};
      margin-bottom: 4px;
    }

    .book-meta {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    .book-tag {
      display: inline-block;
      font-size: 10px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: ${theme.colors.rose};
      border: 0.5px solid ${theme.colors.rose};
      padding: 2px 8px;
    }

    .book-del {
      font-size: 10px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: ${theme.colors.muted};
      cursor: pointer;
      background: none;
      border: none;
      margin-left: 8px;
      opacity: 0.5;
      transition: opacity 0.2s;
      padding: 0;
    }

    .book-del:hover {
      opacity: 1;
    }

    .book-opinion {
      font-size: 13px;
      color: ${theme.colors.muted};
      line-height: 1.75;
      margin-top: 0.75rem;
    }

    .no-books {
      text-align: center;
      padding: 4rem 2rem;
      border: 0.5px dashed rgba(139, 94, 60, 0.25);
      grid-column: 1 / -1;
    }

    .no-books p {
      font-family: ${theme.fonts.serif};
      font-size: 22px;
      font-style: italic;
      color: ${theme.colors.muted};
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
      max-height: 88vh;
      overflow-y: auto;
      padding: 2.5rem;
      position: relative;
      border-radius: 4px;
    }

    .modal h3 {
      font-family: ${theme.fonts.serif};
      font-size: 24px;
      font-weight: 400;
      color: ${theme.colors.ink};
      margin-bottom: 1.5rem;
      line-height: 1.3;
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
    .modal textarea,
    .modal select {
      width: 100%;
      font-family: ${theme.fonts.sans};
      font-size: 14px;
      font-weight: 400;
      color: ${theme.colors.ink};
      background: ${theme.colors.warm};
      border: 0.5px solid ${theme.colors.border};
      padding: 10px 14px;
      outline: none;
      transition: border-color 0.2s;
      resize: vertical;
    }

    .modal input:focus,
    .modal textarea:focus,
    .modal select:focus {
      border-color: ${theme.colors.accent};
    }

    .modal textarea {
      min-height: 120px;
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
      transition: opacity 0.2s;
    }

    .btn-save:hover {
      opacity: 0.85;
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

    .btn-cancel:hover {
      border-color: ${theme.colors.muted};
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
      line-height: 1;
    }

    .modal-close:hover {
      color: ${theme.colors.ink};
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
      .page-top,
      .page-hero {
        padding-left: 1.5rem;
        padding-right: 1.5rem;
      }

      .page-rule {
        margin-left: 1.5rem;
        margin-right: 1.5rem;
      }

      .page-body {
        padding: 2.5rem 1.5rem 4rem;
      }

      .books-grid {
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
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

  return (
    <div className="page-container">
      <style>{styles}</style>

      <div className="page-top">
        <button className="back-btn" onClick={() => window.location.href = '/'}>
          ← Voltar
        </button>
      </div>

      <div className="page-hero">
        <p className="page-tag">O meu cantinho de leitura</p>
        <h1 className="page-h1">Os meus <em>Livros</em></h1>
        <p className="page-sub">
          Reviews honestas e os livros que ficam muito depois da última página.
        </p>
      </div>

      <div className="page-rule"></div>

      <div className="page-body">
        {/* Is admin */}
        {isAdmin && (
          <button className="add-btn" onClick={() => setIsModalOpen(true)}>
            + Adicionar livro
          </button>
        )}

        {books.length === 0 ? (
          <div className="no-books">
            <p>Ainda sem livros</p>
          </div>
        ) : (
          <div className="books-grid">
            {books.map((book) => (
              <div key={book.id} className="book-card">
                <div className="book-cover">
                  <div className="book-cover-inner">
                    <div className="book-cover-title">{book.title}</div>
                    <div className="book-cover-author">{book.author}</div>
                    <div>{renderStars(book.rating)}</div>
                  </div>
                </div>
                <p className="book-title">{book.title}</p>
                <div className="book-meta">
                  <span className="book-tag">{book.category}</span>
                </div>
                <div>
                  {book.opinion && <p className="book-opinion">{book.opinion}</p>}
                </div>

                {isAdmin && (
                  <div>
                    <button
                      className="book-del"
                      onClick={() => handleDeleteBook(book.id)}
                    >
                      remover
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      <div className={`modal-overlay ${isModalOpen ? 'open' : ''}`}>
        <div className="modal">
          <button className="modal-close" onClick={() => setIsModalOpen(false)}>
            ×
          </button>
          <h3>Adicionar livro</h3>

          <label>Título do livro</label>
          <input
            type="text"
            placeholder="ex: Persuasao"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />

          <label>Autor</label>
          <input
            type="text"
            placeholder="ex: Jane Austen"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
          />

          <label>Categoria</label>
          <input
            type="text"
            placeholder="ex: Romance, Fantasia, Classico..."
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          />

          <label>Avaliação (1 a 5 estrelas)</label>
          <select
            value={formData.rating}
            onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
          >
            <option value="1">⭐ 1 - Poor</option>
            <option value="2">⭐⭐ 2 - Fair</option>
            <option value="3">⭐⭐⭐ 3 - Good</option>
            <option value="4">⭐⭐⭐⭐ 4 - Very Good</option>
            <option value="5">⭐⭐⭐⭐⭐ 5 - Excellent</option>
          </select>

          <label>A tua opinião (opcional)</label>
          <textarea
            placeholder="O que achaste do livro?"
            value={formData.opinion}
            onChange={(e) => setFormData({ ...formData, opinion: e.target.value })}
          />

          <div className="modal-actions">
            <button className="btn-save" onClick={handleAddBook}>
              Guardar
            </button>
            <button className="btn-cancel" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer>
        <div className="footer-logo">
          Viagens entre <span>Papel</span>
        </div>
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