import { Task } from './../tasks/task.entity';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcrypt from 'bcrypt'
@Entity()
@Unique(['email'])
export class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  isVerified: boolean;

  @Column()
  salt: string;

  @OneToMany(type => Task, task => task.user, { eager: true})
  tasks: Task[];
  
  async validatePassword(password: string): Promise<boolean>{
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}