<?php

use Illuminate\Support\Facades\Route;
use App\Constants\UrlConst;
use App\Http\Controllers\LoginUserController;
use App\Http\Controllers\SignupController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\PostVideoController;
use GuzzleHttp\Psr7\Request;

// ログインユーザーを取得、フロントに返却
Route::get(UrlConst::LOGIN_USER, [LoginUserController::class, 'getLoginUser']);

Route::post(UrlConst::SIGNUP, [SignupController::class, 'signup']);
Route::post(UrlConst::LOGIN, [LoginController::class, 'login']);
Route::post(UrlConst::POST_VIDEO, [PostVideoController::class, 'postVideo']);
