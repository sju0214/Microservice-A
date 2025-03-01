import { serve } from "@hono/node-server";
import { Hono } from "hono";

import Pokedex from "pokedex-promise-v2";
const P = new Pokedex();

const app = new Hono();

// Get random pokemon from specified region
app.get("/pokemon/:region", async (c) => {
  try {
    const region = c.req.param("region");
    const pokedex = await P.getPokedexByName(region);

    const pokemonList = pokedex.pokemon_entries.map((entry) => entry.pokemon_species.name);

    // Get random Pokemon from specified region
    const randomPokemon = pokemonList[Math.floor(Math.random() * pokemonList.length)];
    const pokemonInfo = await P.getPokemonByName(randomPokemon);

    // Extract Pokemon's ID and type from info
    const id = pokemonInfo.id;
    const pokemonType = pokemonInfo.types.map((type) => type.type.name);

    // Get egg cycle of random pokemon
    const { hatch_counter } = await P.getPokemonSpeciesByName(randomPokemon);

    return c.json({
      name: randomPokemon,
      id,
      types: pokemonType,
      egg_cycles: hatch_counter,
    });
  } catch (error) {
    return c.json({ error: "Internal Server Error" }, 500);
  }
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
