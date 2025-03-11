import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function MovieDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`https://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}a2b07930=${id}`)
        .then((res) => res.json())
        .then((data) => {
          setMovie(data);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <p>Загрузка...</p>;
  if (!movie) return <p>Фильм не найден</p>;

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1>{movie.Title}</h1>
      <img src={movie.Poster} alt={movie.Title} style={{ width: "300px" }} />
      <p><strong>Год:</strong> {movie.Year}</p>
      <p><strong>Жанр:</strong> {movie.Genre}</p>
      <p><strong>Режиссер:</strong> {movie.Director}</p>
      <p><strong>Актеры:</strong> {movie.Actors}</p>
      <p><strong>Описание:</strong> {movie.Plot}</p>
    </div>
  );
}