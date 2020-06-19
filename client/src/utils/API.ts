// import axios from "axios";
const axios = require('axios');
// import Auth from './Auth'

interface userData {
   email: string;
   password: string;
   name?: string
}

interface ITreeHouseFormat {
   name: string;
   controller: string;
   houses: {
      images: string[],
      price: string,
      description: string,
      comments?: [{
         user: string,
         comment: string,
      }]
   }[];
   users: string[];
}


//methods for interacting with API Auth routes
export default {

   login: (userData: userData ) => axios.post("/auth/login", userData),
   signUp: (userData: userData ) =>
      axios.post('/auth/signup', userData),
   dashboard: (token: string|null) =>
      axios.get('/api/dashboard', { headers: { Authorization: `bearer ${token}` } }),
   scrape: (url: string) => 
      axios.post('/scrape', {url: url}),
   createTreeHouse: (data: ITreeHouseFormat) =>
      axios.post('/tree/treeHouses', data),
   getTreeHouse: (id: string) =>
      axios.get('/tree/treeHouses/' + id),
   // deleteTreeHouse: id =>
   //    axios.delete('/tree/treeHouses/' + id),
   updateTreeHouse: (id: string, data: ITreeHouseFormat) =>
      axios.put('/tree/treeHouses/' + id, data),
   // sendFeed: (data) =>
   //    axios.post('/tree/feedback', data),
   // getFeed: (id) => {
   //    // if(id==='123456789'){
   //    axios.get('/tree/feedback')
   //    // }
   // }
};
