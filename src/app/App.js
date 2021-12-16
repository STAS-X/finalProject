import React, { useState } from "react";
import Users from "./components/users";
import SearchStatus from "./components/searchStatus";
import api from "./api";

function App() {
    const [users, setUsers] = useState(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    });
    /*
    useEffect(() => {
        console.log("users rendered");
        api.users.fetchAll().then((data) => setUsers(data));
    });
    */
    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };
    const handleToggleBookMark = (id) => {
        console.log("bookmark onclick");
        setUsers(
            users.map((user) => {
                if (user._id === id) {
                    return { ...user, bookmark: !user.bookmark };
                }
                return user;
            })
        );
    };
    return (
        <div>
            {(users && (
                <Users
                    onDelete={handleDelete}
                    onToggleBookMark={handleToggleBookMark}
                    users={users}
                />
            )) ||
                (!users && <SearchStatus length={-1} />)}
        </div>
    );
}

export default App;
