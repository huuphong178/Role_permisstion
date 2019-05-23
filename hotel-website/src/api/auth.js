import axios from 'axios';
import qs from 'qs'
//import fakeAuth from './fakeAuth'
// Sends a POST request to /auth on the server, with the email & password returning the JWT
// Belonging to the user with supplied credentials
export function signIn(username, password) {
  let user = {
    username: username,
    code: password,
    type: 'ga'
  };
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
  
  return axios.post('https://security.vng.com.vn/token-gateway/api/verify_otp/',qs.stringify(user),config)
    .then(res => {
       //  console.log(res.data);
      return res.data;
    }).catch((err) => {
      console.log("AXIOS ERROR: ", err);
    })
}
export function loginDataToken(data){
  return axios.post('http://localhost:8080/token/generate-token',data)
  .then(res => {
    return res;
  }).catch((err) => {
   // console.log("AXIOS ERROR: ", err);
  })
}
// export function checkToken(){
//   const config = {
//     headers: {'Authorization': 'Bearer '+fakeAuth.getAccessToken()}
//   }
//   return axios.get('http://localhost:8080/checkToken/',config)
//   .then(res => {
//     return res;
//   }).catch((err) => {
//   })
// }