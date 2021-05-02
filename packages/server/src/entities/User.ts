import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn
} from "typeorm";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({
    type: "varchar",
    length: 30,
    nullable: false,
    name: "full_name"
  })
  fullName: string;

  @Column({
    type: "varchar",
    length: 50,
    unique: true,
    nullable: false
  })
  email: string;

  @Column({
    nullable: false,
    select: false
  })
  password: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @CreateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
