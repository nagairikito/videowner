import { useContext } from 'react';

import { AuthContext } from '../../app.jsx';
import URL_CONST from '../../constants/urlConst.js';

const Header = () => {
    const { loginUser } = useContext(AuthContext);
    console.log(loginUser)
    return(
        <header>
            <div className="header-wrapper">
                { loginUser.userName ?
                    <div>{loginUser.userName}</div> 
                : 
                    <a href={URL_CONST.LOGIN}>ログイン</a>
                }
            </div>
        </header>
    );
}

export default Header;