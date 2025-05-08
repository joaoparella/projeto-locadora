import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { GeneroModule } from './genero/genero.module';
import { FilmeModule } from './filmes/filme.module';


@Module({
  imports: [UsuarioModule,GeneroModule,FilmeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
