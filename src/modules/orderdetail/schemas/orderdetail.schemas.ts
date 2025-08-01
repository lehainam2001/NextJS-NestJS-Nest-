import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OrderDetailDocument = HydratedDocument<OrderDetail>;

@Schema({ timestamps: true })
export class OrderDetail {
    @Prop()
    id: number;

    @Prop()
    orderId: number;

    @Prop()
    menuId: number;

    @Prop()
    menuItemId: number;

    @Prop()
    menuItemOptionId: number;
}

export const OrderDetailSchema = SchemaFactory.createForClass(OrderDetail);