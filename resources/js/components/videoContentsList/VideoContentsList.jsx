import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Bean from '../../utils/bean';
import API_URL_CONST from '../../constants/apiUrlConst';
import URL_CONST from '../../constants/urlConst';
import VideoContentslistParts from '../videoContentsListParts/VideoContentsListParts';
import Loading from '../loading/Loading';

const VideoContentsList = () => {

    const [videoContentsList, setVideoContentsList] = useState([]);
    const [errMsg, setErrMsg] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Bean.fetchGetApi(API_URL_CONST.VIDEO_CONTENTS_LIST)
        .then(async (res) => {
            const resResult = await res.json();
            if(res.ok) {
                setVideoContentsList(resResult);
                console.log(resResult)

            } else {
                setErrMsg(resResult);
            }
        });

        setLoading(false);
    }, []);

    if(loading) {
        return (
            <Loading />
        );
    }

    return (
        <>
            <h2>動画一覧</h2>
            <VideoContentslistParts list={videoContentsList} />
        </>
    );
}

export default VideoContentsList;