'use client';
import useCounter from "@/hooks/useCounter";
import { useFetch } from "@/hooks/useFetch";
import { useRouter } from "next/navigation";

export default function MoviePage() { 
  const pageSize = 30;
  const router = useRouter();
  const { counter, increment, decrement } = useCounter(1);
  const { data, isLoading, hasError } = useFetch(
    `https://mflixbackend.azurewebsites.net/api/movies?pageSize=${pageSize}&page=${counter}`
  );

  const handleMovieClick = (movieId) => {
    router.push(`/movies/${movieId}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Catálogo de Películas</h1>
      
      {isLoading && <p className="text-center text-lg">Cargando...</p>}
      {hasError && <p className="text-center text-red-500">Error al cargar las películas</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.map((movie) => (
          <div 
            key={movie._id}
            className="border rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleMovieClick(movie._id)}
          >
            {movie.poster && (
              <img 
                src={movie.poster} 
                alt={movie.title}
                className="w-full h-48 object-cover mb-4 rounded"
              />
            )}
            <h2 className="text-xl font-semibold mb-2">{movie.title}</h2>
            <p className="text-gray-600 line-clamp-3">
              {movie.fullplot || movie.plot}
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={decrement}
          disabled={counter === 1}
          className="px-6 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <span className="px-6 py-2 bg-gray-100 rounded">{counter}</span>
        <button
          onClick={increment}
          className="px-6 py-2 bg-blue-500 text-white rounded"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}