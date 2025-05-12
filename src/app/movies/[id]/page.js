'use client';
import { useFetch } from "@/hooks/useFetch";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function MovieDetail({ params }) {
  const router = useRouter();
  const { data: movie, isLoading } = useFetch(
    `https://mflixbackend.azurewebsites.net/api/movies/${params.id}`
  );

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-start mb-6">
        <button 
          onClick={() => router.push("/movies")}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
        >
          ← Volver al listado
        </button>
        
        <Link
          href={`/movies/${params.id}/awards`}
          className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black rounded"
        >
          Ver Premios
        </Link>
      </div>

      {isLoading && <p>Cargando...</p>}

      {movie && (
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full md:w-1/2 rounded-lg"
            />
            <div className="space-y-4">
              <p className="text-lg">{movie.fullplot}</p>
              <p><strong>Año:</strong> {new Date(movie.released).getFullYear()}</p>
              <p><strong>Duración:</strong> {movie.runtime} minutos</p>
              <p><strong>Géneros:</strong> {movie.genres?.join(', ')}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}