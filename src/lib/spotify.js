import axios from "axios";
export const getToken = async() => {
    // 第一引数URL、第二引数body、第三引数header
    const res = await axios.post("https://accounts.spotify.com/api/token", {
        grant_type: 'client_credentials',
        client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
        client_secret: process.env.REACT_APP_SPOTIFY_CLIENT_SECRET,
    },{
        headers: {
            "Content-Type": "application/x-www-form-urlencoded" 
        }
    })
    console.log(res)
}