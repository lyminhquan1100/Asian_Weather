import { WeatherActionTypes } from "../actionTypes/weatherTypes"

export const getWeatherNow = () => {
    return {
        type: WeatherActionTypes.GET_WEATHER_NOW,
    }
}

export const getWeatherNowSuccess = (payload:any) => {
    return {
        type: WeatherActionTypes.GET_WEATHER_NOW_SUCCESS,
        payload
    }
}

export const getWeatherNowFail = (payload:any) => {
    return {
        type: WeatherActionTypes.GET_WEATHER_NOW_FAIL,
        payload
    }
}

export const getWeatherHourlySuccess = (payload:any) => {
    return {
        type: WeatherActionTypes.GET_WEATHER_HOURLY_SUCCESS,
        payload
    }
}

export const getWeatherHourlyFail = (payload:any) => {
    return {
        type: WeatherActionTypes.GET_WEATHER_HOURLY_FAIL,
        payload
    }
}

export const getWeatherDailySuccess = (payload:any) => {
    return {
        type: WeatherActionTypes.GET_WEATHER_DAILY_SUCCESS,
        payload
    }
}

export const getWeatherDailyFail = (payload:any) => {
    return {
        type: WeatherActionTypes.GET_WEATHER_DAILY_FAIL,
        payload
    }
}


export const searchWeatherSuccess = (payload:any) => {
    return {
        type: WeatherActionTypes.SEARCH_WEATHER_SUCCESS,
        payload
    }
}

export const searchWeatherFail = (payload:any) => {
    return {
        type: WeatherActionTypes.SEARCH_WEATHER_FAIL,
        payload
    }
}

export const getWeatherFavoriteSuccess = (payload:any) => {
    return {
        type: WeatherActionTypes.GET_WEATHER_FAVOURITE_SUCCESS,
        payload
    }
}

export const getWeatherFavoriteFail = (payload:any) => {
    return {
        type: WeatherActionTypes.GET_WEATHER_FAVOURITE_FAIL,
        payload
    }
}

export const addWeather = (payload:any) => {
    return {
        type: WeatherActionTypes.ADD_WEATHER,
        payload
    }
}

export const addWeatherSuccess = (payload:any) => {
    return {
        type: WeatherActionTypes.ADD_WEATHER_SUCCESS,
        payload
    }
}

export const addWeatherFail = (payload:any) => {
    return {
        type: WeatherActionTypes.ADD_WEATHER_FAIL,
        payload
    }
}

export const removeWeather = (payload:any) => {
    return {
        type: WeatherActionTypes.REMOVE_WEATHER,
        payload
    }
}

export const removeWeatherSuccess = (payload:any) => {
    return {
        type: WeatherActionTypes.REMOVE_WEATHER_SUCCESS,
        payload
    }
}

export const removeWeatherFail = (payload:any) => {
    return {
        type: WeatherActionTypes.REMOVE_WEATHER_FAIL,
        payload
    }
}