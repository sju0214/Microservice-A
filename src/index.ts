import { serve } from "@hono/node-server";
import { Hono } from "hono";

import Pokedex from "pokedex-promise-v2";
const P = new Pokedex();

const app = new Hono();

// Get random Pokemon from specified region
app.get("/pokemon/:region", async (c) => {
  const region = c.req.param("region");
  const pokedex = await P.getPokedexByName(region).catch(() => undefined);
  if (pokedex === undefined) return c.json({ error: "Region does not exist" }, 400);

  const pokemonList = pokedex.pokemon_entries.map((entry) => entry.pokemon_species.name);

  // Get random Pokemon from specified region
  const randomPokemon = pokemonList[Math.floor(Math.random() * pokemonList.length)];

  // Get id and type from the Pokemon
  const pokemonInfo = await P.getPokemonByName(randomPokemon).catch(() => undefined);
  if (pokemonInfo === undefined) return c.json({ error: "Internal Server Error" }, 500);
  const id = pokemonInfo.id;
  const types = pokemonInfo.types.map((type) => type.type.name);

  // Get egg cycle of random Pokemon
  const pokemonSpecies = await P.getPokemonSpeciesByName(randomPokemon).catch(() => undefined);
  if (pokemonSpecies === undefined) return c.json({ error: "Internal Server Error" }, 500);
  const egg_cycles = pokemonSpecies.hatch_counter;

  return c.json({
    name: randomPokemon,
    id,
    types,
    egg_cycles,
  });
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
