import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { Group } from 'src/groups/entities/group.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private contactsRepository: Repository<Contact>,
    @InjectRepository(Group)
    private groupsRepository: Repository<Group>,
  ) {}

  async create(dto: CreateContactDto) {
    const { name, phoneNumber, groupId } = dto;

    const group = await this.groupsRepository.findOne({
      where: { id: groupId },
    });
    if (!group) {
      throw new NotFoundException(`Group with ID ${groupId} not found`);
    }

    const contact = this.contactsRepository.create({
      name,
      phoneNumber,
      group,
    });
    return this.contactsRepository.save(contact);
  }

  findAll() {
    return this.contactsRepository.find({ relations: ['group'] });
  }

  async findOne(id: string) {
    const contact = await this.contactsRepository.findOne({
      where: { id },
      relations: ['group'],
    });
    if (!contact) {
      throw new NotFoundException(`Contact with ID ${id} not found`);
    }
    return contact;
  }

  async update(id: string, dto: UpdateContactDto) {
    const contact = await this.contactsRepository.findOne({
      where: { id },
      relations: ['group'],
    });
    if (!contact) {
      throw new NotFoundException(`Contact with ID ${id} not found`);
    }
    this.contactsRepository.merge(contact, dto);
    return this.contactsRepository.save(contact);
  }

  async remove(id: string) {
    const contact = await this.contactsRepository.findOneBy({ id });
    if (!contact) {
      throw new NotFoundException(`Contact with ID ${id} not found`);
    }
    return this.contactsRepository.remove(contact);
  }
}
