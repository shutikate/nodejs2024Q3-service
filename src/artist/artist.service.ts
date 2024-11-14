import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 } from 'uuid';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateArtistDto } from './dto/createArtist.dto';
import { UpdateArtistDto } from './dto/updateArtist.dto';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const artists = await this.prisma.artist.findMany();
    return artists;
  }

  async findOne(id: string) {
    const artist = await this.prisma.artist.findUnique({ where: { id } });

    if (!artist) {
      throw new NotFoundException(`Artist not found`);
    }
    return artist;
  }

  async getArtistIfExist(id: string) {
    const artist = await this.prisma.artist.findUnique({ where: { id } });
    return artist;
  }

  async create(createArtist: CreateArtistDto) {
    const id = v4();
    const newArtist = { id, ...createArtist };
    await this.prisma.artist.create({ data: newArtist });
    return newArtist;
  }

  async update(id: string, updateArtist: UpdateArtistDto) {
    const currentArtist = await this.prisma.artist.findUnique({
      where: { id },
    });

    if (!currentArtist) {
      throw new NotFoundException(`Artist not found`);
    }

    const updatedArtist = { ...currentArtist, ...updateArtist };
    await this.prisma.artist.update({ where: { id }, data: updatedArtist });
    return updatedArtist;
  }

  async delete(id: string) {
    const artist = await this.prisma.artist.findUnique({ where: { id } });
    const albums = await this.prisma.album.findMany({
      where: { artistId: id },
    });
    const tracks = await this.prisma.track.findMany({
      where: { artistId: id },
    });

    if (!artist) {
      throw new NotFoundException(`Artist not found`);
    }

    await this.prisma.artist.delete({ where: { id } });
    albums.forEach((album) => (album.artistId = null));
    tracks.forEach((track) => (track.artistId = null));
    await this.prisma.favorite.deleteMany({ where: { artistId: id } });
  }
}
