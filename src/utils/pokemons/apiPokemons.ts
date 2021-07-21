import axios from 'axios'
const MAX_POKEMONS = 15

export class PokeApi {
    public static async getRandomPokemons(): Promise<any[]>{
        const getPokesUrl = `https://pokeapi.co/api/v2/pokemon?limit=${MAX_POKEMONS}`

        const pokes = await axios.get(getPokesUrl)

        const pokesWithDetails = await Promise.all(pokes.data.results.map(async poke=>{
            const pokeDetails = await axios.get(poke.url)
            return pokeDetails
        }))
        return pokesWithDetails
    }
}
