import {useState } from "react";
import { Redirect } from "react-router-dom";
import "../components/admin-dashboard/login.scss";
import axios from 'axios';
  
const LoginAdmin = () => {
    const [email, setEmail]=useState("");
    const [emailError, setEmailError]=useState("");
    const [password, setPassword]=useState("");
    const [passwordError, setPasswordError]=useState("");
    const [message, setMessage]=useState("");
    const [loading, setLoading]=useState(false);

    //Hàm xử lý validate email
    function validateEmail(email:string) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      }
    //Xử lý onClick login
    const clickLogin= ()=>{
        //Xử lý bắt validate
        if (validateEmail(email)) {
            setEmailError('');
        }
        else{
            setEmailError('Email is not valid');
        }

        if(password==""){
            setPasswordError("Password should not be empty");
        }
        else if(password.length<8){
            setPasswordError("Password must be at least 8 characters");
        }
        else setPasswordError('');
        
        //load api
        const loadAdmins = async () => {
            let payload = { email: email, password: password };
            let res = await axios.post('https://api-weather-asean.herokuapp.com/api/v1/admin/login', payload);      
            if(res.data.message=="Success"){
                sessionStorage.setItem("admin", res.data.data.email);
                sessionStorage.setItem("token", res.data.data.jwt);
                setLoading(true);
            }
            else{
                setMessage("Email or Password is not match");
            }
        };
        loadAdmins();
    }

    if(loading){
        return <Redirect to='/dashboard/users/setting' />
    }

	return (		
		<>
			 <section className="login-block">
                <div className="container-admin container">
                    <div className="row">
                    <div className="col-md-4 login-sec">
                        <h2 className="text-center">Login Admin</h2>
                        <div className="login-form-admin">
                            <div className="form-group-admin ">
                                <label htmlFor="exampleInputEmail1" id="">Email:</label>
                                <input id="email" type="text"
                                    className="form-control-admin" placeholder="email..." onChange={(e)=>setEmail(e.target.value)}/>
                                <h6 className="text-danger text-small">{emailError}</h6>
                            </div>
                            <div className="form-group-admin">
                                <label htmlFor="exampleInputPassword1" id="">Password:</label>
                                <input id="passWord" type="password"
                                    className="form-control-admin" placeholder="password..." onChange={(e)=>setPassword(e.target.value)}/> 
                                <h6 className="text-danger text-small">{passwordError}</h6>                               
                            </div>
                            <h6 className="text-danger text-small">{message}</h6>
                            <div className="form-check">
                                <label className="form-check-label">
                                    <input type="checkbox"
                                        className="form-check-input"/>
                                    <small>Remember Me</small>
                                </label>
                                {/* <Link to={`/dashboard/`}> */}
                                <button
                                     type="submit" onClick={clickLogin}  className="btn btn-login-admin float-right" >Submit
                                </button>
                                {/* </Link> */}
                            </div>
                        </div>
                        <div className="copy-text">Created with <i className="fa
                                fa-heart"></i> by <a href="#">AseanWeather</a>
                        </div>
                    </div>
                        <div className="col-md-8 banner-sec">
                        <div id="carouselExampleIndicators" className="carousel
                            slide" data-ride="carousel">
                            <ol className="carousel-indicators">
                                <li data-target="#carouselExampleIndicators"
                                    data-slide-to="0" className="active"></li>
                                <li data-target="#carouselExampleIndicators"
                                    data-slide-to="1"></li>
                                <li data-target="#carouselExampleIndicators"
                                    data-slide-to="2"></li>
                            </ol>
                            <div className="carousel-inner" role="listbox">
                                <div className="carousel-item active">
                                    <img className="d-block img-fluid"
                                        src="/assets/images/banner-login.jpg"
                                        alt="First slide"/>
                                    <div className="carousel-caption d-none
                                        d-md-block">
                                        <div className="banner-text">
                                            <h2>Login Admin</h2>
                                            <p>Xin chào, Chào mừng bạn trở lại!</p>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>

                        </div>
                        </div>
                    </div>
                </div>
            </section>

		</>	
	);
}

export default LoginAdmin;