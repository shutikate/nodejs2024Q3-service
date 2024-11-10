import {
  Injectable,
  NotFoundException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { v4 } from 'uuid';
import { FavoritesService } from '../favorites/favorites.service';
import { CreateTrackDto } from './dto/createTrack.dto';
import { UpdateTrackDto } from './dto/updateTrack.dto';
import { Track } from './types/types';

@Injectable()
export class TrackService {
  constructor(
    @Inject(forwardRef(() => FavoritesService))
    private favoriteService: FavoritesService,
  ) {}

  private readonly tracks: Map<string, Track> = new Map();

  findAll() {
    return Array.from(this.tracks.values());
  }

  findOne(id: string) {
    const track = this.tracks.get(id);

    if (!track) {
      throw new NotFoundException(`Track not found`);
    }
    return track;
  }

  getTrackIfExist(id: string) {
    return this.tracks.get(id);
  }

  create(createTrack: CreateTrackDto) {
    const id = v4();
    const newTrack = { id, ...createTrack };
    this.tracks.set(id, newTrack);
    return newTrack;
  }

  update(id: string, updateTrack: UpdateTrackDto) {
    const currentTrack = this.tracks.get(id);

    if (!currentTrack) {
      throw new NotFoundException(`Track not found`);
    }

    const updatedTrack = { ...currentTrack, ...updateTrack };
    this.tracks.set(id, updatedTrack);
    return updatedTrack;
  }

  delete(id: string) {
    const track = this.tracks.get(id);

    if (!track) {
      throw new NotFoundException(`Track not found`);
    }

    this.tracks.delete(id);

    this.favoriteService.removeTrackIfExist(id);
  }

  cleanArtist(id: string) {
    const tracks = Array.from(this.tracks.values());

    tracks.forEach((track) => {
      if (track.artistId === id) {
        track.artistId = null;
      }
    });
  }

  cleanAlbum(id: string) {
    const tracks = Array.from(this.tracks.values());

    tracks.forEach((track) => {
      if (track.albumId === id) {
        track.albumId = null;
      }
    });
  }
}
