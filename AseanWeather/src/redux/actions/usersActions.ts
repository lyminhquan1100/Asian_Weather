import { usersTypes } from "../actionTypes/usersTypes";

export const getUsersSuccess = (payload: any) => {
    return {
        type: usersTypes.GET_USERS_SUCCESS,
        payload
    }
}

export const getUsersFail = (payload: string) => {
    return {
        type: usersTypes.GET_USERS_FAIL,
        payload
    }
}
