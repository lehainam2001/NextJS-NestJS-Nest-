import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ReviewsDocument = HydratedDocument<Reviews>;

@Schema({ timestamps: true })
export class Reviews {
    @Prop()
    id: number;

    @Prop()
    restaurant_id: number;

    @Prop()
    user_id: number;

    @Prop()
    rating: number;

    @Prop()
    comment: string;

    @Prop()
    image: string;

    @Prop()
    created_at: Date;
}

export const ReviewsSchema = SchemaFactory.createForClass(Reviews);