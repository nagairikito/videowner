<?php

use Illuminate\Support\Facades\Route;
use App\Constants\UrlConst;
use App\Http\Controllers\SignupController;

Route::post(UrlConst::SIGNUP, [SignupController::class, 'signup']);