import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  IsInt,
} from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUUID()
  @IsOptional()
  artistId: string | null;

  @IsUUID()
  @IsOptional()
  albumId: string | null;

  @IsInt()
  @IsNotEmpty()
  duration: number;
}
