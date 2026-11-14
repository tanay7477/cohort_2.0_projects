import {getSong} from '../service/song.api'
import { useContext, useEffect } from 'react'
import { SongContext } from '../song.context'

const useSong = () => {
    const {song, setSong, loading, setLoading} = useContext(SongContext)

    async function handleGetSong({mood}){
        setLoading(true)
        const data = await getSong({mood})
        setSong(data)
        setLoading(false)
    }

    return({song,  loading,  handleGetSong})

}