import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
    getProfessionList,
    getProfessionLoadingStatus
} from "../../store/professions";

const Profession = ({ id }) => {
    const professions = useSelector(getProfessionList());
    const isProfessionLoading = useSelector(getProfessionLoadingStatus());
    if (!isProfessionLoading) {
        return <p>{professions.find((prof) => prof._id === id).name}</p>;
    } else return "Loading...";
};
Profession.propTypes = {
    id: PropTypes.string
};
export default Profession;
