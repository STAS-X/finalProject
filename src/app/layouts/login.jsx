import React, { useState } from "react";
import { useParams } from "react-router-dom";
import LoginForm from "../components/ui/loginForm";
import RegisterForm from "../components/ui/registerForm";

const Login = () => {
    const { type } = useParams();
    const [formtype, setFormType] = useState(
        type === "register" ? type : "login"
    );
    const toggleFormType = (params) => {
        setFormType((prevState) =>
            prevState === "register" ? "login" : "register"
        );
    };

    return (
        <div className="container mt-2">
            <div className="row">
                <div className="col-md-6 offset-md-3 p-4 shadow">
                    {formtype === "register" ? (
                        <>
                            <h3 className="mb-4">Register</h3>
                            <RegisterForm />
                            <p>
                                Already have account?{" "}
                                <a role="button" onClick={toggleFormType}>
                                    Sign In
                                </a>
                            </p>
                        </>
                    ) : (
                        <>
                            <h3 className="mb-4">Login</h3>
                            <LoginForm />
                            <p>
                                Dont have account?{" "}
                                <a role="button" onClick={toggleFormType}>
                                    Sign In
                                </a>
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
