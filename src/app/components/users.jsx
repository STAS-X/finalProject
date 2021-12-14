import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import User from "./user";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";
import api from "../api";

const Users = ({ users: allUsers, ...rest }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    //  console.log(allUsers);
    const pageSize = 4;
    useEffect(() => {
        api.professions.fetchAll.then(
            (data) => setProfessions(data)
            /* Object.assign(data, {
                    allProfession: { name: "Все профессии" }
                })  */
        );
    });
    useEffect(() => setCurrentPage(1), [selectedProf]);

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
        // console.log("page: ", pageIndex);
    };

    const handlerProfessionSelect = (item) => {
        //  if (item.name === selectedProf) item = undefined;
        setSelectedProf(item);
    };

    const usersFiltered = selectedProf
        ? allUsers.filter((user) => user.profession === selectedProf)
        : allUsers;

    const count = usersFiltered.length;
    const usersCrop = paginate(usersFiltered, currentPage, pageSize);

    useEffect(() => {
        if (count > (currentPage - 1) * pageSize || currentPage === 1) return;
        //  console.log(count, (currentPage - 1) * pageSize);
        setCurrentPage((prevState) => prevState - 1);
    }, [count]);

    const clearFilter = () => {
        if (selectedProf) setSelectedProf();
    };

    return (
        <div className="d-flex">
            {professions && (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList
                        selectedItem={selectedProf}
                        items={professions}
                        onItemSelect={handlerProfessionSelect}
                    />
                    <button
                        className="btn btn-secondary mt-2"
                        onClick={clearFilter}
                    >
                        Очистить
                    </button>
                </div>
            )}

            <div className="d-flex flex-column">
                <SearchStatus length={count} />
                {count > 0 && (
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Имя</th>
                                <th scope="col">Качества</th>
                                <th scope="col">Провфессия</th>
                                <th scope="col">Встретился, раз</th>
                                <th scope="col">Оценка</th>
                                <th scope="col">Избранное</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {usersCrop.map((user) => (
                                <User {...rest} {...user} key={user._id} />
                            ))}
                        </tbody>
                    </table>
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
};

Users.propTypes = {
    users: PropTypes.array
};

export default Users;
