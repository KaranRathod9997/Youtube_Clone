import React, { useEffect, useState } from 'react'
import './Recommended.css'
import { API_KEY, value_converter } from '../../Data'
import { data, Link } from 'react-router-dom'

function Recommended({ categoryId }) {

    const [apiData, setApiData] = useState([])

    const fetchData = async () => {
        const relaatedVideo_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=45&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}
`

        await fetch(relaatedVideo_url).then(res => res.json(data)).then(data => setApiData(data.items))

    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            <div className="recommmended">
                {apiData.map((item, index) => {
                    return (<Link to={`/video/${item.snippet.categoryId}/${item.id}`} key={index} className="side-video-list">
                        <img src={item.snippet.thumbnails.medium.url} alt="" />
                        <div className="vid-info">
                            <h4>{item.snippet.title}</h4>
                            <p>{item.snippet.channelTitle}</p>
                            <p>{value_converter(item.statistics.viewCount)} Views</p>
                        </div>
                    </Link>)
                })}


            </div>
        </>
    )
}

export default Recommended



