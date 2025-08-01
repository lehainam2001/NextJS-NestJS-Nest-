import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MenusDocument = HydratedDocument<Menus>;

@Schema({ timestamps: true })
export class Menus {
    @Prop()
    id: number;

    @Prop()
    restaurantId: number;

    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop()
    image: string;
}

export const MenusSchema = SchemaFactory.createForClass(Menus);