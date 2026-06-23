/**
 * 動画投稿フォームバリデーション
 * 
 * @param {Object} data フォームの入力情報
 * @return {Array} バリデーションメッセージ
 */
const PostVideoFormValidation = (data) => {

    // バリデーションメッセージ
    let validMesgs = {};

    // タイトル
    if(data.title.trim() === "" || data.title === "undefined"
    || data.title.length > 255) {
        validMesgs = Bean.addValue(validMesgs, 'title', MESSAGE.SIGNUP.USER_NAME.REQUIRED);
    }
    if (!/^[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}a-zA-Z0-9._-]+$/u.test(data.title)) {
        validMesgs = Bean.addValue(validMesgs, 'title', MESSAGE.SIGNUP.USER_NAME.CHARTYPE);
    }

    // サムネイル
    if(data.thumbnail.file !== "") {
        if (!data.thumbnail.file.type.startsWith('image/')) {
            validMesgs = Bean.addValue(validMesgs, 'thumbnail', MESSAGE.POST_VIDEO.THUMBNAIL.FILE.MIMETYPE);
        }
        if(data.thumbnail.name.trim() === "" || data.thumbnail.name === "undefined"
        || data.thumbnail.name.length > 255) {
            validMesgs = Bean.addValue(validMesgs, 'thumbnail', MESSAGE.POST_VIDEO.THUMBNAIL.NAME.REQUIRED);
        }
        if (!/^[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}a-zA-Z0-9._-]+$/u.test(data.thumbnail.name)) {
            validMesgs = Bean.addValue(validMesgs, 'thumbnail', MESSAGE.POST_VIDEO.THUMBNAIL.NAME.CHARTYPE);
        }
    }

    // 動画
    if(data.video.file === "") {
        validMesgs = Bean.addValue(validMesgs, 'video', MESSAGE.POST_VIDEO.VIDEO.FILE.REQUIRED);
    } else {
        if (!data.video.file.type.startsWith('video/')) {
            validMesgs = Bean.addValue(validMesgs, 'video', MESSAGE.POST_VIDEO.VIDEO.FILE.MIMETYPE);
        }
        if(data.video.name.trim() === "" || data.video.name === "undefined"
        || data.video.name.length > 255) {
            validMesgs = Bean.addValue(validMesgs, 'video', MESSAGE.POST_VIDEO.VIDEO.NAME.REQUIRED);
        }
        if (!/^[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}a-zA-Z0-9._-]+$/u.test(data.video.name)) {
            validMesgs = Bean.addValue(validMesgs, 'video', MESSAGE.POST_VIDEO.VIDEO.NAME.CHARTYPE);
        }
    }

    return validMesgs;
}

export default PostVideoFormValidation;
