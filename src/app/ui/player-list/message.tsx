// app/ui/table.tsx
import { Player } from "../../lib/definitions";

export function Message({ players }: { players: Player[] }) {
  const messageText = `Hallo zäme, die Herreneinzel sind:\n\n${players
    .map(
      (player, index) =>
        `${index + 1}. ${player.playerName} (${player.rankingNr})`
    )
    .join("\n")}`;

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(messageText)
      .catch((err) => console.error("Failed to copy text: ", err));
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="mb-4">
        <div className="text-md font-medium text-gray-600 whitespace-pre-line">
          {messageText}
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={copyToClipboard}
          className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Kopieren in Zwischenablage
        </button>
      </div>
    </div>
  );
}
