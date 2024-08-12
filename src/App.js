import { useEffect, useRef, useState } from "react";
import { SongList } from "./components/SongList.js";
import spotify from "./lib/spotify.js"
import { Player } from "./components/Player.js";
import { SearchInput } from "./components/SearchInput.js";
import { Pagination } from "./components/Pagination.js";

const limit = 20;

export default function App() {
  const [ isLoading, setIsLoading ] = useState(false);
  const [ popularSongs, setPopularSongs ] = useState([]);
  const [ isPlay, setIsPlay ] = useState(false);
  const [ selectedSong, setSelectedSong ] = useState();
  const [ keyword, setKeyword ] = useState('');
  const [ searchedSongs, setSearchedSongs ] = useState();
  const [ page, setPage ] = useState(1);
  const audioRef = useRef(null);

  useEffect(() => {
    fetchPopularSongs()
  }, []);

  // spotifyから人気の曲を非同期で取得し、曲の情報をセットする
  const fetchPopularSongs = async() => {
    setIsLoading(true); // loading中
    const result = await spotify.getPopularSongs();
    const popularSongs = result.items.map((item) => {
      return item.track
    });
    setPopularSongs(popularSongs);
    setIsLoading(false); // loading解除
  }

  // 曲をクリックして選択した時に走る処理
  const handleSongSelected = (song) => {
      setSelectedSong(song);
      // 曲が存在する場合にaudioRefにpreview_urlをセットし、曲を再生する
      if(song.preview_url != null) {
        audioRef.current.src = song.preview_url;
        playSong();
      // 曲が存在しない場合、曲を停止する
      } else {
        pauseSong();
      }
  }

  // 曲を再生する処理
  const playSong = () => {
    audioRef.current.play();
    setIsPlay(true)
  }

  // 曲を停止する処理
  const pauseSong = () => {
    audioRef.current.pause();
    setIsPlay(false)
  }

  // 再生バーをクリックすると走る処理
  const toggleSong = () => {
    if(isPlay){
      pauseSong();
    } else {
      playSong();
    }
  }

  // 検索バーの文字をセットする関数
  const handleInputChange = (e) => {
    setKeyword(e.target.value);
  }

  // 検索をするAPIを呼び出し、結果を格納する
  const searchSongs = async( page ) => {
    setIsLoading(true);
    // 数字にできないなどの無効な値がある場合は0で、それ以外はページ数を計算する
    // 例：2ページ目なら20が格納され21以降のデータが格納される
    const offset = parseInt(page) ? (parseInt(page) - 1) * limit : 0;

    // 空文字、スペースのみの場合は検索しないようにする
    if(keyword && keyword.match(/\S/g)) {
      const result = await spotify.searchSongs(keyword, limit, offset);
      setSearchedSongs(result.items);
    } else {
      setSearchedSongs();
    }
    setIsLoading(false);
  }

  const moveToNext = async () => {
    const nextPage = page + 1;
    await searchSongs(nextPage);
    setPage(nextPage);
  }

  const moveToPrev = async () => {
    const prevPage = page - 1;
    await searchSongs(prevPage);
    setPage(prevPage);
  }

  // エンターキーを押して検索結果表示
  const handleKeyDown = (e) => {
    if (e.nativeEvent.isComposing || e.key !== 'Enter') return
    searchSongs();
  }
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <main className="flex-1 p-8 mb-20">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold">Music App</h1>
        </header>
        <SearchInput handleInputChange={handleInputChange} searchSongs={searchSongs} handleKeyDown={handleKeyDown} />
        <section>
          <h2 className="text-2xl font-semibold mb-5">{searchedSongs != null ? 'Search Songs' : 'Popular Songs'}</h2>
          <SongList 
            isLoading={isLoading} 
            songs={searchedSongs != null ? searchedSongs : popularSongs} 
            handleSongSelected={handleSongSelected} 
          />
          {searchedSongs && <Pagination moveToNext={moveToNext} moveToPrev={moveToPrev}/>}
        </section>
      </main>
      {selectedSong != null && <Player song={selectedSong} isPlay={isPlay} toggleSong={toggleSong} />}
      <audio ref={audioRef} />
    </div>
  );
}