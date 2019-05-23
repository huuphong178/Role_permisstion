import * as Types from '../constants/ActionType'
import {getAllRoom,deleteRoom,createRoom,getOneRoom,updateRoom} from '../api/room';
export const actFetchRoomsRequest=() =>{
    return (dispatch)=> {
        return getAllRoom().then(res=>{
            dispatch(actFetchRooms(res.data));
        }).catch(err=>{
        })
    }
}
export const actFetchRooms=(rooms) =>{
    return {
        type: Types.FETCH_ROOMS,
        rooms
    }
}
export const actDeleteRoomRequest =id=>{
    return dispatch=>{
        return deleteRoom(id).then(res=>{
            dispatch(actDeleteRoom(id))
        })
    }
}
export const actDeleteRoom=(id)=>{
    return {
        type: Types.DELETE_ROOMS,
        id
    }
}
export const actAddRoomRequest=(room)=>{
    return dispatch =>{
        return createRoom(room).then(res=>{
            dispatch(actAddRoom(res.data))
        })
    }
}
export const actAddRoom=(room)=>{
    return {
        type: Types.ADD_ROOMS,
        room
    }
}
export const actGetRoomRequest=(id)=>{
    return dispatch =>{
        return getOneRoom(id).then(res=>{
            dispatch(actGetRoom(res.data))
        })
    }
}
export const actGetRoom=(room)=>{
    return {
        type: Types.EDIT_ROOMS,
        room
    }
}
export const actUpdateRoomRequest=(room)=>{
    return dispatch =>{
        return updateRoom(room).then(res=>{
            dispatch(actUpdateRoom(res.data))
        })
    }
}
export const actUpdateRoom=(room)=>{
    return {
        type: Types.UPDATE_ROOMS,
        room
    }
}