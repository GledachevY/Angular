import { Post } from "./post";
import { Theme } from "./theme";

export class User{
    
    public crated_at: Date;
    public _id: string;
    public posts: Post[];
    public themes: Theme[];

    constructor(
        public username: string,
        public email: string,
        public password: string,
        public tel?: string
    ){
        this.crated_at = new Date();
    }
}