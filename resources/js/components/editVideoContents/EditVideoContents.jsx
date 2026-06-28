import { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';

import { AuthContext } from '../../app.jsx';
import Bean from '../../utils/bean.jsx';
import API_URL_CONST from '../../constants/apiUrlConst.js';
import URL_CONST from '../../constants/urlConst.js';
import EditVideoFormValidation from '../../validations/EditVideoFormValidation.jsx';


const EditVideoContents = () => {

    const initialForm = {
        videoContentsId: '',
        title: '',
        thumbnail: {
            name: '',
            file: '',
            path: '',
        },
        video: {
            name: '',
            file: '',
            path: '',
        },
        publishedFlag: null,
    }
    
    const { loginUserRes } = useContext(AuthContext);
    const [searchParams] = useSearchParams();
    const videoContentsId = searchParams.get('id');
    const navigate = useNavigate();
    const isFirstRender = useRef(true);
    const isFirstSubmit = useRef(true);
    const [form, setForm] = useState(initialForm);
    const [validMsgs, setValidMsgs] = useState({});
    const [errMsg, setErrMsg] = useState("");


    useEffect(() => {
        // 動画コンテンツを取得する
        Bean.fetchGetApi(API_URL_CONST.VIDEO_CONTENTS_DETAIL(videoContentsId))
        .then(async (res) => {
            const videoContentsRes = await res.json();

            if(loginUserRes?.loginUser?.id != videoContentsRes?.video.userId ) {
                setErrMsg({'errMsg': 'エラー'});
                return;
            }

            if(res.ok) {
                let data = {
                    videoContentsId: videoContentsRes.video.videoContentsId,
                    title: videoContentsRes.video.title,
                    thumbnail: {
                        name: videoContentsRes.video.thumbnailName,
                        file: '',
                        path: videoContentsRes.video.thumbnailPath,
                    },
                    video: {
                        name: videoContentsRes.video.videoName,
                        file: '',
                        path: videoContentsRes.video.videoPath,
                    },
                    publishedFlag: videoContentsRes.video.publishedFlag == 1 ? true : false,
                };
                setForm(data);
            } else {
                setErrMsg(videoContentsRes);
            }
        })
    }, [videoContentsId]);

    useEffect(() => {
        if(isFirstRender) {
            isFirstRender.current = false;
            return;
        }
        if(isFirstSubmit) {
            isFirstRender.current = false;
            return;
        }

        const resultValidMsgs = EditVideoFormValidation(form);
        setValidMsgs(resultValidMsgs);
        
    }, [form]);


    const handleChange = (e) => {

        const condition = e.target.type === "file" && e.target.name === "thumbnail" || e.target.type === "file" && e.target.name === "video";

        if(condition) {
            const inputFile = e.target.files[0];

            setForm({
                ...form,
                [e.target.name]: {
                    name: inputFile.name,
                    file: inputFile,
                    path: '',
                }
            });
        } else if(e.target.name === "publishedFlag") {
            setForm({
                ...form,
                [e.target.name]: e.target.checked,
            });
        } else {
            setForm({
                ...form,
                [e.target.name]: e.target.value,
            });
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(isFirstSubmit) isFirstSubmit.current = false;

        // バリデーション
        const resultValidMsgs = EditVideoFormValidation(form);

        if(Object.keys(resultValidMsgs).length > 0) {
            setValidMsgs(resultValidMsgs);
            return;
        }

        const response = await Bean.fecthPostFileApi(API_URL_CONST.EDIT_VIDEO_CONTENTS, form);
        if(response.ok) {
            navigate(URL_CONST.PROFILE + '?id=' + loginUserRes.loginUser.id);
        } else {
            const errorMsg = await response.json();
            setErrMsg(errorMsg.resErrMsg);
        }

    }

    return(
        <>
            <div>動画投稿フォーム</div>
            <form>
                <div>
                    <div htmlFor="title">動画タイトル</div>
                    <input type="text" id="title" name="title" value={form.title} onChange={handleChange}/>
                    { (validMsgs.title?.length > 0) && validMsgs.title.map((msg, key) => (
                        <div key={key}>{msg}</div>
                    ))}
                </div>
                <div>
                    <div htmlFor="thumbnail">サムネイル</div>
                    {form?.thumbnail?.path != '' &&
                    <>
                        <img src={form.thumbnail.path} />
                    </>
                    }
                    <button>変更する</button>
                    <input type="file" accept="image/*" id="thumbnail" name="thumbnail" onChange={handleChange} />
                    { (validMsgs.thumbnail?.length > 0) && validMsgs.thumbnail.map((msg, key) => (
                        <div key={key}>{msg}</div>
                    ))}
                </div>
                <div>
                    <div htmlFor="video">動画ファイル</div>
                    {form?.video?.path != '' &&
                        <video controls>
                            <source src={form.video.path} type="video/mp4" />
                        </video>
                    }
                    <button>変更する</button>
                    <input type="file" accept="video/*" id="video" name="video" onChange={handleChange} />
                    { (validMsgs.contents?.length > 0) && validMsgs.contents.map((msg, key) => (
                        <div key={key}>{msg}</div>
                    ))}
                </div>
                <div>
                    <p>公開/非公開</p>
                    <input type="checkbox" name="publishedFlag" checked={form.publishedFlag} onChange={handleChange} />
                </div>
                <div>
                    <input type="submit" value="投稿" onClick={handleSubmit} />
                </div>
            </form>
        </>
    );
}

export default EditVideoContents;