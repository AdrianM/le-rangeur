// app/ui/table.tsx
import { Player } from '../../lib/definitions';

export function Message({ 
  players 
}: { 
  players: Player[] 
}) {
  const copyToClipboard = () => {
    const text = `Hallo zäme, die Herreneinzel sind:\n\n${players
      .map((player, index) => `${index + 1}. ${player.playerName} (${player.rankingNr})`)
      .join('\n')}`;
    
    navigator.clipboard.writeText(text)
      .catch(err => console.error('Failed to copy text: ', err));
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="mb-4">
        <div className="text-md font-medium text-gray-600">
          Hallo zäme, die Herreneinzel sind:
        </div>
      </div>
      
      <div className="space-y-2">
        {players.map((player, index) => (
          <div 
            key={player.playerName}
            className="text-gray-600 hover:bg-gray-50 p-2 rounded"
          >
            {index + 1}. {player.playerName} ({player.rankingNr})
          </div>
        ))}
      </div>
      
      {players.length === 0 && (
        <div className="text-center py-4 text-gray-500">
          Keine Spieler gefunden
        </div>
      )}

      <div className="mt-4 flex justify-end">
        <button
          onClick={copyToClipboard}
          className="px-4 py-2 text-sm bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
        >
          Kopieren in Zwischenablage
        </button>
      </div>
    </div>
  );
}