import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseUUIDPipe,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/createTrack.dto';
import { UpdateTrackDto } from './dto/updateTrack.dto';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Get()
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':uuid')
  findOne(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.trackService.findOne(uuid);
  }

  @Post()
  create(@Body() createTrack: CreateTrackDto) {
    return this.trackService.create(createTrack);
  }

  @Put(':uuid')
  update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() updateTrack: UpdateTrackDto,
  ) {
    return this.trackService.update(uuid, updateTrack);
  }

  @Delete(':uuid')
  @HttpCode(204)
  remove(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.trackService.delete(uuid);
  }
}
