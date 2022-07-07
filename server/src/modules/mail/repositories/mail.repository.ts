import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { getLastDayDate, getTodayDate } from '../../../utils';

@Injectable()
export class MailRepository {
  constructor(private readonly prisma: PrismaService) {}

  async newEmail(from: string) {
    return await this.prisma.mail.create({
      data: {
        from,
      },
    });
  }

  async countEmailLastDayDate() {
    return await this.prisma.mail.count({
      where: {
        createdAt: {
          gte: getLastDayDate(),
        },
      },
    });
  }

  async countEmailTodayDate() {
    return await this.prisma.mail.count({
      where: {
        createdAt: {
          gte: getTodayDate(),
        },
      },
    });
  }

  async deleteEmailLastDayDate() {
    return await this.prisma.mail.deleteMany({
      where: {
        createdAt: {
          lte: getLastDayDate(),
        },
      },
    });
  }
}
