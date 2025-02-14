// app/page.tsx
import { Suspense } from 'react';
import { getPlayersAction } from './lib/actions';
import { PlayerList } from './ui/player-list/player-list';

export default async function Home() {
  const players = await getPlayersAction();

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Le Rangeur</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <PlayerList initialPlayers={players} />
        </Suspense>
      </div>
    </main>
  );
}