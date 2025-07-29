import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MenuitemoptionsDocument = HydratedDocument<Menuitemoptions>;

@Schema({ timestamps: true })
export class Menuitemoptions {
    @Prop()
    id: number;

    @Prop()
    menu_item_id: number;

    @Prop()
    title: string;

    @Prop()
    additional_price: number;

    @Prop()
    optional_description: string;
}

export const MenuitemoptionsSchema = SchemaFactory.createForClass(Menuitemoptions);