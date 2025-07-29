import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MenuitemoptionsService } from './menuitemoptions.service';
import { CreateMenuitemoptionDto } from './dto/create-menuitemoption.dto';
import { UpdateMenuitemoptionDto } from './dto/update-menuitemoption.dto';

@Controller('menuitemoptions')
export class MenuitemoptionsController {
  constructor(private readonly menuitemoptionsService: MenuitemoptionsService) {}

  @Post()
  create(@Body() createMenuitemoptionDto: CreateMenuitemoptionDto) {
    return this.menuitemoptionsService.create(createMenuitemoptionDto);
  }

  @Get()
  findAll() {
    return this.menuitemoptionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuitemoptionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMenuitemoptionDto: UpdateMenuitemoptionDto) {
    return this.menuitemoptionsService.update(+id, updateMenuitemoptionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuitemoptionsService.remove(+id);
  }
}
