import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStoreDto, CreateStoreResponseDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StoreService {

  constructor(private readonly prisma: PrismaService){}

  async create(createstoredto: CreateStoreDto) {
    await this.prisma.store.create({
      data:{...createstoredto}
    })
    const created = await this.prisma.store.findUnique({
      where: {email: createstoredto.email}
    })
    // console.log(created?.id,created?.store_name, created?.email)
    
    return {message:"Store successfully created", shopID: created?.id, shopName: created?.store_name, owner_email: created?.email}
  }

  async findAll() {
    return await this.prisma.store.findMany()
  }

  async findOne(id: string) {
    return await this.prisma.store.findUnique({
      where: {id: id}
    })
  }

  async update(id: string, updatestoredto: UpdateStoreDto) {
      
    await this.prisma.store.update({
      where:{id: id},
      data: {
        store_name: updatestoredto.store_name,
        email: updatestoredto.email,
        bussiness_owner_id: updatestoredto.bussiness_owner_id,
        hubs_list: updatestoredto.hubs_list,
        store_type: updatestoredto.store_type,
        phone_no: updatestoredto.phone_no,
        commission_type: updatestoredto.commission_type,
        commission_amount: updatestoredto.commission_amount,
        active_coupon: updatestoredto.active_coupon
      }
    })

    const updated = await this.prisma.store.findUnique({
      where: {id: id}
    })
    return {message: "Store data successfully updated", data: updated}
  }

  async remove(id: string) {
    const deleted = await this.prisma.store.findUnique({
      where: {id: id}
    })
    await this.prisma.store.delete({
      where: {id: id}
    })
    return {message: `${id} is deleted`, data: deleted}
  }

  async search(phone: string|undefined, restaurantname: string|undefined){
    if (phone === undefined && restaurantname === undefined){
      throw new BadRequestException(HttpStatus.BAD_REQUEST)
    }else if(phone !== undefined && restaurantname === undefined){
      return this.prisma.store.findMany({
        where: {phone_no: phone}
      })
    }else if (phone === undefined && restaurantname !== undefined){
      return this.prisma.store.findMany({
        where: {store_name: restaurantname}
      })
    }else{
      return this.prisma.store.findMany({
        where: {
          OR: [
            {phone_no: phone},
            {store_name: restaurantname}
          ]
        }
      })
    }

  }

  async filter(availability: boolean|undefined, hub: string[]|undefined){

    if( availability === undefined && hub === undefined){
      throw new BadRequestException(HttpStatus.BAD_REQUEST)
    }else if(availability !== undefined && hub === undefined){
      if (availability){
        return this.prisma.store.findMany({
          where: {resturant_status: "is_active"}
        })
      }else{
        return this.prisma.store.findMany({
          where: {resturant_status: {in: ['deal_closed', 'inactive', 'suspended']}}
        })
      }
    }else if ( availability === undefined && hub !== undefined){
      return this.prisma.store.findMany({
        where: {hubs_list: {hasSome: hub}}
      })
    }else{
      if(availability){
        return this.prisma.store.findMany({
          where: {
            OR: [
              {hubs_list: {hasSome: hub}},
              {resturant_status: "is_active"}
            ]
          }
        })
      }else{
        return this.prisma.store.findMany({
          where: {
            OR: [
              {hubs_list: {hasSome: hub}},
              {resturant_status: {in: ['deal_closed','inactive','suspended']}}
            ]
          }
        })
      }
    }

  }
}
