export interface Player {
    playerName: string;
    rankingNr: number;  
    updatedAt: Date;
  }

export interface Match {
  players: TeamPlayer[];
  matchDate: Date;
  location?: string;
}

export interface Team {
  name: string;
  players: TeamPlayer[];
}

export interface TeamPlayer {
  firstname: string;
  lastname?: string;
  gender: "M" | "F";
}