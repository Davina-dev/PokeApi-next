import {useState} from "react";

import {GetStaticPaths, GetStaticProps, NextPage} from "next";
import {Button, Card, Container, Grid, Image, Text} from '@nextui-org/react';
import confetti from 'canvas-confetti';
import {Layout} from "@/components";
import {Pokemon} from "@/interfaces";
import {getPokeApi, useFavorites} from "@/utils";

interface Props {
    pokemon: Pokemon;
}

const PokemonByIdPage: NextPage<Props> = ({pokemon}) => {
    const {existInFavorites, toggleFavorites} = useFavorites();
    const [isInFavorites, setIsinFavorites] = useState(existInFavorites(pokemon.id))
    const onToggleFavorite = () => {
        toggleFavorites(pokemon.id)
        setIsinFavorites(!isInFavorites)
        if (isInFavorites) return;

        confetti({
            zIndex: 1,
            particleCount: 100,
            spread: 200,
            angle: -120,
            origin: {
                x: 0.8,
                y: 0.12,
            }
        })
    }

    return (
        <Layout title={pokemon.name}>
            <Grid.Container css={{marginTop: '5px'}} gap={2}>
                <Grid xs={12} sm={4}>
                    <Card isHoverable css={{padding: '30px'}}>
                        <Card.Body>
                            <Card.Image
                                src={pokemon.sprites.other?.dream_world.front_default || '/no-image.png'}
                                alt={pokemon.name}
                                width="100%"
                                height={200}
                            />
                        </Card.Body>
                    </Card>
                </Grid>

                <Grid xs={12} sm={8}>
                    <Card>
                        <Card.Header css={{display: 'flex', justifyContent: 'space-between'}}>
                            <Text h1 transform='capitalize'>{pokemon.name}</Text>

                            <Button
                                color="gradient"
                                ghost={!isInFavorites}
                                rounded
                                bordered
                                onPress={onToggleFavorite}
                            >
                                {isInFavorites ? "In favorites" : "Save in favorites"}

                            </Button>
                        </Card.Header>

                        <Card.Body>
                            <Text size={30}>Sprites:</Text>

                            <Container direction='row' display='flex'>
                                <Image
                                    src={pokemon.sprites.front_default}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />
                                <Image
                                    src={pokemon.sprites.back_default}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />
                                <Image
                                    src={pokemon.sprites.front_shiny}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />
                                <Image
                                    src={pokemon.sprites.back_shiny}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />

                            </Container>


                        </Card.Body>


                    </Card>
                </Grid>

            </Grid.Container>
        </Layout>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const pokemons151 = [...Array(151)].map((_, index) => `${index + 1}`);
    return {
        paths: pokemons151.map((id) => ({params: {id}})),
        fallback: 'blocking',
    };
};

export const getStaticProps: GetStaticProps = async ({params}) => {
    const {id} = params as { id: string };
    const pokemon = await getPokeApi(id);
    if (!pokemon) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
    return {
        props: {
            pokemon
        },
        revalidate: 86400, //regenerate page every 24h -> 60seg*60min*24
    };
};

export default PokemonByIdPage;
