import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from 'src/dtos/products.dto';
import { Product } from 'src/entities/product.entity';

/* Este servicio es para administrar productos */
@Injectable()
export class ProductsService {
  private counterId = 1;
  /* Array cargado en memoria... */
  private products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Bla Bla',
      price: 122,
      stock: 12,
      image: '',
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find((product) => product.id === id);

    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }

    return product;
  }

  create(payload: CreateProductDto) {
    this.counterId = this.counterId + 1;
    const newProduct = {
      id: this.counterId,
      ...payload,
    };

    this.products.push(newProduct);

    return newProduct;
  }
  update(id: number, payload: UpdateProductDto) {
    const oldProduct = this.findOne(id);
    const newProduct = {
      ...oldProduct,
      ...payload,
    };

    if (!oldProduct) {
      throw new NotFoundException(`Product #${id} not found`);
    }

    this.products = this.products.map((p) => {
      if (p.id === id) {
        return newProduct;
      } else {
        return p;
      }
    });

    return { ok: true };
  }
  delete(id: number) {
    const deletedProduct = this.findOne(id);
    if (!deletedProduct) {
      throw new NotFoundException(`Product #${id} not found`);
    }

    this.products = this.products.filter((p) => p.id !== id);

    return { ok: true };
  }
}
