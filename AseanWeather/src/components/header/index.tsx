import { useState, useEffect } from "react";
import "./header.scss";
import { Link } from "react-router-dom";
import CommonModal from "../modal/CommonModal";
import { Dropdown } from "react-bootstrap";
import axios from "axios";
import FacebookLogin from "react-facebook-login";
// import { useDispatch } from "react-redux";
import Favourite from "../weather/Favourite";
// import useMetaTags from "react-metatags-hook"

const Header = () => {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [isShow, setIsShow] = useState(false);
  // const [showModal, setShowModal] = useState(false);
  const [showSignIn, setShowSignIn] = useState(true);
  const [showUser, setShowUser] = useState(false);
  const [isShowFv, setIsShowFv] = useState(false);
  // const [user, setUser] = useState("");
  // const dispatch = useDispatch();

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  //xử lý button
  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  window.addEventListener("resize", showButton);

  //Kiểm tra local storage
  let userLogin;
  if (localStorage.getItem("userName")) {
    userLogin = localStorage.getItem("userName");
  } else {
    userLogin = "";
  }

  useEffect(() => {
    if (localStorage.getItem("userName")) {
      setShowSignIn(false);
      setShowUser(true);
    }
    else {
      setShowSignIn(true);
      setShowUser(false);
    }
  },);

  //Xử lý response facebook
  const responseFacebook = (response: any) => {
    let params: any = {
      token: response.accessToken,
    };
    localStorage.setItem("userID", response.userID);
    if (!localStorage.getItem("userName")) {
      axios
        .post(
          `https://api-weather-asean.herokuapp.com/auth/facebook`,
          params
        )
        .then((res) => {
          setIsShow(false);
          localStorage.setItem("userName", res.data.data.data.name);
          setShowSignIn(false);
          alert(
            "Xin chào, " +
            res.data.data.data.name +
            "\nchúc bạn xem thông tin thời tiết vui vẻ!"
          );
        })
        .catch((error) => alert("Server hiện đang bị nghẽn, xin lỗi bạn vì sự bất tiện này !!"));
    }
  };

  //xử lý log out
  const logoutClick = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("userID");
    setShowSignIn(true);
    setShowUser(false);
  }

  return (
    <>
      {/* Phần header */}
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            <img src="/assets/images/logo2.png" alt="" title="logo" />
            <div>
              <span>Asean</span>
              <span>Weather</span>
            </div>
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>

            <li className="nav-item">
              <Link
                to="/search"
                className="nav-links "
                onClick={closeMobileMenu}
              >
                <i className="fas fa-search"></i>
              </Link>
            </li>
            <li className="nav-item "
              onClick={() => setIsShowFv(true)}
              style={{ cursor: "pointer" }}
            >
               <Link
                to="#"
                className="nav-links "
                onClick={closeMobileMenu}
              >
                Favourite
              </Link>
            </li>
            <li
              className="nav-item"
              style={{ display: showSignIn ? "block" : "none" }}
            >
              <Link
                to="#"
                className="nav-links "
                onClick={() => {setIsShow(true)}}
              >
                Sign In
              </Link>
            </li>
            <li className="nav-item d-flex wrap-user-login">
              <div style={{ display: showUser ? "block" : "none" }}>
                <div style={{ display: "flex" }}>
                  <div>
                    <i
                      title="UserName"
                      className="fas fa-user"
                      style={{ color: "white" }}
                    ></i>
                    <span id="userName">{userLogin}</span>
                  </div>
                  <div className="dropdown">
                    <Dropdown >
                      <Dropdown.Toggle style={{ backgroundColor: "#657382" }}
                        variant="secondary btn-sm"
                        id="dropdown-basic"
                      ></Dropdown.Toggle>
                      <Dropdown.Menu style={{ backgroundColor: "#73a47" }}>
                        <Dropdown.Item href="#"
                          onClick={() => logoutClick()}
                        >Thoát tài khoản</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </nav>
      
      {/* Modal Favourite */}
      <CommonModal


        title="List Favourite <3"
        size="md"
        show={isShowFv}
        setIsShow={() => setIsShowFv(false)}
      >
        <Favourite />
      </CommonModal>
      
      {/* Modal Login */}
      <CommonModal
        title="Modal Sign In"
        size="md"
        show={isShow}
        setIsShow={() => setIsShow(false)}
      >
        <div className="login-fb-wrap">
          {/* <a href="https://vti-aca-april-team1-api.herokuapp.com/auth/facebook"> */}
          <div className="mt-4 mb-4">
            <span>
              Bằng cách nhấp vào <b>Login</b>, bạn đồng ý cho <b>AseanWeather</b>{" "}
              sẽ có quyền truy cập vào tên và email của bạn:
            </span>
          </div>
          <FacebookLogin
            appId="369670134345835"
            autoLoad={false}
            fields="email,public_profile"
            callback={responseFacebook}
            cssClass="my-facebook-button-class-blue"
            icon="fa-facebook"
          />
          <div className="mt-4 mb-4">
            <span>
              Are you Admin of Asean Weather?
              <Link
                to="/sign-in"
                style={{ color: "#fa8231" }}
              // onClick={() => setShowModal(true)}
              >
                SignIn
              </Link>
            </span>
          </div>
        </div>
      </CommonModal>
    </>
  );
};

export default Header;
