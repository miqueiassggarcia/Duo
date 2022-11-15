create table duo;
default charset = utf8;
default collate utf8_general_ci;

create table jogos (
  id_jogo int not null auto_increment,
  nome varchar(30) not null,
  link_imagem varchar(100),
  primary key (id_jogo)
);

create table post (
  id_post int not null auto_increment,
  titulo varchar(50) not null,
  descricao varchar(200),
  link_discord varchar(100),
  data_post date,
  primary key (id_post),
  id_user int not null,
  id_jogo int not null,
  foreign key (id_user) references usuario (id_usuario)
  foreign key (id_jogo) references jogos (id_jogo)
);

create table usuario (
  id_usuario int not null auto_increment,
  nome varchar(30) not null,
  email varchar(50) not null,
  hash varchar(100) not null,
  link_foto varchar(100),
  sexo enum("M", "F"),
  primary key (id_usuario),
  id_jogo int not null,
  nome_tag varchar(30) not null,
  foreign key (id_jogo) references jogos (id_jogo),
  foreign key (nome_tag) references tag (nome)
);

create table notificacoes (
  id_notificacao int not null auto_increment,
  id_usuario int not null,
  data date not null,
  descricao varchar(200),
  visualizado boolean not null,
  primary key (id_notificacao),
  foreign key (id_usuario) references usuario (id_usuario)
);

create table usuario_favorito (
  id_usuario_favorito int not null,
  id_usuario int not null,
  foreign key (id_usuario) references usuario (id_usuario)
  primary key (id_usuario, id_usuario_favorito)
)

create table tag (
  nome varchar(30) not null,
  primary key (nome)
);

create table usuario_jogo (
  id_usuario int not null,
  id_jogo int not null,
  foreign key (id_usuario) references usuario (id_usuario),
  foreign key (id_jogo) references jogos (id_jogo)
  primary key (id_usuario, id_jogo)
)