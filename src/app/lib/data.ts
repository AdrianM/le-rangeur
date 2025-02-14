import axios from 'axios';
import * as cheerio from 'cheerio';
import { Player } from './definitions';

// TODO AMO rename files to player-data.ts.
export async function fetchPlayers(): Promise<Player[]> {
  try {
    // const response = await axios.get('https://www.swiss-badminton.ch/ranking/category.aspx?rid=209&category=2792&C2792FTYAF=0&C2792FTYAT=0&C2792FOG_3_F2048=79371&C2792RFN=&p=1&ps=100');
    const response = await axios.get('http://localhost:3000/tmp-swiss-badminton-source.html');
    const html = response.data;
    const $ = cheerio.load(html);
    
    const players: Player[] = [];

    $('table.ruler tr').each((i, row) => {
        // Skip header rows and rows without proper rank/name data
        const rankCell = $(row).find('td.rank div');
        const nameCell = $(row).find('td a[href^="player.aspx"]');
        
        if (rankCell.length && nameCell.length) {
            players.push({ playerName: nameCell.text().trim(),rankingNr: parseInt(rankCell.text().trim()) });
        }
    });
    
    // Sort by ranking
    return players.sort((a, b) => a.rankingNr - b.rankingNr);
  } catch (error) {
    console.error('Error fetching players:', error);
    throw new Error('Failed to fetch players');
  }
}