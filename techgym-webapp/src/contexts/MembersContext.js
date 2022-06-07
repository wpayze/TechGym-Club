import React, { useContext, useState } from "react";

const MembersContext = React.createContext();

const url = process.env.REACT_APP_API_URL;
const token = "Bearer " + localStorage.getItem("access_token");

export function useMembers() {
    return useContext(MembersContext);
}

export const MembersProvider = ({children}) => {
    const [members, setMembers] = useState([]);

    const getMembers = async () => {
        const response = await fetch(url + "members", {
            headers: {
                "Accept" : "application/json",
                "Authorization" : token
            }
        });
        const {status, members, message} = await response.json();

        if (status)
            setMembers(members);
        else
            console.log({status,message})
    }

    return (
        <MembersContext.Provider
            value={{
                members, 
                getMembers
            }}>
            {children}
        </MembersContext.Provider>
    );
}