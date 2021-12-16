import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";

const QualitysList = ({ qualities }) => {
    return (
        <>
            {qualities.map((qual) => (
                <Quality key={qual._id} {...qual} />
            ))}
        </>
    );
};

QualitysList.propTypes = {
    qualities: PropTypes.array
};

export default QualitysList;
