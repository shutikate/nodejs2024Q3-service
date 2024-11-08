import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 } from 'uuid';
import { CreateTrackDto } from './dto/createTrack.dto';
import { UpdateTrackDto } from './dto/updateTrack.dto';
import { Track } from './types/types';

@Injectable()
export class TrackService {
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
  }
}
