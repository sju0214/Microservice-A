# Random Pokemon API spec 

After cloning git repo: 
```
cd microserviceA
npm install
npm run dev
```

Routes:
- Random Pokemon in a given region

Go into http://localhost:3000/pokemon/{region}
- Region is region name (e.g. "Kanto")

Returns...
- Name (Random Pokemon's Name)
- id (POKEMON ID, not pokedex number)
- types (string list describing type of Pokemon)
- egg cycles (check species-list under "hatch_counter")

EXAMPLE INPUT
```
{
  "region": "Paldea"
}
```

EXAMPLE OUTPUT
```
{
  "name": "tatsugiri",
  "id": "978",
  "types": ["dragon", "ice"],
  "egg_cycles": "35"
}
```

# UML Sequence Diagram Reference

<img width="806" alt="Screenshot 2025-02-24 at 7 36 09 PM" src="https://github.com/user-attachments/assets/87dbc2bb-3762-4d08-89f8-5098529df1a9" />

