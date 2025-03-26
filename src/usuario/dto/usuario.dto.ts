import { IsEmail, IsInt, IsNotEmpty, IsString, MinLength } from "class-validator";
import { EmailUnico } from "../validacao/email-unico.validator";
import { SenhaForte } from "../validacao/senha-forte.validator";
import { ApiProperty } from "@nestjs/swagger";

export class criaUsuarioDTO{
    @IsString()
    @IsNotEmpty({message: "nome Não pode ser vazio"})
    @ApiProperty({
        example: 'Roberto Silva',
        description: 'Esse campo vai ser utilizado como identificação do usuario, deve ser informado um nome completo'
    })
    nome:string;
    
    @IsInt()
    @ApiProperty({
        example: 19,
        description: 'Esse campo identifica a idade do usuario, deve ser enviado um numero'
    })
    idade: Number;

    @IsString()
    @ApiProperty({
        example: 'Bauru',
        description: 'Deve ser enviado apenas o nome da cidade'
    })
    cidade: string;

    @IsEmail(undefined,{message:"email é inválido"})    
    @EmailUnico({message:"email já cadastrado. Tente novamente"})
    @ApiProperty({
        example: 'roberto@silva.com',
        description: 'Esse campo ira ser o login do usuario, deve ser enviado um email válido e unico'
    })
    email: string;

    @IsString()
    @ApiProperty({
        example: '14999888777',
        description: 'Esse campo é o contato do usuario, deve ser informado apenas numeros'
    })
    telefone: string;

    @MinLength(8,{message: "Senha precisa de pelo menos 8 digitos"})
    @SenhaForte({message:"Senha muito fraca. Tente novamente"})
    @ApiProperty({
        example: 'Senha@123456',
        description: 'A senha deve ter numeros, letras maiusculas e minusculas, e também caracteres especiais'
    })
    senha: string; 
}