import { useContext } from 'react';

import { AuthContext } from '../../app.jsx';
import URL_CONST from '../../constants/urlConst.js';

const Header = () => {
    const { loginUser } = useContext(AuthContext);
    
    return(
        <header>
            <div className="header-wrapper">
                { loginUser?.userName ?
                    <span>{loginUser.userName}</span> 
                : 
                    <a href={URL_CONST.LOGIN}>ログイン</a>
                }
                {/* <a href={URL_CONST.LOGIN}>ログイン</a> */}
            </div>
        </header>
    );
}

export default Header;