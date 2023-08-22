import React, { useContext, useEffect } from "react";
import { Post } from "../../Api/apiClient";
import { Card } from "../Card/Card";
import "./PostCard.scss";
import { Link, Redirect } from "react-router-dom";
import { LoginContext } from "../LoginManager/LoginManager";
import { deletePost } from '../../Api/apiClient';


interface PostCardProps {
    post: Post;
    handleDelete: (id:number) => void;
}

export function PostCard(props: PostCardProps): JSX.Element {
    const loginContext = useContext(LoginContext);

    const { isAdmin, userBase } = loginContext;

    return (
        <Card>
            <div className="post-card">
                <img className="image" src={props.post.imageUrl} alt="" />
                <div className="message">{props.post.message}</div>
                {
                    isAdmin &&
                    <div className="post-card-admin">
                        <button onClick={() => props.handleDelete(props.post.id)}>Delete Post</button>
                    </div>
                }
                <div className="user">
                    <img className="profile-image" src={props.post.postedBy.profileImageUrl} alt="" />
                    <Link className="user-name" to={`/users/${props.post.postedBy.id}`}>{props.post.postedBy.displayName}</Link>
                </div>

            </div>

        </Card >
    );
}