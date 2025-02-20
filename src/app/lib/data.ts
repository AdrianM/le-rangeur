import * as cheerio from 'cheerio';
import { Player } from './definitions';


export async function fetchPlayers(): Promise<Player[]> {
  try {
    console.log('Server > fetchPlayers > start');
    // TODO AMO: get this from the browser.
    const sessionCookie = 'ASP.NET_SessionId=qwu5upju2tjmzqgb2zigdw1i; st=l=2055&exp=46067.4497164815&c=1&cp=51; _ga_MSFCJGD4YS=GS1.1.1739526455.1.0.1739526455.0.0.0; _ga=GA1.1.196022657.1739526456';
    
    // const response = await axios.get('http://localhost:3000/tmp-swiss-badminton-source.html');
    const response = await fetch('https://www.swiss-badminton.ch/ranking/category.aspx?rid=209&category=2792&C2792FTYAF=0&C2792FTYAT=0&C2792FOG_3_F2048=79371&C2792RFN=&p=1&ps=100', {
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Cookie': sessionCookie
      },
      credentials: 'include',
      next: {
        revalidate: 1200 // 20 minutes
      }
    });

    
    const html = await response.text();
    // fs.writeFileSync('debug-amo-fetch-players-1.html', html); // for debugging
    const $ = cheerio.load(html);
    
    const players: Player[] = [];

    // parse "Zuletzt geändert am: Dienstag, 11. Februar 2025 09:43"
    const lastUpdatedText = $('p.subtitle').contents()
      .filter((_, el) => el.type === 'text')
      .text()
      .replace('Zuletzt geändert am:', '')
      .trim();

    let lastUpdatedDate = new Date();
    
    // Now lastUpdatedText should be "Dienstag, 11. Februar 2025 09:43"
    const [, day, month, year, time] = lastUpdatedText.split(/[,\s.]+/).filter(Boolean);
    const [hours, minutes] = time.split(':');
    
    const monthMap: { [key: string]: number } = {
      'Januar': 0, 'Februar': 1, 'März': 2, 'April': 3, 'Mai': 4, 'Juni': 5,
      'Juli': 6, 'August': 7, 'September': 8, 'Oktober': 9, 'November': 10, 'Dezember': 11
    };

    lastUpdatedDate = new Date(
      parseInt(year),
      monthMap[month],
      parseInt(day),
      parseInt(hours),
      parseInt(minutes)
    );

    $('table.ruler tr').each((i, row) => {
        // Skip header rows and rows without proper rank/name data
        const rankCell = $(row).find('td.rank div');
        const nameCell = $(row).find('td a[href^="player.aspx"]');
        
        if (rankCell.length && nameCell.length) {
            players.push({ 
              playerName: nameCell.text().trim(),
              rankingNr: parseInt(rankCell.text().trim()), 
              updatedAt: lastUpdatedDate 
            });
        }
    });
    
    console.log(`Server > fetchPlayers > done. Found ${players.length} players, lastUpdatedDate: ${lastUpdatedDate}`);
    return players.sort((a, b) => a.rankingNr - b.rankingNr);
  } catch (error) {
    console.error('Error fetching players:', error);
    throw new Error('Failed to fetch players');
  }
}