import React, { useContext, useState } from "react";

const MembersContext = React.createContext();

const url = process.env.REACT_APP_API_URL;

export function useMember() {
    return useContext(MembersContext);
}

export const MembersProvider = ({children}) => {
    const [members, setMembers] = useState([]);

    const getMembers = async () => {
        const response = await fetch(url + "member", {
            headers: {
                "Accept" : "application/json",
                "Authorization" : localStorage.getItem("access_token")
            }
        });
        const {status, members, message} = await response.json();

        if (status)
            setMembers(members);
        else
            console.error({status,message})
    }

    const addMember = async (data) => {
        const response = await fetch(url + "member", {
            method: "POST",
            headers: {
                "Accept" : "application/json",
                "Content-Type" : "application/json",
                "Authorization" : localStorage.getItem("access_token")
            },
            body: JSON.stringify(data)
        });

        const {status, member, message, errors} = await response.json();
        return {status, member, message, errors};
    }

    return (
        <MembersContext.Provider
            value={{
                members, 
                getMembers,
                addMember
            }}>
            {children}
        </MembersContext.Provider>
    );
}