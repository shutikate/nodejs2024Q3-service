import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 } from 'uuid';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTrackDto } from './dto/createTrack.dto';
import { UpdateTrackDto } from './dto/updateTrack.dto';

@Injectable()
export class TrackService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const tracks = await this.prisma.track.findMany();
    return tracks;
  }

  async findOne(id: string) {
    const track = await this.prisma.track.findUnique({ where: { id } });

    if (!track) {
      throw new NotFoundException(`Track not found`);
    }
    return track;
  }

  async create(createTrack: CreateTrackDto) {
    const id = v4();
    const newTrack = { id, ...createTrack };
    await this.prisma.track.create({ data: newTrack });
    return newTrack;
  }

  async update(id: string, updateTrack: UpdateTrackDto) {
    const currentTrack = await this.prisma.track.findUnique({ where: { id } });

    if (!currentTrack) {
      throw new NotFoundException(`Track not found`);
    }

    const updatedTrack = { ...currentTrack, ...updateTrack };
    await this.prisma.track.update({ where: { id }, data: updatedTrack });
    return updatedTrack;
  }

  async delete(id: string) {
    const track = await this.prisma.track.findUnique({ where: { id } });

    if (!track) {
      throw new NotFoundException(`Track not found`);
    }

    await this.prisma.track.delete({ where: { id } });

    await this.prisma.favorite.deleteMany({ where: { trackId: id } });
  }
}
