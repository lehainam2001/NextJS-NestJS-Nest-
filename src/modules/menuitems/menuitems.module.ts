import { Module } from '@nestjs/common';
import { MenuitemsService } from './menuitems.service';
import { MenuitemsController } from './menuitems.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Menuitems, MenuitemsSchema } from 'src/modules/menuitems/schemas/menuitem.schemas';

@Module({
  imports: [MongooseModule.forFeature([{ name: Menuitems.name, schema: MenuitemsSchema }])],
  controllers: [MenuitemsController],
  providers: [MenuitemsService],
})
export class MenuitemsModule { }
