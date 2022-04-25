import { cityTypes } from "../actionTypes/cityTypes"

export const getCitySuccess = (payload:any) => {
    return {
        type: cityTypes.GET_LIST_CITY_SUCCESS,
        payload
    }
}

export const getCityFail = (payload:any) => {
    return {
        type: cityTypes.GET_LIST_CITY_FAIL,
        payload
    }
}