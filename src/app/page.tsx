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
      <div className="text-center text-xs text-gray-500 mt-8">
        © 2025 <a href="https://github.com/AdrianM" className="hover:text-gray-700 underline" target="_blank" rel="noopener noreferrer">Adrian M</a>
      </div>
    </main>
  );
}