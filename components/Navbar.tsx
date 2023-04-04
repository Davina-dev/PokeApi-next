import Image from 'next/image';
import {Link, Spacer, Text, useTheme} from '@nextui-org/react';

export const Navbar = () => {
    const {theme} = useTheme();
    return (
        <div
            style={{
                display: "flex",
                width: "100%",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "center",
                padding: "5px 50px",
                backgroundColor: theme?.colors.gray50.value,
            }}
        >
            <Image
                src="/pokeLogo.png"
                alt="poke icon"
                width={65}
                height={55}
            />

            <Link href="/" color="success">
                <Text color="white" h2>
                    P
                </Text>
                <Text color="white" h3>
                    okémon
                </Text>
            </Link>

            <Spacer css={{flex: 1}}/>

            <Link href="/favorites">
                <Text color="white" size="$xl">
                    Favorites
                </Text>
            </Link>

        </div>
    );
};
