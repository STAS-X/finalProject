import React, { useState, useEffect, useContext } from "react";
import qualityService from "../services/qualityService";

const QualitiesContext = React.createContext();

export const useQualities = () => {
	return useContext(QualitiesContext);
};


export const QualitiesProvider = ({ children }) => {
    const [qualities, setQualities] =useState([]);
    const [, setError] = useState(null);
    const [isLoading, setLoading] = useState(true);

	useEffect( () => {
		const getQualities = async () => {
            try {
                const {content}=await qualityService.fetchAll();
                setQualities(content);
                setLoading(false);
            } catch(error) {
                const {message} = error.response.data;
                setError(message)
            }
        };

        getQualities();
	}, []);

    const getQuality = (id) => {
        return qualities.find((q) => q._id === id);
    }
    const updateQuality = async ({_id: id, ...data}) => {
        try {
            const {content}=await qualityService.update(id, data);
            setQualities((prevState) => prevState.map((item) => {
                if (item._id === content._id) {
                    return content;
                }
                return item;
            }));
            return content
        } catch(error) {
            const {message} = error.response.data;
            setError(message)
        }
    };
    const addQuality = async (data) => {
        try {
            const {content}=await qualityService.create(data);
            setQualities((prevState) => [...prevState, content])
        } catch(error) {
            const {message} = error.response.data;
            setError(message)
        }
    }

    const deleteQuality = async (id) => {
        try {
            const {content}=await qualityService.delete(id);
            setQualities((prevState) => prevState.filter((item) => item._id !== content._id));
        } catch(error) {
            const {message} = error.response.data;
            setError(message)
        }
    }

	return (
		<QualitiesContext.Provider value={{qualities, getQuality, updateQuality, addQuality, deleteQuality}}>
			{!isLoading? children: <h1>Qualities Loading...</h1>}

		</QualitiesContext.Provider>
	);
};