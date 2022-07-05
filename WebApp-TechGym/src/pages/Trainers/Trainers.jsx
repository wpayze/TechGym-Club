import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import { useTrainer } from "../../contexts/TrainerContext";
import { useEffect } from "react";

const Trainers = () => {
  const { trainers, getTrainers } = useTrainer();

  useEffect(() => {
    getTrainers();
  }, []);

  return (
    <>
      <div className="container content-page">
        <div className="is-flex is-justify-content-space-between">
          <h1 className="title">Trainers</h1>

          <Link to="create" className="button is-info">
            <i className="material-icons">add</i> New Trainer
          </Link>
        </div>

        <div className="table-container">
          <table className="table is-fullwidth">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Rate</th>
                <th>Branch</th>
                <th>...</th>
              </tr>
            </thead>
            <tbody>
              {trainers.map((t) => (
                <tr key={t.id}>
                  <td>{t.id}</td>
                  <td>{t.name}</td>
                  <td>{t.email}</td>
                  <td>{t.phone}</td>
                  <td>{t.rate}</td>
                  <td>{t.branch_id}</td>
                  <td>
                    <div className="tag is-warning is-clickable">Edit</div>
                  </td>
                </tr>
              ))}

              {trainers.length == 0 && (
                <tr>
                  <td colSpan={8} className="has-text-centered">
                    No trainers registered in this GYM.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Trainers;
