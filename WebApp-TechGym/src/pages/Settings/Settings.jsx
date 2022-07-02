import { useAppContext } from "../../contexts/AppContext";
import { useBranch } from "../../contexts/BranchContext";
import { useEffect, useState } from "react";
import AddEditBranchModal from "../../components/Settings/AddEditBranchModal";

const Settings = () => {
  const { currentUser } = useAppContext();
  const { branches, getBranches } = useBranch();

  const [selectedBranch, setSelectedBranch] = useState();
  const [showBranchModal, setShowBranchModal] = useState(false);

  const closeModal = (reload = false) => {
    setSelectedBranch();
    setShowBranchModal(false);

    if (reload)
    getBranches();
  }

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
          <div className="is-flex is-justify-content-space-between">
            <h1 className="title">Branches</h1>
            <button className="button is-primary" onClick={() => setShowBranchModal(true)}>+ Create New Branch</button>
          </div>
          
          <table className="table is-fullwidth is-bordered is-hoverable">
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
                  <td><span className="tag is-warning is-clickable">Edit</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <AddEditBranchModal user={currentUser} branch={selectedBranch} showModal={showBranchModal} closeModal={closeModal} />
    </>
  );
};

export default Settings;
