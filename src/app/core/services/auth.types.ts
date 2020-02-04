/*
Representa os provedores de autenticação inclusos no sistema,
Caso queira novos provedores como o google, basta inclui-lo na lista e criar o
case no auth.service.ts
*/
export enum AuthProvider {
  Email,
  Facebook
}

/*
interface do usuário para facilitar a tipagem e definição de atributos
*/
export interface User {
  nome?: string;
  email: string;
  senha: string;
}

/*
interface que contem uma lista de propriedades com intuito de facilitar a programação
*/
export interface AuthOptions {
  isSignIn: boolean;
  provider: AuthProvider;
  user: User;
}

