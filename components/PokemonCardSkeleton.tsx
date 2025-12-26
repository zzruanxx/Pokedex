export default function PokemonCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 border border-gray-200 animate-pulse">
      <div className="w-full h-48 bg-gray-300 rounded mb-3"></div>
      
      <div className="text-center">
        <div className="h-4 bg-gray-300 rounded w-12 mx-auto mb-2"></div>
        <div className="h-6 bg-gray-300 rounded w-32 mx-auto mb-3"></div>
        
        <div className="flex gap-2 justify-center">
          <div className="h-6 bg-gray-300 rounded-full w-20"></div>
          <div className="h-6 bg-gray-300 rounded-full w-20"></div>
        </div>
      </div>
    </div>
  );
}
