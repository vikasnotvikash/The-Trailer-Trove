import axios from '../../utils/axios'
import { loadmovie }  from '../reducers/movieSlice'

export const asyncloadMovie = (id) => async (dispatch , getState) => {
    try
    {
        const detail = await axios.get(`/movie/${id}`)
        const externalId = await axios.get(`/movie/${id}/external_ids`)
        const recommendations = await axios.get(`/movie/${id}/recommendations`)
        const similar = await axios.get(`/movie/${id}/similar`)
        const videos = await axios.get(`/movie/${id}/videos`)
        const watchproviders = await axios.get(`/movie/${id}/watch/providers`)
        const translations = await axios.get(`/movie/${id}/translations`)

        let theultimatedetails = {
            detail: detail.data,
            externalId: externalId.data,
            recommendations: recommendations.data.results,
            similar: similar.data.results,
            translations:translations.data.translations.map((e)=> e.english_name ),
            videos: videos.data.results.find((e) => e.type === 'Trailer'),
            watchproviders: watchproviders.data.results.IN
        }
        console.log(theultimatedetails)
        dispatch(loadmovie(theultimatedetails))
    }
    catch(e)
    {
        console.log("Error : ", e);
    }
}