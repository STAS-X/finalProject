import React from "react";
import PropTypes from "prop-types";
import TableHeader from "../common/table/tableHeader";
import TableBody from "../common/table/tableBody";
import BookMark from "../common/bookmark";
import Qualities from "./qualities";
import Table from "../common/table/table";
// import User from "./user";

const UserTable = ({
    users,
    onSort,
    selectedSort,
    onToggleBookMark,
    onDelete
}) => {
    const columns = {
        name: { path: "name", name: "Имя" },
        qualities: {
            name: "Качества",
            component: (user) => {
                return <Qualities qualities={user.qualities} />;
            }
        },
        professions: { path: "profession.name", name: "Профессия" },
        completedMeetings: {
            path: "completedMeetings",
            name: "Встретился, раз"
        },
        rate: { path: "rate", name: "Оценка" },
        bookmark: {
            path: "bookmark",
            name: "Избранное",
            component: (user) => {
                return (
                    <BookMark
                        status={user.bookmark}
                        onClick={() => onToggleBookMark(user._id)}
                    />
                );
            }
        },
        action: {
            name: "Действие",
            component: (user) => {
                return (
                    <button
                        onClick={() => onDelete(user._id)}
                        className="btn btn-danger"
                    >
                        delete
                    </button>
                );
            }
        }
    };
    return (
        <Table
            onSort={onSort}
            selectedSort={selectedSort}
            columns={columns}
            data={users}
        >
            <TableHeader {...{ onSort, selectedSort, columns }} />
            <TableBody {...{ columns, data: users }} />
        </Table>
    );
};

UserTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onToggleBookMark: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default UserTable;
