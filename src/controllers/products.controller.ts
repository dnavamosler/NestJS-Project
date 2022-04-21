import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get('')
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return `productos: limit=${limit} offset=${offset} brand=${brand}`;
  }
  /* Ruta con parametros */
  @Get(':id')
  getProduct(@Param('id') id: string) {
    return `Product ${id}`;
  }
}
