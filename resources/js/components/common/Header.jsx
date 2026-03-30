import URL_CONST from '../../constants/urlConst.js';

const Header = () => {
    return(
        <header>
            <div className="header-wrapper">
                <a href={URL_CONST.LOGIN}>ログイン</a>
            </div>
        </header>
    );
}

export default Header;