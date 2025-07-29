import { PartialType } from '@nestjs/mapped-types';
import { CreateMenuitemoptionDto } from './create-menuitemoption.dto';

export class UpdateMenuitemoptionDto extends PartialType(CreateMenuitemoptionDto) {}
