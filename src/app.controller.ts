import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return 'Hola mundo!';
    /* return this.appService.getHello(); */
  }

  /* Creación de un metodo */
  @Get('nuevo')
  newEndPoint() {
    return 'Yo soy nuevo';
  }

  /* Funciona exactamente igual */
  @Get('/ruta/')
  hello() {
    return 'Con /sas/';
  }

  /* Ruta con parametros */
  @Get('products/:id')
  getProduct(@Param('id') id: string) {
    return `Product ${id}`;
  }

  @Get('products')
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return `productos: limit=${limit} offset=${offset} brand=${brand}`;
  }

  @Get('categories/:id/products/:productId')
  getCategory(@Param('id') id: string, @Param('productId') productId: string) {
    return `Category ${id} and product ${productId}`;
  }
}
