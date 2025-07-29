import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UsersDocument = HydratedDocument<Users>;

@Schema({ timestamps: true })
export class Users {
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
    image: string;

    @Prop()
    account_type: number;

    @Prop()
    role: number;

    @Prop()
    is_active: boolean;

    @Prop()
    code_id: number;

    @Prop()
    code_expired: number;

    @Prop()
    restaurant_id: number;
}

export const UsersSchema = SchemaFactory.createForClass(Users);