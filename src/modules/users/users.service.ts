import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from 'src/modules/users/schemas/user.schemas';
import { hasPasswordHelper } from 'src/helpers/util';
import mongoose from 'mongoose';
import aqp from 'api-query-params';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private userModule: Model<Users>
  ) { }

  isEmailExist = async (email: string) => {
    const user = await this.userModule.exists({ email });
    if (user) {
      return true;
    } else {
      return false;
    }
  }

  async create(createUserDto: CreateUserDto) {
    const { name, email, password, phone, address, image } = createUserDto;

    //check email
    const isExist = await this.isEmailExist(email);
    if (isExist) {
      throw new BadRequestException(`Email đã tồn tại: ${email}. vui lòng đổi lại email khác`);
    }

    // has password
    const hashPassword = await hasPasswordHelper(createUserDto.password);
    const user = await this.userModule.create({
      name, email, password: hashPassword, phone, address, image
    })
    return {
      _id: user._id
    }
  }

  async findAll(query?: string, current?: number, pageSize?: number) {
    const { filter, sort } = aqp(query);
    if (filter.current) delete filter.current;
    if (filter.pageSize) delete filter.pageSize;

    //Assign default
    if (!current) current = 1;
    if (!pageSize) current = 10;

    const totalItem = (await this.userModule.find(filter)).length;
    const totalPages = Math.ceil(totalItem / pageSize);
    const skip = (current - 1) * (pageSize);

    const results = await this.userModule
      .find(filter)
      .limit(pageSize)
      .skip(skip)
      .select("-password") // Remove password
      .sort(sort as any)
    return { results, totalPages };
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(updateUserDto: UpdateUserDto) {
    return await this.userModule.updateOne({ _id: updateUserDto._id }, { ...updateUserDto })
  }

  async remove(_id: string) {
    // check id
    if (mongoose.isValidObjectId(_id)) {
      // delete
      return this.userModule.deleteOne({ _id })
    } else {
      throw new BadRequestException("Id không đúng định dạng")
    }
  }
}
