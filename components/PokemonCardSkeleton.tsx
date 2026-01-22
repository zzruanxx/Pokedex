export default function PokemonCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-3 sm:p-5 border-2 border-transparent animate-pulse">
      <div className="w-full h-32 sm:h-40 md:h-48 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl mb-3 sm:mb-4"></div>
      
      <div className="text-center">
        <div className="h-3 bg-gray-200 rounded w-10 sm:w-12 mx-auto mb-1 sm:mb-2"></div>
        <div className="h-5 sm:h-6 bg-gray-300 rounded-lg w-24 sm:w-32 mx-auto mb-2 sm:mb-3"></div>
        
        <div className="flex gap-1 sm:gap-2 justify-center">
          <div className="h-6 sm:h-7 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full w-16 sm:w-20"></div>
          <div className="h-6 sm:h-7 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full w-16 sm:w-20"></div>
        </div>
      </div>
    </div>
  );
}
