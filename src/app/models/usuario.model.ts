export interface Usuario {
  id: string;
  login: string;
  senha: string;
  nome: string;
  caminhoFoto: string;
  uidAuth: string; // uid que vem da tela de autenticação
}
