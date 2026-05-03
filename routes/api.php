<?php

use Illuminate\Support\Facades\Route;
use App\Constants\UrlConst;
use App\Http\Controllers\SignupController;
use App\Http\Controllers\LoginController;

Route::post(UrlConst::SIGNUP, [SignupController::class, 'signup']);
Route::post(UrlConst::LOGIN, [LoginController::class, 'login']);