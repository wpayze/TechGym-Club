import { useMembers } from "../../contexts/MembersContext";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Members = () => {
  const { members, getMembers } = useMembers();

  useEffect(() => {
    getMembers();
  }, []);

  return (
    <div className="container content-page">
      <div className="is-flex is-justify-content-space-between">
        <h1 className="title">Members</h1>

        <Link to="create" className="button is-info">
          <i className="material-icons">add</i> New Member
        </Link>
      </div>

      <div className="table-container">
        <table className="table is-fullwidth">
          <thead>
            <tr>
              <th>ID</th>
              <th>Names</th>
              <th>Surnames</th>
              <th>Email</th>
              <th>Profession</th>
              <th>Phone</th>
              <th>Gender</th>
              <th>Birthday</th>
            </tr>
          </thead>
          <tbody>
            {members.map((m) => (
              <tr key={m.id}>
                <td>{m.id}</td>
                <td>{m.names}</td>
                <td>{m.surnames}</td>
                <td>{m.email}</td>
                <td>{m.profession}</td>
                <td>{m.phone}</td>
                <td>{m.gender}</td>
                <td>{m.birthday}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Members;