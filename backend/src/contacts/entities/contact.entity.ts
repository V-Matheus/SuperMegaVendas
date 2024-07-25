// src/contacts/entities/contact.entity.ts
import {
  Entity,
  Column,
  ManyToOne,
  PrimaryColumn,
  BeforeInsert,
} from 'typeorm';
import { Group } from '../../groups/entities/group.entity';

const { nanoid } = require('nanoid');

@Entity()
export class Contact {
  @PrimaryColumn()
  id: String;

  @Column()
  name: String;

  @Column()
  phoneNumber: String;

  @ManyToOne(() => Group, (group) => group.contacts)
  group: Group;

  @BeforeInsert()
  generateId() {
    this.id = `contact_${nanoid()}`;
  }
}
