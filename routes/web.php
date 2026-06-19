<?php

use Illuminate\Support\Facades\Route;
use App\Constants\UrlConst;
use App\Http\Controllers\LoginUserController;
use App\Http\Controllers\SignupController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\VideoContentsListController;
use App\Http\Controllers\VideoContentsDetailController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PostVideoContentsController;
use App\Http\Controllers\EditVideoContentsController;
use App\Http\Controllers\DeleteVideoContentsController;
use GuzzleHttp\Psr7\Request;

// ログインユーザーを取得、フロントに返却
Route::prefix('api')->group(function() {
    Route::get(UrlConst::LOGIN_USER, [LoginUserController::class, 'getLoginUser']); // ログインユーザー取得
    Route::get(UrlConst::VIDEO_CONTENTS_LIST, [VideoContentsListController::class, 'getVideoContentsList']); // 動画コンテンツ一覧
    Route::get(UrlConst::VIDEO_CONTENTS_DETAIL, [VideoContentsDetailController::class, 'getVideoContentsDetail']); // 動画詳細
    Route::get(UrlConst::PROFILE, [ProfileController::class, 'getProfile']); // プロフィール
    Route::post(UrlConst::SIGNUP, [SignupController::class, 'signup']); // 新規ユーザー登録
    Route::post(UrlConst::LOGIN, [AuthController::class, 'login']); // ログイン


    // 認証必要
    Route::middleware('auth')->group(function() {
        Route::post(UrlConst::LOGOUT, [AuthController::class, 'logout']); // ログアウト
        Route::post(UrlConst::POST_VIDEO, [PostVideoContentsController::class, 'registerVideoContents']); // 動画投稿
        Route::post(UrlConst::EDIT_VIDEO_CONTENTS, [EditVideoContentsController::class, 'editVideoContents']); // 動画コンテンツ編集
        Route::post(UrlConst::DELETE_VIDEO_CONTENTS, [DeleteVideoContentsController::class, 'deleteVideoContents']); // 動画コンテンツ削除
    });

});

Route::get('/{any}', function () {
    return view('app');
})->where('any', '.*');;
