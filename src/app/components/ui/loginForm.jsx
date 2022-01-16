import React, { useState, useEffect } from "react";
import validator from "../../utils/validators";
import Textfield from "../common/form/textField";
import CheckBoxField from "../common/form/checkBoxField";
// import * as yup from "yup";

const LoginForm = () => {
    const [data, setData] = useState({ email: "", pass: "", stayOn: false });
    // eslint-disable-next-line no-unused-vars
    const [errors, setErrors] = useState({});

    const handleChange = (target) => {
        setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    };
    /*
    const validateShema = yup.object().shape({
        license: yup.boolean(),
        pass: yup
            .string()
            .required("Пароль обязателен для заполнения")
            .matches(
                /(?=.*[0-9])[0-9]+/g,
                "Пароль должен содержать минимум одну цифру"
            )
            .matches(
                /(?=.*[a-z])(?=.*[A-Z])[a-zA-Z]+/g,
                "Пароль должен содержать минимум одну прописную и заглавные буквы"
            )
            .matches(
                /(?=.*[!@#$%^&*])[!@#$%^&*]+/g,
                "Пароль должен содержать минимум один спецсимвол !@#$%^&*"
            )
            .matches(
                /(?=.{8,})/g,
                "Пароль должен состоять не менее чем из 8 знаков"
            ),
        email: yup
            .string()
            .required("Электронная почта обязательна для заполнения")
            .email("Электронная почта задана неверно")
    });
    */
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
        }
    };

    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);
        /* validateShema
            .validate(data)
            .then(() => setErrors({}))
            .catch((err) => setErrors({ [err.path]: err.message }));
            */
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
            <CheckBoxField
                value={data.stayOn}
                onChange={handleChange}
                name="stayOn"
            >
                Оставаться в системе
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

export default LoginForm;
