export default class Usuario {
  private nome: string;
  private sexo: string;
  private email: string;
  private nivelDeJogo: [string, string];

  constructor(nome: string, sexo: string, email: string) {
    this.nome = nome;
    this.sexo = sexo;
    this.email = email;
    this.nivelDeJogo = ["", ""];
  }

  adicionarNivelDeJogo(nivelDeJogo: [string, string]) {
    this.nivelDeJogo = nivelDeJogo;
  }

  getNome() {
    return this.nome;
  }
}