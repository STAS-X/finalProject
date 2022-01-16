/* eslint-disable indent */
/* eslint-disable curly */
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import api from "../../../../api/index";
import SearchStatus from "../../../ui/searchStatus";
import QualitysList from "../../../ui/qualities/qualitysList";

const UserProfile = ({ searchId }) => {
    const [userId, setUserId] = useState({});

    useEffect(() => {
        if (searchId) {
            const userFromStor =
                JSON.parse(localStorage.getItem("allUsers")) || [];
            if (
                userFromStor.length > 0 &&
                userFromStor.findIndex((cur) => cur._id === searchId) > -1
            )
                setUserId(
                    userFromStor.filter((cur) => cur._id === searchId)[0]
                );
            else api.users.fetchById(searchId).then((data) => setUserId(data));
        }
    }, []);

    const history = useHistory();
    const handleSave = () => {
        history.replace(`/users/${userId._id}/edit`);
    };

    if (userId) {
        return (
            <React.Fragment>
                {/* eslint-disable-next-line array-callback-return  */}
                {Object.keys(userId).map((propName) => {
                    switch (propName) {
                        case "name":
                            return (
                                <h2
                                    className="m-2"
                                    key={propName}
                                >{`Имя: ${userId[propName]}`}</h2>
                            );
                        case "profession":
                            return (
                                <h2
                                    className="m-2"
                                    key={propName}
                                >{`Профессия: ${userId[propName].name}`}</h2>
                            );
                        case "completedMeetings":
                            return (
                                <h4
                                    className="m-2"
                                    key={propName}
                                >{`Встречи: ${userId[propName]}`}</h4>
                            );
                        case "rate":
                            return (
                                <h3
                                    className="m-2"
                                    key={propName}
                                >{`Оценка: ${userId[propName]}`}</h3>
                            );
                        case "qualities":
                            return (
                                <span className="m-2" key={propName}>
                                    {" "}
                                    <QualitysList
                                        qualities={userId[propName]}
                                    />{" "}
                                </span>
                            );
                        case "email":
                            return (
                                <h4
                                    className="m-2"
                                    key={propName}
                                >{`Почтовый адрес: ${userId[propName]}`}</h4>
                            );
                        case "sex":
                            return (
                                <h4
                                    className="m-2"
                                    key={propName}
                                >{`Пол: ${userId[propName]}`}</h4>
                            );
                    }
                })}
                <button
                    className="btn btn-outline-secondary m-2"
                    onClick={() => handleSave()}
                >
                    Изменить данные
                </button>
            </React.Fragment>
        );
    }
    if (userId === null) {
        return <SearchStatus length={-1} userId={searchId} />;
    }
    return <SearchStatus length={-3} />;
};

UserProfile.propTypes = {
    searchId: PropTypes.string.isRequired
};

export default UserProfile;
