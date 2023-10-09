import { useQuery } from "@tanstack/react-query";

export const getPostsQueryKey = ["get-posts"];

export function usePosts(input: { userId: number }) {
    const { data: posts, isLoading } = useQuery({
        queryKey: getPostsQueryKey,
        queryFn: () => getPosts(input.userId),
        onSuccess: (data) => {
            console.log(`Foram carregados ${data.length} posts`);
        },
        onError: (error) => {
            console.log("Ocorreu um erro ao carregar os posts");
        },
    });

    return { posts, isLoading };
}

async function getPosts(userId: number) {
    const response = await fetch(
        `http://localhost:3001/posts?userId=${userId}`,
    );
    const data: Post[] = await response.json();

    return data;
}
