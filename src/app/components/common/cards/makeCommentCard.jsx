import React, { useState, useEffect } from "react";
import SelectField from "../form/selectField";
import Textfield from "../form/textField";
import PropTypes from "prop-types";
import api from "../../../api";
import * as yup from "yup";

const MakeCommentCard = ({ users, onAddComment }) => {
    const [errors, setErrors] = useState({});

    const [data, setData] = useState({
        user: "",
        comment: ""
    });

    useEffect(() => {
        validate();
        return () => {};
    }, [data]);

    const checkoutPersonData = yup.object().shape({
        user: yup.string().required("user_Необхоимо выбрать пользователя"),
        comment: yup.string().required("comment_Необхоимо указать комментарий")
    });

    const checkFormValidation = async () => {
        await checkoutPersonData
            .validate(data, { abortEarly: false })
            .then(() => setErrors({}))
            .catch((err) => {
                const errorValidation = {};
                if (err.errors) {
                    err.errors.forEach((error) => {
                        if (!errorValidation[error.split("_")[0]]) {
                            errorValidation[error.split("_")[0]] =
                                error.split("_")[1];
                        }
                    });
                }
                setErrors(errorValidation);
            });
    };

    const validate = () => {
        // const errors = validator(data, validatorConfig);
        checkFormValidation();
        // setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isPublished = Object.keys(errors).length === 0;

    const handleChange = (target) => {
        setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    };

    const handlePublic = () => {
        api.comments
            .add({
                userId: data.user,
                pageId: data.user,
                content: data.comment
            })
            .then((data) => onAddComment(data._id));

        setData({
            user: "",
            comment: ""
        });
    };

    return (
        <div className="card mb-2">
            <div className="card-body">
                <div>
                    <h2>New comment</h2>
                    <div className="mb-4">
                        <SelectField
                            label={"Выберите пользователя:"}
                            defaultOption="Choose... "
                            name="user"
                            options={users.map((user) => ({
                                _id: user._id,
                                name: user.name
                            }))}
                            onChange={handleChange}
                            value={data.user}
                            error={errors.user}
                        />
                    </div>
                    <div className="mb-4">
                        <Textfield
                            label="Сообщение "
                            type="textarea"
                            rows={5}
                            name="comment"
                            onChange={handleChange}
                            value={data.comment}
                            error={errors.comment}
                        />
                        <button
                            disabled={!isPublished}
                            className="btn btn-primary w-auto m-4 end-0"
                            onClick={handlePublic}
                        >
                            Опубликовать
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

MakeCommentCard.propTypes = {
    users: PropTypes.array,
    onAddComment: PropTypes.func
};

export default MakeCommentCard;
