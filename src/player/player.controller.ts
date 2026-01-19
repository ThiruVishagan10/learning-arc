import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PlayerService } from './player.service';
import { Prisma } from '@prisma/client';
import { Throttle, SkipThrottle } from '@nestjs/throttler';

@SkipThrottle()
@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post()
  create(@Body() createPlayerDto: Prisma.PlayerCreateInput) {
    return this.playerService.create(createPlayerDto);
  }

  @Throttle({ short: { ttl: 1000, limit: 1 } })
  @Get()
  findAll(
    @Query('position')
    position?: 'LEFT_WING' | 'RIGHT_WING' | 'MID_FIELD',
  ) {
    return this.playerService.findAll(position);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playerService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePlayerDto: Prisma.PlayerUpdateInput,
  ) {
    return this.playerService.update(+id, updatePlayerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playerService.remove(+id);
  }
}
