import React from "react";
import PropTypes from "prop-types";
import QualitysList from "../../ui/qualities/qualitysList";

const QualityCard = ({ qualities }) => {
    return (
        <div className="card mb-3">
            <div className="card-body d-flex flex-column justify-content-center text-center">
                <h5 className="card-title">
                    <span>Qualities</span>
                </h5>
                <p className="card-text">
                    {" "}
                    <QualitysList qualities={qualities} />{" "}
                </p>
            </div>
        </div>
    );
};

QualityCard.propTypes = {
    qualities: PropTypes.array
};

export default QualityCard;
