import Notificacao from "./Notificacao";

export default class GerenciadorNotificacoes {
  private notificacoes: Notificacao[];
  private NotificacoesNaoVisualizadas: number;

  constructor(notificacao?: Notificacao) {
    this.notificacoes = notificacao ?[notificacao] : [];
    this.NotificacoesNaoVisualizadas = notificacao ? 1 : 0;
  }

  criarNotificacao(notificacao: Notificacao): void {
    this.notificacoes.push(notificacao);
  }

  getNotificacao(notificacao: Notificacao): Notificacao[] {
    return this.notificacoes.filter(object => object.getDescricao == notificacao.getDescricao);
  }

  listarNotificacoes(): Notificacao[] {
    return this.notificacoes;
  }

  visualizarNofiticacao(notificacao: Notificacao): void {
    const filterNotificacao: Notificacao[] = this.notificacoes.filter(object => object.getDescricao == notificacao.getDescricao);

    if (filterNotificacao.length == 1)  {
      filterNotificacao[0].setVisualizado(true);
    }
  }

  totalNotificacoes(): number[] {
    return [this.notificacoes.length, this.NotificacoesNaoVisualizadas];
  }
}