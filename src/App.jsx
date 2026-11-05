import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [tickets, setTickets] = useState(50);
  const [theme, setTheme] = useState("dark");

  const genreSuggestions = [
    "Action",
    "Sci-Fi",
    "Horror",
    "Drama",
    "Comedy",
    "Thriller",
    "Mythological",
    "Animation"
  ];

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
        body: JSON.stringify({ name, genre, tickets: Number(tickets) })
      });
      if (res.ok) {
        setName("");
        setGenre("");
        setTickets(50);
        fetchMovies();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleBookTicket = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/movies/${id}/book`, {
        method: "PATCH"
      });
      if (res.ok) {
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

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className={`app-wrapper ${theme}`}>
      <header className="header-box">
        <h1>Movie Club</h1>
        <button type="button" onClick={toggleTheme} className="theme-btn">
          {theme === "dark" ? "☀️ Light Theme" : "🌙 Dark Cinema Theme"}
        </button>
      </header>

      <main className="content-box">
        <form onSubmit={handleAddMovie} className="movie-form">
          <div className="input-group">
            <input
              type="text"
              placeholder="Movie Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="text"
              placeholder="Genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              required
            />
            <div className="genre-suggestions">
              {genreSuggestions.map((g) => (
                <button
                  key={g}
                  type="button"
                  className={`chip ${genre === g ? "active" : ""}`}
                  onClick={() => setGenre(g)}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div className="input-group">
            <input
              type="number"
              placeholder="Available Tickets"
              value={tickets}
              onChange={(e) => setTickets(e.target.value)}
              min="1"
              required
            />
          </div>

          <button type="submit" className="add-btn">
            Add Movie
          </button>
        </form>

        <div className="movie-list">
          {movies.map((movie) => (
            <div key={movie._id} className="movie-card">
              <h3>{movie.name}</h3>
              <p>
                <strong>Genre:</strong> {movie.genre}
              </p>
              <p>
                <strong>Tickets Available:</strong> {movie.tickets}
              </p>
              <div className="card-actions">
                <button
                  onClick={() => handleBookTicket(movie._id)}
                  disabled={movie.tickets <= 0}
                  className="book-btn"
                >
                  {movie.tickets > 0 ? "Book Ticket" : "Sold Out"}
                </button>
                <button
                  onClick={() => handleDeleteMovie(movie._id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;