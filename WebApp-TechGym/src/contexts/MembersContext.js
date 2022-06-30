import React, { useContext, useState } from "react";

const MembersContext = React.createContext();

const url = process.env.REACT_APP_API_URL;

export function useMembers() {
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
            console.log({status,message})
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

        if (status) return { status, member };
        else return { message, errors };
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