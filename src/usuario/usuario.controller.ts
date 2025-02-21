import { Body, Controller, Get, Post } from "@nestjs/common";

@Controller('/usuarios')
export class UsuarioController{
    @Post()
    async criaUsuario(@Body() dadosUsuario){
        var usuario = {
            dadosUsuario : dadosUsuario,
            status: "Usuario Criado"
        }
        return usuario;
    }
}