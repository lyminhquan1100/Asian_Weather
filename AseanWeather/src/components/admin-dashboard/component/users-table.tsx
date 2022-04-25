import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getUsersRequest
} from "../../../redux/effects/usersEffects";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "../admin.scss";

interface IUserProps {
  propsUser: any;
  getUsersRequest: (page: number, size: number) => void;
}
//Hàm format Date 
const dateForrmat = (dateItem: any) => {
  let d = new Date(dateItem);
  return d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear()+" "+ d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
};

const Users: React.FC<IUserProps> = ({
  propsUser,
  getUsersRequest,
}) => {
  //Khai báo biến để sử dụng
  const [page, setPage] = useState(0);
  let arr:number[]=[];
  const [arrOfCurrButtons, setArrOfCurrButtons] = useState(arr);
  //page Size
  let size = 10;
  //thêm số page vào arr
  const convertArr = (n: any) => {
    for (let i = 1; i <= n; i++) {
      (arrOfCurrButtons as number[]).push(i);
    }
  };
  //userEffect
  useEffect(() => {
      getUsersRequest(page, size);
     if(propsUser.success){   
      convertArr(propsUser.totalPage);
      }
  }, [propsUser.success]);
  
  //Hàm xử lý khi click vào page
  const paging = (page: number) => {
    getUsersRequest(page, size);
    setPage(page + 1);
  };
  if (!propsUser.success) {
    return <div>Loading ... </div>;
  }

  return (
    <div className="container-fluid content-users">
      <div className=" user-wrap">
        <div className="col-6 total-text">
          Tổng số user là: {propsUser.totalUser}
        </div>
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <table className="table table-user table-bordered">
                <thead>
                  <tr>
                    <th>FacebookID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>CreateDate</th>
                  </tr>
                </thead>
                <tbody>
                  {propsUser.listUsers.map((item: any) => {
                    return (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{dateForrmat(item.createDate)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* page */}
        <nav aria-label="Page navigation example " className="paging">
          <div className="m-3">
            Page {page} of {propsUser.totalPage}
          </div>
          <ul className="pagination" style={{ margin: 0 }}>
            {arrOfCurrButtons.map((item, index) => {
              return (
                <li className="page-item" key={index}>
                  <Link
                    to="#"
                    className="page-link"
                    onClick={() => paging(item - 1)}
                  >
                    {item}
                  </Link>
                </li>
              );
            })}
            
          </ul>
        </nav>
      </div>
    </div>
  );
};
const mapStateToProps = (state: any) => {
  return {
    propsUser: state.usersReducer,
  };
};
const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      getUsersRequest,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Users);
