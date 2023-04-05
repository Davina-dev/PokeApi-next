import {useLocalStorage} from 'react-use';

const useFavorites = () => {
    const [favorites = [], setFavorites] = useLocalStorage<number[]>('favorites', []);

    const toggleFavorites = (id: number) => {
        if (favorites.includes(id)) {
            setFavorites(favorites.filter(pokeId => pokeId !== id));
        } else {
            setFavorites([...favorites, id]);
        }
    };

    const existInFavorites = (id: number): boolean => {
        return favorites.includes(id);
    };

    const getPokemons = (): number[] => {
        return favorites;
    };

    return {toggleFavorites, existInFavorites, getPokemons};
};

export default useFavorites;
