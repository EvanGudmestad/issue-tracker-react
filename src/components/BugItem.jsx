export function BugItem({bug,auth, index}) {
  return (
    <tr>
        <th scope="row">{index+1}</th>
        <td>{bug.title}</td>
        <td>{bug.classification}</td>
        <td>{bug.closed.toString()}</td>
  </tr>
  );
}
