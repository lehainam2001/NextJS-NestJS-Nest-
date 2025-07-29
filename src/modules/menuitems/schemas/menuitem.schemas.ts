import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MenuitemsDocument = HydratedDocument<Menuitems>;

@Schema({ timestamps: true })
export class Menuitems {
    @Prop()
    id: number;

    @Prop()
    menu_id: number;

    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop()
    base_price: number;

    @Prop()
    image: string;
}

export const MenuitemsSchema = SchemaFactory.createForClass(Menuitems);