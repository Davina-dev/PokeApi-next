import React, {useEffect, useState} from "react";
import {Layout} from "@/components/layouts";
import {Card, Container, Grid, Text} from "@nextui-org/react";
import Image from "next/image";
import {localFavorites} from "@/utils";
import {useRouter} from "next/router";


const Favorites = () => {
    const [favoritePokemons, setFavoritePokemons] = useState<number[]>([]);

    useEffect(() => {
        setFavoritePokemons(localFavorites.pokemons())
    }, []);
    const router = useRouter();
    const onFavoriteClicked = (id: number) => {
        router.push(`/pokemon/${id}`)
    }
    return (
        <Layout title="Favorites">

            <Container css={{
                display: 'flex',
                flexDirection: 'column',
                height: 'calc(100vh - 100px)',
            }}>
                {favoritePokemons.length !== 0 ?

                    <Grid.Container gap={2} direction="row" justify="flex-start">
                        {favoritePokemons.map(id => (
                            <Grid key={id} xs={6} sm={3} md={2} xl={1} onClick={() => (onFavoriteClicked(id))}>
                                <Card isHoverable isPressable>
                                    <Card.Image
                                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
                                        width={'100%'}
                                        height={150}
                                        alt="favorite pokemon"
                                    />
                                </Card>
                            </Grid>
                        ))}
                    </Grid.Container>
                    :
                    <Grid.Container css={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: '10rem',
                    }}>

                        <Image src="/emptyPage.svg" alt="cat image" width={600} height={350}/>
                        <Text size="x-large" color='warning'> You don't have any Pokémon in favorites </Text>

                    </Grid.Container>
                }

            </Container>
        </Layout>
    )
}
export default Favorites;