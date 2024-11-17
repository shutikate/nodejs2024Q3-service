import {
  Controller,
  Get,
  Post,
  Param,
  ParseUUIDPipe,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post('track/:uuid')
  addTrack(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.favoritesService.addTrack(uuid);
  }

  @Delete('track/:uuid')
  @HttpCode(204)
  removeTrack(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.favoritesService.removeTrackIfExist(uuid);
  }

  @Post('album/:uuid')
  addAlbum(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.favoritesService.addAlbum(uuid);
  }

  @Delete('album/:uuid')
  @HttpCode(204)
  removeAlbum(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.favoritesService.removeAlbumIfExist(uuid);
  }

  @Post('artist/:uuid')
  addArtist(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.favoritesService.addArtist(uuid);
  }

  @Delete('artist/:uuid')
  @HttpCode(204)
  removeArtist(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.favoritesService.removeArtistIfExist(uuid);
  }
}
