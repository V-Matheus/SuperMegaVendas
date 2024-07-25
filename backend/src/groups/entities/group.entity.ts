import { Contact } from 'src/contacts/entities/contact.entity';
import { User } from 'src/users/entities/user.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

const { nanoid } = require('nanoid');

@Entity('groups')
export class Group {
  @PrimaryColumn()
  id: String;

  @Column()
  name: String;

  @OneToMany(() => Contact, (contact) => contact.group)
  contacts: Contact[];

  @ManyToOne(() => User, (user) => user.groups)
  user: User;

  @BeforeInsert()
  generateId() {
    this.id = `group_${nanoid()}`;
  }
}
