import { User } from 'src/users/entities/user.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

const { nanoid } = require('nanoid');

@Entity('groups')
export class Group {
  @PrimaryColumn()
  id: String;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.groups)
  user: User;

  @BeforeInsert()
  generateId() {
    this.id = `group_${nanoid()}`;
  }
}
