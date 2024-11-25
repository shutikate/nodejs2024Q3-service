import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 } from 'uuid';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAlbumDto } from './dto/createAlbum.dto';
import { UpdateAlbumDto } from './dto/updateAlbum.dto';

@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const albums = await this.prisma.album.findMany();
    return albums;
  }

  async findOne(id: string) {
    const album = await this.prisma.album.findUnique({ where: { id } });

    if (!album) {
      throw new NotFoundException(`Album not found`);
    }
    return album;
  }

  async getAlbumIfExist(id: string) {
    const album = await this.prisma.album.findUnique({ where: { id } });
    return album;
  }

  async create(createAlbum: CreateAlbumDto) {
    const id = v4();
    const newAlbum = { id, ...createAlbum };
    await this.prisma.album.create({ data: newAlbum });
    return newAlbum;
  }

  async update(id: string, updateAlbum: UpdateAlbumDto) {
    const currentAlbum = await this.prisma.album.findUnique({ where: { id } });

    if (!currentAlbum) {
      throw new NotFoundException(`Album not found`);
    }

    const updatedAlbum = { ...currentAlbum, ...updateAlbum };
    await this.prisma.album.update({ where: { id }, data: updatedAlbum });
    return updatedAlbum;
  }

  async delete(id: string) {
    const album = await this.prisma.album.findUnique({ where: { id } });

    if (!album) {
      throw new NotFoundException(`Album not found`);
    }

    await this.prisma.album.delete({ where: { id } });
  }
}
