# Random Pokemon API spec 

Routes:
- Random Pokemon in a given region
- Region is name (e.g. "Kanto", check pokedex)

Returns...
- Name (species name via species-list in "en")
- id (POKEMON ID, not pokedex number, so check pokedex)
- types (string list)
- egg cycles (check species-list under "hatch_counter") Can be dropped if you don't have the time

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
<img width="697" alt="Screenshot 2025-02-23 at 8 26 54 PM" src="https://github.com/user-attachments/assets/e9f50b55-eed0-4883-9e83-4b84fc7f78b1" />


