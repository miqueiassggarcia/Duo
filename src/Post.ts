import Usuario from "./Usuario";
import Jogos from "./Jogo";

export default class Post {
  private dataDePostagem: Date;
  private titulo: String;
  private descricao: String;
  private linkDoDiscord: String;
  private jogoAssociado: Jogos;
  private usuarioAssociado: Usuario;

  constructor(
    dataDePostagem: Date,
    titulo: String,
    descricao: String,
    linkDoDiscord: String,
    jogoAssociado: Jogos,
    usuarioAssociado: Usuario
    ) {
      this.dataDePostagem = dataDePostagem;
      this.titulo = titulo;
      this.descricao = descricao;
      this.linkDoDiscord = linkDoDiscord;
      this.jogoAssociado = jogoAssociado;
      this.usuarioAssociado = usuarioAssociado;
    }

  enviarMensagem(mensagem: string, idUsuario: number, idUsuarioDestinatario: number) {
//queryParaNotificaçõesDousuario(idUsuarioDestinatario).add(idUsuario, mensagem)
  }
  
  getDataDePostagem() {
    return this.dataDePostagem;
  }
  getTitulo() {
    return this.titulo;
  }
  getDescricao() {
    return this.descricao;
  }
  getLinkDoDiscord() {
    return this.linkDoDiscord;
  }
  getJogoAssociado() {
    return this.jogoAssociado;
  }
  getUsuarioAssociado  () {
    return this.usuarioAssociado;
  }

  setdataDePostagem(dataDePostagem: Date) {
    this.dataDePostagem = dataDePostagem;
  }
  settitulo(titulo: String) {
    this.titulo = titulo;
  }
  setdescricao(descricao: String) {
    this.descricao = descricao;
  }
  setlinkDoDiscord(linkDoDiscord: String) {
    this.linkDoDiscord = linkDoDiscord;
  }
  setjogoAssociado(jogoAssociado: Jogos) {
    this.jogoAssociado = jogoAssociado;
  }
  setusuarioAssociado(usuarioAssociado: Usuario) {
    this.usuarioAssociado = usuarioAssociado;
  }
}