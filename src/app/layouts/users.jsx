import React from "react";
import { useParams } from "react-router-dom";
import UsersListPage from "../components/common/page/userListPage/usersListPage";
import UsersProfile from "../components/common/page/usersPage/usersProfile";
import query from "query-string";

const Users = () => {
    const { userId } = useParams();
    const parseParams = (_id) => {
        const param1 = query.parse(_id);
        if (typeof param1 === "object") return Object.values(param1)[0];
        return param1;
    };
    const searchId = (userId && userId.indexOf("=") > -1) ? parseParams(userId) : userId;

    return (
        <>{searchId && searchId !== "reset" ? <UsersProfile searchId={searchId} /> : <UsersListPage />}</>
    );
};

export default Users;
