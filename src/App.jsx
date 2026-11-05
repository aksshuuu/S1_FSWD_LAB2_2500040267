import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterGenre, setFilterGenre] = useState("All");
  const [filterRating, setFilterRating] = useState("Any");
  const [sortOrder, setSortOrder] = useState("Highest to Lowest");
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [director, setDirector] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [rating, setRating] = useState(8.5); 
  const [curator, setCurator] = useState("");
  const [discussionDate, setDiscussionDate] = useState("");
  const [minutes, setMinutes] = useState("");

  const fetchMovies = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/movies");
      const data = await res.json();
      setMovies(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleAddMovie = async (e) => {
    e.preventDefault();
    if (!name || !genre) return;

    try {
      const res = await fetch("http://localhost:5000/api/movies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name, 
          genre, 
          tickets: Number(rating),
          director,
          releaseDate,
          curator,
          discussionDate,
          minutes
        })
      });
      if (res.ok) {
        setName("");
        setGenre("");
        setDirector("");
        setReleaseDate("");
        setRating(8.5);
        setCurator("");
        setDiscussionDate("");
        setMinutes("");
        setIsModalOpen(false); 
        fetchMovies();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteMovie = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/movies/${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        fetchMovies();
      }
    } catch (err) {
      console.error(err);
    }
  };

  let processedMovies = movies.filter((movie) =>
    movie.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movie.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (filterGenre !== "All") {
    processedMovies = processedMovies.filter(movie => 
      movie.genre.toLowerCase() === filterGenre.toLowerCase()
    );
  }

  if (filterRating !== "Any") {
    const minRating = parseInt(filterRating);
    processedMovies = processedMovies.filter(movie => (movie.tickets || 0) >= minRating);
  }

  processedMovies.sort((a, b) => {
    const scoreA = a.tickets || 0;
    const scoreB = b.tickets || 0;
    return sortOrder === "Highest to Lowest" ? scoreB - scoreA : scoreA - scoreB;
  });

  return (
    <div className="page-wrapper">
      <header className="full-width-header">
        <div className="header-inner">
          <div className="brand">
            <div className="brand-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
                <line x1="7" y1="2" x2="7" y2="22"></line>
                <line x1="17" y1="2" x2="17" y2="22"></line>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <line x1="2" y1="7" x2="7" y2="7"></line>
                <line x1="2" y1="17" x2="7" y2="17"></line>
                <line x1="17" y1="17" x2="22" y2="17"></line>
                <line x1="17" y1="7" x2="22" y2="7"></line>
              </svg>
            </div>
            <div className="brand-text">
              <h1>The Film Index</h1>
              <span className="subtitle">A Curated Cinema Archive</span>
            </div>
          </div>
          
          <button className="btn-add-header" onClick={() => setIsModalOpen(true)}>
            + Add Movie
          </button>
        </div>
      </header>

      <div className="app-container">
        <div className="stats-dashboard">
          <div className="stat-card">
            <span className="stat-title">TOTAL FILMS</span>
            <span className="stat-num">{movies.length}</span>
          </div>
          <div className="stat-card">
            <span className="stat-title">AVG RATING</span>
            <span className="stat-num">
              {movies.length > 0 
                ? (movies.reduce((acc, curr) => acc + (curr.tickets || 0), 0) / movies.length).toFixed(1) 
                : "0.0"}
            </span>
          </div>
          <div className="stat-card">
            <span className="stat-title">TOP GENRE</span>
            <span className="stat-num text-sm">Drama</span>
          </div>
        </div>

        <main className="main-content">
          <section className="control-panel">
            <div className="filters-container">
              <div className="search-wrapper">
                <span className="search-icon">🔍</span>
                <input 
                  type="text" 
                  placeholder="Search movies or directors..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="modern-input full-width"
                />
              </div>
              
              <div className="filter-grid">
                 <div className="filter-item">
                    <label>GENRE:</label>
                    <select className="modern-select" value={filterGenre} onChange={e => setFilterGenre(e.target.value)}>
                      <option value="All">All Genres</option>
                      <option value="Drama">Drama</option>
                      <option value="Classic">Classic</option>
                      <option value="Noir">Noir</option>
                      <option value="Neo-Noir">Neo-Noir</option>
                      <option value="Fantasy">Fantasy</option>
                      <option value="Horror">Horror</option>
                      <option value="Sci-Fi">Sci-Fi</option>
                      <option value="Thriller">Thriller</option>
                    </select>
                 </div>
                 <div className="filter-item">
                    <label>RATING:</label>
                    <select className="modern-select" value={filterRating} onChange={e => setFilterRating(e.target.value)}>
                      <option value="Any">Any Rating</option>
                      <option value="5">5+ Stars</option>
                      <option value="6">6+ Stars</option>
                      <option value="7">7+ Stars</option>
                      <option value="8">8+ Stars</option>
                      <option value="9">9+ Stars</option>
                      <option value="10">10 Stars</option>
                    </select>
                 </div>
                  <div className="filter-item">
                    <label>ORDER:</label>
                    <select className="modern-select" value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
                      <option value="Highest to Lowest">Highest to Lowest</option>
                      <option value="Lowest to Highest">Lowest to Highest</option>
                    </select>
                 </div>
              </div>
            </div>
          </section>

          <div className="gallery-header">
             <h2>Collection Index</h2>
             <span className="results-count">Showing {processedMovies.length} results</span>
          </div>

          <div className="movie-grid">
            {processedMovies.map((movie) => (
              <div key={movie._id} className="movie-card">
                <div className="card-header">
                  <span className="card-rating">★ {movie.tickets || 'N/A'} / 10</span>
                </div>
                
                <div className="card-body">
                  <h3>{movie.name}</h3>
                  <span className="badge-genre">{movie.genre}</span>
                  
                  <div className="card-details">
                    <p><strong>Director:</strong> {movie.director || "Not Specified"}</p>
                    <p><strong>Release Date:</strong> {movie.releaseDate || "Not Specified"}</p>
                  </div>

                  <div className="discussion-block">
                    <h4>Club Record</h4>
                    <p><strong>Curator:</strong> {movie.curator || "Not Specified"}</p>
                    <p><strong>Discussion Date:</strong> {movie.discussionDate || "Not Specified"}</p>
                    <p className="minutes-text">"{movie.minutes || "No conversation minutes recorded."}"</p>
                  </div>
                </div>

                <div className="card-footer">
                   <button onClick={() => handleDeleteMovie(movie._id)} className="btn-delete">
                      Remove
                   </button>
                </div>
              </div>
            ))}
            
            {processedMovies.length === 0 && (
              <div className="empty-state">No movies found matching your criteria.</div>
            )}
          </div>
        </main>
      </div>

      <footer className="minimal-footer">
        <div className="footer-content">
          <p>© {new Date().getFullYear()} The Film Index</p>
          <div className="tech-stack">
            <span>Powered by</span>
            <span className="tech-badge">MongoDB</span>
            <span className="tech-badge">Express</span>
            <span className="tech-badge">React</span>
            <span className="tech-badge">Node.js</span>
          </div>
        </div>
      </footer>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content extended-modal">
            <div className="modal-header">
              <div className="header-text">
                <h2>Accession New Movie Record</h2>
                <p className="modal-subtitle">Enter the movie specifications, artistic grace, and club discussion minutes.</p>
              </div>
              <button className="btn-close" onClick={() => setIsModalOpen(false)}>×</button>
            </div>
            
            <form onSubmit={handleAddMovie} className="modal-form">
              <div className="form-group">
                <label>MOVIE TITLE *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="modern-input full-width"
                />
                <span className="field-hint">The primary title of the screening work.</span>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>MOVIE GRACE / GENRE *</label>
                  <input 
                    type="text"
                    value={genre} 
                    onChange={(e) => setGenre(e.target.value)} 
                    required 
                    className="modern-input full-width"
                  />
                  <span className="field-hint">Stylistic classification & artistic movement.</span>
                </div>

                <div className="form-group">
                  <label>MOVIE DIRECTOR *</label>
                  <input
                    type="text"
                    value={director}
                    onChange={(e) => setDirector(e.target.value)}
                    required
                    className="modern-input full-width"
                  />
                  <span className="field-hint">Auteur / Director of the film.</span>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>MOVIE RELEASE DATE *</label>
                  <input
                    type="date"
                    value={releaseDate}
                    onChange={(e) => setReleaseDate(e.target.value)}
                    required
                    className="modern-input full-width"
                  />
                  <span className="field-hint">Original theatrical premiere date.</span>
                </div>

                <div className="form-group">
                  <label>MOVIE RATING (CLUB CONSENSUS: 1.0 - 10.0) *</label>
                  <div className="rating-input-group">
                    <input
                      type="range"
                      min="1"
                      max="10"
                      step="0.1"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                      className="slider"
                    />
                    <input
                      type="number"
                      min="1"
                      max="10"
                      step="0.1"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                      required
                      className="modern-input score-box"
                    />
                    <span className="star-icon">★</span>
                  </div>
                  <span className="field-hint">Aggregate rating from the movie club meeting.</span>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>DISCUSSION LEADER / CURATOR</label>
                  <input
                    type="text"
                    value={curator}
                    onChange={(e) => setCurator(e.target.value)}
                    className="modern-input full-width"
                  />
                </div>

                <div className="form-group">
                  <label>CLUB DISCUSSION DATE</label>
                  <input
                    type="date"
                    value={discussionDate}
                    onChange={(e) => setDiscussionDate(e.target.value)}
                    className="modern-input full-width"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>CONVERSATION PAPER RECORD & DISCUSSION MINUTES</label>
                <textarea
                  value={minutes}
                  onChange={(e) => setMinutes(e.target.value)}
                  className="modern-input full-width textarea"
                  rows="4"
                ></textarea>
                <span className="field-hint">Recorded paper transcript of the club discussion.</span>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Save & Catalog Record</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;