import Post from "./Post";
import Jogos from "./Jogo";
import Usuario from "./Usuario";

export default class GerenciadorDePosts {
  private postList: Post[];

  constructor(
    dataDePostagem: Date,
    titulo: String,
    descricao: String,
    linkDoDiscord: String,
    jogoAssociado: Jogos,
    usuarioAssociado: Usuario
    ) {
    this.postList = new Post(
    dataDePostagem,
    titulo,
    descricao,
    linkDoDiscord,
    jogoAssociado,
    usuarioAssociado
    )
  }

  criarPost(
    dataDePostagem: Date,
    titulo: String,
    descricao: String,
    linkDoDiscord: String,
    jogoAssociado: Jogos,
    usuarioAssociado: Usuario
  ) {
    const newPost: Post = new Post(
      dataDePostagem,
      titulo,
      descricao,
      linkDoDiscord,
      jogoAssociado,
      usuarioAssociado
    );
    this.postList.push(newPost);
  }

  
}