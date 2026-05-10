import { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { AuthContext } from '../../app.jsx';
import URL_CONST from '../../constants/urlConst.js';

const Header = () => {
    const { loginUserRes, setLoginUserRes } = useContext(AuthContext);

    return(
        <header>
            <div className="header-wrapper">
                { loginUserRes?.loginUser?.loginId ?
                    <div>
                        <div>{loginUserRes.loginUser.userName}</div> 
                        <Link to={URL_CONST.POST_MOVIE}>動画投稿</Link>
                    </div>
                : 
                    <Link to={URL_CONST.LOGIN}>ログイン</Link>
                }
            </div>
        </header>
    );
}

export default Header;