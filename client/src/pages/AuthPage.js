import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {useErrorMessage, useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const errorMessage = useErrorMessage();
    const message = useMessage();
    const {loading, error, request, clearError} = useHttp();
    const [form, setForm] = useState({
        email: '', password: ''
    });

    useEffect(() => {
        errorMessage(error);
        clearError();
    }, [error, errorMessage, clearError])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value});
    }

    const registerHandler = async () => {
        try {
            const data = await request('api/auth/register', 'POST', {...form});
            message(data.message);
        } catch (e) {
        }
    }

    const loginHandler = async () => {
        try {
            const data = await request('api/auth/login', 'POST', {...form});
            auth.login(data.token, data.userId);
        } catch (e) {
        }
    }
    const pressHandler = async (event) => {
        if (event.key === "Enter") {
            await loginHandler();
        }
    }

    return (<div className="row">
        <div className={"cpl.s6.offset-s3"}>
            <h1>CreateShortLink</h1>
            <div className="card blue">
                <div className="card-content white-text">
                    <span className="card-title">Authorization</span>
                    <div className="row">
                        <form className="col s12">
                            <div className="row">
                                <div className="input-field col s12">
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        className="validate"
                                        placeholder="Enter your email address"
                                        value={form.email}
                                        onChange={changeHandler}
                                    />
                                    <label className="active" htmlFor="email">Email</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="password"
                                           type="password"
                                           name="password"
                                           className="validate"
                                           placeholder="Enter your password"
                                           value={form.password}
                                           onChange={changeHandler}
                                           onKeyDown={pressHandler}
                                    />
                                    <label className="active" htmlFor="password">Password</label>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="card-action">
                    <button className="btn yellow white-text" onClick={loginHandler} disabled={loading}>Log in</button>
                    <button className="btn yellow white-text" onClick={registerHandler} disabled={loading}>Sign up
                    </button>
                </div>
            </div>
        </div>
    </div>)
}