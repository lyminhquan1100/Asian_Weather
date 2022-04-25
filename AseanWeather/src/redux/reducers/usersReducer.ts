import { usersTypes } from "../actionTypes/usersTypes"
interface IAction {
    type: string;
    payload?: any;
}

interface IState {
    success: boolean;
    loading: boolean;
    listUsers:[];
    totalUser:number;
    totalPage:number;

}

const initalState:IState = {
    success: false,
    loading: false,
    listUsers:[],
    totalUser:0,
    totalPage:0
}

export const usersReducer = (state = initalState, action:IAction) => {
    switch(action.type){
        case usersTypes.GET_USERS_SUCCESS: {
            return {
                ...state,
                success: true,
                listUsers: [...action.payload.list],
                totalUser:action.payload.totalUsers,
                totalPage:action.payload.totalPages
            }
        }
        case usersTypes.GET_USERS_FAIL: {
            return {
                ...state,
                success: false,
                error: action.payload.list
            }
        }
   
        default: {
            return state;
        }
    }
}