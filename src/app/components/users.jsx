/* eslint-disable indent */
import React, { useState, useEffect } from "react";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";
import UsersTable from "./usersTable";
import { useParams } from "react-router-dom";
import _ from "lodash";
import api from "../api";

const Users = ({ ...rest }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState(() => {
        api.professions.fetchAll().then((data) => {
            Object.assign(data, {
                allProfession: { name: "Все профессии" }
            });
            setProfessions(data);
        });
    });
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "", order: "asc" });
    const pageSize = 8;
    const params = useParams();

    const userId = params.userId ? +params.userId : -1;

    const [users, setUsers] = useState(() => {
        const usersApp = JSON.parse(localStorage.getItem("allUsers")) || [];
        if (usersApp && usersApp.length > 0) {
            setTimeout(function () {
                setUsers(
                    usersApp.filter((item, itemId) => {
                        return (
                            itemId + 1 === userId ||
                            item._id === userId ||
                            userId === -1
                        );
                    })
                );
            }, 1000);
        } else api.users.fetchById(userId).then((data) => setUsers(data));
    });

    useEffect(() => {
        if (users && users.length > 0 && userId === -1) {
            localStorage.setItem("allUsers", JSON.stringify(users));
        }

        return () => {
            // console.log("unmount users", userId);
        };
    }, [users]);

    useEffect(() => {
        return () => {
            setUsers();
            setSelectedProf();
            setSortBy({ path: "", order: "asc" });
        };
    }, []);

    useEffect(() => setCurrentPage(1), [selectedProf]);

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));

        if (
            !(
                users.filter((user) => user._id !== userId).length >
                    (currentPage - 1) * pageSize || currentPage === 1
            )
        ) {
            setCurrentPage((prevState) => prevState - 1);
        }
    };

    const handleToggleBookMark = (id) => {
        setUsers(
            users.map((user) => {
                if (user._id === id) {
                    return { ...user, bookmark: !user.bookmark };
                }
                return user;
            })
        );
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
        // console.log("page: ", pageIndex);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    const handlerProfessionSelect = (item) => {
        //  if (item.name === selectedProf) item = undefined;
        setSelectedProf(item);
    };

    if (users && users.length > 0) {
        const usersFiltered = selectedProf
            ? users.filter(
                  (user) =>
                      JSON.stringify(user.profession) ===
                          JSON.stringify(selectedProf) ||
                      selectedProf.name === "Все профессии"
              )
            : users;

        const count = usersFiltered.length;
        const sortedUsers = _.orderBy(
            usersFiltered,
            [sortBy.path],
            [sortBy.order]
        );
        const usersCrop = paginate(sortedUsers, currentPage, pageSize);
        const clearFilter = () => {
            if (selectedProf) setSelectedProf();
            setSortBy((prevState) => ({ ...prevState, path: "" }));
            localStorage.setItem("allUsers", JSON.stringify([]));
            window.location.reload();
        };

        return (
            <div className="d-flex">
                {professions && (
                    <div className="d-flex flex-column flex-shrink-0 p-3 pt-0">
                        <GroupList
                            selectedItem={selectedProf}
                            items={professions}
                            onItemSelect={handlerProfessionSelect}
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={() => clearFilter()}
                        >
                            Очистить
                        </button>
                    </div>
                )}

                <div className="d-flex flex-column">
                    <SearchStatus length={count} />
                    {count > 0 && (
                        <UsersTable
                            users={usersCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onDelete={handleDelete}
                            onToggleBookMark={handleToggleBookMark}
                            {...rest}
                        />
                    )}
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
    if (users && users.length < 1) {
        return (
            <SearchStatus
                length={-1}
                userId={params.userId ? params.userId : -1}
            />
        );
    }
    return <SearchStatus length={-2} userId={userId} />;
};

export default Users;
