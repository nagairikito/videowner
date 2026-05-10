import { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { AuthContext } from '../app.jsx';
import Bean from '../constants/bean.jsx';


const PostMovie = () => {

    const initialForm = {
        'title': '',
        'thumbnail': {
            name: '',
            file: '',
        },
        'contents': {
            name: '',
            file: '',
        },
    }
    
    const isFirstRender = useRef(true);
    const isFirstSubmit = useRef(true);
    const [form, setForm] = useState(initialForm);
    const [validMsgs, setValidMsgs] = useState({});

    const handleChange = (e) => {

        const condition = e.target.type === "file" && e.target.name === "title" || e.target.type === "file" && e.target.name === "contents";

        if(condition) {
            setForm({
                ...form,
                [e.target.name]: {
                    name: e.target.name,
                    file: e.target.file[0],
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

        const resultValidMsgs = Bean.postMovieForm(form);
        setValidMsgs(resultValidMsgs)
    }, [form])

    const handleSubmit = (e) => {
        e.preventDefault();
        if(isFirstSubmit) isFirstSubmit.current = false;

        // バリデーション
        const resultValidMsgs = Bean.postMovieForm(form);
        if(Object.keys(resultValidMsgs).length > 0) {
            setValidMsgs(resultValidMsgs);
            return;
        }
    }

    return(
        <>
            <div>動画投稿フォーム</div>
            <form>
                <div>
                    <div htmlFor="title">動画タイトル</div>
                    <input type="text" id="title" name="title" onChange={handleChange}/>
                    { (validMsgs.title?.length > 0) && validMsgs.title.map((key, msg) => (
                        <div key={key}>{msg}</div>
                    ))}
                </div>
                <div>
                    <div htmlFor="thumbnail">サムネイル</div>
                    <input type="file" accept="image/*" id="thumbnail" name="thumbnail" onChange={handleChange} />
                    { (validMsgs.thumbnail?.length > 0) && validMsgs.thumbnail.map((key, msg) => (
                        <div key={key}>{msg}</div>
                    ))}
                </div>
                <div>
                    <div htmlFor="contents">動画ファイル</div>
                    <input type="file" accept="video/*" id="contents" name="contents" onChange={handleChange} />
                    { (validMsgs.contents?.length > 0) && validMsgs.contents.map((key, msg) => (
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

export default PostMovie;