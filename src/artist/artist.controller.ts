import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/createArtist.dto';
import { UpdateArtistDto } from './dto/updateArtist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get()
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':uuid')
  findOne(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.artistService.findOne(uuid);
  }

  @Post()
  create(@Body() createArtist: CreateArtistDto) {
    return this.artistService.create(createArtist);
  }

  @Put(':uuid')
  update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() updateArtist: UpdateArtistDto,
  ) {
    return this.artistService.update(uuid, updateArtist);
  }

  @Delete(':uuid')
  @HttpCode(204)
  remove(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.artistService.delete(uuid);
  }
}
