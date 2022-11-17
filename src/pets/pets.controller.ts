import { Controller, Get, Post, Body, Query, Res , Req } from '@nestjs/common';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { Request, Response } from 'express';

@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Post()
  async create(@Req() req:Request, @Res() res: Response, @Body() createPetDto: CreatePetDto) {
    let result:any  =  await this.petsService.create(createPetDto);
    return res.send(result);
  }

  @Get()
  async findAll(@Req() req:Request, @Res() res: Response) {
    let findAll: any =  await this.petsService.findAll();
    return res.send(findAll);
  }

  @Get('/getOnePet')
  async findOne(@Req() req:Request, @Res() res: Response, @Query('id') id: any) {
    let getOne : any = await this.petsService.findOne(id);
    return res.send(getOne);
  }

  @Post('/updateOnePets')
  async update(@Req() req:Request, @Res() res: Response, @Query('id') id: any, @Body() updatePetDto: CreatePetDto) {
    console.log(id, updatePetDto)
    let updateOne : any = await this.petsService.update({_id:id}, updatePetDto);
    return res.send(updateOne);
  }

  @Post('/deleteOnePets')
  async remove(@Req() req:Request, @Res() res: Response, @Query('id') id: any) {
    let deleteOne : any = await this.petsService.remove(id);
    return res.send(deleteOne);
  }
}
