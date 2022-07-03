import { useBranch } from "../../contexts/BranchContext";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";

const AddEditBranchModal = ({ showModal, branch = null, closeModal, user }) => {
  const { addBranch, editBranch } = useBranch();

  const submitForm = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;

    const data = {
      name: name,
      company_id: user.company.id,
    };

    let result = branch ? await editBranch(data, branch.id) : await addBranch(data);

    if (result.status) {
      closeModal(true);
      toast.success(`${name} ${branch ? "edited" : "created"} successfully.`, {
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
      console.error(result.message);
      Swal.fire({
        title: `Error occurred ${branch ? "editing" : "creating"} this branch.`,
        icon: "error",
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className={"modal " + (showModal ? "is-active" : "")}>
        <div className="modal-background" />
        <div className="modal-card">
          <form onSubmit={submitForm}>
            <header className="modal-card-head">
              <p className="modal-card-title">
                {branch ? `Edit Branch ${branch.name}` : "New Branch"}
              </p>
              <button
                className="delete"
                aria-label="close"
                onClick={closeModal}
              />
            </header>
            <section className="modal-card-body">
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input
                    className="input"
                    name="name"
                    type="text"
                    placeholder="Name"
                    defaultValue={branch ? branch.name : ""}
                  />
                </div>
              </div>
            </section>
            <footer className="modal-card-foot">
              <button className="button is-success" type="submit">
                Save
              </button>
              <button type="button" className="button" onClick={closeModal}>
                Cancel
              </button>
            </footer>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddEditBranchModal;
