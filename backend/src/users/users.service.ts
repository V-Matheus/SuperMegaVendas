import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupsService } from 'src/groups/groups.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private groupsService: GroupsService,
  ) {}

  async create(dto: CreateUserDto) {
    const { email } = dto;

    const existingUser = await this.usersRepository.findOneBy({ email });
    if (existingUser) {
      throw new ConflictException(`User with email ${email} already exists`);
    }

    const user = this.usersRepository.create(dto);
    return this.usersRepository.save(user);
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: string) {
    return this.usersRepository.findOneBy({ id });
  }

  async findOneWithGroups(id: string): Promise<User | null> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['groups'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const groupsWithContacts = await this.groupsService.findAll();

    user.groups = groupsWithContacts.filter((group) => group.user.id === id);

    return user;
  }

  async update(id: string, dto: UpdateUserDto) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) return null;
    this.usersRepository.merge(user, dto);
    return this.usersRepository.save(user);
  }

  async remove(id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) return null;
    return this.usersRepository.remove(user);
  }
}
