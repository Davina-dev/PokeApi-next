
import Head from "next/head";
import React, {FC} from "react";
import {Navbar} from '../ui';


interface Props{
    title?:string;
    children:any;
}
export const Layout: FC<Props>= ({children, title }) => {
    return(
        <>
            <Head>
                <title>{title || 'PokemonApp'}</title>
                <meta name="author" content="Davina Medina"/>
                <meta name="description" content="Información sobre XXX"/>
                <meta name="Keywords" content="XXXX, api, next, typescript, pokedex"/>
            </Head>

            <Navbar/>

            <main style={{
                padding:'0px 20px'
            }}>
                {children}
            </main>
        </>
    )
};




