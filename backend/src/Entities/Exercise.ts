import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

@Entity()
export class Exercise extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        length: 250,
    })
    name!: string;

    @Column()
    sets!: number;

    @Column()
    reps!: number;

    @Column()
    break_time!: number;

    @Column({
        length: 2000,
    })
    pose_landmark_model!: string;
}