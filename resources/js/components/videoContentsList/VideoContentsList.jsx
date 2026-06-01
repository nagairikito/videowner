import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Bean from '../../constants/bean';
import API_URL_CONST from '../../constants/apiUrlConst';
import URL_CONST from '../../constants/urlConst';

const VideoContentsList = () => {

    const [videoContentsList, setVideoContentsList] = useState({});
    const [errMsg, setErrMsg] = useState({});

    useEffect(() => {
        Bean.fetchGetApi(API_URL_CONST.VIDEO_CONTENTS_LIST)
        .then(async (res) => {
            if(res.ok) {
                const resResult = await res.json();
                setVideoContentsList(resResult);
            } else {
                setErrMsg(res.json());
            }
        })
    }, []);

    return (
        <>
        <h2>動画一覧</h2>
        <div className="video-contents-list">
            {videoContentsList.length > 0 && 
                videoContentsList.map((contents, key) => (
                    <div className="video-contents" key={key}>
                        <Link to={URL_CONST.VIDEO_CONTENTS_DETAIL + "?id=" + contents.videoId}>
                            <img src={contents.thumbnailPath} />
                            <p>{contents.title}</p>
                        </Link>
                    </div>
                ))
            }
        </div>
        </>
    );
}

export default VideoContentsList;