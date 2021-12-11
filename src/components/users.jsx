import React, { useState } from 'react'
import api from '../api'

const Usrs = (props) => {
    return (
        <>
            <h2>
                <span
                    className={
                        'badge bg-' + (users.length > 0 ? 'primary' : 'danger')
                    }
                >
                    {users.length > 0
                        ? `${users.length} ${renderPhrase(
                              users.length,
                          )} с тобой сегодня тусанут`
                        : 'Никто с тобой не тусанет'}
                </span>
            </h2>
            {users.length > 0 && (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Имя</th>
                            <th scope="col">Качества</th>
                            <th scope="col">Профессия</th>
                            <th scope="col">Встретился, раз</th>
                            <th scope="col">Оценка</th>
                            <th scope="col">Избранное</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>
                                    {user.qualities.map((item) => (
                                        <span
                                            className={
                                                'badge m-1 bg-' + item.color
                                            }
                                            key={item._id}
                                        >
                                            {item.name}
                                        </span>
                                    ))}
                                </td>
                                <td>{user.profession.name}</td>
                                <td>{user.completedMeetings}</td>
                                <td>{user.rate}</td>
                                <td>
                                    <div
                                        className={
                                            user.bookmark
                                                ? 'bi bi-award-fill'
                                                : 'bi bi-award'
                                        }
                                        onClick={() =>
                                            handleClickFavorite(user._id)
                                        }
                                    />
                                </td>
                                <td>
                                    <button
                                        className={'btn btn-danger'}
                                        onClick={() => handleDelete(user._id)}
                                    >
                                        Удалить
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    )
}

export default Usrs
