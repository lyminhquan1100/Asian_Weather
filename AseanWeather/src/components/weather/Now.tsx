import "./Now.scss";
import config from "../../config/AirQuality";
import winDirConvert from "../../config/WindDir";
import UVConvert from '../../config/UV';

const Now = ({ propsData }: any) => {
  return (
    // Hiển thị thông tin của ngày hiện tại lấy từ redux
    <div className="container">
      <div className="weather-container">
        <div className="cur-con-weather-card">
          <div className="d-flex main-now-wrap">
            <div className="forecast-container ">
              <div className="date-title-wrap">
                <h2 className="cur-con-weather-card__title">
                  Thời tiết hiện tại
                </h2>
                <p className="cur-con-weather-card__subtitle">
                  {propsData.location.localtime.name}
                </p>
              </div>
              <div className="d-flex">
                <img
                  className="weather-icon-main"
                  src={propsData.current.condition.icon}
                />
                <div className="temp-container">
                  <div className="temp">{propsData.current.temp_c}°</div>
                  <div className="real-feel">
                    <span>Cảm thấy như </span>
                    {propsData.current.temp_c}°
                  </div>
                </div>
              </div>
              <div className="condition-text-now">
                <span className="condition-text">{propsData.current.condition.text}</span>
              </div>
            </div>
            <div className="forecast-container">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">
                      <img src="/assets/icons/wind.png" alt="" />
                      {"  "}
                      Tốc độ gió
                    </th>
                    <td scope="col">{propsData.current.wind_kph} km/h</td>
                  </tr>
                  <tr>
                    <th scope="col">
                      <img src="/assets/icons/windgust.png" alt="" />
                      {"  "}
                      Gió mạnh
                    </th>
                    <td scope="col">{propsData.current.gust_kph} km/h</td>
                  </tr>
                  <tr>
                    <th scope="col">
                      <img src="/assets/icons/compass.png" alt="" />
                      {"  "}
                      Hướng gió
                    </th>
                    <td scope="col">{propsData.current.wind_degree} °{" "}{winDirConvert(propsData.current.wind_dir)}</td>
                  </tr>
                  <tr>
                    <th scope="col">
                      <img src="/assets/icons/UV.png" alt="" />
                      {"  "}
                      Chỉ số UV
                    </th>
                    <td scope="col">{propsData.current.uv}{" "}{UVConvert(propsData.current.uv)}</td>
                  </tr>
                </thead>
              </table>
            </div>
            <div className="forecast-container">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">
                      <img src="/assets/icons/chephu.png" alt="" /> Che phủ
                    </th>
                    <td scope="col">{propsData.current.cloud} %</td>
                  </tr>
                  <tr>
                    <th scope="col">
                      <img src="/assets/icons/eye.png" alt="" />
                      {"  "}
                      Tầm nhìn xa
                    </th>
                    <td scope="col">{propsData.current.vis_km} km/h</td>
                  </tr>
                  <tr>
                    <th scope="col">
                      <img src="/assets/icons/doam.png" alt="" />
                      {"   "}
                      Độ ẩm
                    </th>
                    <td scope="col">{propsData.current.humidity} %</td>
                  </tr>
                  <tr>
                    <th scope="col">
                      <img src="/assets/icons/rain.png" alt="" />
                      {"  "}
                      Lượng mưa
                    </th>
                    <td scope="col">{propsData.current.precip_mm} mm</td>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
        </div>
      </div>
    
      {/* Air Quality */}
      <div className="weather-container">
        <div className="cur-con-weather-card">
          <h2 className="cur-con-weather-card__title">CHẤT LƯỢNG KHÔNG KHÍ</h2>

          <div className="d-flex air-quality">          
            <div className="forecast-container">
              <table className="table">
                <thead>
                  <tr>
                    <td className="air-quality-title" style={{padding:0}}>
                      <span className="aqi-text aqi-text-main"  style={{ color: "black", fontWeight: "bold" }}>
                        {config.aqiNumberToString(
                          Object.values(propsData.current.air_quality)[6]
                        )}
                      </span>
                      </td>
                    <span className="aqi-text aqi-text-detail">
                      {config.aqiIndexDetail(
                        Object.values(propsData.current.air_quality)[6]
                      )}
                    </span>
                   
                  </tr>
                </thead>
              </table>
            </div>
            <div className="forecast-container">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Khí CO</th>
                    <td scope="col">
                      {Math.round(propsData.current.air_quality.co)} μg/m3
                    </td>
                  </tr>
                  <tr>
                    <th scope="col">Ozon</th>
                    <td scope="col">
                      {Math.round(propsData.current.air_quality.o3)} μg/m3
                    </td>
                  </tr>
                  <tr>
                    <th scope="col">Khí SO2</th>
                    <td scope="col">
                      {Math.round(propsData.current.air_quality.so2)} μg/m3
                    </td>
                  </tr>
                  <tr>
                    <th scope="col">Khí NO2</th>
                    <td scope="col">
                      {Math.round(propsData.current.air_quality.no2)} μg/m3
                    </td>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
        </div>
      </div>
        {/* Sunrise / Sun set */}
        <div className="weather-container">
        <div className="cur-con-weather-card">
          <h2 className="cur-con-weather-card__title">Thời gian mọc / lặn</h2>
          <div className="d-flex astro-wrap">
            <div className="forecast-container">
              <table className="table">
                <thead>
                  <tr>
                    <th style={{ textAlign: "center" }} colSpan={2} scope="col">
                      <img
                        className="weather-icon"
                        src="/assets/icons/sun.png"
                      />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      <img src="/assets/icons/sunrise.png" alt="" />
                      {"  "}
                      Mặt trời mọc
                    </th>
                    <td scope="row">
                      {propsData.forecast.forecastday[0].astro.sunrise}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <img src="/assets/icons/sunset.png" alt="" />
                      {"  "}
                      Mặt trời lặn
                    </th>
                    <td scope="row">
                      {propsData.forecast.forecastday[0].astro.sunset}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="forecast-container">
              <table className="table">
                <thead>
                  <tr>
                    <th style={{ textAlign: "center" }} colSpan={2}>
                      <img
                        className="weather-icon"
                        src="/assets/icons/moon.png"
                      />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      <img src="/assets/icons/moonrise.png" alt="" />
                      {"  "}
                      Mặt trăng lên
                    </th>
                    <td scope="row">
                      {propsData.forecast.forecastday[0].astro.moonrise}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <img src="/assets/icons/moonset.png" alt="" />
                      {"  "}
                      Mặt trăng lặn
                    </th>
                    <td scope="row">
                      {propsData.forecast.forecastday[0].astro.moonset}
                    </td>
                  </tr>
      
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Now;
