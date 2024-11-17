import {
  Injectable,
  NotFoundException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { v4 } from 'uuid';
import { FavoritesService } from '../favorites/favorites.service';
import { TrackService } from '../track/track.service';
import { Album } from './types/types';
import { CreateAlbumDto } from './dto/createAlbum.dto';
import { UpdateAlbumDto } from './dto/updateAlbum.dto';

@Injectable()
export class AlbumService {
  constructor(
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
    @Inject(forwardRef(() => FavoritesService))
    private favoriteService: FavoritesService,
  ) {}

  private readonly albums: Map<string, Album> = new Map();

  findAll() {
    return Array.from(this.albums.values());
  }

  findOne(id: string) {
    const album = this.albums.get(id);

    if (!album) {
      throw new NotFoundException(`Album not found`);
    }
    return album;
  }

  getAlbumIfExist(id: string) {
    return this.albums.get(id);
  }

  create(createAlbum: CreateAlbumDto) {
    const id = v4();
    const newAlbum = { id, ...createAlbum };
    this.albums.set(id, newAlbum);
    return newAlbum;
  }

  update(id: string, updateAlbum: UpdateAlbumDto) {
    const currentAlbum = this.albums.get(id);

    if (!currentAlbum) {
      throw new NotFoundException(`Album not found`);
    }

    const updatedAlbum = { ...currentAlbum, ...updateAlbum };
    this.albums.set(id, updatedAlbum);
    return updatedAlbum;
  }

  delete(id: string) {
    const album = this.albums.get(id);

    if (!album) {
      throw new NotFoundException(`Album not found`);
    }

    this.albums.delete(id);

    this.trackService.cleanAlbum(id);

    this.favoriteService.removeAlbumIfExist(id);
  }

  cleanArtist(id: string) {
    const albums = Array.from(this.albums.values());

    albums.forEach((album) => {
      if (album.artistId === id) {
        album.artistId = null;
      }
    });
  }
}
