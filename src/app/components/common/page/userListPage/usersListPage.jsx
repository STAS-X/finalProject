/* eslint-disable indent */
import React, { useState, useEffect } from "react";
import { paginate } from "../../../../utils/paginate";
import PropTypes from "prop-types";
import Pagination from "../../pagination";
import GroupList from "../../groupList";
import SearchStatus from "../../../ui/searchStatus";
import UsersTable from "../../../ui/usersTable";
import Searchfield from "../../form/searchField";
import { useParams, useHistory } from "react-router-dom";
import { useUsers } from "../../../../hooks/useUsers";
import _ from "lodash";
import api from "../../../../api";

const usersListPage = () => {
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
    const pageSize = 6;
    const params = useParams();
    const [searchUser, setSearch] = useState();

    const userId =
        params.userId && params.userId !== "reset" ? +params.userId : -1;

    if (params.userId === "reset") {
        localStorage.setItem("allUsers", JSON.stringify(null));
    }

    const history = useHistory();
    if (history.location.pathname.search("/users/reset") > -1)
        // eslint-disable-next-line curly
        history.replace("/users");

    const [, setUsers] = useState([]);

    const { users } = useUsers();
    // const [users, setUsers] = useState(() => {
    //     const usersApp = JSON.parse(localStorage.getItem("allUsers")) || [];
    //     if (usersApp && params.userId !== "reset") {
    //         setTimeout(function () {
    //             setUsers(
    //                 usersApp.filter((item, itemId) => {
    //                     return (
    //                         itemId + 1 === userId ||
    //                         item._id === userId ||
    //                         userId === -1
    //                     );
    //                 })
    //             );
    //         }, 1000);
    //     } else {
    //         api.users.fetchAll().then((data) => setUsers(data));
    //     }
    // });

    // useEffect(() => {
    //     if (/* users && users.length > 0 && */ userId === -1 && !searchUser) {
    //         localStorage.setItem("allUsers", JSON.stringify(users || []));
    //     }

    //     return () => {
    //         // console.log("unmount users", userId);
    //     };
    // }, [users]);

    useEffect(() => {
        return () => {
            setUsers();
            setSelectedProf();
            setSortBy({ path: "", order: "asc" });
        };
    }, []);

    useEffect(() => setCurrentPage(1), [selectedProf]);

    useEffect(() => {
        if (document.querySelector("input[name='search']")) {
            document.querySelector("input[name='search']").focus();
        }
    }, [searchUser]);

    const handleDelete = (userId) => {
        // const usersDelete = JSON.parse(localStorage.getItem("allUsers")).filter(
        //     (user) => user._id !== userId
        // );
        // localStorage.setItem("allUsers", JSON.stringify(usersDelete || []));

        // setUsers(usersDelete);
        console.log(userId);

        // if (
        //     !(
        //         usersDelete.filter((user) => user._id !== userId).length >
        //             (currentPage - 1) * pageSize || currentPage === 1
        //     )
        // ) {
        setCurrentPage((prevState) => prevState - 1);
        // }

        if (searchUser) updateSearch(searchUser);
    };

    const handleToggleBookMark = (id) => {
        // setUsers(
        //     users.map((user) => {
        //         if (user._id === id) {
        //             return { ...user, bookmark: !user.bookmark };
        //         }
        //         return user;
        //     })
        // );
        console.log(id);
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
        setSearch();
        updateSearch();
        setSelectedProf(item);
    };

    const handleSearch = ({ target }) => {
        const searchUser = target.value;
        setSearch(searchUser);
        updateSearch(searchUser);
    };

    const updateSearch = (searchUser) => {
        const usersFromLocal = JSON.parse(localStorage.getItem("allUsers"));
        if (searchUser) {
            if (selectedProf) setSelectedProf();
            const searchFilter = usersFromLocal.filter(
                (user) => user.name.search(searchUser) > -1
            );
            setUsers(searchFilter);
        } else setUsers(usersFromLocal);
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
            localStorage.setItem("allUsers", JSON.stringify(null));
            localStorage.setItem("avatars", JSON.stringify(null));
            location.replace("/users/reset");
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

                <div className="d-flex flex-column w-50">
                    <SearchStatus length={count} />
                    <Searchfield
                        name="search"
                        label="Строка поиска по имени :"
                        holder="Введите имя..."
                        value={searchUser || ""}
                        error=""
                        onChange={handleSearch}
                    />
                    {count > 0 && (
                        <UsersTable
                            users={usersCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onDelete={handleDelete}
                            onToggleBookMark={handleToggleBookMark}
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
    if (users && users.length === 0 && searchUser) {
        return (
            <div className="d-flex flex-column w-50">
                <SearchStatus length={0} />
                <Searchfield
                    name="search"
                    label="Строка поиска по имени:"
                    holder="Введите имя..."
                    error={`Пользователи с именем '${searchUser}' не найдены`}
                    value={searchUser || ""}
                    onChange={handleSearch}
                />
            </div>
        );
    }
    if (users && users.length === 0) {
        return <SearchStatus length={-1} />;
    }
    return <SearchStatus length={-2} userId={userId} />;
};

usersListPage.propTypes = {
    users: PropTypes.array
};

export default usersListPage;
