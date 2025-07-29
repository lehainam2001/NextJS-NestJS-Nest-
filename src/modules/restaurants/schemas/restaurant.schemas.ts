import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RestaurantsDocument = HydratedDocument<Restaurants>;

@Schema({ timestamps: true })
export class Restaurants {
    @Prop()
    id: number;

    @Prop()
    name: string;

    @Prop()
    email: string;

    @Prop()
    phone: number;

    @Prop()
    address: string;

    @Prop()
    rating: number;
}

export const RestaurantsSchema = SchemaFactory.createForClass(Restaurants);