import './bootstrap';
import { BrowseerRouter, Route, Routes } from 'react-router-dom';

import { URL_CONST } from 'constants/urlConst.js'

function App() {
    return (
        <>
        <Header />
        <BrowseerRouter>
            <Routes>
                <Route path={URL_CONST.HOME} element={<Home />} /> 
                <Route path={URL_CONST.SIGNUP} element={<Signup />} /> 
                <Route path={URL_CONST.LOGIN} element={<Login />} /> 
            </Routes>
        </BrowseerRouter>
        </>
    );
}

const rootElement = document.getElementById("app");
if(rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(<App />)
}