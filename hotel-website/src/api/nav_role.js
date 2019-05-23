import api from './init'
export function getAllNavRole(){
    return api.get('/nav_role')
    .then(res => {
      return res;
    }).catch((err) => {
      console.log("AXIOS ERROR: ", err);
    })
}
export function createNavRole(data){
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    return api.post('/nav_role',data,config)
    .then(res => {
      return res;
    }).catch((err) => {
      console.log("AXIOS ERROR: ", err);
    })
  }
  export function updateNavRole(data){
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    return api.put('/nav_role',data,config)
    .then(res => {
      return res;
    }).catch((err) => {
      console.log("AXIOS ERROR: ", err);
    })
  }