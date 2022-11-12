import GerenciadorDeJogos from "./GerenciadorDeJogos";
import GerenciadorDeTags from "./GerenciadorDeTags";
import GerenciadorNotificacoes from "./GerenciadorNotificacoes";

export default class Usuario {
  private nome: string;
  private sexo: string;
  private email: string;
  private urlImage: string;
  private gerenciadorNotificacoes: GerenciadorNotificacoes;
  private gerenciadorDeTags: GerenciadorDeTags;
  private gerenciadorDeJogos: GerenciadorDeJogos;

  constructor(nome: string, sexo: string, email: string) {
    this.nome = nome;
    this.sexo = sexo;
    this.email = email;
    this.urlImage = "";
    this.gerenciadorNotificacoes = new GerenciadorNotificacoes;
    this.gerenciadorDeTags = new GerenciadorDeTags;
    this.gerenciadorDeJogos = new GerenciadorDeJogos;
  }

  private verificarLogin(email: string, senha: string) {
    //hash: string = "query no banco de dados";
    //return senha.encrypt() = hash;
  }

  criarNovoUsuario(senha: string) {
    //queryNoBando(email, senha)
  }
  
  adicionarDadosUsuario() {
    //queryNoBando("dados do objeto");
  }
  
  getnome() {
    return this.nome;
  }
  
  getsexo() {
    return this.sexo;
  }
  
  getemail() {
    return this.email;
  }
  
  geturlImage() {
    return this.urlImage;
  }

  setnome(nome: string) {
    this.nome = nome;
  }
  
  setsexo(sexo: string) {
    this.sexo = sexo;
  }
  
  setemail(email: string) {
    this.email = email;
  }
  
  seturlImage(urlImage: string) {
    this.urlImage = urlImage;
  }
}