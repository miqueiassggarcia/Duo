import Tag from "./Tag";

export default class GerenciadorDeTags {
  private tags: Tag[];

  constructor(tag?: Tag) {
    this.tags = tag ? [tag] : [];
  }

  adicionarTag(tag: Tag): void {
    this.tags.push(tag)
  }

  removerTag(tag: Tag): void {
    const indexOfTag: number = this.tags.findIndex(object => object.getNome == tag.getNome);

    if (indexOfTag != -1) {
      this.tags.splice(indexOfTag, 1);
    }
  }

  listarTags(): Tag[] {
    return this.tags;
  }

  getTag(tag: Tag): Tag {
    return this.tags.filter(object =>  object.getNome == tag.getNome)[0];
  }
}