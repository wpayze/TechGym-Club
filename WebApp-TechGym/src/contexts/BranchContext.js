import React, { useContext, useState } from "react";

const BranchContext = React.createContext();

const url = process.env.REACT_APP_API_URL;

export function useBranchContext() {
    return useContext(BranchContext);
}

export const BranchProvider = ({children}) => {

    const [branches, setBranches] = useState([]);

    const getBranches = async () => {
        const response = await fetch(url + "branch", {
            headers: {
                "Accept" : "application/json",
                "Authorization" : localStorage.getItem("access_token")
            }
        });
        const {status, branches, message} = await response.json();

        if (status)
            setBranches(branches);
        else
            console.log({status,message})
    }

    const addBranch = async (data) => {
        const response = await fetch(url + "branch", {
            method: "POST",
            headers: {
                "Accept" : "application/json",
                "Content-Type" : "application/json",
                "Authorization" : localStorage.getItem("access_token")
            },
            body: JSON.stringify(data)
        });

        const {status, branch, message, errors} = await response.json();

        if (status) return { status, branch };
        else return { message, errors };
    }

    return (
        <BranchContext.Provider
            value={{
                branches,
                getBranches,
                addBranch
            }}>
            {children}
        </BranchContext.Provider>
    );
}