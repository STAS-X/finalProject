import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import InfoCard from "./cards/infoCard";
import MeetingCard from "./cards/meetingCard";
import QualityCard from "./cards/qualityCard";
import MakeCommentCard from "./cards/makeCommentCard";
import ViewerCommentCard from "./cards/viewerCommentsCard";
import api from "../../api";
import query from "query-string";

const GroupComments = () => {
    const [users, setUsers] = useState(() => {
        const usersApp = JSON.parse(localStorage.getItem("allUsers")) || [];
        if (usersApp && usersApp.length > 0) {
            setTimeout(() => {
                setUsers(usersApp);
                console.log(usersApp);
            }, 1000);
        } else {
            api.users.fetchAll().then((data) => setUsers(data));
        }
    });
    const [avatars, setAvatars] = useState(
        JSON.parse(localStorage.getItem("avatars")) || []
    );
    const [userById, setUserById] = useState();

    useEffect(() => {
        if (!users) return;
        if (!JSON.parse(localStorage.getItem("avatars"))) {
            localStorage.setItem(
                "avatars",
                JSON.stringify(
                    users.map((user) => ({
                        _id: user._id,
                        name: `${(Math.random() + 1)
                            .toString(36)
                            .substring(7)}.svg`
                    }))
                )
            );
            setAvatars(JSON.parse(localStorage.getItem("avatars")));
        }
        if (!userById) {
            setUserById(
                users.filter(
                    (user) =>
                        user._id ===
                        (userId && userId.indexOf("=") > -1
                            ? parseParams(userId)
                            : userId)
                )
            );
        }
        if (userById && userById.length === 1) {
            console.log(
                avatars.filter((avatar) => avatar._id === userById[0]._id)[0]
                    .name
            );
        }

        return () => {};
    }, [users]);

    const [newComment, setNewComment] = useState();

    const handleAddComment = (id) => {
        setNewComment(id);
    };

    const { userId } = useParams();

    const history = useHistory();

    const parseParams = (id) => {
        const param1 = query.parse(id);
        if (typeof param1 === "object") return Object.values(param1)[0];
        return param1;
    };

    if (userById && userById.length !== 1) {
        history.replace("/users");
    }

    return (
        <div className="row gutters-sm">
            {
                /* Left side of comments component */
                userById && userById.length === 1 && (
                    <>
                        <div className="col-md-4 mb-3">
                            <InfoCard
                                name={userById[0].name}
                                id={userById[0]._id}
                                avatar={
                                    avatars.filter(
                                        (avatar) =>
                                            avatar._id === userById[0]._id
                                    )[0].name
                                }
                                profession={userById[0].profession.name}
                                rate={userById[0].rate}
                            />
                            <MeetingCard
                                meeting={userById[0].completedMeetings}
                            />
                            <QualityCard qualities={userById[0].qualities} />
                        </div>
                        {/* Right side of comments component */}
                        <div className="col-md-8">
                            <MakeCommentCard
                                users={users}
                                onAddComment={handleAddComment}
                            />
                            <ViewerCommentCard
                                users={users}
                                newCommentId={newComment}
                            />
                        </div>
                    </>
                )
            }
        </div>
    );
};

export default GroupComments;
