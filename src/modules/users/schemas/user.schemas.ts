import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UsersDocument = HydratedDocument<Users>;

@Schema({ timestamps: true })
export class Users {
    @Prop()
    id: string;

    @Prop()
    name: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop()
    phone: number;

    @Prop()
    address: string;

    @Prop()
    image: string;

    @Prop({ default: "LOCAL" })
    accountType: string;

    @Prop({ default: "USERS" })
    role: string;

    @Prop({ default: false })
    isActive: boolean;

    @Prop()
    codeId: string;

    @Prop()
    codeExpired: number;

    @Prop()
    restaurantId: number;
}

export const UsersSchema = SchemaFactory.createForClass(Users);