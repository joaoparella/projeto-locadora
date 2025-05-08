import { Module } from '@nestjs/common';

import { GeneroModule } from './genero/genero.module';
import { FilmeModule } from './filmes/filme.module';


@Module({
  imports: [GeneroModule,FilmeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
