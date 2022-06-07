import { useMembers } from "../contexts/MembersContext";
import { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID" },
  { field: "names", headerName: "Names", flex: 1 },
  { field: "surnames", headerName: "Surnames", flex: 1 },
  { field: "email", headerName: "Email", flex: 1 },
  { field: "profession", headerName: "Profession", flex: 1 },
  { field: "phone", headerName: "Phone", flex: 1 },
  { 
    field: "gender", 
    headerName: "Gender", 
    valueGetter: (params) => { return params.row.gender == "M" ? "Male" : "Female" },
    flex: 1 
  },
  {
    field: "birthday", headerName: "Birthday", flex: 1, 
    valueFormatter: (params) => {
      if (params.value == null) {
        return '';
      }

      const birthday = new Date(params.value).toISOString().slice(0, 10);
      return birthday;
    }
  }
];

const Members = () => {
  const { members, getMembers } = useMembers();

  useEffect(() => {
    getMembers();
  }, []);

  return (
    <div className="container my-4">
      <h1 className="title">Members</h1>

      <div style={{ display: "flex", height: 600 }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid
            rows={members}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            // checkboxSelection
            pagination
          />
        </div>
      </div>
    </div>
  );
};

export default Members;
