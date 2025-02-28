import React, { useState, useEffect } from 'react';
import { getPokedexList } from '../../services/pokemonService';
import { PokedexEntry } from '../../types/pokemon';
import PokemonCard from '../common/PokemonCard';
import { Container, Grid, Title, Button, FlexContainer } from '../common/StyledComponents';
import styled from 'styled-components';

const SearchInput = styled.input`
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  width: 300px;
  margin-bottom: 20px;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 10px;
`;

const LoadingMessage = styled.div`
  text-align: center;
  font-size: 18px;
  margin: 50px 0;
`;

const Pokedex: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<PokedexEntry[]>([]);
  const [filteredList, setFilteredList] = useState<PokedexEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const limit = 20;

  useEffect(() => {
    fetchPokemon();
  }, [offset]);

  useEffect(() => {
    filterPokemon();
  }, [searchTerm, pokemonList]);

  const fetchPokemon = async () => {
    setLoading(true);
    try {
      const data = await getPokedexList(limit, offset);
      setPokemonList(data);
    } catch (error) {
      console.error('ポケモンデータの取得に失敗しました:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterPokemon = () => {
    if (!searchTerm) {
      setFilteredList(pokemonList);
      return;
    }

    const filtered = pokemonList.filter(pokemon => 
      pokemon.name.includes(searchTerm.toLowerCase()) || 
      pokemon.id.toString() === searchTerm
    );
    setFilteredList(filtered);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handlePrevPage = () => {
    if (offset >= limit) {
      setOffset(offset - limit);
    }
  };

  const handleNextPage = () => {
    setOffset(offset + limit);
  };

  return (
    <Container>
      <Title>ポケモン図鑑</Title>
      
      <SearchInput 
        type="text" 
        placeholder="ポケモン名またはIDで検索..." 
        value={searchTerm}
        onChange={handleSearch}
      />
      
      {loading ? (
        <LoadingMessage>ポケモンデータを読み込み中...</LoadingMessage>
      ) : (
        <>
          <Grid>
            {filteredList.map(pokemon => (
              <PokemonCard 
                key={pokemon.id} 
                pokemon={pokemon} 
                onClick={() => console.log(`${pokemon.name}が選択されました`)}
              />
            ))}
          </Grid>
          
          <Pagination>
            <Button onClick={handlePrevPage} disabled={offset === 0}>
              前へ
            </Button>
            <Button onClick={handleNextPage}>
              次へ
            </Button>
          </Pagination>
        </>
      )}
    </Container>
  );
};

export default Pokedex; 