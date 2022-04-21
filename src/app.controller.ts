import { Controller, Get } from '@nestjs/common';
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
}
