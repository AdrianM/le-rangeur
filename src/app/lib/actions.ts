'use server'

import { fetchPlayers } from './data';
import { Player } from './definitions';

export async function getPlayersAction(): Promise<Player[]> {
  return await fetchPlayers();
}