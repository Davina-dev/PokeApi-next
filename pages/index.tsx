import {GetStaticProps, NextPage} from "next";
import {pokeApi} from "@/api";
import {PokemonListResponse, SmallPokemon} from "@/interfaces";
import {Layout, PokemonCard} from "@/components";
import {Grid} from "@nextui-org/react";

interface Props {
    pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({pokemons}) => {
    return (
        <Layout title="Pokémon List">
            <Grid.Container gap={2} justify="flex-start">
                {pokemons.map((pokemon) => (
                    <PokemonCard key={pokemon.id} pokemon={pokemon}/>
                ))}
            </Grid.Container>
        </Layout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const {data} = await pokeApi.get<PokemonListResponse>("/pokemon?limit=151");
    const pokemons: SmallPokemon[] = data.results.map((pokemon, index) => ({
        ...pokemon,
        id: index + 1,
        img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
            index + 1
        }.svg`,
    }));


    return {
        props: {
            pokemons: pokemons,
        },
    };
};

export default HomePage;
