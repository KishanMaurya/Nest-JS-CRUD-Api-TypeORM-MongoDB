import { Injectable, HttpStatus, BadRequestException } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { MongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';
import { InjectRepository } from '@nestjs/typeorm';
import { Pet } from './entities/pet.entity';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet)
    private readonly petsRepository: MongoRepository<Pet>,
  ) {}

  async create(createPetDto: CreatePetDto) {
    const  { name, animalType, pictureUrl, birthDate } = createPetDto;
    let createPetObj = {
      name : name,
      animalType : animalType,
      pictureUrl : pictureUrl,
      birthDate : birthDate
    }
    const petsDetails = await this.petsRepository.save(createPetObj);
    return {
      msg : "Data Added successfully",
      status:HttpStatus.OK,
      data:petsDetails
    };
  }

  async findAll() {
    return await this.petsRepository.find();
  }

  async findOne(id: any) {
    console.log(id)
    const result : any = await this.petsRepository.findOne(id);
    console.log(result);
    if(!result) throw new BadRequestException({ error : "Data Not Found" });
    return {
      status  : HttpStatus.OK,
      messsage : "Data fetch successfully",
      totalData : result && result.length ? result.length :  0,
      result : result
    }
  }

  async update(id: any, updatePetDto: CreatePetDto) {
    const result : any = await this.petsRepository.findOneAndUpdate({_id: new ObjectID(id) }, updatePetDto);
    return {
      status  : HttpStatus.OK,
      messsage : "Data updated successfully",
      totalData : result && result.length ? result.length :  0,
      result : result
    }
  }

  async remove(id: any) {
    const result : any = await this.petsRepository.findOneAndDelete({_id: new ObjectID(id)});
    return {
      status  : HttpStatus.OK,
      messsage : "Data deleted successfully",
      totalData : result && result.length ? result.length :  0,
      result : result
    }
  }
}
