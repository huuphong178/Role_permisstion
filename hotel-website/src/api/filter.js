import api from './init'

export function getDaily_booking(fromedate, todate, top){
    return api.get('/getDaily_booking?fromdate='+fromedate+'&todate='+todate+'&top='+top)
    .then(res => {
      return res;
    }).catch((err) => {
      console.log("AXIOS ERROR: ", err);
    })
}
export function getMonthly_booking(fromedate, todate, top){
  return api.get('/getMonthly_booking?fromdate='+fromedate+'&todate='+todate+'&top='+top)
  .then(res => {
    return res;
  }).catch((err) => {
    console.log("AXIOS ERROR: ", err);
  })
}
export function getWeekly_booking(fromedate, todate, top){
  return api.get('/getWeekly_booking?fromdate='+fromedate+'&todate='+todate+'&top='+top)
  .then(res => {
    return res;
  }).catch((err) => {
    console.log("AXIOS ERROR: ", err);
  })
}