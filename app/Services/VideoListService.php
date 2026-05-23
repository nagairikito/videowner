<?php

namespace App\Services;

use App\Repositories\PostVideoRepository;
use App\Repositories\ThumbnailRepository;
use App\Repositories\VideoRepository;
use App\Constants\Message;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use App\Constants\Bean;

/**
 * ログイン Service
 */
class VideoListService extends Service {
    
    /** Repository */
    private PostVideoRepository $postVideoRep;
    private ThumbnailRepository $thumbnailRep;
    private VideoRepository $videoRep;

    /**
     * コンストラクタ
     */
    public function __construct(PostVideoRepository $postVideoRep, ThumbnailRepository $thumbnailRep, VideoRepository $videoRep) {
        $this->postVideoRep = $postVideoRep;
        $this->thumbnailRep = $thumbnailRep;
        $this->videoRep = $videoRep;
    }

    /**
     * 動画一覧取得
     * 
     * @param mixed $data 入力情報
     * @return array 登録結果(成功：true、失敗：false), 成功：ユーザー情報、失敗：エラーメッセージ
     */
    public function getVideoList(array $data) : array {


        
    }
}
