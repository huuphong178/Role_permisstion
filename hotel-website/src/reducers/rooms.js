import * as Types from '../constants/ActionType'
var initialState=[
];

const findIndex =(rooms, id)=>{
    var result=-1;
    rooms.forEach((room,index)=>{
      if(room.roomID===id){
        result=index;
      }
    });
    return result;
  }

const rooms = ( state = initialState, action) => {
    var index=-1;
    var {id, room} = action;
    switch(action.type){
        case Types.FETCH_ROOMS:
            state=action.rooms;
            return [...state];
        case Types.DELETE_ROOMS:
            index=findIndex(state, id);
            state.splice(index, 1);
            return [...state];
        case Types.ADD_ROOMS:
            state.push(action.room);
            return [...state];
        case Types.UPDATE_ROOMS:
            index= findIndex(state, room.roomID);
            state[index]= room;
            return [...state];
        default:return [...state];
    }
};
 
export default rooms; 