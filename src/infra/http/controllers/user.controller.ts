import { SwaggerTags } from '@/enums';
import { UserRepository } from '@application/repositories';
import { User } from '@infra/database/typeorm/entities';
import { Public } from '@infra/decorators';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags(SwaggerTags.USER)
export class UserController {
  constructor(private userRepository: UserRepository<User>) {}

  @Get('list')
  @Public()
  list() {
    return this.userRepository.findMany();
  }

  @Post('create')
  @Public()
  @ApiBody({
    schema: {
      properties: {
        username: {
          type: 'string',
        },
        password: {
          type: 'string',
        },
      },
    },
  })
  create(@Body() body: any) {
    return this.userRepository.create(body);
  }

  @Delete(':id')
  @Public()
  async delete(@Param('id', ParseIntPipe) id: number) {
    console.log({ id });

    await this.userRepository.delete(id);

    return {
      message: 'Removido com sucesso.',
    };
  }
}
