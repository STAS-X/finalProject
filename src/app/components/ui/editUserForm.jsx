import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
// import validator from "../../utils/validators";
import Textfield from "../common/form/textField";
import SelectField from "../common/form/selectField";
import api from "../../api";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelect";
import * as yup from "yup";

const EditUserForm = ({ userById }) => {
    // eslint-disable-next-line no-unused-vars
    const history = useHistory();

    const [userProfileId] = useState(() => userById[0]);
    const [users, setUsers] = useState([]);
    const [qualities, setqualities] = useState([]);
    const [errors, setErrors] = useState({});
    const [professions, setProfessions] = useState([]);

    const [data, setData] = useState({
        fio: userProfileId.name,
        email: userProfileId.email || "",
        pass: userProfileId.pass || "",
        professions: "",
        sex: userProfileId.sex || "male",
        qualities:
            userProfileId.qualities.map((qualitie) => ({
                label: qualitie.name,
                value: qualitie._id
            })) || []
    });

    useEffect(() => {
        validate();
    }, [data]);

    useEffect(() => {
        api.qualities.fetchAll().then((data) => {
            // Запрашиваем все качества
            setqualities(data);
        });

        api.professions.fetchAll().then((data) => {
            // Задаем профессию текущего пользователя по умолчанию
            setData((prevState) => ({
                ...prevState,
                professions:
                    data.filter(
                        (prof) => prof._id === userProfileId.profession._id
                    )[0].name || ""
            }));
            // Запрашиаем все профессии
            setProfessions(
                data.map((prof) => ({ name: prof.name, value: prof._id }))
            );
        });
        setUsers(JSON.parse(localStorage.getItem("allUsers")) || []);

        return () => {
            console.log("edtUserForm unmounted");
        };
    }, []);

    const handleChange = (target) => {
        setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    };

    const checkoutPersonData = yup.object().shape({
        fio: yup.string().required("fio_Необходимо задать имя"),
        email: yup
            .string()
            .required("email_Необхоимо задать почтовый адрес")
            .email("email_Почтовый адрес задан некорректно"),
        pass: yup
            .string()
            .required("pass_Необхоимо задать пароль")
            .matches(
                /(?=.*[0-9])[0-9]+/g,
                "pass_Пароль должен содержать минимум одну цифру"
            )
            .matches(
                /(?=.*[a-z])(?=.*[A-Z])[a-zA-Z]+/g,
                "pass_Пароль должен содержать минимум одну прописную и заглавные буквы"
            )
            .matches(
                /(?=.*[!@#$%^&*])[!@#$%^&*]+/g,
                "pass_Пароль должен содержать минимум один спецсимвол !@#$%^&*"
            )
            .matches(
                /(?=.{8,})/g,
                "pass_Пароль должен состоять не менее чем из 8 знаков"
            ),
        professions: yup
            .string()
            .required("professions_Необходимо выбрать профессию"),
        sex: yup
            .string()
            .required()
            .matches(/(male|female|other)/, "sex_Необходимо задать пол"),
        qualities: yup
            .array()
            .min(1, "qualities_Необходимо выбрать хотя бы одно качество")
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
    /*
    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Электронная почта указана неверно"
            }
        },
        pass: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
            },
            isPass: {
                message:
                    "Пароль должен содержать минимум одну заглавную и строчную буквы, цифру и один спецзнак !@#$%^&*"
            },
            isMin: {
                message: "Пароль должен содержать не менее 8 символов",
                value: 8
            }
        },
        professions: {
            isRequired: {
                message: "Обязательно выберте вашу профессию"
            }
        },
        license: {
            isRequired: {
                message: "Необходимо подтвердить лицензионное соглашение"
            }
        }
    };
*/

    const validate = () => {
        // const errors = validator(data, validatorConfig);
        checkFormValidation();
        // setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const getDataToUpdate = () => ({
        ...userProfileId,
        name: data.fio,
        email: data.email,
        pass: data.pass,
        sex: data.sex,
        profession: professions
            .filter((prof) => prof.name === data.professions)
            .map((prof) => ({ name: prof.name, _id: prof.value }))[0],
        qualities: data.qualities.map((qualitie, ind) => ({
            _id: qualitie.value,
            name: qualitie.label,
            color: qualities[
                Object.keys(qualities).filter(
                    (key) => qualities[key]._id === qualitie.value
                )
            ].color
        }))
    });

    const isButtonActive = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        if (users.findIndex((u) => u._id === userProfileId._id) > -1) {
            api.users.update(userProfileId._id, getDataToUpdate());
            console.log(
                `Данные пользователя ${userProfileId.name} были обновлены`
            );
            history.replace("/users/" + userProfileId._id);
        } else history.replace("/users");
    };

    return (
        <form onSubmit={handleSubmit}>
            <Textfield
                label="Имя пользователя "
                name="fio"
                onChange={handleChange}
                value={data.fio}
                error={errors.fio}
            />
            <Textfield
                label="Электронная почта "
                name="email"
                onChange={handleChange}
                value={data.email}
                error={errors.email}
            />
            <Textfield
                label="Пароль "
                type="password"
                name="pass"
                onChange={handleChange}
                value={data.pass}
                error={errors.pass}
            />
            <SelectField
                label={"Выберите вашу профессию:"}
                defaultOption="Choose..."
                name="professions"
                options={professions}
                onChange={handleChange}
                value={data.professions}
                error={errors.professions}
            />
            <RadioField
                options={[
                    { name: "Male", value: "male" },
                    { name: "Female", value: "female" },
                    { name: "Other", value: "other" }
                ]}
                value={data.sex}
                label="Выберите ваш пол:"
                name="sex"
                onChange={handleChange}
            />
            <MultiSelectField
                defaultValue={data.qualities}
                options={qualities}
                name="qualities"
                label="Выберите ваши качества:"
                onChange={handleChange}
                error={errors.qualities}
            />

            <button
                type="submit"
                disabled={!isButtonActive}
                className="btn btn-primary w-100 mx-auto"
            >
                Сохранить изменения
            </button>
        </form>
    );
};

EditUserForm.propTypes = {
    userById: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default EditUserForm;
