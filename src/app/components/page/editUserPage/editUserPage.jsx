import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import BackHistoryButton from "../../common/backButton";
import { useUser } from "../../../hooks/useUsers";
import { useAuth } from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import { useProfessions } from "../../../hooks/useProfession";
import { useQualities } from "../../../hooks/useQualities";
import userService from "../../../services/user.service";

const EditUserPage = () => {
    const { userId } = useParams();
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    const [, setError] = useState(null);
    const { updateNavBar, currentUser } = useAuth();
    const { getUserById, getUsers } = useUser();
    const [user] = useState(getUserById(userId));
    const [users, setUsers] = useState([]);

    const transformData = (data) => {
        return data.map((item) => ({ label: item.name, value: item._id }));
    };
    const { professions } = useProfessions();
    const { qualities } = useQualities();

    const getQualities = (elements) => {
        const qualitiesArray = [];

        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem === qualities[quality]._id) {
                    qualitiesArray.push(qualities[quality]);
                }
            }
        }
        return qualitiesArray;
    };

    const [data, setData] = useState(
        user || {
            _id: "",
            name: "",
            email: "",
            profession: "",
            sex: "male",
            qualities: []
        }
    );

    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        updateUser();
    };

    async function updateUser() {
        try {
            const { content } = await userService.create({
                ...data,
                qualities: data.qualities.map((qual) => qual.value)
            });
            if (content) {
                getUsers().then((data) => setUsers(data));
                toast.success(
                    `Данные пользователя [${
                        content.name || content.email
                    }] успешно обновлены`,
                    {
                        position: "top-center"
                    }
                );
                // return <Redirect to={`/users/${data._id}`} />;
            }
        } catch (error) {
            errorCatcher(error);
        }
    }

    function errorCatcher(error) {
        const { message } = error.response.data.error;
        setError(message);
    }

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            qualities: transformData(getQualities(prevData.qualities))
        }));
    }, []);
    useEffect(() => {
        validate();
        if (data._id) setIsLoading(false);
    }, [data]);

    useEffect(() => {
        if (users && users.length > 0) {
            history.push(`/users/${data._id}`);
            updateNavBar();
            // setTimeout(() => history.go(0), 0);
        }
    }, [users]);

    useEffect(() => {
        console.log(getQualities(user.qualities));
        if (user && currentUser._id !== userId) {
            toast.warn(
                `Пользователь [${
                    user.name || user.email
                }] должен быть зарегистрирован в системе`,
                {
                    position: "top-center"
                }
            );
            history.push(`/users/${user._id}`);
        }

        if (!user) {
            toast.warn(`Пользователь [${userId}] не найден системе`, {
                position: "top-center"
            });
            history.replace("/");
        }
    }, [user]);

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        name: {
            isRequired: {
                message: "Введите ваше имя"
            }
        },
        profession: {
            isRequired: {
                message: "Укажите вашу профессию"
            }
        },
        qualities: {
            isRequired: {
                message: "Требуется указать качества"
            }
        }
    };
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    return (
        <div className="container mt-5">
            <BackHistoryButton />
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {!isLoading &&
                    Object.keys(professions).length > 0 &&
                    Object.keys(qualities).length > 0 ? (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextField
                                label="Электронная почта"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                error={errors.email}
                            />
                            <SelectField
                                label="Выбери свою профессию"
                                defaultOption="Choose..."
                                options={transformData(professions)}
                                name="profession"
                                onChange={handleChange}
                                value={data.profession}
                                error={errors.profession}
                            />
                            <RadioField
                                options={[
                                    { name: "Male", value: "male" },
                                    { name: "Female", value: "female" },
                                    { name: "Other", value: "other" }
                                ]}
                                value={data.sex}
                                name="sex"
                                onChange={handleChange}
                                label="Выберите ваш пол"
                            />
                            <MultiSelectField
                                defaultValue={data.qualities}
                                options={transformData(qualities)}
                                onChange={handleChange}
                                name="qualities"
                                label="Выберите ваши качества"
                                error={errors.qualities}
                            />
                            <button
                                type="submit"
                                disabled={!isValid}
                                className="btn btn-primary w-100 mx-auto"
                            >
                                Обновить
                            </button>
                        </form>
                    ) : (
                        "Loading..."
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditUserPage;
