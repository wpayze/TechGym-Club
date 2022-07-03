import { useMembership } from "../../contexts/MembershipContext"
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";

const AddEditMembershipModal = ({ showModal, membership = null, closeModal, user }) => {
    const { addMembership, editMembership } = useMembership();

    const submitForm = async (e) => {
        e.preventDefault();
    
        const name = e.target.name.value;
        const price = e.target.price.value;
        const months = e.target.months.value;
    
        const data = {
          name: name,
          price : price,
          months: months,
          company_id: user.company.id,
        };
    
        let result = membership ? await editMembership(data, membership.id) : await addMembership(data);
    
        if (result.status) {
          closeModal(true);
          toast.success(`${name} ${membership ? "edited" : "created"} successfully.`, {
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
            title: `Error occurred ${membership ? "editing" : "creating"} this membership.`,
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
                    {membership ? `Edit Membership "${membership.name}"` : "New Membership"}
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
                        defaultValue={membership ? membership.name : ""}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Price</label>
                    <div className="control">
                      <input
                        className="input"
                        name="price"
                        type="number"
                        placeholder="Price"
                        defaultValue={membership ? membership.price : ""}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Duration (Months)</label>
                    <div className="control">
                      <input
                        className="input"
                        name="months"
                        type="number"
                        placeholder="Duration"
                        defaultValue={membership ? membership.months : ""}
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
}

export default AddEditMembershipModal