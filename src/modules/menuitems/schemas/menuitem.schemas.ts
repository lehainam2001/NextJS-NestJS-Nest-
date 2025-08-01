import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MenuitemsDocument = HydratedDocument<Menuitems>;

@Schema({ timestamps: true })
export class Menuitems {
    @Prop()
    id: number;

    @Prop()
    menuId: number;

    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop()
    basePrice: number;

    @Prop()
    image: string;
}

export const MenuitemsSchema = SchemaFactory.createForClass(Menuitems);