export default class Notificacao {
  private data: Date;
  private descricao: string;
  private visualizado: boolean;

  constructor(data: Date, descricao: string, visualizado: boolean) {
    this.data = data;
    this.descricao = descricao;
    this.visualizado = visualizado;
  }

  getData(): Date {
    return this.data;
  }

  setData(data: Date): void {
    this.data = data;
  }

  getDescricao(): string {
    return this.descricao;
  }

  setDescricao(descricao: string): void {
    this.descricao = descricao;
  }

  getVisualizado(): boolean {
    return this.visualizado;
  }  

  setVisualizado(visualizado: boolean): void {
    this.visualizado = visualizado;
  }
}