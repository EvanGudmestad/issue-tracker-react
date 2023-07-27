import _ from 'lodash';
import moment from "moment/moment";
import { Link } from 'react-router-dom';

export function UserListItem({user}){
    return(
        <div className="col-md-3 mb-3">
            <div className="card" style={{width: '18rem'}}>
            {/* <img src="..." className="card-img-top" alt="..." /> */}
                <div className="card-body">
                    <h5 className="card-title">{user.fullName}</h5>
                    <h6 className='card-subtitle mb-2 text-body-secondary'>{user.email}</h6>
                    {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                    {typeof user.role === 'string' && <p className='badge bg-primary'>{user.role}</p>}
                    {Array.isArray(user.role) && _.map(user.role, (role, index) => (<p className='badge bg-primary ms-2' key={index}>{role}</p>))}
                    {user.role === null && <p className='badge bg-danger'>No Roles Assigned</p>}
                    <br />
                    <Link to={`/user/${user._id}`} className="btn btn-warning">Edit User</Link>
                </div>
                <div className="card-footer text-body-secondary">
                  <p>User Created {moment(user.createdOn).fromNow()}</p> 
                </div>
            </div>
        </div>
    )
}