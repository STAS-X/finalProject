import React, { useState, useEffect } from "react";
import Textfield from "../components/textField";
import validator from "../utils/validators";

const Login = () => {
    const [data, setData] = useState({ email: "", pass: "" });
    // eslint-disable-next-line no-unused-vars
    const [errors, setErrors] = useState({});

    const handleChange = ({ target }) => {
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
                message: "Пароль должен содержать минимум одну заглавную и строчную буквы, цифру и один спецзнак !@#$%^&*"
            },
            isMin: {
                message: "Пароль должен содержать не менее 8 символов",
                value: 8
            }
        }
    };

    useEffect(() => { validate(); }, [data]);

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
        <div className="container mt-2">
            <div className="row">
                <div className="col-md-6 offset-md-3 p-4 shadow">
                    <h3 className="mb-4">Login</h3>
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
                        <button type="submit" disabled={!isButtonActive} className="btn btn-primary w-100 mx-auto">Отправить</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
