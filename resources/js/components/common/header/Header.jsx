import { useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { AuthContext } from '../../../app.jsx';
import URL_CONST from '../../../constants/urlConst.js';

const Header = () => {
    const { loginUserRes, setLoginUserRes, authLoading } = useContext(AuthContext);

    return(
        <header>
            <div className="header-wrapper">
                {!authLoading &&
                <>
                { loginUserRes?.loginUser?.id ?
                    <div>
                        <Link to={URL_CONST.PROFILE + "?id=" + loginUserRes?.loginUser?.id}>{loginUserRes.loginUser.userName}</Link> 
                        <Link to={URL_CONST.POST_VIDEO}>動画投稿</Link>
                    </div>
                : 
                    <Link to={URL_CONST.LOGIN}>ログイン</Link>
                }
                </>
                }
            </div>
        </header>
    );
}

export default Header;