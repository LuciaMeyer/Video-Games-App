import { useDispatch, useSelector } from 'react-redux';
import { getGames, getGenres, getPlatforms, changeCreateGames } from '../redux/actions';
import { Link } from 'react-router-dom';
import { Card } from './Card';
import { Pagination } from './Pagination';
import { NotFound } from './NotFound';
import { Search } from "./Search";
import { Nav } from './Nav';
import { Loading } from './Loading'
import { useEffect } from 'react';
import { nameASC, nameDES, ratingWORST, ratingBEST } from '../helpers/sort';
// import { useState } from 'react';
 

export const Home = () => {

    const dispatch = useDispatch();
    const currentPage = useSelector(state => state.currentPage);
    const allGames = useSelector(state => state.allGames);
    const genres = useSelector(state => state.genres);
    const platforms = useSelector(state => state.platforms);
    const gameByName = useSelector(state => state.gameByName);
    const searchGame = useSelector(state => state.searchGame);
    const useFilter = useSelector(state => state.useFilter)
    const genresFilter = useSelector(state => state.genresFilter);
    const platformsFilter = useSelector(state => state.platformsFilter);
    const typeFilter = useSelector(state => state.typeFilter);
    const nameOrder = useSelector(state => state.nameOrder);
    const ratingOrder = useSelector(state => state.ratingOrder);
    const gameCreated = useSelector(state => state.gameCreated)
    
    let games = []  
    searchGame && !gameByName.msg ? games = [...gameByName] : games = [...allGames]
    
    if(nameOrder === 'asc' ) games.sort(nameASC)
    if(nameOrder === 'desc') games.sort(nameDES)
    if(ratingOrder === 'worst rating') games.sort(ratingWORST)          
    if(ratingOrder === 'best rating') games.sort(ratingBEST)
    if(genresFilter.length !== 0 && genresFilter !== 'all') games = games.filter(g => g.genres.includes(genresFilter));
    if(platformsFilter.length !== 0 && platformsFilter !== 'all') games = games.filter(g => g.platforms.includes(platformsFilter));
    if(typeFilter === 'created') games = games.filter(g => typeof g.id === 'string');
    if(typeFilter === 'existing') games = games.filter(g => typeof g.id === 'number');       
        
    const gamesPerPage = 15;
    const indexLastGame = currentPage * gamesPerPage;
    const indexFirstGame = indexLastGame - gamesPerPage;
    const currentGames = games.slice(indexFirstGame, indexLastGame);

    if(!platforms.length && !games.length && !genres.length) {
        dispatch(getPlatforms());
        dispatch(getGames()); 
        dispatch(getGenres());
    }

    if(gameCreated) {
        dispatch(getGames());
        dispatch(changeCreateGames(false))
    }


    let loading = false
    if ( games.length === 0 && !useFilter && !searchGame) loading = true
    if ( games.length === 0 && searchGame ) loading = true
    if (useFilter) loading = false

    let notFound = false
    if(searchGame && gameByName.msg) notFound = true
    if(games.length === 0 && useFilter) notFound = true

    return (
        <div>
            <Nav />
            <Search games= {games} />
                { loading && <Loading />}
                { games.length > 0 && <h5>{games.length} results</h5> }  
                { notFound ? <NotFound /> : (
                    currentGames?.map(e => (
                            <div key={e.id}>
                                <Link to={'/game/' + e.id }>
                                    <Card
                                    name={e.name}
                                    img={e.img}
                                    rating={e.rating}
                                    genres={e.genres}
                                    platforms={e.platforms}
                                    />
                                </Link>
                            </div>                           
                    ))
                )}
        { !gameByName.msg && <Pagination games = {games.length} gamesPerPage = {gamesPerPage} />}
        </div>
    )
};
