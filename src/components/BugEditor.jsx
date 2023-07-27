import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from 'axios';
import _ from 'lodash';

export function BugEditor({auth, showSuccess, showError}){
    
  
    const {bugId} = useParams();
    const navigate = useNavigate();

    const [bug,setBug] = useState({title:'',description:'',stepsToReproduce:'',classification:''});

    useEffect(() =>{
        //axios get bug by id
       // console.log(`In the bug editor, auth token is ${auth?.token}`)
        axios(`${process.env.REACT_APP_API_URL}/api/bugs/${bugId}`,{
            method:'get',
            headers:{authorization: `Bearer ${auth?.token}`}
        }).then((res) =>{
           setBug(res.data);
        }).catch((err) =>{
           // console.log(err);
            
            const resError = err?.response?.data?.error;
      
            if(resError){
              if(typeof resError==='string'){
                showError(resError);
              }else if(resError.details){
                let joiError = '';
                //joi validation
                _.map(resError.details, (x) => joiError += (x.message + '\n'));
                showError(joiError);
              }
            }
        });
    },[bugId,auth])

    const initBugClassification = bug?.classification || 'nothing'

    function editTitle(evt){
        const newTitle = evt.target.value;
        setBug((prevBug) =>({
            ...prevBug,
            title:newTitle
        }));
    }

    function editDescription(evt){
        const newDescription = evt.target.value;
        setBug((prevBug) =>({
            ...prevBug,
            description:newDescription
        }));
    }

    const editSteps = (evt) => {
        const newSteps = evt.target.value;
        setBug((prevBug) => ({
            ...prevBug,
            stepsToReproduce: newSteps
        }))
    }

    const editClassification = (evt) => {
       // console.log('classification change called');
        const newClassification = evt.target.value;
        setBug((prevBug) => ({
            ...prevBug,
            classification:newClassification
        }));
    }

    const onUpdateBug = async (evt) => {
        evt.preventDefault();
      //  console.log('update bug clicked');

        try{
            const res = await axios.put(`${process.env.REACT_APP_API_URL}/api/bugs/${bugId}`,{
                title:bug.title,
                classification: bug.classification,
                stepsToReproduce: bug.stepsToReproduce,
                description: bug.description
            },{headers: {authorization: `Bearer ${auth?.token}`}});
            //console.log(res.data);
            navigate('/bug/list');
            showSuccess(`Bug Saved!`);
        }catch(err){
            console.log(err);
        }
    }

    return(
        <>
           <div className="container"  id="editorContainer">
      <h1>Bug Editor</h1>
      <form action="">
        <div className="row">
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="titleInput">{}</label>
            <input type="text" id="titleInput" className="form-control"
              placeholder="Title" onChange={(evt) => editTitle(evt)} value={bug?.title}/>
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="descriptionInput">Description</label>
            <input type="text" id="descriptionInput" className="form-control"
              placeholder="Description" onChange={(evt) => editDescription(evt)} value={bug?.description}/>
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="stepsInput">StepsToReproduce</label>
            <input type="text" id="stepsInput" className="form-control"
              placeholder="Steps to Reproduce" onChange={(evt) => editSteps(evt)} value={bug?.stepsToReproduce}/>
          </div>
          <div className="form-outline mb-4">
          <select value={initBugClassification} className="form-select" aria-label="Default select example" onChange={(evt) => editClassification(evt)}>
                <option>Open this select menu</option>
                <option value="approved">Approved</option>
                <option value="unapproved">Unapproved</option>
                <option value="duplicate">Duplicate</option>
                <option value="unclassified">Unclassified</option>
            </select>
            {/* <label className="form-label" htmlFor="classifyInput">Classification</label>
            <input type="text" id="classifyInput" className="form-control"
              placeholder="Classification" onChange={(evt) => editClassification(evt)} value={bug?.classification}/> */}
          </div>
          <div className="col-md-10"></div>
          <div className="col-md-2">
            <button className="btn btn-primary" type="submit" value="Update Bug" onClick={(evt) => onUpdateBug(evt)}>Edit Bug</button>
          </div>
        </div>
      </form>
    </div>
        </>
    )
}