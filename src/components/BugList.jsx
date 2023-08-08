import './List.css';
import axios from 'axios';
import {useState,useEffect} from 'react';
import _ from 'lodash';
import { BugItem } from './BugItem';
import {FaSearch} from 'react-icons/fa'

export function BugList({auth}) {

    const [bugs,setBugs] = useState(null);
    const [sortValue, setSortValue] = useState('newest');
    const [keywords, setKeywords] = useState('');
    const [classificationFilter, setClassificationFilter] = useState('');
    const [minAge, setMinAge] = useState('');
    const [maxAge,setMaxAge] = useState('');
    const [closed,setClosed] = useState(false);
    
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

    const onSubmitSearch = async (evt) => {
      evt.preventDefault();
      try{
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/bugs/list`,{
          headers:{authorization: `Bearer ${auth?.token}`},
          params:{sortBy:sortValue,keywords:keywords, classification:classificationFilter, minAge:minAge,maxAge:maxAge, closed:closed}
        });
        setBugs(res.data);
      }catch(err){
        console.log(err);
      }

    }

  return (
    
    <div className="container" id="listContainer">
      <div className="p-2 row">
        <h3>Search Results</h3>
        <div className='col'>
         <label className='form-label' htmlFor='txtKeywords'>Keywords:</label>
         <input type='text' className='form-control' value={keywords} onChange={(evt) => setKeywords(evt.target.value)} />
        </div>
        <div className='col'>
          <label className='form-label' htmlFor='selSort'>Sort By</label>
            <br />
            <select className="form-select form-select-sm primary" aria-label="Default select example" id='selSort' value={sortValue} onChange={(evt) => setSortValue(evt.target.value)}>
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="title">Title</option>
                  <option value="classification">Classification</option>
                  <option value="assignedTo">Assigned To</option>
                  <option value="createdBy">Created By</option>
              </select>
        </div>
        <div className='col'>
          <label className='form-label' htmlFor='selClassification'>Filter By Classification</label>
          <select className="form-select form-select-sm primary" aria-label="Default select example" id='selClassification' value={classificationFilter} onChange={(evt) => setClassificationFilter(evt.target.value)}> 
                  <option value="">Select a Classification</option>
                  <option value="approved">approved</option>
                  <option value="unclassified">unclassified</option>
                  <option value="duplicate">duplicate</option>
                  <option value="unapproved">unapproved</option>
          </select>
        </div>
        <div className='col'>
          
          <label htmlFor="txtMinAge" className='form-label'>Minimum Age</label>
          <input type="number" name="txtMinAge" id="txtMinAge" className='form-control' onChange={(evt) => setMinAge(evt.target.value)} />
        </div>
        <div className='col'>
        <label htmlFor="txtMaxAge" className='form-label'>Maximum Age</label>
          <input type="number" name="txtMaxAge" id="txtMaxAge" className='form-control' onChange={(evt) => setMaxAge(evt.target.value)} />
        </div>
        <div className='col form-check'>
          <label htmlFor="chkClosed" className='form-check-label'>Closed:</label>
          <input type="checkbox" name="chkClosed" id="chkClosed" className='form-check-input' onChange={(evt) => setClosed(evt.target.checked)} />
        </div>
        <div className='row'>
          <div className='col-md-3'>
            <label htmlFor='btnSubmit'>Search:</label>
            <br />
              <button id='btnSubmit' type='submit' className='btn btn-secondary' onClick={(evt) => onSubmitSearch(evt)}><FaSearch /></button>
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
            <th scope="col">Assigned To</th>
            <th scope="col">Reported By</th>
            <th scope="col">Edit Bug</th>
          </tr>
        </thead>
        <tbody>
         {bugs && _.map(bugs, (bug, index) => (
            <BugItem bug={bug} auth={auth} key={bug._id} index={index} />
         ))}

         {/* {bugs.length === 0 && <tr><td>No Bugs match this criteria</td></tr>} */}
        </tbody>
      </table>
    </div>
  );
}


