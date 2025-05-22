type Reaction = {
    likes: number;
    dislikes: number
}

type Post = {
    id: number;
    title: string;
    body: string;
    reactions: Reaction;
    views: number
}

type PostResponse = {
    posts: Post[]
}

type PostDetails = {
    id: number;
    title: string;
    body: string;
    tags: string[];
    reactions: Reaction;
    views: number;
    userId: number;
};

type CommentUser = {
    id: number;
    username: string;
};

type Comment = {
    id: number;
    body: string;
    postId: number;
    likes: number;
    user: CommentUser;
};

type CommentsResponse = {
    comments: Comment[];
    total: number;
    skip: number;
    limit: number;
};

export { Comment, CommentsResponse, Post, PostDetails, PostResponse, Reaction };

