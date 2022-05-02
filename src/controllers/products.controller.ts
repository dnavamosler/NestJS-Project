import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get('')
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return { limit, offset, brand };
  }
  /* Ruta con parametros */
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getProduct(@Param('id') id: string) {
    return `Product ${id}`;
  }

  @Post()
  create(@Body() payload: any) {
    return {
      message: 'acción de crear',
      payload,
    };
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: any) {
    return {
      message: 'acción de actualización',
      payload,
      id,
    };
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return {
      message: 'acción de delete',
      id,
    };
  }
}
