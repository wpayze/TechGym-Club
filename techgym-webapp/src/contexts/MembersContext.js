import React, { useContext, useState } from "react";

const MembersContext = React.createContext();
const url = "http://127.0.0.1:8000/api/";

export function useMembers() {
    return useContext(MembersContext);
}

export const MembersProvider = ({children}) => {
    const [members, setMembers] = useState([]);

    const getMembers = () => {
        const response = await fetch(url + "members");
        const {status, members} = await response.json();

        if (status)
            setMembers(members);
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