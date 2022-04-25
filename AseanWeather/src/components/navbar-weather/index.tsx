import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import {
  EmailShareButton,
  FacebookShareButton,
  FacebookIcon,
} from "react-share";
import { getWeatherNow } from '../../redux/actions/weatherActions';
import { addWeatherFavoriteRequest, removeWeatherFavoriteRequest } from "../../redux/effects/weatherEffects";
import "./navbar.scss";
import  {listCity} from "../../data/ListCity";

const NavbarWeather = ({ propsData, city, favorite, userID, loadFavor }: any) => {
 
  let history=useHistory();
  const [click, setClick] = useState(true);
  const [labelFavorite, setLabelFavorite] = useState(null);
  const [test, setTest]=useState(true);
  const [data, setData] = useState(
    {
      userId: "",
      cityId: ""
    }
  )
  const [list, setList]:any[]=useState(listCity);

  
  const dispatch = useDispatch();

  // Hàm kiểm tra xem địa phương này có nằm trong phần yêu thích hay k 
  const setFv = (citySearch:string) => {
    let i:number;
    let f:number;
    setClick(true);
    for( i=0;i<list.length;i++){
      for(f=0;f<favorite.length;f++){
        if (list[i].lable === favorite[f].cityLable) {
          if (citySearch.toUpperCase() === list[i].lable.toUpperCase()) {
            setClick(false);
            break;
          }
          
        }
      }
      
    } 
   
  }

  const setDt = (citySearch:string) => {
      setTest(true);
      let i:number;
      for( i=0;i<list.length;i++){
        if (citySearch.toUpperCase() === list[i].lable.toUpperCase()) {
          setTest(false);    
          console.log("test -----",test);          
          setData({
            userId: userID,
            cityId: list[i].id,
          });
         setLabelFavorite(list[i].lable);
         break;
        }
      } 
    }

  const setDefault = () =>{
    dispatch(getWeatherNow());
  } 

  useEffect(() => { 
      // setFv(propsData.location.name);
      // setClick(true);
      setDt(propsData.location.name);
      setLabelFavorite(propsData.location.name);
      return () => {
        setDefault();
      }
      
  }, [propsData.location.name,test,click,labelFavorite])

  useEffect(()=>{   
    setLabelFavorite(propsData.location.name);
  },[labelFavorite]);
  
  // Ngườưi dùng phải đăng nhập mới được dùng chức năng này, nếu đăng nhập rồi thì có thể thêm hoặc xóa địa phương yêu thích
  const handleClick = () => {
    if (localStorage.getItem("userName")) {  
      if (click==true) { 
        setClick(true);
        if(test===false){
          const confim = window.confirm(`Bạn có muốn thêm ${labelFavorite} vào yêu thích không ?`);
          setTest(true);
          setLabelFavorite(null);
          // setClick(false);
          
          if(confim){
            dispatch(addWeatherFavoriteRequest(data))
            // if(loadFavor===false){
            //   alert("Server đang bị nghẽn, xin lỗi bạn vì sự bất tiện này!");
            //   setClick(true);
            // }          
            setClick(false);
            setTest(true);
            setLabelFavorite(null);
            
          
          }
          
        }
        //Truong hop user search 1 city khong nằm trong list database
        else {
          const cf = window.confirm('Địa phương này không nằm trong danh sách quản lý\n Vui lòng chọn địa phương trong khung tìm kiếm!');
          if(cf){
            history.push("/");
          }
        }
        
      } else {
        const cf = window.confirm(`Bạn muốn xóa yêu thích ${labelFavorite}?`);
        if(cf){
          dispatch(removeWeatherFavoriteRequest(localStorage.getItem("userID"), data.cityId));
          // dispatch(removeWeatherFavoriteRequest("1403943429941869", data.cityId));
          // if(loadFavor===false){
          //   alert("Server đang bị nghẽn, xin lỗi bạn vì sự bất tiện này!");
          //   setClick(false);
          // }
          setClick(true);
        }
      }
    } else {
      const cf = window.confirm('Bạn muốn thêm địa phương này vào danh sách yêu thích? \nBạn phải login trước !');
        if(cf){
           history.push("/");
        }
    }
  }

  //config city để share email đúng
  let i: number = 0;
  const configCityShare = (name: string) => {
    for (i = 0; i < name.length - 1; i++) {
      name = name.replace(" ", "%20");
    }
    return name;
  }

  return (
    <div className="container navbar-weather-wrap" >

      {/* thanh navbar weather */}
      <div id="btn-wrap">
        <NavLink
          to={`/now/${propsData.location.name}`}
          activeClassName="active"
        >
          <button type="button" id="btn" className="btn-navbar ">
            NOW
          </button>
        </NavLink>
        <NavLink
          to={`/hourly/${propsData.location.name}`}
          activeClassName="active"
        >
          <button type="button" id="btn" className="btn-navbar">
            HOURLY
          </button>
        </NavLink>
        <NavLink
          to={`/daily/${propsData.location.name}`}
          activeClassName="active"
        >
          <button type="button" id="btn" className="btn-navbar">
            DAILY
          </button>
        </NavLink>
      </div>

      <div className="location-wrap d-flex">

        {/* tên địa phương với quốc gia của địa phương đấy */}
        <div className="location-title-wrap">
          <span className="location-title">
            {propsData.location.name}, {propsData.location.country}
          </span>
        </div>

        <div className="favourite-wrap">

          {/* Hiển thị xem đó có phải là địa phương yêu thích k */}
          <button onClick={handleClick}>
            <i
              className="fas fa-heart heart"
              style={{ color: click ? "#a4b0be" : "red" }}
              title="Thêm vào yêu thích"
            ></i>
          </button>

          {/* Nút share cho Email */}
          <EmailShareButton
            url={`https://aseanweather.herokuapp.com/now/${configCityShare(propsData.location.name)}`}
            subject="ASEAN WEATHER- Chia sẻ thời tiết, gắn kết yêu thương !"
            body={
              `Xin Chào, Hãy cùng xem thời tiết hôm nay tại ${propsData.location.name}` + " cùng AseanWeather: "
            }
            className="shareEmail p-2 "
            title="Chia sẻ qua email"
          >
            <i className="fas fa-envelope gmail"></i>
          </EmailShareButton>

          {/* Nút share cho facebook */}
          <FacebookShareButton
            url={`https://aseanweather.herokuapp.com/now/${propsData.location.name}`}
            quote={`Xem thời tiết tại ${propsData.location.name} cùng AseanWeather `}
            className="share"
            title="Chia sẻ lên Facebook"
          >
            <FacebookIcon className="facebook" size={30} round={true} />
          </FacebookShareButton>
        </div>
      </div>
    </div>
  );
};

export default NavbarWeather;
