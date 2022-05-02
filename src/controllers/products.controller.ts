import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  //ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from 'src/dtos/products.dto';
import { ParseIntPipe } from '../common/parse-int.pipe';
import { ProductsService } from '../services/products.service';

@Controller('products')
export class ProductsController {
  /* Asi se inyecta un servicio */
  constructor(private productsService: ProductsService) {}

  @Get('')
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    // return { limit, offset, brand };

    return this.productsService.findAll();
  }
  /* Ruta con parametros */
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  /* El parseIntPipe nos transforma a int.. */
  getProduct(@Param('id', ParseIntPipe) id: number) {
    /* con un + --> lo pasa directo a number */
    return this.productsService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    /*  return {
      message: 'acción de crear',
      payload,
    }; */
    return this.productsService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductDto,
  ) {
    /*  return {
      message: 'acción de actualización',
      payload,
      id,
    }; */

    return this.productsService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    /*  return {
      message: 'acción de delete',
      id,
    }; */

    return this.productsService.delete(id);
  }
}
