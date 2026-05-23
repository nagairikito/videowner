import { useState, useEffect } from 'react';
import Bean from '../../constants/bean';
import API_URL_CONST from '../../constants/apiUrlConst';

const VideoList = () => {

    const [videoList, setVideoList] = useState({});
    const [errMsg, setErrMsg] = useState({});

    useEffect(() => {
        Bean.fetchGetApi(API_URL_CONST.VIDEO_LIST)
        .then((res) => {
            if(res.ok) {
                const resResult = res.json();
                setVideoList(resResult);
            } else {
                setErrMsg(res.json());
            }
        })
    }, []);

    return (
        <>
        <h2>動画一覧</h2>
        </>
    );
}

export default VideoList;