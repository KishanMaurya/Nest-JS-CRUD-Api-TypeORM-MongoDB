import {
    IsString,
    IsDateString,
    IsNotEmpty,
} from 'class-validator';
export class CreatePetDto {
    @IsString()
    @IsNotEmpty({ message: 'Name is required.' })
    "name": string;

    @IsNotEmpty({ message: 'AnimalType is required.' })
    "animalType": string;

    @IsNotEmpty({ message: 'pictureUrl is required.' })
    "pictureUrl": string;

    @IsNotEmpty()
    @IsDateString()
    birthDate: Date;
}
