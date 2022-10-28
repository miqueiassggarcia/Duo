export default class Jogo{
  private nome: string;
  private urlImagem: string;

  constructor(nome: string, urlImagem: string) {
    this.nome = nome;
    this.urlImagem = urlImagem;
  }

  getnome() {
    return this.nome;
  }

  geturlImagem() {
    return this.urlImagem;
  }

  setnome(nome: string) {
    this.nome = nome;
  }
  seturlImagem(urlImagem: string) {
    this.urlImagem = urlImagem;
  }
}