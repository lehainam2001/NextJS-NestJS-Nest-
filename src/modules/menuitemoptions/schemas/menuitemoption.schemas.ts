import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MenuitemoptionsDocument = HydratedDocument<Menuitemoptions>;

@Schema({ timestamps: true })
export class Menuitemoptions {
    @Prop()
    id: number;

    @Prop()
    menuItemId: number;

    @Prop()
    title: string;

    @Prop()
    additionalPrice: number;

    @Prop()
    optionalDescription: string;
}

export const MenuitemoptionsSchema = SchemaFactory.createForClass(Menuitemoptions);