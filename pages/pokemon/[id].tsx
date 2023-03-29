import { useRouter } from "next/router";
import React from "react";
import { Layout } from "../../components/layouts/Layout";

const PokemonPage = () => {
  const router = useRouter();
  console.log(router);
  return (
    <Layout title="Pokemon">
      <h1>hi</h1>
    </Layout>
  );
};
export default PokemonPage;
