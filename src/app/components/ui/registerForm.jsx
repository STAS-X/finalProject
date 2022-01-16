import React, { useState, useEffect } from "react";
import validator from "../../utils/validators";
import Textfield from "../common/form/textField";
import SelectField from "../common/form/selectField";
import api from "../../api";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelect";
import CheckBoxField from "../common/form/checkBoxField";

const RegisterForm = () => {
    const [data, setData] = useState({
        email: "",
        pass: "",
        professions: "",
        sex: "male",
        license: false,
        qualities: []
    });
    const [qualities, setqualities] = useState({});
    const [errors, setErrors] = useState({});
    const [professions, setProfessions] = useState({});

    useEffect(() => {
        api.qualities.fetchAll().then((data) => setqualities(data));

        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);

    const handleChange = (target) => {
        setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    };

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

    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isButtonActive = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        console.log("Форма отправлена на сервер");
    };

    return (
        <form onSubmit={handleSubmit}>
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
            />
            <CheckBoxField
                value={data.license}
                onChange={handleChange}
                name="license"
                error={errors.license}
            >
                Подтвердить лицензионное соглашение
            </CheckBoxField>
            <button
                type="submit"
                disabled={!isButtonActive}
                className="btn btn-primary w-100 mx-auto"
            >
                Отправить
            </button>
        </form>
    );
};

export default RegisterForm;
