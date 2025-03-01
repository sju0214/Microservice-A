import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

// Get random pokemon from specified region
app.get('/pokemon/:region', async (c) => {
  try {
    const region = c.req.param('region');
    const response = await fetch(`https://pokeapi.co/api/v2/pokedex/${region}`);

    const data = await response.json();
    const pokemonList = data.pokemon_entries.map((entry: any) => entry.pokemon_species.name);

    // Get random Pokemon from specified region 
    const randomPokemon = pokemonList[Math.floor(Math.random() * pokemonList.length)]
    const pokemonInfo = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemon}`).then(res => res.json());

    // Extract Pokemon's ID and type from info
    const id = pokemonInfo.id
    const pokemonType = pokemonInfo.types.map((type: any) => type.type.name);

    // Get egg cycle of random pokemon
    const { hatch_counter } = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${randomPokemon}`).then(res => res.json());

    return c.json({
      name: randomPokemon, 
      id,
      types: pokemonType,
      egg_cycles: hatch_counter,
    });
  } catch (error) {
    return c.json({ error: 'Internal Server Error' }, 500);
  }
});

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
