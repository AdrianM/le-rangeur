import { Player } from '../../lib/definitions';

export function Table({ 
  players 
}: { 
  players: Player[] 
}) {
  const lastUpdate = players.length > 0 ? players[0].updatedAt : null;
  
  const formatDate = (date: Date) => {
    return date.toLocaleString('de-CH', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Rang
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Spielername
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {players.map((player) => (
            <tr key={player.playerName} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {player.rankingNr}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {player.playerName}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {players.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Keine Spieler gefunden
        </div>
      )}

      

      <div className="text-xs text-gray-500 p-4 border-t">
        
       
        {lastUpdate && (
        <span className="font-semibold text-gray-900">
          Aktualisiert: {formatDate(lastUpdate)}
        </span>
      )}&nbsp;&nbsp; Quelle:{" "}<a
      href="https://www.swiss-badminton.ch/ranking/category.aspx?rid=209&category=2792&C2792FTYAF=0&C2792FTYAT=0&C2792FOG_3_F2048=79371&C2792RFN=&p=1&ps=100"
      target="_blank"
      rel="noopener noreferrer"
    >
      Swiss-Badminton.ch
    </a> 
      </div>
    </div>
  );
}