import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OrdersDocument = HydratedDocument<Orders>;

@Schema({ timestamps: true })
export class Orders {
    @Prop()
    id: number;

    @Prop()
    userId: number;

    @Prop()
    restaurantId: number;

    @Prop()
    totalPrice: number;

    @Prop()
    status: number;

    @Prop()
    orderTime: string;

    @Prop()
    deliveryTime: string;
}

export const OrdersSchema = SchemaFactory.createForClass(Orders);