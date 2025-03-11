import React, { useState } from "react";
import Head from "next/head";

export default function Home() {
  const [query, setQuery] = useState(""); // Хранение строки поиска
  const [movies, setMovies] = useState([]); // Хранение списка фильмов
  const [loading, setLoading] = useState(false); // Флаг загрузки
  const [error, setError] = useState(null); // Флаг ошибки

  const fetchMovies = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}a2b07930=${query}`
      );
      const data = await response.json();
      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setError(data.Error);
        setMovies([]);
      }
    } catch (e) {
      setError("Ошибка при загрузке данных.");
    }
    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      fetchMovies();
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <Head>
        <title>Movie Search</title>
      </Head>
      <h1>Поиск фильмов</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Введите название фильма"
          style={{ padding: "10px", width: "300px" }}
        />
        <button type="submit" style={{ padding: "10px", marginLeft: "10px" }}>
          Искать
        </button>
      </form>

      {loading && <p>Загрузка...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ marginTop: "20px" }}>
        {movies.map((movie) => (
          <div
            key={movie.imdbID}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : "/no-image.png"}
              alt={movie.Title}
              style={{ width: "50px", height: "75px", marginRight: "10px" }}
            />
            <div>
              <h3 style={{ margin: 0 }}>{movie.Title}</h3>
              <p style={{ margin: 0 }}>{movie.Year}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}