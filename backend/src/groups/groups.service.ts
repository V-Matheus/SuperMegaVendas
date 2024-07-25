import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private groupsRepository: Repository<Group>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(dto: CreateGroupDto) {
    const { userId, name } = dto;

    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException(`User with ID ${userId} not found`);

    const group = this.groupsRepository.create({ name, user });
    return this.groupsRepository.save(group);
  }

  findAll() {
    return this.groupsRepository.find({ relations: ['user'] });
  }

  findOne(id: string) {
    return this.groupsRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async update(id: string, dto: UpdateGroupDto) {
    await this.groupsRepository.update(id, dto);
    const group = await this.groupsRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!group) {
      throw new NotFoundException(`Group with ID ${id} not found`);
    }
    this.groupsRepository.merge(group, dto);
    return this.groupsRepository.save(group);
  }

  async remove(id: string) {
    const group = await this.groupsRepository.findOneBy({ id });
    if (!group) {
      throw new NotFoundException(`Group with ID ${id} not found`);
    }
    return this.groupsRepository.remove(group);
  }
}
