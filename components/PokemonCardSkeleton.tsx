export default function PokemonCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-5 border-2 border-transparent animate-pulse">
      <div className="w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl mb-4"></div>
      
      <div className="text-center">
        <div className="h-3 bg-gray-200 rounded w-12 mx-auto mb-2"></div>
        <div className="h-6 bg-gray-300 rounded-lg w-32 mx-auto mb-3"></div>
        
        <div className="flex gap-2 justify-center">
          <div className="h-7 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full w-20"></div>
          <div className="h-7 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full w-20"></div>
        </div>
      </div>
    </div>
  );
}
