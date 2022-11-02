import GerenciadorDePosts from "./GerenciadorDePosts"
import Post from "./Post"

export default class Jogo{
  private nome: string;
  private urlImagem: string;
  private listaDePosts: Post[];

  constructor(nome: string, urlImagem: string) {
    this.nome = nome;
    this.urlImagem = urlImagem;
    this.listaDePosts = []
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

  setPosts(gerenciador: GerenciadorDePosts) {
    //query to get id
    //gerenciador.getPosts(id)
  }
}