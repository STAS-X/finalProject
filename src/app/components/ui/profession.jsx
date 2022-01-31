import React from "react";
import { useProfessions } from "../../hooks/useProfessions";
import PropTypes from "prop-types";

const Profession = ({ id }) => {
    console.log(id);
    const { isLoading, getProfession } = useProfessions();
    const prof = getProfession(id);
    if (!isLoading) {
        return <p>{prof.name}</p>;
    } else return "Loading professions...";
};

Profession.propTypes = {
    id: PropTypes.string
};

export default Profession;
