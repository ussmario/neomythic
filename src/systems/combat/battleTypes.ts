export enum BattleState {
  IDLE = "IDLE",

  // Encounter flow
  INTRO = "INTRO",
  PLAYER_TURN = "PLAYER_TURN",
  ENEMY_TURN = "ENEMY_TURN",
  RESOLVING = "RESOLVING",

  // End states
  VICTORY = "VICTORY",
  DEFEAT = "DEFEAT"
}