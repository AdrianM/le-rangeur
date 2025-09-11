// app/ui/player-list.tsx
'use client';

import { useState } from 'react';
import { Match } from '../../lib/definitions';

import { Message } from './message';
import { Search } from './search';


export function MatchComponent() {
  const [match, setMatch] = useState<Match>();

  const handleSearch = (match: Match) => {
    setMatch(match);
  };

  return (
    <div className="space-y-4">
      <p className="text-gray-600">
        Hier kann eine WhatsApp-Message für das nächste IC-Match erstellt werden (Team BC Bern 3).
      </p>
      <Search onSearch={handleSearch} />
      <Message match={match} />
    </div>
  );
}