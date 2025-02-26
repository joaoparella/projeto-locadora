import { Injectable } from "@nestjs/common";
import { UsuarioEntity } from "./usuario.entity";

@Injectable()
export class UsuariosArmazenados{
    #usuarios: UsuarioEntity[] = [];  

    AdicionarUsuario(usuario: UsuarioEntity){
        this.#usuarios.push(usuario);
    }

    get Usuarios(){        
        return this.#usuarios;
    }

    validaUsuario(dadosUsuario){
        var validacoes: string[] = [];
        if(!(dadosUsuario.id != null)){
            validacoes.push("Id não pode ser nulo");
        }
        if(!(dadosUsuario.nome != null)){
            validacoes.push("Nome não pode ser nulo");
        }
        if(!(dadosUsuario.idade != null)){
            validacoes.push("Idade não pode ser nulo");
        }
        if(!(dadosUsuario.cidade != null)){
            validacoes.push("Cidade não pode ser nulo");
        }
        if(!(dadosUsuario.email != null)){
            validacoes.push("Email não pode ser nulo");
        }
        if(!(dadosUsuario.telefone != null)){
            validacoes.push("Telefone não pode ser nulo");
        }
        if(!(dadosUsuario.senha != null)){
            validacoes.push("Senha não pode ser nulo");        
        }

        return validacoes;
    }
}