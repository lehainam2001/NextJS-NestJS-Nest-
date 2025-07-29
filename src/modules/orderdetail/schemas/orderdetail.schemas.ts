import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OrderDetailDocument = HydratedDocument<OrderDetail>;

@Schema({ timestamps: true })
export class OrderDetail {
    @Prop()
    id: number;

    @Prop()
    order_id: number;

    @Prop()
    menu_id: number;

    @Prop()
    menu_item_id: number;

    @Prop()
    menu_item_option_id: number;
}

export const OrderDetailSchema = SchemaFactory.createForClass(OrderDetail);