import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LikeDocument = HydratedDocument<Like>;

@Schema({ timestamps: true })
export class Like {
    @Prop()
    id: number;

    @Prop()
    restaurantId: number;
}

export const LikeSchema = SchemaFactory.createForClass(Like);