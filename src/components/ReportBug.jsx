import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function ReportBug({auth, showError, showSuccess}){

    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [stepsToReproduce,setStepsToReproduce] = useState("");

    const navigate = useNavigate();

    const titleError = !title ? 'Title can not be left blank' : ""
    const descriptionError = !description ? 'Description can not be left blank' : ""
    const stepsError = !stepsToReproduce ? 'Steps to reproduce can not be left blank' : ""

    const createNewBug = async (evt) => {
        evt.preventDefault();
        console.log('Create New Bug Clicked');

        if(titleError){
            showError(titleError);
            return;
        }

        if(descriptionError){
            showError(descriptionError);
            return;
        }

        if(stepsError){
            showError(stepsError);
            return;
        }

        if(title && description && stepsToReproduce){
            try{
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/bugs/new`,{
                title,description,stepsToReproduce
            },{headers: {authorization: `Bearer ${auth?.token}`}});

            showSuccess(res.data.success);
            navigate('/bug/list');

            }catch(err){
                console.log(err);
            }
        }
    }

   return( <>
        <h1>Report New Bug</h1>
        <form>
            <div className="mb-2">
                <label className="form-label" htmlFor="txtTitle">Title:</label>
                <input type='text' className="form-control" id='txtTitle' value={title} onChange={(evt) => setTitle(evt.target.value)}></input>
            </div>
            <div className="mb-2">
                <label className="form-label" htmlFor="txtDescription">Description:</label>
                <input type='text' className="form-control" id='txtDescription' value={description} onChange={(evt) => setDescription(evt.target.value)}></input>
            </div>
            <div className="mb-2">
                <label className="form-label" htmlFor="txtSteps">Steps to Reproduce:</label>
                <textarea type='text' className="form-control" id='txtSteps' rows='3' value={stepsToReproduce} onChange={(evt) => setStepsToReproduce(evt.target.value)}></textarea>
            </div>
            <div className="mb-2">
                <button type='submit' className="btn btn-primary" onClick={(evt) => createNewBug(evt)} >Create New Bug</button>
            </div>
        </form>
    </>
    )
}