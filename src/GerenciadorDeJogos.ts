import Jogo from "./Jogo";

export default class GerenciadorDeJogos {
  private listaJogos: Jogo[];

  constructor(jogo?: Jogo) {
    this.listaJogos = jogo ? [jogo] : [];
  }

  getListaJogos(): Jogo[] {
    return this.listaJogos;
  }

  adicionarJogo(jogo: Jogo): void {
    this.listaJogos.push(jogo);
  }

  removerJogo(jogo: Jogo): void {
    const indexOfObject = this.listaJogos.findIndex(object => {
      return object.getnome === jogo.getnome;
    });

    if (indexOfObject != -1) {
      this.listaJogos.splice(indexOfObject);
    }
  }
}