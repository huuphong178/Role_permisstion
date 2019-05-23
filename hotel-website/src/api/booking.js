import api from './init'
export function getCountBookingMo(month, year){
    return api.get('/getCountBooking?month='+month+'&year='+year)
    .then(res => {
      return res;
    }).catch((err) => {
      console.log("AXIOS ERROR: ", err);
    })
}
export function getTotalBooking(){
    return api.get('/getTotalBooking')
    .then(res => {
      return res;
    }).catch((err) => {
      console.log("AXIOS ERROR: ", err);
    })
}
export function getCountBookingTri(trimester, year){
    return api.get('/getCountBooking?year='+year+'&trimester='+trimester)
    .then(res => {
      return res;
    }).catch((err) => {
      console.log("AXIOS ERROR: ", err);
    })
}
export function getCountBookingYear(year){
    return api.get('/getCountBooking?year='+year)
    .then(res => {
      return res;
    }).catch((err) => {
      console.log("AXIOS ERROR: ", err);
    })
}
export function getRoomTypeChartAll(){
    return api.get('/getRoomTypeChartAll')
    .then(res => {
      return res;
    }).catch((err) => {
      console.log("AXIOS ERROR: ", err);
    })
}
export function getRoomTypeChartYear(year){
    return api.get('/getRoomTypeChart?year='+year)
    .then(res => {
      return res;
    }).catch((err) => {
      console.log("AXIOS ERROR: ", err);
    })
}
export function getRoomTypeChartMon(month, year){
    return api.get('/getRoomTypeChart?month='+month+'&year='+year)
    .then(res => {
      return res;
    }).catch((err) => {
      console.log("AXIOS ERROR: ", err);
    })
}
export function getRoomTypeChartTri(trimester, year){
    return api.get('/getRoomTypeChart?year='+year+'&trimester='+trimester)
    .then(res => {
      return res;
    }).catch((err) => {
      console.log("AXIOS ERROR: ", err);
    })
}