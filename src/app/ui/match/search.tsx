"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { Match, TeamPlayer } from "../../lib/definitions";
import { bcb3Team } from "../../lib/interclub/teams";
import Select, { MultiValue } from "react-select";
import makeAnimated from "react-select/animated";

export function Search({ onSearch }: { onSearch: (match: Match) => void }) {
  const [selectedPlayers, setSelectedPlayers] = useState<TeamPlayer[]>([]);
  const [matchLocation, setMatchLocation] = useState<string>("");
  const [matchDateInput, setMatchDateInput] = useState<string>("");
  const [isMounted, setIsMounted] = useState<boolean>(false);

  function toDatetimeLocal(date: Date): string {
    const pad = (num: number) => String(num).padStart(2, "0");
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  function buildMatch(): Match {
    const matchDate = new Date(matchDateInput);
    return {
      players: selectedPlayers,
      matchDate,
      location: matchLocation,
    };
  }

  const allPlayers = bcb3Team.players;
  const options = allPlayers.map((player) => ({
    value: player.firstname,
    label: player.firstname,
  }));

  const handlePlayersSelect = (selectedOptions: MultiValue<unknown>) => {
    const selectedPlayers = selectedOptions as {
      value: string;
      label: string;
    }[];
    const players = selectedPlayers.map((selectedOption) =>
      allPlayers.find((player) => player.firstname === selectedOption.value)
    ) as TeamPlayer[];
    setSelectedPlayers(players);
    onSearch({ ...buildMatch(), players });
  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMatchDateInput(e.target.value);
    onSearch({ ...buildMatch(), matchDate: new Date(e.target.value) });
  };

  const handleLocationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMatchLocation(e.target.value);
    onSearch({ ...buildMatch(), location: e.target.value });
  };

  const animatedComponents = makeAnimated();

  // init after mounted to prevent hydration error when dateTime set on server side.
  useEffect(() => {
    setIsMounted(true);
    setMatchDateInput(toDatetimeLocal(new Date()));
  }, []);

  return (
    <div className="relative mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-600">
          {isMounted && (
            <Select
              options={options}
              isMulti
              closeMenuOnSelect={false}
              components={animatedComponents}
              onChange={handlePlayersSelect}
            />
          )}
        </div>

        <input
          type="datetime-local"
          value={matchDateInput}
          onChange={handleDateChange}
          className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-600"
        />
        <input
          type="text"
          placeholder="Ort"
          value={matchLocation}
          onChange={handleLocationChange}
          className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-600"
        />
      </div>
    </div>
  );
}
