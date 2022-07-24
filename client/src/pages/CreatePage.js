import React, {useContext, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {useNavigate} from "react-router";

export const CreatePage = () => {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);
    const [link, setLink] = useState("");
    const {request} = useHttp();

    const pressHandler = async (event) => {
        if (event.key === 'Enter') {
            try {
                const data = await request('api/link/generate', 'POST', {from: link}, {Authorization: `Bearer ${auth.token}`});
                navigate(`/detail/${data.link._id}`);
            } catch (e) {
            }
        }
    }

    return (
        <div className="row">
            <div className="col s8 offset-s2">
                <div className="input-field col s12">
                    <input
                        id="link"
                        type="text"
                        name="link"
                        placeholder="Past your link"
                        value={link}
                        onChange={event => setLink(event.target.value)}
                        onKeyDown={pressHandler}
                    />
                    <label className="active" htmlFor="link">Enter link</label>
                </div>
            </div>
        </div>)
}