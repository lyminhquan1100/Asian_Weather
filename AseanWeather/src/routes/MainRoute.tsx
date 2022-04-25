import { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Footer from '../components/footer';
import Header from '../components/header';
import HomePage from '../pages/HomePage';
import Notfound from '../pages/Notfound';
import BoxWeather from '../pages/BoxWeather';
import Favourite from '../components/weather/Favourite';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { getListcityRequest } from '../redux/effects/cityEffects';
import { getWeatherFavoriteRequest } from '../redux/effects/weatherEffects';

const MainRoute = () => {
    const dispatch = useDispatch();
    const propsData = useSelector((state: RootStateOrAny) => state.weatherReducer)

    useEffect(() => {
        dispatch(getListcityRequest())
        dispatch(getWeatherFavoriteRequest(localStorage.getItem("userID")));
    }, [propsData.action, localStorage.getItem("userID")])
    
    return (
        <>
            {/* Component chứa các router */}
            <Header />
            <Switch>
                <Route path="/" exact component={HomePage} />
                {/* <Route path='/search' component={HomePage} /> */}
                <Route path='/now/:city' component={BoxWeather} />
                <Route path='/hourly/:city' component={BoxWeather} />
                <Route path='/daily/:city' component={BoxWeather} />
                <Route path='/favourites' component={Favourite} />
                <Route component={Notfound} />
            </Switch>
            <Footer />
        </>
    );
}

export default MainRoute;