import React, { useState, useEffect } from "react";
import "./searchbg.scss";
import "../../App.scss";
import {
  getWeatherNowRequest,
} from "../../redux/effects/weatherEffects";
import FavouriteLocation from "../favourite-location";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from 'axios';
// import { isBuffer } from "node:util";
import {useCookies}  from "react-cookie";
import {listCity} from '../../data/ListCity';

interface ISearch {
  propsData: any;
  // getWeatherSearchRequest: (searchKey: string) => void;
  getWeatherNowRequest: (city?: string) => void;
}
const  xoa_dau=(str:string)=> {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  return str;
}

const SearchComponent: React.FC<ISearch> = ({
  getWeatherNowRequest,propsData
}) => {
  //Khai báo state để sử dụng
  const [cityMatch, setCityMatch]:any[] = useState([]);
  const [text, setText] = useState("");
  const [show, setShow] = useState(false);
  const [listCities, setlistCities] = useState(listCity);
  const [cookies, setCookie] = useCookies(['ipAddress']);

  //Config api tìm kiếm
  // const url = "https://api-weather-asean.herokuapp.com/api/v1/cities";
  // const config = {
  //   url,
  //   headers: {
  //     'Access-Control-Allow-Origin': '*',
  //     'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  //     'Access-Control-Allow-Credentials': true,
  //     'Access-Control-Allow-Headers': 'Content-Type'
  //   }
  // }

  const getTotalView = ()=>{
        if(!cookies.ipAddress)
        {
          axios.put(
              `https://api-weather-asean.herokuapp.com/api/v1/ip`
            ).then((res)=>{
              localStorage.setItem("count",res.data.data.count);
              setCookie('ipAddress', res.data.data.ip ,{maxAge : 900});
            })
        }else{
          axios.get(
            `https://api-weather-asean.herokuapp.com/api/v1/count`
          ).then((res)=>{
            localStorage.setItem("count",res.data.data.count);
          })
        }
  }
  //Load api tìm kiếm địa phương
  useEffect(() => {
    // const loadCities = async () => {
    //   const response = await axios(config);
    //   setlistCities(response.data);
    // };
    getTotalView(); 
    // loadCities();
    
  }, [])

  //Match input with list city
  const handleSearch = async(text: string) => {
    if (!text) {
      setCityMatch([]);
      setShow(false);
    } else {
      setShow(true);
      let matches = listCities.filter((city: any) => {
        const regex = new RegExp(`${text}`, "gi");
        return city.name.match(regex);
      });
      setCityMatch(matches);
    }
     await setText(text);
  };
  
  //Click item filter
  const onCityHandler = (item: any) => {
    setText(item.name);
    if(propsData.nowloading){
      getWeatherNowRequest(item.lable);
    }
    setCityMatch([]);
  };


  return (
    <div className="hero-container">

      {/* Giao diện của trang search */}
      <video src="/assets/videos/video-1.mp4" autoPlay loop muted />
      <h3 className="text-home-title-response">Asean Weather</h3>
      <h5 className="text-home-detail-response">Today , What is the weather like in your place ? </h5>

      {/* Thanh search */}
      <div className="hero-btns">
        <div className="d-flex wrap-input-response">
          <input
            type="text"
            className="form-control input_search"
            placeholder="&#xF002; Search location..."
            onChange={(e) => handleSearch(e.target.value)}
            value={text}
            onBlur={() => {
              setTimeout(() => {
                setCityMatch([]);
                setShow(false);
              }, 200);
            }}
          />
          <Link to={`now/${xoa_dau(text)}`} >
            <button className="btn-search" style={{ backgroundColor: show ? "white" : "#1e90ff" }} >
              <i className="fas fa-search icon-search" style={{ color: show ? "#747d8c" : "#dcdde1" }}></i>
            </button>
          </Link>
        </div>
        <div
          className="suggest-wrap" 
          style={{ display: show ? "block" : "none" }}
        >
          {
            cityMatch.length === 0 && (<div className="suggest text-danger" id="suggest">Không tìm thấy kết quả nào .</div>)
          }
          {cityMatch &&
            cityMatch.map((item: any, index: any) => (
              <Link to={`/now/${item.lable}`} key={index}>
                <div
                  className="suggest"
                  onClick={() => onCityHandler(item)}
                >
                  <i className="fas fa-search search-item-icon"></i>
                  {item.name}
                </div>
              </Link>
            ))}
        </div>
        <br />

        {/* Hiển thị 3 địa phương đầu trong danh sách yêu thích */}
        <FavouriteLocation />
      </div>

      {/* view số người xem trang web từ trước tới giờ */}
      <div className="view-fixed-panel">
        <i className="fas fa-eye"></i>
        <span>{localStorage.getItem("count")}</span>              
      </div>
    </div>

  );
};

const mapStateToProps = (state: any) => {
  return {
    propsData: state.weatherReducer,
  };
};
const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      // getWeatherSearchRequest,
      getWeatherNowRequest,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SearchComponent);
