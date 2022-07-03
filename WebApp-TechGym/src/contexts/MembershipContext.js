import React, { useContext, useState } from "react";

const MembershipContext = React.createContext();

const url = process.env.REACT_APP_API_URL;

export function useMembership() {
    return useContext(MembershipContext);
}

export const MembershipProvider = ({children}) => {
    const [memberships, setMemberships] = useState([]);

    const getMemberships = async () => {
        const response = await fetch(url + "membership", {
            headers: {
                "Accept" : "application/json",
                "Authorization" : localStorage.getItem("access_token")
            }
        });
        const {status, memberships, message} = await response.json();

        if (status)
            setMemberships(memberships);
        else
            console.error({status,message})
    }

    const addMembership = async (data) => {
        const response = await fetch(url + "membership", {
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

    const editMembership = async (data, id) => {
        const response = await fetch(url + "membership/" + id, {
            method: "PUT",
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
        <MembershipContext.Provider
            value={{
                memberships,
                getMemberships,
                addMembership,
                editMembership
            }}>
            {children}
        </MembershipContext.Provider>
    );
}