import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Bean from '../../utils/bean';
import API_URL_CONST from '../../constants/apiUrlConst';
import URL_CONST from '../../constants/urlConst';

const VideoContentsDetail = () => {

    const [searchParam] = useSearchParams();
    const videoId = searchParam.get('id');

    const [videoContentsDetail, setVideoContentsDetail] = useState({});
    const [errMsg, setErrMsg] = useState({});

    useEffect(() => {
        Bean.fetchGetApi(API_URL_CONST.VIDEO_CONTENTS_DETAIL(videoId))
        .then(async (res) => {
            if(res.ok) {
                const resResult = await res.json();
                setVideoContentsDetail(resResult);
            } else {
                setErrMsg(res.json());
            }
        })
    }, []);

    return (
        <>
            {Object.keys(videoContentsDetail).length > 0 &&
            <>
                <div>{videoContentsDetail?.video?.title}</div>
                <video controls>
                    <source src={videoContentsDetail?.video?.videoPath} type="video/mp4" />
                </video>
            </>
            }
        </>
    );
}

export default VideoContentsDetail;