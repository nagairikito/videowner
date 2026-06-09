<?php

namespace App\Http\Controllers;

use App\Constants\Message;
use App\Helpers\ResponseHelper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use App\Services\VideoContentsService;
use App\Repositories\UserRepository;

/**
 * プロフィール Contorller
 */
class ProfileController extends Controller {
    
    /** Service */
    private VideoContentsService $videoContentsService;

    /** Repository */
    private UserRepository $userRepository;

    /**
     * コンストラクタ
     */
    public function __construct(VideoContentsService $videoContentsService, UserRepository $userRepository) {
        $this->videoContentsService = $videoContentsService;
        $this->userRepository = $userRepository;
    }

    /**
     * プロフィール
     * 
     */
    public function getProfile(Request $request) {
        $userId = $request->query('user_id');
        $conditions = ['userIds' => [$userId]];

        $user = $this->userRepository->getUserById($userId);
        $videoContentsList = $this->videoContentsService->getVideoContentsList($conditions);

        $data = [
            'user' => $user,
            'videoContentsList' => $videoContentsList,
        ];

        return ResponseHelper::responseSuccess($data);
    }

}
