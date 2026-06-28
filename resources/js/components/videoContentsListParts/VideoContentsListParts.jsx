import './css/VideoContentslistParts.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Bean from '../../utils/bean';
import API_URL_CONST from '../../constants/apiUrlConst';
import URL_CONST from '../../constants/urlConst';

const VideoContentslistParts = ({list, deleteVideoContents, loginUserRes}) => {
console.log(loginUserRes)
    return (
        <div className="video-contents-list">
            {list?.length > 0 && 
                list.map((contents, key) => (
                    <div className="video-contents-unit" key={key}>
                        <Link to={URL_CONST.VIDEO_CONTENTS_DETAIL + "?id=" + contents.videoId} className="contents">
                            <img src={contents.thumbnailPath} />
                            <p>{contents.title}</p>
                            <p>{contents.updatedAt}</p>
                        </Link>
                        <Link to={URL_CONST.PROFILE + "?id=" + contents.userId} className="user">
                            <p>{contents.userName}</p>
                        </Link>
                        {loginUserRes?.loginUser.id == contents.userId &&
                        <>
                            <button>
                                <Link to={URL_CONST.EDIT_VIDEO_CONTENTS + "?id=" + contents.videoContentsId}>編集</Link>
                            </button>
                            <button onClick={() => deleteVideoContents(contents.videoId)}>
                                削除
                            </button>
                        </>
                        }
                    </div>
                ))
            }
        </div>
    );
}

export default VideoContentslistParts;