import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ length, userId }) => {
    const renderPhrase = (number) => {
        const lastOne = Number(number.toString().slice(-1));
        if (number > 4 && number < 15) {
            return "человек тусанет";
        }
        if (lastOne === 1) return "человек тусанет";
        if ([2, 3, 4].indexOf(lastOne) >= 0) return "человека тусанут";
        return "человек тусанет";
    };
    return (
        <h2>
            <span
                className={
                    "badge m-2 " +
                    (length > 0
                        ? "bg-primary"
                        : length === 0
                        ? "bg-danger"
                        : "bg-secondary rounded-pill")
                }
                disabled
            >
                {length > 0
                    ? `${length + " " + renderPhrase(length)}   с тобой сегодня`
                    : length === 0
                    ? "Никто с тобой не тусанет"
                    : length === -1
                    ? userId
                        ? `Пользователь <${userId}> не найден`
                        : "Пользователи отсутствуют"
                    : length === -2
                        ? "Список пользователей загружается..."
                        : "Профиль пользователя загружается..." }
            </span>
        </h2>
    );
};
SearchStatus.propTypes = {
    length: PropTypes.number,
    userId: PropTypes.any
};

export default SearchStatus;
