//classe de modulo do usuário, responsável por administrar todo o modulo de usuário, incluindo controller, DM, e validators, 
//tudo o que o modulo de usuário contem, é adinistrado pela classe de módulo

import { Module } from '@nestjs/common';
import { FilmeController } from './filme.controller';
import { filmeProviders } from './filme.providers';
import { generoProviders } from 'src/genero/genero.provider';
import { GeneroService } from 'src/genero/genero.service';
import { FilmeService } from './filme.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({  
  imports: [DatabaseModule],
  controllers: [FilmeController],  
  providers: [...filmeProviders,
    FilmeService,
    ...generoProviders,
    GeneroService,
  ],
})
export class FilmeModule {}