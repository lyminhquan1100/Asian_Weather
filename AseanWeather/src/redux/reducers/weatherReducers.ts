import { WeatherActionTypes } from "../actionTypes/weatherTypes"
interface IAction {
    type: string;
    payload?: any;
}

interface IState {
    nowloading:boolean;
    success: boolean;
    loading: boolean;
    loaded: boolean;
    load:boolean;
    error: string;
    data: any;
    weather: any[],
    weatherHourly:any[],
    weatherDaily:any[],
    astro:any[],
    location:[],
    favorite:[],
    lo:boolean,
    action:boolean,
    loadFavor:boolean
}

const initalState:IState = {
    nowloading:false,
    success: false,
    loading: false,
    loaded: false,
    load:false,
    lo:false,
    error: '',
    data: {},
    weather: [] ,
    weatherHourly:[],
    weatherDaily:[],
    astro:[],
    location:[],
    favorite:[],
    action:false,
    loadFavor:false,
}

export const weatherReducer = (state = initalState, action:IAction) => {
    switch(action.type){
        case WeatherActionTypes.GET_WEATHER_NOW: {
            return {
                ...state,
                success: true,
            }
        }
        case WeatherActionTypes.GET_WEATHER_NOW_SUCCESS: {
            return {
                ...state,
                nowloading: true,
                weather: action.payload
            }
        }
        case WeatherActionTypes.GET_WEATHER_NOW_FAIL: {
            return {
                ...state,
                nowloading: false,
                error: action.payload
            }
        }
        case WeatherActionTypes.GET_WEATHER_HOURLY_SUCCESS: {
            return {
                ...state,
                loading: true,
                weatherHourly: action.payload
            }
        }
        case WeatherActionTypes.GET_WEATHER_HOURLY_FAIL: {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        }
        case WeatherActionTypes.GET_WEATHER_DAILY_SUCCESS: {
            return {
                ...state,
                loaded: true,
                weatherDaily: action.payload
            }
        }
        case WeatherActionTypes.GET_WEATHER_DAILY_FAIL: {
            return {
                ...state,
                loaded: false,
                error: action.payload
            }
        }
        
        case WeatherActionTypes.SEARCH_WEATHER_SUCCESS: {
            return {
                ...state,
                success: true,
                location: action.payload
            }
        }
        case WeatherActionTypes.SEARCH_WEATHER_FAIL: {
            return {
                ...state,
                success: false,
                error: action.payload
            }
        }
        case WeatherActionTypes.GET_WEATHER_FAVOURITE_SUCCESS: {
            return {
                ...state,
                lo: true,
                favorite: action.payload
            }
        }
        case WeatherActionTypes.GET_WEATHER_FAVOURITE_FAIL: {
            return {
                ...state,
                lo: false,
                error: action.payload
            }
        }
        case WeatherActionTypes.REMOVE_WEATHER: {
            return {
                ...state,
                action: action.payload,
                loadFavor:true
            }
        }
        case WeatherActionTypes.ADD_WEATHER: {
            return {
                ...state,
                action: action.payload,
                loadFavor:true
            }
        }
        ///
        case WeatherActionTypes.ADD_WEATHER_FAIL: {
            return {
                ...state,
                error: action.payload,
                loadFavor:false
            }
        }
        case WeatherActionTypes.ADD_WEATHER_FAIL: {
            return {
                ...state,
                error: action.payload,
                loadFavor:false
            }
        }
        default: {
            return state;
        }
    }
}