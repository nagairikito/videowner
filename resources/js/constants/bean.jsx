/**
 * 共通処理オブジェクト
 */
const Bean = {

    /**
     * APIにアクセス
     * 
     * @param {string} url 
     * @param {Object} data 
     * @returns 
     */
    fetchApi: async (url, data) => {
        const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
        );
        return response;
    }
};


export default Bean;