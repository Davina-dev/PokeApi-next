import React, {useEffect, useState} from "react";
import {Layout} from "@/components";
import {Card, Container, Grid, Text} from "@nextui-org/react";
import Image from "next/image";
import {useFavorites} from "@/utils";
import {useRouter} from "next/router";


const FavoritesPage = () => {
    const {getPokemons} = useFavorites();
    const [favoritePokemons, setFavoritePokemons] = useState<number[]>([]);

    useEffect(() => {
        setFavoritePokemons(getPokemons())
    }, []);
    const router = useRouter();
    const onFavoriteClicked = (id: number) => {
        router.push(`/pokemon/${id}`)
    }
    return (
        <Layout title="Favorites Pokémons">
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
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: '10rem',
                    }}>

                        <Image src="/emptyPage.svg" alt="cat image" width={600} height={350}/>
                        <Text size="x-large" color='warning' css={{
                            maxWidth: '600px',
                            opacity: '80%',
                            textAlign: 'justify'
                        }}>
                            Oh no! It seems like all my Pokémon decided to take a vacation and leave my favorites list
                            empty. It is time to go look for new pocket friends!</Text>

                    </Grid.Container>
                }

            </Container>
        </Layout>
    )
}
export default FavoritesPage;