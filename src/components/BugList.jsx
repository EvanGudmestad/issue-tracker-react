import './List.css';
import axios from 'axios';
import {useState,useEffect} from 'react';
import _ from 'lodash';
import { BugItem } from './BugItem';

export function BugList({auth}) {

    const [bugs,setBugs] = useState(null);

    useEffect(() =>{
       axios(`${process.env.REACT_APP_API_URL}/api/bugs/list`,{
        headers:{authorization: `Bearer ${auth?.token}`}
       })
       .then((res) =>{
        //console.log(res.data);
        setBugs(res.data);
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
    },[auth]);

  return (
    <div className="container" id="listContainer">
      <div className="d-flex p-2">
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
                Newest
              </a>
              <a className="dropdown-item" href="/">
                Oldest
              </a>
              <a className="dropdown-item" href="/">
                Title
              </a>
              <a className="dropdown-item" href="/">
                Classification
              </a>
              <a className="dropdown-item" href="/">
                Assigned To
              </a>
              <a className="dropdown-item" href="/">
                Bug Author
              </a>
            </div>
          </div>
        </div>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Classification</th>
            <th scope="col">Created</th>
            <th scope="col">Closed</th>
          </tr>
        </thead>
        <tbody>
         {_.map(bugs, (bug, index) => (
            <BugItem bug={bug} auth={auth} key={bug._id} index={index} />
         ))}
        </tbody>
      </table>
    </div>
  );
}


