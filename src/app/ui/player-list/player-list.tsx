// app/ui/player-list.tsx
'use client';

import { useState } from 'react';
import { Player } from '../../lib/definitions';

import { Message } from './message';
import { Search } from './search';
import { Table } from './table';

export function PlayerList({ initialPlayers }: { initialPlayers: Player[] }) {
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>(initialPlayers);

  const handleSearch = (searchText: string) => {
    const filtered = initialPlayers.filter(player =>
      searchText
        .toLowerCase()
        .split(',')
        .some(term => 
          player.playerName.toLowerCase().includes(term.trim())
        )
    );
    setFilteredPlayers(filtered);
  };

  return (
    <div className="space-y-4">
      <Search onSearch={handleSearch} />
      <Table players={filteredPlayers} />
      <Message players={filteredPlayers} />
    </div>
  );
}