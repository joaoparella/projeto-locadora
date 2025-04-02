import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UsuariosArmazenados } from "./usuario.dm";
import { UsuarioEntity } from "./usuario.entity";
import { criaUsuarioDTO } from "./dto/usuario.dto";

import {v4 as uuid} from 'uuid';// importante que seja colocado o import dessa forma sempre
import { ListaUsuarioDTO } from "./dto/consulta.dto";
import { alteraUsuarioDTO } from "./dto/alteraUsuario.dto";
import { loginUsuarioDTO } from "./dto/loginUsuario.dto";
import { ApiBadRequestResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import { HttpService } from "@nestjs/axios";
import { lastValueFrom, map } from "rxjs";

@ApiTags('usuario')
@Controller('/usuarios')
export class UsuarioController{
    constructor(private clsUsuariosArmazenados: UsuariosArmazenados, private HttpService: HttpService){
        
    }    
    @Post()
    @ApiResponse({status: 201, description:"Retorna que houve sucesso ao criar um usuario."})
    @ApiBadRequestResponse({description: "Retorna que alguma informação não foi informada devidamente."})
    async criaUsuario(@Body() dadosUsuario: criaUsuarioDTO){
        var mensagemErro = '';
        try{
            var retornoCep = await lastValueFrom( this.HttpService
                .get(`https://viacep.com.br/ws/${dadosUsuario.cep}/json/`)
                .pipe(
                    map((response) => response.data)
                )
            )
            if (retornoCep.error == 'true'){
                throw new Error('CEP Não encontrado')
            }
        }catch(error){
            mensagemErro = 'Erro ao consultar o CEP, informe um CEP válido.';
            return {
                message: mensagemErro,
                status:'Erro no cadastro do usuário.'
            };
        }
        var novoUsuario = new UsuarioEntity(uuid(),dadosUsuario.nome,
                                            dadosUsuario.idade,
                                            dadosUsuario.cep,retornoCep?retornoCep.logradouro:'',dadosUsuario.complemento,retornoCep?retornoCep.localidade:'',
                                            dadosUsuario.email,
                                            dadosUsuario.telefone,dadosUsuario.senha);
        this.clsUsuariosArmazenados.AdicionarUsuario(novoUsuario);

        var usuario = {
            dadosUsuario : novoUsuario,
            status: "Usuario Criado"
        }
        return usuario;
    }

    @Get()
    async listaUsuarios(){
        

        const usuariosListados = this.clsUsuariosArmazenados.Usuarios;
        const listaRetorno = usuariosListados.map(
            usuario => new ListaUsuarioDTO(
                usuario.id,
                usuario.nome,
                usuario.email
            )
        );
        
        return listaRetorno;
    }

    @Put('/:id')
    async atualizaUsuario(@Param('id') id: string, @Body() novosDados: alteraUsuarioDTO){
        var messageError = '';
        if (novosDados.cep){
            try{
                var retornoCep = await lastValueFrom(this.HttpService
                                                    .get(`https://viacep.com.br/ws/${novosDados.cep}/json/`)
                                                    .pipe(
                                                        map((response) => response.data)
                                                    ))
                if (retornoCep.erro){
                    retornoCep = null
                    throw new Error('CEP Não encontrado')                
                }
            }catch(error){
                messageError = ' | Erro ao buscar CEP - '+ error.message;
            }

            var dadosEndereco = {
                endereco : retornoCep?retornoCep.logradouro:'',
                cidade:  retornoCep?retornoCep.localidade:'',
                cep: novosDados.cep
            }

            await this.clsUsuariosArmazenados.atualizaUSuario(id, dadosEndereco)            
        }   

        const usuarioAtualizado = await this.clsUsuariosArmazenados.atualizaUSuario(id, novosDados)

        
        return{
            usuario: usuarioAtualizado,
            message: 'Usuário atualizado' + messageError
        }
    }

    @Delete('/:id')
    async removeUsuario(@Param('id') id: string){
        const usuarioRemovido = await this.clsUsuariosArmazenados.removeUsuario(id)

        return{
            usuario: usuarioRemovido,
            message: 'Usuário removido'
        }
    }

    @Post('/login')
    async login(@Body() dadosLogin: loginUsuarioDTO){
        var login = this.clsUsuariosArmazenados.validarLogin(dadosLogin.email,dadosLogin.senha);
        return {
            status: login.login,
            usuario: login.login?login.usuario:null,
            message: login.login?"login efetuado":"usuario ou senhas inválidos"
        }

    }

    
}