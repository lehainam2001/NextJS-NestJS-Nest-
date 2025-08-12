import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from 'src/modules/users/schemas/user.schemas';
import { hasPasswordHelper } from 'src/helpers/util';
import mongoose from 'mongoose';
import aqp from 'api-query-params';
import { ChangePasswordAuthDto, CodeAuthDto, CreateAuthDto } from 'src/auth/dto/create-auth.dto';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { MailerService } from '@nestjs-modules/mailer';
import { Exception } from 'handlebars';
import passport from 'passport';

//extend activate plugin
dayjs.extend(utc);
dayjs.extend(timezone);

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name)
    private userModule: Model<Users>,

    private readonly mailerService: MailerService,
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
    return {
      meta: {
        current: current,
        pageSize: pageSize,
        pages: totalPages,
        total: totalItem
      },
      results
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async findByEmail(email: string) {
    return await this.userModule.findOne({ email })
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

  async handleRegister(registerDto: CreateAuthDto) {
    const { name, email, password } = registerDto;

    //check email
    const isExist = await this.isEmailExist(email);
    if (isExist) {
      throw new BadRequestException(`Email đã tồn tại: ${email}. vui lòng đổi lại email khác`);
    }

    // has password
    const hashPassword = await hasPasswordHelper(password);
    const codeId = uuidv4();
    const user = await this.userModule.create({
      name, email, password: hashPassword,
      isActive: false,
      codeId: codeId,
      codeExpired: dayjs().add(5, 'minutes') // Expiry time
    })

    // send email
    this.mailerService.sendMail({
      to: user.email, // list of receivers
      subject: 'Active your account ai NamLH', // Subject line
      template: "register",
      context: {
        name: user?.name ?? user.email,
        activationCode: user.codeId
      }
    })

    // give feedback
    return {
      _id: user._id
    }
  }

  async handleActive(data: CodeAuthDto) {
    const user = await this.userModule.findOne({
      _id: data._id,
      codeId: data.code
    })
    if (!user) {
      throw new BadRequestException("Mã code không hợp lệ hoặc đã quá thời gian");
    }
    const isBeforeCheck = dayjs().isBefore(user.codeExpired);
    // update user
    if (isBeforeCheck) {
      await this.userModule.updateOne({ _id: data._id }, {
        isActive: true
      })
    } else {
      throw new BadRequestException("Mã code không hợp lệ hoặc đã quá thời gian")
    }
    return data;
  }

  async retryActive(email: string) {
    const user = await this.userModule.findOne({ email });

    if (!user) {
      throw new BadRequestException("Tài khoản không tồn lại")
    }

    if (user.isActive) {
      throw new BadRequestException("Tài khoản đã được kích hoạt")
    }

    //update user
    const codeId = uuidv4();
    await user.updateOne({
      codeId: codeId,
      codeExpired: dayjs().add(5, 'minutes') // Expiry time
    })

    //send email
    this.mailerService.sendMail({
      to: user.email, // list of receivers
      subject: 'Active your account ai NamLH', // Subject line
      template: "register",
      context: {
        name: user?.name ?? user.email,
        activationCode: codeId
      }
    })

    return { _id: user._id }
  }

  async retryPassword(email: string) {
    const user = await this.userModule.findOne({ email });

    if (!user) {
      throw new BadRequestException("Tài khoản không tồn lại")
    }

    //update user
    const codeId = uuidv4();

    await user.updateOne({
      codeId: codeId,
      codeExpired: dayjs().add(5, 'minutes') // Expiry time
    })

    //send email
    this.mailerService.sendMail({
      to: user.email, // list of receivers
      subject: 'Change your password account at NamLH', // Subject line
      template: "register",
      context: {
        name: user?.name ?? user.email,
        activationCode: codeId
      }
    })

    return { _id: user._id, email: user.email }
  }

  async changePassword(data: ChangePasswordAuthDto) {
    if (data.comfirmPassword !== data.password) {
      throw new BadRequestException("Mật khẩu/xác nhận mật khẩu không chính xác!")
    }

    const user = await this.userModule.findOne({ email: data.email });

    if (!user) {
      throw new BadRequestException("Tài khoản không tồn lại")
    }

    const isBeforeCheck = dayjs().isBefore(user.codeExpired);
    // update password
    if (isBeforeCheck) {
      const newPassword = await hasPasswordHelper(data?.password);
      await user.updateOne();
      await this.userModule.updateOne({ password: newPassword }, {
        isActive: true
      })
      return { isBeforeCheck }
    } else {
      throw new BadRequestException("Mã code không hợp lệ hoặc đã quá thời gian")
    }
  }
}