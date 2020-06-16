// import axios from "axios";
const axios = require('axios');
// import Auth from '../utils/Auth'
interface userData {
   email: string;
   password: string;
   name?: string
}
// interface token {
//    token: JSON
// }

//methods for interacting with API Auth routes
export default {
   // logine: (userData: {
   //    email: string
   //    }) => axios.post("/auth/login", userData),

   login: (userData: userData ) => axios.post("/auth/login", userData),
   signUp: (userData: userData ) =>
      axios.post('/auth/signup', userData),
   dashboard: (token: string) =>
      axios.get('/api/dashboard', { headers: { Authorization: `bearer ${token}` } }),
   scrape: (url: string) => 
      axios.post('/scrape', {url: url})
   // createCharacter: data =>
   //    axios.post('/game/characters', data),
   // getCharacters: id =>
   //    axios.get('/game/characters/' + id),
   // deleteCharacter: id =>
   //    axios.delete('/game/characters/' + id),
   // updateCharacter: (id, data) =>
   //    axios.put('/game/characters/' + id, data),
   // sendFeed: (data) =>
   //    axios.post('/game/feedback', data),
   // getFeed: (id) => {
   //    // if(id==='123456789'){
   //    axios.get('/game/feedback')
   //    // }
   // }
};
