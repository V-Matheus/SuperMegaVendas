import { Group } from 'src/groups/entities/group.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

const { nanoid } = require('nanoid');

@Entity('users')
export class User {
  @PrimaryColumn()
  id: String;

  @Column({unique: true})
  email: String;

  @Column()
  password: String;

  @BeforeInsert()
  generateId() {
    this.id = `user_${nanoid()}`;
  }

  @OneToMany(() => Group, (group) => group.user)
  groups: Group[];
}
