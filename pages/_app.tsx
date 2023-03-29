import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { NextUIProvider } from '@nextui-org/react';
import {darkTheme} from "../themes";
export default function App({ Component, pageProps }: AppProps) {
  return (
      // cualquier provider es un proveedor de información que estará disponible en todos los hijos de component (en este caso)
      <NextUIProvider theme={darkTheme}>
        <Component {...pageProps} />
      </NextUIProvider>
  );
}
