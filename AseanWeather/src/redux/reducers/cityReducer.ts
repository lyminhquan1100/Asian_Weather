import { cityTypes } from "../actionTypes/cityTypes"
interface IAction {
    type: string;
    payload?: any;
}

interface IState {
    success: boolean;
    listCity:[];
}

const initalState:IState = {
    success: false,
    listCity:[],
}

export const cityReducer = (state = initalState, action:IAction) => {
    switch(action.type){
        case cityTypes.GET_LIST_CITY_SUCCESS: {
            return {
                ...state,
                success: true,
                listCity: action.payload
            }
        }
        case cityTypes.GET_LIST_CITY_FAIL: {
            return {
                ...state,
                success: false,
                error: action.payload
            }
        }
        default: {
            return state;
        }
    }
}