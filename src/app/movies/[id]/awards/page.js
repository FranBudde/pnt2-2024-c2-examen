'use client';
import { useFetch } from "@/hooks/useFetch";
import { useRouter } from "next/navigation";

export default function Page({ params }) {
  const router = useRouter();
  const { data: movie, isLoading } = useFetch(
    `https://mflixbackend.azurewebsites.net/api/movies/${params.id}`
  );

  return (
    <div className="container mx-auto p-4">
      <button 
        onClick={() => router.back()}
        className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
      >
        ← Volver a detalles
      </button>

      {isLoading && <p>Cargando premios...</p>}

      {movie && (
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
          {movie.poster && (
            <div className="mb-6">
              <img 
                src={movie.poster} 
                alt={`Poster de ${movie.title}`}
                className="w-full md:w-1/3 mx-auto rounded-lg shadow-sm"
              />
            </div>
          )}
          
          <h1 className="text-3xl font-bold mb-6 text-center">Premios de {movie.title}</h1>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-yellow-100 p-4 rounded-lg text-center">
              <p className="text-4xl font-bold">{movie.awards?.wins || 0}</p>
              <p className="text-gray-600">Victorias</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg text-center">
              <p className="text-4xl font-bold">{movie.awards?.nominations || 0}</p>
              <p className="text-gray-600">Nominaciones</p>
            </div>
          </div>

          {movie.awards?.text && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">Logros destacados</h2>
              <p className="text-gray-600">{movie.awards.text}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}