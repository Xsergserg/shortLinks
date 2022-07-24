import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";

export const LinksList = ({links}) => {
    const {token} = useContext(AuthContext);
    const {request} = useHttp();
    const message = useMessage();

    const deleteLink = async (linkId) => {
        try {
            const deleted = await request(`/api/link/${linkId}`, 'DELETE', null, {
                Authorization: `Bearer ${token}`
            })
            if (deleted.status === 200) {
                return window.location.reload(false);
            }
            message("Link deleted unsuccessfully")
        } catch (e) {
        }
    }

    if (!links.length) {
        return <p className="center">Links list is empty</p>
    }

    return (
        <table>
            <thead>
            <tr>
                <th>№</th>
                <th>Origin link</th>
                <th>Short link</th>
                <th>Details</th>
            </tr>
            </thead>
            <tbody>
            {
                links.map((link, index) => {
                    return (
                        <tr key={link._id}>
                            <td>{index + 1}</td>
                            <td>{link.from}</td>
                            <td>{link.to}</td>
                            <td>
                                <Link to={`/detail/${link._id}`}>more</Link>
                            </td>
                            <td>
                                <button onClick={() => deleteLink(link._id)}>Delete</button>
                            </td>
                        </tr>
                    );
                })
            }
            </tbody>
        </table>
    )
}