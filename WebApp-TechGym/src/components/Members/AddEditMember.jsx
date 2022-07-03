import { useEffect } from "react";

import { toast } from "react-toastify";
import Swal from "sweetalert2";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { useAppContext } from "../../contexts/AppContext";
import { useMember } from "../../contexts/MembersContext";
import { useBranch } from "../../contexts/BranchContext";
import { useMembership } from "../../contexts/MembershipContext";

const AddEditMember = () => {
  const { currentUser } = useAppContext();
  const { branches, getBranches } = useBranch();
  const { memberships, getMemberships } = useMembership();
  const { addMember } = useMember();
  const navigate = useNavigate();

  useEffect(() => {
    getBranches();
    getMemberships();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formValues = {
      names: e.target.names.value,
      surnames: e.target.surnames.value,
      email: e.target.email.value,
      profession: e.target.profession.value,
      phone: e.target.phone.value,
      birthday: e.target.birthday.value,
      gender: e.target.gender.value,
      address: e.target.address.value,
      branch_id: e.target.branch.value,
    };

    addMember(formValues).then(({ status, message, errors, member }) => {
      if (status) {
        navigate("/members");
        toast.success(member.names + " created successfully.", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        Swal.fire({
          title: "Error occurred adding this user",
          description: message,
          icon: "error",
        });
      }
    });
  };

  if (branches.length == 0) {
    return (
      <div className="container content-page">
        <p>You need a branch to register members.</p>
        <p>
          To add a <strong>branch</strong>, click{" "}
          <Link to="/settings">here</Link>{" "}
        </p>
      </div>
    );
  }

  return (
    <div className="container content-page">
      <h1 className="title">Add Member</h1>
      <hr />

      <form onSubmit={handleSubmit}>
        <div className="columns is-multiline">
          <div className="column is-3">
            <div className="field">
              <label className="label">Names</label>
              <div className="control">
                <input className="input" type="text" name="names" />
              </div>
            </div>
          </div>
          <div className="column is-3">
            <div className="field">
              <label className="label">Surnames</label>
              <div className="control">
                <input className="input" type="text" name="surnames" />
              </div>
            </div>
          </div>
          <div className="column is-3">
            <div className="field">
              <label className="label">Birthday</label>
              <div className="control">
                <input className="input" type="date" name="birthday" />
              </div>
            </div>
          </div>
          <div className="column is-3">
            <div className="field">
              <label className="label">Gender</label>
              <div className="control">
                <div className="select is-fullwidth">
                  <select name="gender">
                    <option>M</option>
                    <option>F</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="column is-3">
            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input className="input" type="email" name="email" />
              </div>
            </div>
          </div>

          <div className="column is-3">
            <div className="field">
              <label className="label">Profession</label>
              <div className="control">
                <input className="input" type="text" name="profession" />
              </div>
            </div>
          </div>
          <div className="column is-3">
            <div className="field">
              <label className="label">Phone</label>
              <div className="control">
                <input className="input" type="text" name="phone" />
              </div>
            </div>
          </div>
          <div className="column is-3">
            <div className="field">
              <label className="label">Address</label>
              <div className="control">
                <input className="input" type="text" name="address" />
              </div>
            </div>
          </div>
          <div className="column is-3">
            <div className="field">
              <label className="label">Branch</label>
              <div className="control">
                <div className="select is-fullwidth">
                  <select name="branch">
                    {branches.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="column is-6">
            <div className="field">
              <label className="label">Membership</label>
              <div className="control">
                <div className="select is-fullwidth">
                  <select name="branch">
                    {memberships.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name} ({b.months} Months, {currentUser.company.currency}{b.price})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="column is-3 is-flex is-justify-content-end is-align-items-flex-end">
            <button className="button is-info" type="submit">
              Create New Member
            </button>
            <Link to="/members" className="button is-light ml-4" type="button">
              Cancel
            </Link>
          </div>
        </div>

        <div className="is-flex is-justify-content-end"></div>
      </form>
    </div>
  );
};

export default AddEditMember;
