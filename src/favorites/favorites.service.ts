import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 } from 'uuid';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const favoritesTracks = await this.prisma.favorite.findMany({
      where: { trackId: { not: null } },
      include: {
        track: true,
      },
    });

    const favoritesAlbums = await this.prisma.favorite.findMany({
      where: { albumId: { not: null } },
      include: {
        album: true,
      },
    });

    const favoritesArtists = await this.prisma.favorite.findMany({
      where: { artistId: { not: null } },
      include: {
        artist: true,
      },
    });

    const favorites = {
      tracks: favoritesTracks.map((favorite) => favorite.track),
      albums: favoritesAlbums.map((favorite) => favorite.album),
      artists: favoritesArtists.map((favorite) => favorite.artist),
    };

    return favorites;
  }

  async addTrack(id: string) {
    const track = await this.prisma.track.findUnique({ where: { id } });
    const uuid = v4();

    if (!track) {
      throw new UnprocessableEntityException('Track does not exist');
    }

    await this.prisma.favorite.create({
      data: { id: uuid, trackId: id },
    });
    return { message: 'Track added to favorites' };
  }

  async removeTrackIfExist(id: string) {
    const track = await this.prisma.track.findUnique({ where: { id } });

    if (!track) {
      return;
    }

    await this.prisma.favorite.deleteMany({ where: { trackId: id } });

    return { message: 'Track removed from favorites' };
  }

  async addAlbum(id: string) {
    const album = await this.prisma.album.findUnique({ where: { id } });
    const uuid = v4();

    if (!album) {
      throw new UnprocessableEntityException('Album does not exist');
    }

    await this.prisma.favorite.create({
      data: { id: uuid, albumId: id },
    });

    return { message: 'Album added to favorites' };
  }

  async removeAlbumIfExist(id: string) {
    const album = await this.prisma.album.findUnique({ where: { id } });

    if (!album) {
      return;
    }

    await this.prisma.favorite.deleteMany({ where: { albumId: id } });

    return { message: 'Album removed from favorites' };
  }

  async addArtist(id: string) {
    const artist = await this.prisma.artist.findUnique({ where: { id } });
    const uuid = v4();

    if (!artist) {
      throw new UnprocessableEntityException('Artist does not exist');
    }

    await this.prisma.favorite.create({
      data: { id: uuid, artistId: id },
    });

    return { message: 'Artist added to favorites' };
  }

  async removeArtistIfExist(id: string) {
    const artist = await this.prisma.artist.findUnique({ where: { id } });

    if (!artist) {
      return;
    }

    await this.prisma.favorite.deleteMany({ where: { artistId: id } });

    return { message: 'Artist removed from favorites' };
  }
}
