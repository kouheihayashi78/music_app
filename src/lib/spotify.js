import axios from "axios";
// ドキュメントは以下
// https://developer.spotify.com/documentation/web-api

class SpotifyClient {
  static async initialize() {
    // 第一引数URL、第二引数body、第三引数header
    const res = await axios.post(
      "https://accounts.spotify.com/api/token",
      {
        grant_type: "client_credentials",
        client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
        client_secret: process.env.REACT_APP_SPOTIFY_CLIENT_SECRET,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    let spotify = new SpotifyClient();
    spotify.token = res.data.access_token;
    return spotify;
  }

  async getPopularSongs() {
    const res = await axios.get('https://api.spotify.com/v1/playlists/37i9dQZF1DX9vYRBO9gjDe/tracks', {
      headers: {
        Authorization: 'Bearer ' + this.token
      }
    })
    return res.data;
  }

  // 検索処理
  async searchSongs (keyword, limit, offset) {
    const res = await axios.get('https://api.spotify.com/v1/search', {
      headers: {
        Authorization: 'Bearer ' + this.token
      },
      params: {
        q: keyword,
        type: "track", // 検索結果を曲だけに絞る
        limit,
        offset
      }
    })
    return res.data.tracks;
  }
}

const spotify = await SpotifyClient.initialize();
export default spotify;
