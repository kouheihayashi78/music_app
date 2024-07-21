import { useEffect, useState } from "react";
import { SongList } from "./components/SongList.js";
import spotify from "./lib/spotify.js"
export default function App() {
  const [ isLoading, setIsLoading ] = useState(false);
  const [ popularSongs, setPopularSongs ] = useState([]);

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
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <main className="flex-1 p-8 mb-20">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold">Music App</h1>
        </header>
        <section>
          <h2 className="text-2xl font-semibold mb-5">Popular Songs</h2>
          <SongList isLoading={isLoading} popularSongs={popularSongs} />
        </section>
      </main>
    </div>
  );
}