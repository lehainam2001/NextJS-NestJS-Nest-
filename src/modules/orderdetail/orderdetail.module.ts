import { Module } from '@nestjs/common';
import { OrderdetailService } from './orderdetail.service';
import { OrderdetailController } from './orderdetail.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderDetail, OrderDetailSchema } from 'src/modules/orderdetail/schemas/orderdetail.schemas';

@Module({
  imports: [MongooseModule.forFeature([{ name: OrderDetail.name, schema: OrderDetailSchema }])],
  controllers: [OrderdetailController],
  providers: [OrderdetailService],
})
export class OrderdetailModule { }
