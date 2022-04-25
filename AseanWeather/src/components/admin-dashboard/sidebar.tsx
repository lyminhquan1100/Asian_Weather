import { useState,useEffect } from "react";
import { NavLink ,useHistory} from "react-router-dom";
import "./admin.scss";
const Sidebar = () => {
  const [loading, setLoading] = useState(false);
  let history=useHistory();
  //xử lý khi click nút logout
  const clickLogout = () => {
    const cf = window.confirm('Ban có muốn đăng xuất không ?');
    if(cf){
    sessionStorage.clear();
    setLoading(true);
  }
  };
  //Xử lý chuyển hướng sau khi logout
  useEffect(()=>{
    if(loading){
      history.push('/');
    }
  },[loading]);

  return (
    <>
      <div className="main-sidebar">
        <NavLink to="/dashboard">
          <div className="logo-wrap">
            <img src="/assets/images/logo2.png" alt="" title="logo" />
            <div className="text-logo">
              <span>Asean</span>
              <span>weather</span>
            </div>
          </div>
        </NavLink>
        <div className="btn-main-wrap">
          <div>
            <NavLink to="/dashboard/users/setting" activeClassName="is-active">
              <div className="btn-main-text btn-main-item">
                <i className="fas fa-user-cog black-text"></i>
                <span className="black-text">Quản lý Người Dùng</span>
              </div>
            </NavLink>
          </div>
          <div>
            <div
              className="admin-logout btn-danger text-white mt-4"
              onClick={clickLogout}
            >
              <i className="fas fa-sign-out-alt "></i>
              <span>Đăng Xuất</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
