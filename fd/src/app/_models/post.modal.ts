
export interface User_post {
    id: number;
    avatar: string;
    original_avatar_image: string;
    first_name: string;
    last_name: string;
    middle_name: string;
}

export interface CommentList {
    id: number;
    created_date: Date;
    user: User_post;
    content: string;
    status: string;
}

export class Post {
    id: number;
    created_date: Date;
    user: User_post;
    status: string;
    content: string;
    title: string;
    is_reported: boolean;
    is_author: boolean;
    comment_list: CommentList[];
    tribute_id: number;
}