import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [generations, setGenerations] = useState([]);
  const [pokemonData, setPokemonData] = useState(null);
  const pokemonNameRef = useRef();

  useEffect(() => {
    // Consultar la lista de generaciones al cargar la aplicación
    fetch('https://pokeapi.co/api/v2/generation')
      .then((response) => response.json())
      .then((data) => {
        setGenerations(data.results);
      });
  }, []);

  const handleSearch = async () => {
    const name = pokemonNameRef.current.value;
    if (name) {
      // Consultar información del Pokémon
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      if (response.ok) {
        const data = await response.json();
        setPokemonData(data);
      } else {
        setPokemonData(null);
      }
    }
  };

  return (
    <div>
      <h1>Pokémon Generations</h1>
      <ul>
        {generations.map((generation, index) => (
          <li key={index}>{generation.name}</li>
        ))}
      </ul>
      <div>
        <h2>Buscar Pokémon</h2>
        <input type="text" ref={pokemonNameRef} />
        <button onClick={handleSearch}>Buscar</button>
      </div>
      {pokemonData && (
        <div>
          <h2>{pokemonData.name}</h2>
          <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
          <p>Altura: {pokemonData.height} decímetros</p>
          <p>Peso: {pokemonData.weight} hectogramos</p>
        </div>
      )}
    </div>
  );
}

export default App;
