import { L1team } from './l1team';

export interface Player {
  id: number;
  player_name: string;
  position: string;
  state: string;
  l1teamId: number;
  l1team: L1team;
  ligateamId: number;
  player_idapif: number;
  points: number;
}
