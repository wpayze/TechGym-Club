import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect } from "react";

import { toast } from "react-toastify";
import Swal from "sweetalert2";

import { useBranch } from "../../contexts/BranchContext";
import { useTrainer } from "../../contexts/TrainerContext";

const AddEditTrainer = () => {
  const { trainers, addTrainer, editTrainer } = useTrainer();
  const { branches, getBranches } = useBranch();

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getBranches();
  }, []);

  let existingTrainer = null;
  if (params.id) {
    existingTrainer = trainers.find((t) => t.id == params.id);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const formValues = {
      name: e.target.name.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      rate: e.target.rate.value,
      branch_id: e.target.branch.value,
    };

    const trainerFunc = existingTrainer ? editTrainer : addTrainer;

    trainerFunc(formValues).then(({ status, message, errors, trainer }) => {
      if (status) {
        navigate("/trainers");
        console.log(trainer);
        toast.success(trainer.name + " created successfully.", {
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
        console.log(message, errors);
        Swal.fire({
          title: "Error occurred adding this trainer",
          icon: "error",
        });
      }
    });
  };

  return (
    <div className="container content-page">
      <h1 className="title">
        {existingTrainer
          ? `Edit Trainer ${existingTrainer.name}`
          : `Create Trainer`}
      </h1>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="columns is-multiline">
          <div className="column is-4">
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="name"
                  defaultValue={existingTrainer ? existingTrainer.name : ""}
                />
              </div>
            </div>
          </div>
          <div className="column is-4">
            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="email"
                  defaultValue={existingTrainer ? existingTrainer.email : ""}
                />
              </div>
            </div>
          </div>
          <div className="column is-4">
            <div className="field">
              <label className="label">Phone</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="phone"
                  defaultValue={existingTrainer ? existingTrainer.phone : ""}
                />
              </div>
            </div>
          </div>
          <div className="column is-4">
            <div className="field">
              <label className="label">Rate</label>
              <div className="control">
                <input
                  className="input"
                  type="number"
                  name="rate"
                  defaultValue={existingTrainer ? existingTrainer.rate : ""}
                />
              </div>
            </div>
          </div>
          <div className="column is-4">
            <div className="field">
              <label className="label">Branch</label>
              <div className="control">
                <div className="select is-fullwidth">
                  <select
                    name="branch"
                    defaultValue={existingTrainer ? existingTrainer.branch : ""}
                  >
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

          <div className="column is-4 is-flex is-justify-content-end is-align-items-flex-end">
            <button className="button is-info" type="submit">
              {existingTrainer ? "Save Changes" : "Create New Trainer"}
            </button>
            <Link to="/trainers" className="button is-light ml-4" type="button">
              Cancel
            </Link>
          </div>
        </div>

        <div className="is-flex is-justify-content-end"></div>
      </form>
    </div>
  );
};

export default AddEditTrainer;
