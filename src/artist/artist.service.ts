import {
  Injectable,
  NotFoundException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { v4 } from 'uuid';
import { FavoritesService } from '../favorites/favorites.service';
import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';
import { Artist } from './types/types';
import { CreateArtistDto } from './dto/createArtist.dto';
import { UpdateArtistDto } from './dto/updateArtist.dto';

@Injectable()
export class ArtistService {
  constructor(
    @Inject(forwardRef(() => FavoritesService))
    private favoriteService: FavoritesService,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,
  ) {}

  private readonly artists: Map<string, Artist> = new Map();

  findAll() {
    return Array.from(this.artists.values());
  }

  findOne(id: string) {
    const artist = this.artists.get(id);

    if (!artist) {
      throw new NotFoundException(`Artist not found`);
    }
    return artist;
  }

  getArtistIfExist(id: string) {
    return this.artists.get(id);
  }

  create(createArtist: CreateArtistDto) {
    const id = v4();
    const newArtist = { id, ...createArtist };
    this.artists.set(id, newArtist);
    return newArtist;
  }

  update(id: string, updateArtist: UpdateArtistDto) {
    const currentArtist = this.artists.get(id);

    if (!currentArtist) {
      throw new NotFoundException(`Artist not found`);
    }

    const updatedArtist = { ...currentArtist, ...updateArtist };
    this.artists.set(id, updatedArtist);
    return updatedArtist;
  }

  delete(id: string) {
    const artist = this.artists.get(id);

    if (!artist) {
      throw new NotFoundException(`Artist not found`);
    }

    this.artists.delete(id);

    this.albumService.cleanArtist(id);

    this.trackService.cleanArtist(id);

    this.favoriteService.removeArtistIfExist(id);
  }
}
