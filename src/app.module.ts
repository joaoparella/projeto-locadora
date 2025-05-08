import { Module } from '@nestjs/common';

import { GeneroModule } from './genero/genero.module';
import { FilmeModule } from './filmes/filme.module';
import { PessoaModule } from './pessoa/pessoa.module';


@Module({
  imports: [GeneroModule,FilmeModule,PessoaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
