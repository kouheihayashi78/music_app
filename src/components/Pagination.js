export function Pagination({ moveToNext, moveToPrev }) {
  return (
    <div className="mt-8 flex justify-center">
      <button 
        className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={moveToPrev}
      >
        Previous
      </button>
      <button 
        className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed ml-4"
        onClick={moveToNext}
      >
        Next
      </button>
    </div>
  );
}
