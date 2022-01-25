import React, { useState, useEffect } from "react";
import SelectField from "../form/selectField";
import Textfield from "../form/textField";
import PropTypes from "prop-types";
import * as yup from "yup";

const MakeCommentCard = ({ users }) => {
    const [errors, setErrors] = useState({});

    const [data, setData] = useState({
        users: "",
        comment: ""
    });

    useEffect(() => {
        validate();
    }, [data]);

    const checkoutPersonData = yup.object().shape({
        users: yup.string().required("users_Необхоимо выбрать пользователя"),
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

    return (
        <div className="card mb-2">
            <div className="card-body">
                <div>
                    <h2>New comment</h2>
                    <div className="mb-4">
                        <SelectField
                            label={"Выберите пользователя:"}
                            defaultOption="Choose..."
                            name="users"
                            options={users}
                            onChange={handleChange}
                            value={data.users}
                            error={errors.users}
                        />
                    </div>
                    <div className="mb-4">
                        <Textfield
                            label="Сообщение "
                            type="textarea"
                            row="3"
                            name="pass"
                            onChange={handleChange}
                            value={data.comment}
                            error={errors.comment}
                        />
                        <button
                            disabled={!isPublished}
                            className="btn btn-primary w-auto m-4 end-0"
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
    users: PropTypes.array
};

export default MakeCommentCard;
