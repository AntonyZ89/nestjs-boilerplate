import { ObjectHelper } from '@helper/object.helper';
import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();

    this.softDeleteMiddleware();
  }

  softDeleteMiddleware() {
    /**
     * soft delete middleware
     *
     * override delete query
     * override find query
     * override count query
     *
     * TODO type param's args to Notification Prisma interface
     */
    this.$use(async (params, next) => {
      switch (params.action) {
        case 'delete':
          params.action = 'update';
          params.args['data'] = { deletedAt: new Date() };
          break;
        case 'deleteMany':
          params.action = 'updateMany';

          if (!params.args.data) {
            params.args.data['deletedAt'] = new Date();
          } else {
            params.args['data'] = { deletedAt: new Date() };
          }
          break;
        case 'findUnique':
        case 'findFirst':
          params.action = 'findFirst';
        case 'count':
          if (params.args.where) {
            if (!ObjectHelper.hasKey('deletedAt', params.args.where)) {
              params.args.where['deletedAt'] = null;
            }
          } else {
            params.args['where'] = { deletedAt: null };
          }
          break;
        case 'update':
          params.action = 'updateMany';
        case 'updateMany':
        case 'findMany':
          if (params.args.where) {
            if (!ObjectHelper.hasKey('deletedAt', params.args.where)) {
              params.args.where['deletedAt'] = null;
            }
          } else {
            params.args['where'] = { deletedAt: null };
          }
          break;
      }

      return next(params);
    });
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
