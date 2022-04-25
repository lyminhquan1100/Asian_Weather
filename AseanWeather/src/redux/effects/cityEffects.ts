import axios from "axios"
import { getCityFail, getCitySuccess } from "../actions/cityActions";

export const getListcityRequest = () => {
    const url = "https://api-weather-asean.herokuapp.com/api/v1/cities";
    const config = {
        url,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Headers': 'Content-Type'
        }
    }
    return (dispatch: any) => {
        axios(config).then((res) => {
            return dispatch(getCitySuccess(res.data))
        }).catch(err => dispatch(getCityFail('Something wrong !')))
    }
}