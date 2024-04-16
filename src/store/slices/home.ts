import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { POKEMON_URL } from '../../utils/constants';
import axios from 'axios';
import { CartItem } from './cart';

interface PokemonResponse {
  next: string;
  count: number;
  results: CartItem[];
}


/**
 * This async action will fetch the pokemon list
 */
export const fetchPokeMons = createAsyncThunk('pokemon/fetch', async () => {
  const response = await axios.get(POKEMON_URL)
  return response.data
});

/**
 * This async action will fetch the next set of pokemon list
 */
export const fetchNextPokeMons = createAsyncThunk('nextPokemon/fetch', async (url: string) => {
  const response = await axios.get(url)
  return response.data
})

const homeSlice = createSlice({
  name: 'pokemon',
  initialState: {
    pokemonState: {} as PokemonResponse,
    loading: false,
    error: null as any,
    extraLoading: false,
    extraLoadError: null as any
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokeMons.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPokeMons.fulfilled, (state, action) => {
        state.loading = false;
        state.pokemonState = action.payload;
      })
      .addCase(fetchPokeMons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message
      })
      .addCase(fetchNextPokeMons.pending, (state) => {
        state.extraLoading = true
      })
      .addCase(fetchNextPokeMons.fulfilled, (state, action) => {
        state.extraLoading = false;
        const pokemons = [...state.pokemonState?.results]
        action.payload.results = [...pokemons, ...action.payload.results];
        state.pokemonState = action.payload;
      })
      .addCase(fetchNextPokeMons.rejected, (state, action) => {
        state.extraLoading = false;
        state.extraLoadError = action.error.message
      })
  }
})

export default homeSlice.reducer;