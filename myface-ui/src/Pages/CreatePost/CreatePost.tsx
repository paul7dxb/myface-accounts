﻿import React, {FormEvent, useContext, useState} from "react";
import {Page} from "../Page/Page";
import {createPost} from "../../Api/apiClient";
import {Link} from "react-router-dom";
import { LoginContext } from "../../Components/LoginManager/LoginManager";
import "./CreatePost.scss";

type FormStatus = "READY" | "SUBMITTING" | "ERROR" | "FINISHED"

export function CreatePostForm(): JSX.Element {
    const [message, setMessage] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [status, setStatus] = useState<FormStatus>("READY");
    const loginContext = useContext(LoginContext);


    function submitForm(event: FormEvent) {
        event.preventDefault();
        setStatus("SUBMITTING");
        createPost({message, imageUrl}, loginContext.userBase )
            .then(() => setStatus("FINISHED"))
            .catch(() => setStatus("ERROR"));
    }
    
    if (status === "FINISHED") {
        return <div>
            <p>Form Submitted Successfully!</p>
            <Link to="/">Return to your feed?</Link>
        </div>
    }

    return (
        <form className="create-post-form" onSubmit={submitForm}>
            <label className="form-label">
                Message
                <input className="form-input" value={message} onChange={event => setMessage(event.target.value)}/>
            </label>

            <label className="form-label">
                Image URL
                <input className="form-input" value={imageUrl} onChange={event => setImageUrl(event.target.value)}/>
            </label>

            <button className="submit-button" disabled={status === "SUBMITTING"} type="submit">Create Post</button>
            {status === "ERROR" && <p>Something went wrong! Please try again.</p>}
        </form>
    );
}

export function CreatePost(): JSX.Element {
    return (
        <Page containerClassName="create-post-page">
            <h1 className="title">Create Post</h1>
            <CreatePostForm/>
        </Page>
    );
}