import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getGameDetail, cleanGameDetail, getGames, cleanAllFilters, gameUpdate } from '../redux/actions';
import { NotFound } from './NotFound'
import { Loading } from './Loading'
import { deleteGame } from '../helpers/deleteGame';
import './GameDetail.css'

export const GameDetail = (props) => {

    const dispatch = useDispatch();
    const history = useHistory()
    const gameDetail = useSelector(state => state.gameDetail)

    const id = props.match.params.id
    const idDb = id.length === 36
    
    useEffect(()=> {
        dispatch(getGameDetail(id))
        return () => { 
            dispatch(cleanGameDetail({}))
        }
    }, [dispatch, id]);

    const handleUpdate = () => {
        dispatch(gameUpdate(gameDetail));
    };

    const handleDelete = () => {
        deleteGame(id);
        dispatch(getGames());
        dispatch(cleanAllFilters());
        history.push('/home');
    };

    const modifyDescription = () => {
        return {__html: gameDetail?.description};
    }

    let loading = false
    if (!Object.keys(gameDetail).length) loading = true;

    if (gameDetail.msg) return <NotFound />
    
    return (
        <>
            { loading ? <Loading /> :          
                <div>
                    <button><Link to='/home'>Back</Link></button>
                    <h3>{gameDetail?.name}</h3><br />      
                    <img src={gameDetail?.img} alt={gameDetail?.name} />                           
                    <span>Rating </span>
                    { gameDetail.rating && <span>{gameDetail.rating}</span> }
                    <span>Released </span>
                    { gameDetail.released && <span>{gameDetail.released}</span> }
                    <span>Genres</span>
                    { gameDetail.genres?.map((g, i) => {
                        if (typeof gameDetail.genres[0] === 'string') {
                            if(i === 0) {
                                return <span key={i}>{g}</span>
                            } else {
                                return <span key={i}><span> | </span><span>{g}</span></span>
                            }
                        } else {
                            if(i === 0) {
                                return <span key={i}>{g.name}</span>
                            } else {
                                return <span key={i}><span> | </span><span>{g.name}</span></span>
                            }
                        }
                    })}
                    <span>Platforms</span>
                    { gameDetail.platforms?.map((p, i) => {
                        if (i === 0) {
                            return <span key={i}>{p}</span>
                        }
                        return (
                        <span key={i} >{p}</span>
                        )
                    })}
                    <span>Description</span>
                    <div dangerouslySetInnerHTML={modifyDescription()} />
                </div> 
            }
            {idDb && 
                <div >
                    <Link to={`/game/${id}/update`}>
                    <button type="button" onClick={handleUpdate}>Update</button>
                    </Link>
                    <button type="button" onClick={handleDelete}>Delete</button>
                </div>
            }
        </>
    )
};