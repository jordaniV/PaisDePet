export interface Usuario {
  id: string;
  login: string;
  senha: string;
  nome: string;
  caminhoFoto: Blob;
  uidAuth: string; // uid que vem da tela de autenticação
}
