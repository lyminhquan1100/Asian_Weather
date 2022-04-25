import "./footer.scss";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    // Phần footer
    <div className="footer-container" >
      <section className="social-media">
        <div className="social-media-wrap">
          <div className="footer-logo">
            <Link to="/" className="social-logo">
              <img src="/assets/images/logo2.png" alt="" title="logo" />
              <div>
                <span>Asean</span>
                <span>weather</span>
              </div>
            </Link>
          </div>
          <small className="website-rights">AseanWeather - Một sản phẩm của team SCKTTTP</small>
          <div className="">
              <img className="logApiWeather" src="/assets/images/logoAPIWeather.png" alt="Logo api weather" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Footer;
