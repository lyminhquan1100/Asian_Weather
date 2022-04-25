import React, { useContext, useEffect, useState } from "react";
import "./hourly.scss";
import {
  Accordion,
  Card,
  useAccordionToggle,
  AccordionContext,
} from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { getWeatherHourlyRequest } from "../../redux/effects/weatherEffects";
import winDirConvert from "../../config/WindDir";
import UVConvert from '../../config/UV';

interface IContextAwareToggle {
  children?: any;
  eventKey: any;
  callback?: any;
}

const ContextAwareToggle: React.FC<IContextAwareToggle> = ({
  children,
  eventKey,
  callback,
}) => {
  const currentEventKey = useContext(AccordionContext);

  const decoratedOnClick = useAccordionToggle(
    eventKey,
    () => callback && callback(eventKey)
  );

  const isCurrentEventKey = currentEventKey === eventKey;

  return (
    <span onClick={decoratedOnClick}>
      {isCurrentEventKey ? (
        <i className="fas fa-chevron-up"></i>
      ) : (
        <i className="fas fa-chevron-down"></i>
      )}
    </span>
  );
};

interface IHourly{
}

const Hourly:React.FC<IHourly> = () => {
  const [timeNow, setTimeNow] = useState(new Date().getHours());
  const dispatch = useDispatch();
  const propsData = useSelector(
    (state: RootStateOrAny) => state.weatherReducer
  );


  // Khi component được sinh ra thì chạy hàm để lấy danh sách hourly
  useEffect(() => {
    dispatch(getWeatherHourlyRequest(propsData.weather.location.name));
  }, []);

  // điều kiện nếu danh sách thời tiết chưa load xong
  if (!propsData.loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <Accordion defaultActiveKey="0">

      {/* dùng hàm map để lấy ra danh sách thời tiết các giờ trong ngày */}
      {propsData.weatherHourly.map((item: any) => {

        // format thời gian theo ngày tháng năm
        let d = new Date(item.time.substring(0, 10));
        let date =
          d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();  

          // điều kiện là tính từ giờ hiện tại
          if(item.time.substring(11, 13) >= timeNow){
            return (
              <div className="container Box-cha" key={item.time_epoch}>
                <div className="hourly-card-nfl-header ">
                  <h2 className="date">
                    <span>{date}</span>
                    <span className="sub">{item.time.substring(11, 16)}</span>
                  </h2>
                  <div className="d-flex align-items-center">
                    <img
                      alt=""
                      className="weather-icon icon-two"
                      width="128px"
                      height="128px"
                      data-eager=""
                      src={item.condition.icon}
                    />
                    <div className="temp metric">{item.temp_c}°</div>
                  </div>
                  <span className="real-feel">
                    Cảm thấy như{" "}
                    {item.feelslike_c}°C
                  </span>
                  <div className="precip">
                    <img
                      alt="rain drop"
                      className="precip-icon"
                      src="/assets/icons/rainss.png"
                    />
                    {item.precip_mm}mm
                  </div>
                  <ContextAwareToggle
                    eventKey={item.time_epoch}
                  ></ContextAwareToggle>
                </div>
                <Accordion.Collapse eventKey={item.time_epoch}>
                  <Card.Body>
                    <div className="box-con">
                      <div className="forecast-container">
                        <table className="table">
                          <thead>
                            <tr>
                              <th scope="col">
                              <img src="/assets/icons/wind.png" alt="" />
                              {"  "}
                              Tốc độ gió
                              </th>
                              <td scope="col">{item.wind_kph} km/h</td>
                            </tr>
                            <tr>
                              <th scope="col">
                              <img src="/assets/icons/windgust.png" alt="" />
                              {"  "}
                              Gió mạnh
                              </th>
                              <td scope="col">{item.gust_kph} km/h</td>
                            </tr>
                            <tr>
                              <th scope="col">
                              <img src="/assets/icons/compass.png" alt="" />
                              {"  "}
                                Hướng gió</th>
                              <td scope="col">{item.wind_degree} °{" "}{winDirConvert(item.wind_dir)}</td>
                            </tr>
                            <tr>
                              <th scope="col">
                              <img src="/assets/icons/UV.png" alt="" />
                              {"  "}
                                Chỉ số UV</th>
                              <td scope="col">{item.uv}{" "}{UVConvert(item.uv)}</td>
                            </tr>
                          </thead>
                        </table>
                      </div>
                      <div className="forecast-container">
                        <table className="table">
                          <thead>
                            <tr>
                              <th scope="col">
                              <img src="/assets/icons/chephu.png" alt="" />
                              {"  "}
                                Độ che phủ mây</th>
                              <td scope="col">{item.cloud} %</td>
                            </tr>
                            <tr>
                              <th scope="col">
                              <img src="/assets/icons/eye.png" alt="" />
                              {"  "}
                                Tầm nhìn xa</th>
                              <td scope="col">{item.vis_km} km/h</td>
                            </tr>
                            <tr>
                              <th scope="col">
                              <img src="/assets/icons/doam.png" alt="" />
                              {"   "}
                                Độ ẩm</th>
                              <td scope="col">{item.humidity} %</td>
                            </tr>
                            <tr>
                              <th scope="col">
                              <img src="/assets/icons/rain.png" alt="" />
                              {"  "}
                                Lượng mưa</th>
                              <td scope="col">{item.precip_mm} mm</td>
                            </tr>
                          </thead>
                        </table>
                      </div>                      
                    </div>
                  </Card.Body>
                </Accordion.Collapse>
              </div>
            );
          }       
      })}
    </Accordion>
  );
};

export default Hourly;
