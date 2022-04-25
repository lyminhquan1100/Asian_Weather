import React from "react";
import { Link } from "react-router-dom";
import "./Location.scss";
import { RootStateOrAny, useSelector } from "react-redux";
//import { bindActionCreators } from "redux";

interface IFavourite {
}

const FavouriteLocation: React.FC<IFavourite> = () => {

  const listFv = useSelector((state: RootStateOrAny) => state.weatherReducer)
  const listCity = useSelector((state: RootStateOrAny) => state.cityReducer)

  return (
    // Hiền thị 3 địa phương đầu trong số những địa phương yêu thích
    <div className="d-flex favourite-wrap">
      {listCity.listCity.map((listCt: any) => {
        return listFv.favorite.map((listF: any, index: any) => {
          if (listCt.lable === listF.cityLable && index < 3) {
            return (
              <div key={listCt.id} className="favourite-item">
                <Link to={`/now/${listCt.lable}`}>
                  <div className="recent-location-item featured-location">
                    <span className="recent-location-name">
                      {listCt.name}
                    </span>
                    <i
                      className="fas fa-heart"
                      style={{ color: "red" }}
                    ></i>
                  </div>
                </Link>
              </div>
            )
          }
        })
      })}
    </div>
  );
};

export default FavouriteLocation;
