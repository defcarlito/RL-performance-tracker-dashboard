export type Game = {
  FormatVersion: string
  Goals: Array<Goal>
  LocalMMRAfter: number
  LocalMMRBefore: number
  MatchPlayerInfo: Array<Player>
  Playlist: number
  MatchDate: Date
  Team0Score: number
  Team1Score: number
  bForfeit: boolean
  hasClips?: boolean
}

export type Goal = {
  GoalClip?: string
  GoalTimeSeconds: number
  ScorerName?: string
  ScorerTeam: 0 | 1
}

export type Player = {
  OnlineID?: string
  EpicAccountId?: string
  Platform: string
  Name: string
  Score: number
  Goals: number
  Assists: number
  Shots: number
  Saves: number
  Team: 0 | 1
}
