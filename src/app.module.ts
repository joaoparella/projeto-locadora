import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { GeneroModule } from './genero/genero.module';


@Module({
  imports: [UsuarioModule,GeneroModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
