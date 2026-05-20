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
class PostVideoService extends Service {
    
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
     * 動画投稿
     * 
     * @param array $data 入力情報
     * @return array 登録結果(成功：true、失敗：false), 成功：ユーザー情報、失敗：エラーメッセージ
     */
    public function postVideo(array $data) : array {
        $thumbnailPath = null;
        $videoPath = null;

        try {
            DB::transaction(function() use ($data) {
                $videoPost = $this->postVideoRep->postVideo($data);

                $data['videoPostId'] = $videoPost->id;
                $thumbnailPath = Bean::storeNamedFileToStorage($data['thumbnail']['file'], 'thumbnail',$data['thumbnail']['name']);
                $videoPath = Bean::storeNamedFileToStorage($data['video']['file'], 'video',$data['video']['name']);

                $data['thumbnail']['file'] = $thumbnailPath;
                $data['videoPath']['file'] = $videoPath;

                $this->thumbnailRep->registerThumbnail($data);
                $this->videoRep->registerVideo($data);
            });
            
            return [true, '処理成功'];
        } catch(Exception $e) {
            Log::error($e);
            if($thumbnailPath && Storage::disk('public')->exists($thumbnailPath)) {
                Storage::disk('public')->delete($thumbnailPath);
            }
            if($videoPath && Storage::disk('public')->exists($videoPath)) {
                Storage::disk('public')->delete($videoPath);
            }

            return [false, $e];
        }
    }
}
