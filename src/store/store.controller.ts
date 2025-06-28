import { Controller, Get, Post, Body, Patch, Param, Delete, Query,  ParseArrayPipe} from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDto, CreateStoreResponseDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { ApiBadRequestResponse, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { OptionalParseBoolPipe } from './pipe/optionalparseboolpipe.pipe';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @ApiOperation({summary: "Used to create a new store"})
  @ApiBadRequestResponse({description: "invalid input"})
  @ApiResponse({status: 201, description: "Store Created", type: CreateStoreResponseDto})
  @Post()
  create(@Body() createstoredto: CreateStoreDto) {
    return this.storeService.create(createstoredto);
  }

  @ApiOperation({summary: "Used to get all store data"})
  @ApiQuery({name: "phone", required: false, type: String})
  @ApiQuery({name: "restaurantname", required: false, type: String})
  @ApiQuery({name: "availability", required: false, type: Boolean})
  @ApiQuery({name: "hub", required: false, type: Array})
  @ApiResponse({status: 200, description: "Get all store data", type: CreateStoreDto})
  @Get()
  findAll(
    @Query('phone') phone?: string|undefined,
    @Query('restaurantname') restaurantname?:string|undefined,
    @Query('availability', OptionalParseBoolPipe) availability?: boolean|undefined,
    @Query('hub') hub?:string[]|undefined
  ){
    console.log(phone, restaurantname, availability, hub)
    if(phone!==undefined && restaurantname!==undefined){
      return this.storeService.search(phone, restaurantname)
    }else if(availability!==undefined && hub!==undefined){
      return this.storeService.filter(availability, hub)
    }else if(phone===undefined && restaurantname===undefined && availability===undefined && hub===undefined){
      return this.storeService.findAll()
    }
  }

  @ApiOperation({summary: "Used to get specific store data"})
  @ApiResponse({status: 200, description: "Get specific store data", type: CreateStoreDto})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storeService.findOne(id);
  }

  @ApiOperation({summary: "Used to update store data"})
  @ApiResponse({status: 200, description: "Store data updated", type: CreateStoreDto})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatestoredto: UpdateStoreDto) {
    console.log(updatestoredto)
    return this.storeService.update(id, updatestoredto);
  }

  @ApiOperation({summary: "Used to delete store data"})
  @ApiResponse({status: 200, description: "Store data deleted", type: CreateStoreDto})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storeService.remove(id);
  }

}
