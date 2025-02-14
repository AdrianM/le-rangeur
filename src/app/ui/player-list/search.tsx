'use client';

import { ChangeEvent } from 'react';

export function Search({ 
  onSearch 
}: { 
  onSearch: (value: string) => void 
}) {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Spielernamen (mit Komma getrennt)"
        onChange={(e: ChangeEvent<HTMLInputElement>) => onSearch(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-lg shadow-sm 
                 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-600"
      />
    </div>
  );
}