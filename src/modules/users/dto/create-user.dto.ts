import { IsEmail, IsNotEmpty, IsPhoneNumber } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({ message: "Tài khoản không được để trống" })
    name: string;

    @IsEmail({}, { message: "Email không được để trống" })
    email: string;

    @IsNotEmpty({ message: "Mật khẩu không được để trống" })
    password: string

    phone: number;
    address: string;
    image: string;
}
