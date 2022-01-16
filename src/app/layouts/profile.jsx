import React from "react";
import { useParams, useHistory } from "react-router-dom";
import EditUserForm from "../components/ui/editUserForm";
import query from "query-string";

const Profile = () => {
    const { userId } = useParams();
    const parseParams = (id) => {
        const param1 = query.parse(id);
        if (typeof param1 === "object") return Object.values(param1)[0];
        return param1;
    };

    const userById = (
        JSON.parse(localStorage.getItem("allUsers")) || []
    ).filter(
        (user) =>
            user._id ===
            (userId && userId.indexOf("=") > -1 ? parseParams(userId) : userId)
    );
    if (userById.length !== 1) {
        const history = useHistory();
        history.replace("/users");
    }

    return (
        <div className="container mt-2">
            <div className="row">
                <div className="col-md-6 offset-md-3 p-4 shadow">
                    <h3 className="mb-4">User Profile data</h3>
                    <EditUserForm userById={userById} />
                </div>
            </div>
        </div>
    );
};

export default Profile;
