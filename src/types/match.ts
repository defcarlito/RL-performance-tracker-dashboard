export type Game = {
  FormatVersion: string
  Goals: Array<Goal>
  LocalMMRAfter: number
  LocalMMRBefore: number
  MatchPlayerInfo: Array<Player>
  Playlist: 10 | 11 // 10 = ranked 1v1, 11 = ranked 2v2
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
  ScorerTeam: 0 | 1 // 0 = blue, 1 = orange
}

export type Player = {
  OnlineID?: string
  EpicAccountId?: string
  Platform: "epic" | "steam" | "xbox" | "playstation" | "unknown"
  Name: string
  Score: number
  Goals: number
  Assists: number
  Shots: number
  Saves: number
  Team: 0 | 1 // 0 = blue, 1 = orange
}
