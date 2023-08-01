import moment from "moment/moment";
import {Link} from 'react-router-dom';

export function BugItem({bug,auth, index}) {
  return (
   <>
    <tr>
        
        <td>{index+1}</td>
        <td>{bug.title}</td>
        <td>{bug.classification}</td>
        <td>{moment(bug.createdOn).fromNow()}</td>
        <td>{bug.closed.toString()}</td>
        <td>{bug.assignedTo.fullName}</td>
        <td>{bug.bugAuthor.fullName}</td>
        <td><Link to={`/bug/${bug._id}`} className="btn btn-sm btn-warning">Edit Bug</Link></td>
  </tr>
  </>
  )
}
