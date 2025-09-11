// app/ranking/page.tsx
import { Suspense } from 'react';
import { getPlayersAction } from '../lib/actions';
import { PlayerList } from '../ui/player-list/player-list';
import Link from 'next/link';

export default async function RankingPage() {
  const players = await getPlayersAction();

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Le Rangeur</h1>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <PlayerList initialPlayers={players} />
        </Suspense>
      </div>
      <div className="text-center text-xs text-gray-500 mt-8">
        © 2025 <a href="https://github.com/AdrianM" className="hover:text-gray-700 underline" target="_blank" rel="noopener noreferrer">Adrian M</a>&nbsp;&nbsp;<Link href="/match" className="hover:text-gray-700 underline">Zum Match (experimental)</Link>
      </div>
    </main>
  );
}


