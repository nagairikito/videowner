import { useContext } from 'react';

import { AuthContext } from '../../app.jsx';
import URL_CONST from '../../constants/urlConst.js';

const Header = () => {
    const { loginUserRes, setLoginUserRes } = useContext(AuthContext);

    return(
        <header>
            <div className="header-wrapper">
                { loginUserRes?.loginUser?.userName ?
                    <div>{loginUserRes.loginUser.userName}</div> 
                : 
                    <a href={URL_CONST.LOGIN}>ログイン</a>
                }
            </div>
        </header>
    );
}

export default Header;