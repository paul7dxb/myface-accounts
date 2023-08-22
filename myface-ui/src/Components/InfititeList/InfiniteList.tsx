import React, { ReactNode, useContext, useEffect, useState } from "react";
import { ListResponse, deletePost } from "../../Api/apiClient";
import { Grid } from "../Grid/Grid";
import "./InfiniteList.scss";
import { LoginContext } from "../LoginManager/LoginManager";


interface Item {
    id: number
}

interface InfiniteListProps<T> {
    fetchItems: (page: number, pageSize: number) => Promise<ListResponse<T>>;
    renderItem: (item: T, handleDelete: (id:number) => void) => ReactNode;
}

export function InfiniteList<T extends Item>(props: InfiniteListProps<T>): JSX.Element {
    const [items, setItems] = useState<T[]>([]);
    const [page, setPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(false);
    const loginContext = useContext(LoginContext);

    const { isAdmin, userBase } = loginContext;

    function replaceItems(response: ListResponse<T>) {
        setItems(response.items);
        setPage(response.page);
        setHasNextPage(response.nextPage !== null);
    }

    function fetchAndReplaceItems() {
        props.fetchItems(1, 10)
            .then(replaceItems);
    }


    function appendItems(response: ListResponse<T>) {
        setItems(items.concat(response.items));
        setPage(response.page);
        setHasNextPage(response.nextPage !== null);
    }

    useEffect(() => {
        fetchAndReplaceItems();
    }, [props]);

    function incrementPage() {
        props.fetchItems(page + 1, 10)
            .then(appendItems);
    }

    return (
        <div className="infinite-list">
            <Grid>
                {items.map((item) => props.renderItem(item, ()=> {
                    deletePost(userBase, item.id)
                    .then(fetchAndReplaceItems);
                    
                }))}
            </Grid>
            {hasNextPage && <button className="load-more" onClick={incrementPage}>Load More</button>}
        </div>
    );
}