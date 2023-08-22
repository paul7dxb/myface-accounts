import React from 'react';
import { Page } from "../Page/Page";
import { fetchPosts } from "../../Api/apiClient";
import { PostCard } from "../../Components/PostCard/PostCard";
import { InfiniteList } from "../../Components/InfititeList/InfiniteList";
import { Link } from "react-router-dom";
import './Feed.scss';

export function Feed(): JSX.Element {

    return (
        <Page containerClassName={"feed"}>
            <h1 className="title">Feed</h1>
            <InfiniteList fetchItems={fetchPosts} renderItem={(post, handleDelete) => <PostCard key={post.id} post={post} handleDelete={handleDelete}/>} />
            <Link className="create-post" to="/new-post">+</Link>
        </Page>
    );
}