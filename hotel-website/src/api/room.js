import api from './init'
const badrequest={data:[]}
export function getAllRoom(){
    return api.get('/rooms')
    .then(res => {
      return res;
    }).catch((err) => {
      console.log("AXIOS ERROR: ", err);
     // return badrequest;
    })
}
export function getOneRoom(roomid){
  return api.get('/room/'+roomid)
  .then(res => {
    return res;
  }).catch((err) => {
    console.log("AXIOS ERROR: ", err);
  })
}
export function deleteRoom(roomid){
  return api.delete('/'+roomid)
  .then(res => {
    return res;
  }).catch((err) => {
    console.log("AXIOS ERROR: ", err);
  })
}
export function createRoom(data){
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return api.post('/room',data,config)
  .then(res => {
    return res;
  }).catch((err) => {
    console.log("AXIOS ERROR: ", err);
  })
}
export function updateRoom(data){
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return api.put('/room',data,config)
  .then(res => {
    return res;
  }).catch((err) => {
    console.log("AXIOS ERROR: ", err);
  })
}
export function getRoomName(){
  return api.get('/roomName')
  .then(res => {
    return res;
  }).catch((err) => {
    console.log("AXIOS ERROR: ", err);
    return badrequest;
  })
}
export function getRoomStatus(){
  return api.get('/roomStatus')
  .then(res => {
    return res;
  }).catch((err) => {
    console.log("AXIOS ERROR: ", err);
    return badrequest;
  })
}
export function getHotelTotal(){
  return api.get('/getHotelTotal')
  .then(res => {
    return res;
  }).catch((err) => {
    console.log("AXIOS ERROR: ", err);
    return badrequest;
  })
}
export function getRoomTypeChart(month, year){
  return api.get('/getRoomTypeChart?month='+month+'&year='+year)
  .then(res => {
    return res;
  }).catch((err) => {
    console.log("AXIOS ERROR: ", err);
  })
}
export function loginDataBase(data){
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return api.post('/auth',data,config)
}
