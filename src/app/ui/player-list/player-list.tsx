// app/ui/player-list.tsx
"use client";

import { useState } from "react";
import { Player } from "../../lib/definitions";

import { Message } from "./message";
import { Search } from "./search";
import { Table } from "./table";
import { formatDate } from "../../lib/date-utils";

export function PlayerList({ initialPlayers }: { initialPlayers: Player[] }) {
  const [filteredPlayers, setFilteredPlayers] =
    useState<Player[]>(initialPlayers);

  const handleSearch = (searchText: string) => {
    const filtered = initialPlayers.filter((player) =>
      searchText
        .toLowerCase()
        .split(",")
        .some((term) => player.playerName.toLowerCase().includes(term.trim()))
    );
    setFilteredPlayers(filtered);
  };

  const lastUpdate =
    filteredPlayers?.length > 0 ? filteredPlayers[0].updatedAt : null;

  return (
    <div className="space-y-4">
      <p className="text-gray-600">
        Tippen Sie die gewünschten Spielernamen in das Suchfeld ein, um das
        Ranking zu filtern und eine WhatsApp-Message zu erstellen.
      </p>
      <p className="text-gray-600">
        {" "}
        Dies ist die aktuelle Liste des IC Herreneinzel-Rankings
        (Aktualisiert:&nbsp;
        {lastUpdate && formatDate(lastUpdate)}, Quelle:&nbsp;
        <a
          href="https://www.swiss-badminton.ch/ranking/category.aspx?rid=209&category=2792&C2792FTYAF=0&C2792FTYAT=0&C2792FOG_3_F2048=79371&C2792RFN=&p=1&ps=100"
          target="_blank"
          rel="noopener noreferrer"
        >
          Swiss-Badminton.ch
        </a>
        ).
      </p>

      <Search onSearch={handleSearch} />
      <Table players={filteredPlayers} />
      <Message players={filteredPlayers} />
    </div>
  );
}
