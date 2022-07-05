import React, { useContext, useState } from "react";

const TrainersContext = React.createContext();

const url = process.env.REACT_APP_API_URL;

export function useTrainer() {
    return useContext(TrainersContext);
}

export const TrainersProvider = ({children}) => {
    const [trainers, setTrainers] = useState([]);

    const getTrainers = async () => {
        const response = await fetch(url + "trainer", {
            headers: {
                "Accept" : "application/json",
                "Authorization" : localStorage.getItem("access_token")
            }
        });
        const {status, trainers, message} = await response.json();

        if (status)
            setTrainers(trainers);
        else
            console.error({status,message})
    }

    const addTrainer = async (data) => {
        const response = await fetch(url + "trainer", {
            method: "POST",
            headers: {
                "Accept" : "application/json",
                "Content-Type" : "application/json",
                "Authorization" : localStorage.getItem("access_token")
            },
            body: JSON.stringify(data)
        });

        const {status, trainer, message, errors} = await response.json();
        return {status, trainer, message, errors};
    }

    return (
        <TrainersContext.Provider
            value={{
                trainers, 
                getTrainers,
                addTrainer
            }}>
            {children}
        </TrainersContext.Provider>
    );
}