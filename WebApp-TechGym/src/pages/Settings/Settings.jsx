import { useAppContext } from "../../contexts/AppContext";
import { useBranch } from "../../contexts/BranchContext";
import { useMembership } from "../../contexts/MembershipContext";

import { useEffect, useState } from "react";
import AddEditBranchModal from "../../components/Settings/AddEditBranchModal";
import AddEditMembershipModal from "../../components/Settings/AddEditMembershipModal";

const Settings = () => {
  const { currentUser } = useAppContext();
  const { branches, getBranches } = useBranch();
  const { memberships, getMemberships } = useMembership();

  const [selectedBranch, setSelectedBranch] = useState();
  const [showBranchModal, setShowBranchModal] = useState(false);

  const [selectedMembership, setSelectedMembership] = useState();
  const [showMembershipModal, setShowMembershipModal] = useState(false);

  useEffect(() => {
    getBranches();
    getMemberships();
  }, []);

  //Branch Modal
  const closeBranchModal = (reload = false) => {
    setSelectedBranch();
    setShowBranchModal(false);

    if (reload) getBranches();
  };

  const openEditBranchModal = (branch) => {
    setSelectedBranch(branch);
    setShowBranchModal(true);
  };

  //Membership Modal
  const closeMembershipModal = (reload = false) => {
    setSelectedMembership();
    setShowMembershipModal(false);

    if (reload) getMemberships();
  };

  const openEditMembershipModal = (membership) => {
    setSelectedMembership(membership);
    setShowMembershipModal(true);
  };

  return (
    <>
      <div className="container content-page">
        <div>
          <h1 className="title">Company</h1>
          <p>{currentUser?.company.name}</p>
        </div>
      </div>
      <div className="container mt-3 has-background-white">
        <div className="columns m-0">
          <div className="column is-6 p-4">
            <div className="is-flex is-justify-content-space-between">
              <h1 className="title">Branches</h1>
              <button
                className="button is-primary"
                onClick={() => setShowBranchModal(true)}
              >
                <i className="material-icons">add</i> New Branch
              </button>
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
                    <td>
                      <span
                        className="tag is-warning is-clickable"
                        onClick={() => openEditBranchModal(b)}
                      >
                        Edit
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="column is-6 p-4">
            <div className="is-flex is-justify-content-space-between">
              <h1 className="title">Memberships</h1>
              <button className="button is-primary" onClick={() => setShowMembershipModal(true)}>
              <i className="material-icons">add</i> New Membership
              </button>
            </div>

            <table className="table is-fullwidth is-bordered is-hoverable">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Duration</th>
                  <th>...</th>
                </tr>
              </thead>
              <tbody>
                {memberships.map((m) => (
                  <tr key={m.id}>
                    <td>{m.name}</td>
                    <td>{m.price}</td>
                    <td>{m.months}</td>
                    <td>
                      <span className="tag is-warning is-clickable" onClick={() => openEditMembershipModal(m)}>Edit</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <AddEditBranchModal
        key={selectedBranch ? "branch-" + selectedBranch.id : "branch-0"}
        user={currentUser}
        branch={selectedBranch}
        showModal={showBranchModal}
        closeModal={closeBranchModal}
      />
      <AddEditMembershipModal
        key={selectedMembership ? "membership-" + selectedMembership.id : "membership-0"}
        user={currentUser}
        membership={selectedMembership}
        showModal={showMembershipModal}
        closeModal={closeMembershipModal}
      />
    </>
  );
};

export default Settings;
