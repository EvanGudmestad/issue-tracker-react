import { useParams, useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import axios from 'axios';
import _ from 'lodash';

export function UserEditor({auth,showError,showSuccess}){

    const {userId} = useParams();
    const [user,setUser] = useState({familyName:'',givenName:'',fullName:'',email:'',createdOn:'',role:['developer','quality analyst', 'business analyst', 'product manager', 'technical manager'], password:'',_id:''})
    const navigate = useNavigate();
    useEffect(() =>{
        //axios get bug by id
       // console.log(`In the bug editor, auth token is ${auth?.token}`)
        axios(`${process.env.REACT_APP_API_URL}/api/users/${userId}`,{
            method:'get',
            headers:{authorization: `Bearer ${auth?.token}`}
        }).then((res) =>{
           //console.log(res.data);
           //console.log(auth);
           setUser(res.data);
        }).catch((err) =>{
           // console.log(err);
            
            const resError = err?.response?.data?.error;
      
            if(resError){
              if(typeof resError==='string'){
                //showError(resError);
              }else if(resError.details){
                let joiError = '';
                //joi validation
                _.map(resError.details, (x) => joiError += (x.message + '\n'));
              //  showError(joiError);
              }
            }
        });
    },[userId,auth]);
   
    const updateEmail = (evt) => {
        const newEmail = evt.target.value;
        setUser((prevUser) =>({
            ...prevUser,
            email:newEmail
        }));
    }

    const updateGivenName = (evt) => {
        const newGivenName = evt.target.value;
        setUser((prevUser) => ({
            ...prevUser,
            givenName:newGivenName,
            fullName: newGivenName + " " + prevUser.familyName
        }));
    }

    const updateFamilyName = (evt) => {
        const newFamilyName = evt.target.value;
        setUser((prevUser) => ({
            ...prevUser,
            familyName:newFamilyName,
            fullName: prevUser.givenName + " " + newFamilyName
        }));
    }

    const roleUpdate = (evt) => {
       const checkBoxValue = evt.target.value;
        setUser((prevUser) => {
           // console.log(`Previous users roles ${prevUser.role}`);
           // console.log(checkBoxValue);
            if(prevUser?.role?.includes(checkBoxValue)){
                //If the checkbox value is already in the array, we need to remove it
               // console.log('true block hit');
                return {
                    ...prevUser,
                    role: prevUser.role.filter((role) => role !== checkBoxValue)
                }
            }else{
                //if the checkbox value is not in the array, add it
                //console.log('false block hit');
                if(!prevUser.role){
                  prevUser.role = [];    
                }
                return {...prevUser, role:[...prevUser.role, checkBoxValue]};
              
            }
        });
       
    };

    const updateUser = async (evt) => {
      evt.preventDefault();
      //console.log('update user hit');

        try{
        const res = await axios.put(`${process.env.REACT_APP_API_URL}/api/users/${userId}`,{
          email:user.email,
          givenName:user.givenName,
          familyName:user.familyName,
          role: user.role
        },{headers: {authorization: `Bearer ${auth?.token}`}});
        navigate('/user/list');
      //  console.log(res.data.success);
        showSuccess(res.data.success)
      }catch(err){
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
      }
    }

    return(
        <div className="container" id="editorContainer">
      <h1>User Editor</h1>
      <form action="">
        <div className="row">
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="emailInput">Email address</label>
            <input type="email" id="emailInput" className="form-control"
              placeholder="Email" onChange={(evt) => updateEmail(evt)} value={user?.email}/>
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="firstNameInput">First Name</label>
            <input type="text" id="firstNameInput" className="form-control"
              placeholder="First Name" onChange={(evt) => updateGivenName(evt)} value={user?.givenName}/>
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="lastNameInput">Last Name</label>
            <input type="text" id="lastNameInput" className="form-control"
              placeholder="Last Name" onChange={(evt) => updateFamilyName(evt)} value={user?.familyName}/>
          </div>
          <div className="col-md-10"></div>
        
          {auth.payload.permissions.canAssignRoles && 
          <>
          {/* {_.map(user?.role, (role, index) =>  (
             <div className="form-check">
               
                <input className="form-check-input" type="checkbox" value={role} id={role} checked={user?.role.includes({role})} onChange={(evt) => roleUpdate(evt)} />
                <label className="form-check-label" htmlFor="chkDeveloper">
                    {role}
                </label>
             </div>
          ))} */}
           <div className="form-check">
               
                <input className="form-check-input" type="checkbox" value='developer' id="chkDeveloper" checked={user?.role?.includes('developer') || false} onChange={(evt) => roleUpdate(evt)} />
                <label className="form-check-label" htmlFor="chkDeveloper">
                    Developer
                </label>
           </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value='quality analyst' id="chkQualityAnalyst"  checked={user?.role?.includes('quality analyst') || false} onChange={(evt) => roleUpdate(evt)} />
                <label className="form-check-label" htmlFor="chkQualityAnalyst">
                   Quality Analyst
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value='business analyst' id="chkBusinessAnalyst"  checked={user?.role?.includes('business analyst') || false} onChange={(evt) => roleUpdate(evt)} />
                <label className="form-check-label" htmlFor="chkBusinessAnalyst">
                   Business Analyst
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value='product manager' id="chkProductManager"  checked={user?.role?.includes('product manager') || false}  onChange={(evt) => roleUpdate(evt)}/>
                <label className="form-check-label" htmlFor="chkProductManager">
                   Product Manager
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value='technical manager' id="chkTechnicalManager"  checked={user?.role?.includes('technical manager') || false} onChange={(evt) => roleUpdate(evt)}/>
                <label className="form-check-label" htmlFor="chkTechnicalManager">
                  Technical Manager
                </label>
            </div>
          </>
          }
          
            <div className="col-md-2 my-3">
            <input className="btn btn-primary" type="submit" value="Update User" onClick={(evt) => updateUser(evt)}/>
          </div>
        </div>
      </form>
    </div>
    )
}