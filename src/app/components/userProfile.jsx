/* eslint-disable indent */
/* eslint-disable curly */
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import SearchStatus from "./searchStatus";
import QualitysList from "./qualitysList";
import api from "../api";
import query from "query-string";

const UserProfile = () => {
    const search = query.parse(location.search);

    const [userId, setUserId] = useState(() => {
                if (search.id)
                    api.users
                        .fetchById(search.id)
                        .then((data) => setUserId(data[0]));
            }
    );

    const history = useHistory();
    const handleSave = () => {
        history.replace("/users");
    };

    if (userId) {
        return (
            <React.Fragment>
                {/* eslint-disable-next-line array-callback-return */}
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
                                <h3 className="m-2"
                                    key={propName}
                                >{`Оценка: ${userId[propName]}`}</h3>
                            );
                        case "qualities":
                            return (
                                <span
                                    className="m-2"
                                    key={propName}
                                >
                                    {" "}
                                    <QualitysList
                                        qualities={userId[propName]}
                                    />{" "}
                                </span>
                            );
                    }
                })}
                <button
                    className="btn btn-outline-secondary m-2"
                    onClick={() => handleSave()}
                >
                    Все пользователи
                </button>
            </React.Fragment>
        );
    }
    return <SearchStatus length={-2} />;
};

export default UserProfile;
