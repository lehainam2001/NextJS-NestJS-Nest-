import { Module } from '@nestjs/common';
import { MenuitemoptionsService } from './menuitemoptions.service';
import { MenuitemoptionsController } from './menuitemoptions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Menuitemoptions, MenuitemoptionsSchema } from 'src/modules/menuitemoptions/schemas/menuitemoption.schemas';

@Module({
  imports: [MongooseModule.forFeature([{ name: Menuitemoptions.name, schema: MenuitemoptionsSchema }])],
  controllers: [MenuitemoptionsController],
  providers: [MenuitemoptionsService],
})
export class MenuitemoptionsModule { }
