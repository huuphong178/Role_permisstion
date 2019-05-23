import api from './init'
export function getAllRole(){
    return api.get('/auth')
    .then(res => {
      return res;
    }).catch((err) => {
      console.log("AXIOS ERROR: ", err);
    })
}
export function createRole(data){
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    return api.post('/auth',data,config)
    .then(res => {
      return res;
    }).catch((err) => {
      console.log("AXIOS ERROR: ", err);
    })
  }
  export function updateRole(data){
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    return api.put('/auth',data,config)
    .then(res => {
      return res;
    }).catch((err) => {
      console.log("AXIOS ERROR: ", err);
    })
  }
  export function getOneRole(username){
    return api.get('/auth/'+username)
    .then(res => {
      return res;
    }).catch((err) => {
      console.log("AXIOS ERROR: ", err);
    })
  }