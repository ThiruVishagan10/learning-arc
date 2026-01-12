import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class PlayerService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createPlayerDto: Prisma.PlayerCreateInput) {
    return await this.databaseService.player.create({
      data: createPlayerDto,
    });
  }

  async findAll(position?: 'LEFT_WING' | 'RIGHT_WING' | 'MID_FIELD') {
    if (position)
      return await this.databaseService.player.findMany({
        where: {
          position,
        },
      });
    return await this.databaseService.player.findMany();
  }

  async findOne(id: number) {
    return await this.databaseService.player.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updatePlayerDto: Prisma.PlayerUpdateInput) {
    return await this.databaseService.player.update({
      where: { id },
      data: updatePlayerDto,
    });
  }

  async remove(id: number) {
    return await this.databaseService.player.delete({
      where: { id },
    });
  }
}
