import { Post } from "./post";
import { User } from "./user";

export class Theme{
    constructor(
        public created_at: Date,
        public posts:Post [],
        public subscribers:string [],
        public updatedAt: Date,
        public themeName: string,
        public userId: User,
        public _id: string
    ){
        this.posts = [];
    }
}