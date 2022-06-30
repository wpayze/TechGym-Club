import { useAppContext } from "../../contexts/AppContext";
import { useBranchContext } from "../../contexts/BranchContext";
import { useEffect } from "react";

const Settings = () => {
  const { currentUser } = useAppContext();
  const { branches, getBranches } = useBranchContext();

  useEffect( () => {
    getBranches();
  }, [])

  return (
    <>
      <div className="container content-page">
        <div>
          <h1 className="title">Company</h1>
          <p>{currentUser?.company.name}</p>
        </div>
      </div>
      <div className="container content-page">
        <div>
          <h1 className="title">Branches</h1>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>...</th>
              </tr>
            </thead>
            <tbody>
              {branches.map((b) => (
                <tr key={b.id}>
                  <td>{b.name}</td>
                  <td>...</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Settings;
