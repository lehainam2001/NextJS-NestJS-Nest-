import { Module } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsController } from './restaurants.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Restaurants, RestaurantsSchema } from 'src/modules/restaurants/schemas/restaurant.schemas';

@Module({
  imports: [MongooseModule.forFeature([{ name: Restaurants.name, schema: RestaurantsSchema }])],
  controllers: [RestaurantsController],
  providers: [RestaurantsService],
})
export class RestaurantsModule { }
