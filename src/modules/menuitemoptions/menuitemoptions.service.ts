import { Injectable } from '@nestjs/common';
import { CreateMenuitemoptionDto } from './dto/create-menuitemoption.dto';
import { UpdateMenuitemoptionDto } from './dto/update-menuitemoption.dto';

@Injectable()
export class MenuitemoptionsService {
  create(createMenuitemoptionDto: CreateMenuitemoptionDto) {
    return 'This action adds a new menuitemoption';
  }

  findAll() {
    return `This action returns all menuitemoptions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} menuitemoption`;
  }

  update(id: number, updateMenuitemoptionDto: UpdateMenuitemoptionDto) {
    return `This action updates a #${id} menuitemoption`;
  }

  remove(id: number) {
    return `This action removes a #${id} menuitemoption`;
  }
}
