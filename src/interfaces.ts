export interface Element {
  [id: number]: string
}

export interface Article {
  category: Element,
  content: string,
  creationTime: number,
  id: number,
  tags: Element[],
  title: string,
  updateTime: number
}