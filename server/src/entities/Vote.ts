import BaseEntity from './Entity';
import { Column, ManyToOne, JoinColumn, Entity } from 'typeorm';
import { User } from './User';
import Post from './Post';
import Comment from './Comment';

@Entity('votes')
export default class Vote extends BaseEntity {

    @Column()
    value: number;

    @Column()
    username: string;

    @Column({ nullable: true })
    postId: number;

    @Column({ nullable: true })
    commentId: number;

    //FK
    @ManyToOne(() => User)
    @JoinColumn({ name: "username", referencedColumnName: "username" })
    user: User;

    //lookup
    @ManyToOne(() => Post)
    post: Post;

    //lookup
    @ManyToOne(() => Comment)
    comment: Comment;
}