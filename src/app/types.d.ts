declare type Session = {
    token: string;
    user: User;
};

declare type User = {
    id: number;
    name: string;
};

declare type Post = {
    userId: number;
    id: number;
    title: string;
    body: string;
};
