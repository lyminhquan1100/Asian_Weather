import {  Redirect  } from "react-router-dom";
import {useEffect, useState } from "react";

const HeaderDashboard = () => {
  const [loading, setLoading]=useState(false);
  const [email,setEmail]=useState("");
  //lấy data từ localstorage
  useEffect(()=>{
    let data=sessionStorage.getItem("admin");
    if (data) {
      setEmail(data);
    } else {  
      alert("Bạn phải login trước")
      setLoading(true);
    }
  },[]);

  if(loading){   
    return <Redirect to="/sign-in"/>
  }

  return (
    <div className="header-dashboard">
      <div className="d-flex align-items-center justify-content-end">
      <div className="white-text wrap-main-header">
          <i className="fas fa-user white-text user-admin-icon"></i>
          {email}
          <img src="/assets/icons/circle.png" className="user-admin-icon" alt="" />
        </div>
      </div>
    </div>
  );
};

export default HeaderDashboard;
