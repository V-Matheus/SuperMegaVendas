import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { Group } from './entities/group.entity';
import { User } from 'src/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from 'src/contacts/entities/contact.entity';
import { ContactsModule } from 'src/contacts/contacts.module';

@Module({
  imports: [TypeOrmModule.forFeature([Group, User, Contact]), ContactsModule],
  controllers: [GroupsController],
  providers: [GroupsService],
  exports: [GroupsService]
})
export class GroupsModule {}
