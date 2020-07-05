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
   // houses: {
   //    images: string[],
   //    price: string,
   //    description: string,
   //    comments?: [{
   //       user: string,
   //       comment: string,
   //    }]
   // }[];
   users: string[];
}

interface ITreeHouseData {
   images: string[]|string,
   price: string,
   title: string,
   bed: number,
   bath: number,
   location?: string,
   address?: string,
   website: string,
   description?: string,
   sqft?: string,
   addressHyper?: string
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
   createTreeHouseClub: (data: ITreeHouseFormat) =>
      axios.post('/tree/treeHouses/club', data),
   getTreeHouse: (id: string) =>
      axios.get('/tree/treeHouses/' + id),
   getTreeHouses: (id: string) =>
      axios.get('/tree/treeHouses/all/' + id),
   deleteTreeHouse: (selector: { id: string, houseId: string }) =>
      axios.put('/tree/treeHouses/delete/' + selector.id, selector),
   updateTreeHouse: (id: string, data: ITreeHouseData) =>
      axios.put('/tree/treeHouses/' + id, data),
   // sendFeed: (data) =>
   //    axios.post('/tree/feedback', data),
   // getFeed: (id) => {
   //    // if(id==='123456789'){
   //    axios.get('/tree/feedback')
   //    // }
   // }
};
