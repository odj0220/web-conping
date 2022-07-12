export interface Content {
  thumb: string,
  program: Program,
  videoId: string,
  name: string,
}

export interface Program {
  name: string,
}

export interface TitleElement {
  text: string,
  type?: string,
}
