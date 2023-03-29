import React from "react";
import { Layout } from "../../components/layouts/Layout";
import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import { pokeApi } from "@/api";
import { Pokemon } from "../../interfaces";

interface Props {
  pokemon: Pokemon;
}
const PokemonPage: NextPage<Props> = ({ pokemon }) => {
  return (
    <Layout title="Pokemon">
      <h1>
        {pokemon.id}- {pokemon.name}
      </h1>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const pokemons151 = [...Array(151)].map((_, index) => `${index + 1}`);
  return {
    paths: pokemons151.map((id) => ({ params: { id } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };
  const { data } = await pokeApi.get<Pokemon>(`/pokemon/${id}`);
  return {
    props: {
      pokemon: data,
    },
  };
};

export default PokemonPage;
