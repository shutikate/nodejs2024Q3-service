import {
  Injectable,
  Inject,
  UnprocessableEntityException,
  forwardRef,
} from '@nestjs/common';
import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';
import { Track } from '../track/types/types';
import { Album } from '../album/types/types';
import { Artist } from '../artist/types/types';

@Injectable()
export class FavoritesService {
  constructor(
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,
    @Inject(forwardRef(() => ArtistService))
    private artistService: ArtistService,
  ) {}

  private favoriteTracks: Track[] = [];
  private favoriteAlbums: Album[] = [];
  private favoriteArtists: Artist[] = [];

  findAll() {
    const favorites = {
      artists: this.favoriteArtists,
      albums: this.favoriteAlbums,
      tracks: this.favoriteTracks,
    };
    return favorites;
  }

  async addTrack(uuid: string) {
    const track = await this.trackService.getTrackIfExist(uuid);

    if (!track) {
      throw new UnprocessableEntityException('Track does not exist');
    }

    this.favoriteTracks.push(track);
    return { message: 'Track added to favorites' };
  }

  removeTrackIfExist(uuid: string) {
    const track = this.favoriteTracks.find((track) => track.id === uuid);

    if (!track) {
      return;
    }

    this.favoriteTracks = this.favoriteTracks.filter(
      (track) => track.id !== uuid,
    );

    return { message: 'Track removed from favorites' };
  }

  addAlbum(uuid: string) {
    const album = this.albumService.getAlbumIfExist(uuid);

    if (!album) {
      throw new UnprocessableEntityException('Album does not exist');
    }

    this.favoriteAlbums.push(album);
    return { message: 'Album added to favorites' };
  }

  removeAlbumIfExist(uuid: string) {
    const album = this.favoriteAlbums.find((album) => album.id === uuid);

    if (!album) {
      return;
    }

    this.favoriteAlbums = this.favoriteAlbums.filter(
      (album) => album.id !== uuid,
    );

    return { message: 'Album removed from favorites' };
  }

  addArtist(uuid: string) {
    const artist = this.artistService.getArtistIfExist(uuid);

    if (!artist) {
      throw new UnprocessableEntityException('Artist does not exist');
    }

    this.favoriteArtists.push(artist);
    return { message: 'Artist added to favorites' };
  }

  removeArtistIfExist(uuid: string) {
    const artist = this.favoriteArtists.find((artist) => artist.id === uuid);

    if (!artist) {
      return;
    }

    this.favoriteArtists = this.favoriteArtists.filter(
      (artist) => artist.id !== uuid,
    );

    return { message: 'Artist removed from favorites' };
  }
}
