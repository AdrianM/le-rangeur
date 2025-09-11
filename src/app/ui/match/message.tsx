import { useEffect, useState } from "react";
import { Match } from "../../lib/definitions";

export function Message({ match }: { match: Match | undefined }) {
  let messageText = "";
  if (match) {
    const matchDare = match.matchDate.toLocaleDateString("de-CH", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
    const matchTime = match.matchDate.toLocaleTimeString("de-CH", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const matchLocation = match.location
      ? `"${match.location}"`
      : "der Bernmobil Halle";
    messageText = `Hallo zäme, das nächste IC Spiel findet am ${matchDare} um ${matchTime} in ${`${matchLocation}`} statt🏸 Es spielen: \n\n${
      match.players
        ?.sort((a, b) => a.firstname.localeCompare(b.firstname))
        .sort((a) => (a.gender === "M" ? 1 : -1))
        .map((player) => `${player.firstname} `)
        .join("\n") ?? ""
    }`;
  }

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(messageText)
      .catch((err) => console.error("Failed to copy text: ", err));
  };

  const [errorMessage, setErrorMessage] = useState<string>("");
  useEffect(() => {
    if (!match || !match.players) {
      setErrorMessage("");
      return;
    }
    if (match?.players.length !== 5) {
      setErrorMessage("Es müssen 5 Spieler gewählt werden");
    } else if (
      match?.players.filter((player) => player.gender === "M").length !== 3
    ) {
      setErrorMessage(
        `Es müssen 3 Männer und 2 Frauern ausgewählt (aktuell ${
          match?.players.filter((player) => player.gender === "M").length
        } Männer und ${
          match?.players.filter((player) => player.gender === "F").length
        } Frauen ausgewählt).`
      );
    } else if (
      match?.players.filter((player) => player.gender === "F").length !== 2
    ) {
      setErrorMessage(`Fehlerhafte Auswahl.`);
    } else {
      setErrorMessage("");
    }
  }, [match]);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="mb-4">
        <div className="text-md font-medium text-red-600">{errorMessage}</div>
      </div>
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
