import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from 'src/modules/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { LikesModule } from 'src/modules/likes/likes.module';
import { MenuitemoptionsModule } from 'src/modules/menuitemoptions/menuitemoptions.module';
import { MenuitemsModule } from 'src/modules/menuitems/menuitems.module';
import { MenusModule } from 'src/modules/menus/menus.module';
import { OrdersModule } from 'src/modules/orders/orders.module';
import { OrderdetailModule } from 'src/modules/orderdetail/orderdetail.module';
import { RestaurantsModule } from 'src/modules/restaurants/restaurants.module';
import { ReviewsModule } from 'src/modules/reviews/reviews.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from 'src/auth/passport/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    UsersModule,
    LikesModule,
    MenuitemoptionsModule,
    MenuitemsModule,
    MenusModule,
    OrdersModule,
    OrderdetailModule,
    RestaurantsModule,
    ReviewsModule,
    ConfigModule.forRoot(
      { isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  },],
})
export class AppModule { }
