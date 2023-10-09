"use client";

import { IconPlus } from "@tabler/icons-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRef } from "react";
import { useAddPosts } from "./queries/use-add-post";
import { usePosts } from "./queries/use-posts";

export default function Page() {
    const queryClientRef = useRef(new QueryClient());

    return (
        <QueryClientProvider client={queryClientRef.current}>
            <main className="mx-auto flex min-h-screen max-w-sm flex-col items-center overflow-y-auto pb-8">
                <Posts />
            </main>
        </QueryClientProvider>
    );
}

function Posts() {
    const { posts, isLoading: isLoadingPosts } = usePosts({ userId: 1 });
    const { addPost, isLoading: isAddingPost } = useAddPosts();
    const isLoading = isLoadingPosts || isAddingPost;

    return (
        <div className="mt-6 flex flex-col gap-6">
            <h1 className="my-3 text-2xl font-semibold">Posts</h1>
            {isLoadingPosts && <p>carregando posts...</p>}
            {!isLoadingPosts &&
                posts?.length &&
                posts.map((p) => (
                    <article key={p.id}>
                        <h2 className="font-bold">{p.title}</h2>
                        <p className="mt-2 line-clamp-3">{p.body}</p>
                    </article>
                ))}
            <button
                className="mt-4 flex w-full items-center justify-center gap-2 border px-5 py-3 text-sm font-semibold"
                onClick={() => addPost()}
                disabled={isLoading}
            >
                <IconPlus />
                Adicionar
            </button>
        </div>
    );
}
