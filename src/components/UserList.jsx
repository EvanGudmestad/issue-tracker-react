import { UserListItem } from "./UserListItem";
import { useEffect,useState } from "react";
import axios from "axios";
import _ from 'lodash';

export function UserList({auth, showError}){

    const [users,setUsers] = useState(null);

    useEffect(() => {
        axios(`${process.env.REACT_APP_API_URL}/api/users/list`,{
            headers:{authorization: `Bearer ${auth?.token}`}
           })
           .then((res) =>{
          //  console.log(res.data);
            setUsers(res.data);
           }) 
           .catch((err) =>{
                const resError = err?.response?.data?.error;
        
                if(resError){
                if(typeof resError==='string'){
                  //  showError(resError);
                }else if(resError.details){
                    let joiError = '';
                    //joi validation
                    _.map(resError.details, (x) => joiError += (x.message + '\n'));
                    //showError(joiError);
                }
                }
           });
    }, [auth]);

    return(
        <div className="container" id="listContainer">
        <div className='d-flex p-2'>
          <h3>Search Results</h3>
                <div
            className="btn-group ms-4"
            role="group"
            aria-label="Button group with nested dropdown"
          >
            <button type="button" className="btn btn-info">
              Sort By
            </button>
            <div className="btn-group" role="group">
              <button
                id="btnGroupDrop3"
                type="button"
                className="btn btn-info dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              ></button>
              <div className="dropdown-menu" aria-labelledby="btnGroupDrop3">
                <a className="dropdown-item" href="/">
                  Last Name
                </a>
                <a className="dropdown-item" href="/">
                  First Name
                </a>
                <a className="dropdown-item" href="/">
                  Role
                </a>
                <a className="dropdown-item" href="/">
                  Newest
                </a>
                <a className="dropdown-item" href="/">
                  Oldest
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
        {_.map(users, (user, index) => (
            <UserListItem user={user} auth={auth} key={user._id} index={index} />
         ))}
        </div>
      </div> 
    )
}