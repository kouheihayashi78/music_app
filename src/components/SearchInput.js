import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function SearchInput({handleInputChange, searchSongs, handleKeyDown}) {
  return (
    <section className="mb-10">
      <input
        onChange={handleInputChange}
        onKeyDown={handleKeyDown} // エンターキーを押した時の処理
        className="bg-gray-700 w-1/3 p-2 rounded-l-lg focus:outline-none"
        placeholder="検索したい曲を入力してください"
      />
      <button 
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-lg"
      onClick={searchSongs}>
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </section>
  );
}
