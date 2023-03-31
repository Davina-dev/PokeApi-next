import Head from "next/head";
import React, {FC} from "react";
import {Navbar} from "../ui";

interface Props {
    title?: string;
    children: any;
}

const origin = (typeof window === 'undefined' || typeof window.location === 'undefined') ? '' : window.location.origin;
export const Layout: FC<Props> = ({children, title}) => {

    return (
        <>
            <Head>
                <title>{title || "PokemonApp"}</title>
                <meta name="author" content="Davina Medina"/>
                <meta name="description" content={`Información sobre el pokémon ${title}`}/>
                <meta name="Keywords" content={`${title}, api, next, typescript, pokedex`}/>

                <meta property="og:title" content={`Información sobre ${title}`}/>
                <meta property="og:description" content={`Esta es la pagina sobre ${title}`}/>
                <meta property="og:image" content={`${origin}/pokeLogo.png`}/>

                <link rel="icon" href={`${origin}/favicon.ico`}/>
            </Head>

            <Navbar/>

            <main
                style={{
                    padding: "0px 20px",
                }}
            >
                {children}
            </main>
        </>
    );
};