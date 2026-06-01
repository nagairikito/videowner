import { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { AuthContext } from '../../app.jsx';
import Bean from '../../constants/bean.jsx';
import API_URL_CONST from '../../constants/apiUrlConst.js';
import URL_CONST from '../../constants/urlConst.js';


const PostVideo = () => {

    const initialForm = {
        'title': '',
        'thumbnail': {
            name: '',
            file: '',
        },
        'video': {
            name: '',
            file: '',
        },
    }
    
    const navigate = useNavigate();
    const isFirstRender = useRef(true);
    const isFirstSubmit = useRef(true);
    const [form, setForm] = useState(initialForm);
    const [validMsgs, setValidMsgs] = useState({});
    const [errMsg, setErrMsg] = useState("");

    const handleChange = (e) => {

        const condition = e.target.type === "file" && e.target.name === "thumbnail" || e.target.type === "file" && e.target.name === "video";

        if(condition) {
            const inputFile = e.target.files[0];

            setForm({
                ...form,
                [e.target.name]: {
                    name: inputFile.name,
                    file: inputFile,
                }
            });
        } else {
            setForm({
                ...form,
                [e.target.name]: e.target.value,
            });
        }
    }

    useEffect(() => {
        if(isFirstRender) {
            isFirstRender.current = false;
            return;
        }
        if(isFirstSubmit) {
            isFirstRender.current = false;
            return;
        }

        const resultValidMsgs = Bean.postVideoForm(form);
        setValidMsgs(resultValidMsgs);
        
    }, [form]);

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(isFirstSubmit) isFirstSubmit.current = false;

        // バリデーション
        const resultValidMsgs = Bean.postVideoForm(form);
        if(Object.keys(resultValidMsgs).length > 0) {
            setValidMsgs(resultValidMsgs);
            return;
        }

        const response = await Bean.fecthPostFileApi(API_URL_CONST.POST_VIDEO, form);
        if(response.ok) {
            navigate(URL_CONST.HOME);
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
                    <input type="text" id="title" name="title" onChange={handleChange}/>
                    { (validMsgs.title?.length > 0) && validMsgs.title.map((msg, key) => (
                        <div key={key}>{msg}</div>
                    ))}
                </div>
                <div>
                    <div htmlFor="thumbnail">サムネイル</div>
                    <input type="file" accept="image/*" id="thumbnail" name="thumbnail" onChange={handleChange} />
                    { (validMsgs.thumbnail?.length > 0) && validMsgs.thumbnail.map((msg, key) => (
                        <div key={key}>{msg}</div>
                    ))}
                </div>
                <div>
                    <div htmlFor="video">動画ファイル</div>
                    <input type="file" accept="video/*" id="video" name="video" onChange={handleChange} />
                    { (validMsgs.contents?.length > 0) && validMsgs.contents.map((msg, key) => (
                        <div key={key}>{msg}</div>
                    ))}
                </div>
                <div>
                    <input type="submit" value="投稿" onClick={handleSubmit} />
                </div>
            </form>
        </>
    );
}

export default PostVideo;