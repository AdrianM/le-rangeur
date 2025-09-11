// app/match/page.tsx
import { Suspense } from 'react';
import { MatchComponent } from '../ui/match/match';
import Link from 'next/link';


export default async function MatchPage() {
  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Le Rangeur</h1>
          <Link href="/ranking" className="px-3 py-2 text-sm bg-gray-800 text-white rounded hover:bg-gray-900">Zum Ranking</Link>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <MatchComponent />
        </Suspense>
      </div>
      <div className="text-center text-xs text-gray-500 mt-8">
        © 2025 <a href="https://github.com/AdrianM" className="hover:text-gray-700 underline" target="_blank" rel="noopener noreferrer">Adrian M</a>
      </div>
    </main>
  );
}


