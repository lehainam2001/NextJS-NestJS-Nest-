import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OrdersDocument = HydratedDocument<Orders>;

@Schema({ timestamps: true })
export class Orders {
    @Prop()
    id: number;

    @Prop()
    user_id: number;

    @Prop()
    restaurant_id: number;

    @Prop()
    total_price: number;

    @Prop()
    status: number;

    @Prop()
    order_time: string;

    @Prop()
    delivery_time: string;
}

export const OrdersSchema = SchemaFactory.createForClass(Orders);