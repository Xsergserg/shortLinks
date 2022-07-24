import React, {useContext} from 'react';
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
import {useNavigate, useParams} from "react-router";
import {useMessage} from "../hooks/message.hook";

export const LinkCard = ({link}) => {

    const {token} = useContext(AuthContext);
    const {request} = useHttp();
    const linkId = useParams().id;
    const message = useMessage();
    const navigate = useNavigate();

    const deleteLink = async () => {
        try {
            const deleted = await request(`/api/link/${linkId}`, 'DELETE', null, {
                Authorization: `Bearer ${token}`
            })
            if (deleted.status === 200) {
                return navigate("/links");
            }
            message("Link deleted unsuccessfully")
        } catch (e) {
        }
    }

    return (
        <div>
            <h2>Link:</h2>
            <p>Origin link: <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></p>
            <p>Short link: <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a></p>
            <p>Click amount: <strong>{link.clicks}</strong></p>
            <p>Creating date: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
            <a onClick={deleteLink}>Delete</a>
        </div>
    )
}
