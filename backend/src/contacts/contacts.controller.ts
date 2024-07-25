import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  create(@Body() createContactDto: CreateContactDto) {
    return this.contactsService.create(createContactDto);
  }

  @Get()
  findAll() {
    return this.contactsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const contact = await this.contactsService.findOne(id);
    if (!contact)
      throw new NotFoundException(`Contact with ID ${id} not found`);
    return contact;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateContactDto: UpdateContactDto,
  ) {
    const contact = await this.contactsService.update(id, updateContactDto);
    if (!contact)
      throw new NotFoundException(`Contact with ID ${id} not found`);
    return contact;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const contact = await this.contactsService.remove(id);
    if (!contact)
      throw new NotFoundException(`Contact with ID ${id} not found`);
  }
}
