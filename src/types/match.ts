export type Game = {
  startEpoch: number,
  date: Date,
  playlist: 10 | 11 | 13,
  mmrBefore: number,
  mmrAfter: number,
  endedOnForfeit: boolean,
  players: Array<Player>,
  goals: Array<Goal>
}

export type Player = {
  id: number,
  uid: string,
  platform: number,
  team: number,
  name: string,
  isLocal: boolean,
  score: number,
  goals: number,
  assists: number
  shots: number,
  saves: number
}

export type Goal = {
  id: number,
  uid: string,
  time: number,
}