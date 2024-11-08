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
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/createAlbum.dto';
import { UpdateAlbumDto } from './dto/updateAlbum.dto';

@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Get()
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':uuid')
  findOne(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.albumService.findOne(uuid);
  }

  @Post()
  create(@Body() createAlbum: CreateAlbumDto) {
    return this.albumService.create(createAlbum);
  }

  @Put(':uuid')
  update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() updateAlbum: UpdateAlbumDto,
  ) {
    return this.albumService.update(uuid, updateAlbum);
  }

  @Delete(':uuid')
  @HttpCode(204)
  remove(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.albumService.delete(uuid);
  }
}
