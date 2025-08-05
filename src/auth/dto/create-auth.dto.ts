import { IsNotEmpty } from "class-validator";

export class CreateAuthDto {
    @IsNotEmpty({ message: "usernam không được để trống" })
    username: string;

    @IsNotEmpty({ message: "password không được để trống" })
    password: string;
}
