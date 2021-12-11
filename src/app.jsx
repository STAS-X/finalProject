import React, { useState } from 'react'
import api from './api'
import paginate from './utils/paginate'
import UserDelete from './components/userDelete'
import UserFavorite from './components/userFavorite'
import TableCaption from './components/tableCaption'
import UserQualities from './components/userQualities'
import UserProfile from './components/userProfile'

import UserPaging from './components/pagination'

const App = () => {
    let [users, setUsers] = useState(api.users.fetchAll())
    const count = users.length
    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 4

    const userCrop = paginate(users, currentPage, pageSize)

    const handleDelete = (userId) =>
        setUsers(users.filter((user) => user._id !== userId))

    const handleRenderPhrase = (number) => {
        const lastOne = Number(number.toString().slice(-1))
        if (number > 4 && number < 15) return 'Человек тусанет'
        if ([2, 3, 4].indexOf(lastOne) >= 0) return 'Человека тусанут'
        if (lastOne === 1) return 'Человек тусанет'
        return 'Человек тусанет'
    }

    const handleUpdateBookmark = (id) => {
        return users.find((cur) => cur._id === id).bookmark
            ? 'bi bi-award-fill'
            : 'bi bi-award'
    }

    const handleClickFavorite = (userId) => {
        users = users.map((user) => {
            if (user._id === userId) user.bookmark = !user.bookmark
            return user
        })

        setUsers(users)
    }

    const handlePageChange = (pageIndex) => {
        console.log('page:', pageIndex)
        if (currentPage !== pageIndex) setCurrentPage(pageIndex)
    }

    return (
        <>
            <TableCaption count={users.length} onPhrase={handleRenderPhrase} />

            {users.length > 0 && (
                <table className="table table-dark table-striped table-responsive">
                    <thead>
                        <tr>
                            <th scope="col">Имя</th>
                            <th scope="col">Качества</th>
                            <th scope="col">Профессия</th>
                            <th scope="col">Встретился, раз</th>
                            <th scope="col">Оценка</th>
                            <th scope="col">Избранное</th>
                            <th scope="col">Действие</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userCrop.map((user) => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td id="quality">
                                    <UserQualities qualities={user.qualities} />
                                </td>
                                <UserProfile profile={user.profession.name} />
                                <UserProfile profile={user.completedMeetings} />
                                <UserProfile profile={user.rate} />
                                <td>
                                    <UserFavorite
                                        id={user._id}
                                        onUpdate={handleUpdateBookmark}
                                        onFavotrite={handleClickFavorite}
                                    />
                                </td>
                                <td>
                                    <UserDelete
                                        id={user._id}
                                        onDelete={handleDelete}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <UserPaging
                itemsCount={count}
                currentPage={currentPage}
                pageSize={pageSize}
                onPageChange={handlePageChange}
            />
        </>
    )
}

export default App
