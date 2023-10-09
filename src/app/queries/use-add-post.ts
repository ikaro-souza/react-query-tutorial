import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getPostsQueryKey } from "./use-posts";

const addPostMutationKey = ["add-post"];

export function useAddPosts() {
    const queryClient = useQueryClient();

    const { mutate, isLoading } = useMutation({
        mutationKey: addPostMutationKey,
        mutationFn: addPost,
        onSuccess: () => {
            queryClient.invalidateQueries(getPostsQueryKey);
        },
    });

    return {
        addPost: mutate,
        isLoading,
    };
}

async function addPost() {
    const id = Math.round(Math.random() * 49) + 50;
    const randomPostResponse = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
    );
    const randomPost: Post = await randomPostResponse.json();
    randomPost.userId = 1;

    const addPostResponse = await fetch("http://localhost:3001/posts", {
        method: "POST",
        body: JSON.stringify(randomPost),
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!addPostResponse.ok) {
        throw new Error("Error adding post");
    }
}
