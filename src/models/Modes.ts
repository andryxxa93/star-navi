export enum Modes {
  EASY_MODE = 'easyMode',
  NORMAL_MODE = 'normalMode',
  HARD_MODE = 'hardMode'
}

export type Mode = {
  name: Modes,
  field: number,
}