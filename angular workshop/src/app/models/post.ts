import { Theme } from "./theme";
import { User } from "./user";

export class Post {
    constructor(
        public created_at: Date,
        public likes: number[],
        public text: string,
        public themeId: string,
        public update_at: Date,
        public userId: User,
        public _id: string
    ){
        this.likes = [];
    }
}