<?php

namespace App\Services;

use App\Repositories\VideoContentsRepository;
use App\Repositories\ThumbnailRepository;
use App\Repositories\VideoRepository;
use App\Constants\Message;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use App\Constants\Bean;

/**
 * 動画コンテンツ Service
 */
class VideoContentsService extends Service {
    
    /** Repository */
    private VideoContentsRepository $videoContentsRep;
    private ThumbnailRepository $thumbnailRep;
    private VideoRepository $videoRep;

    /**
     * コンストラクタ
     */
    public function __construct(VideoContentsRepository $videoContentsRep, ThumbnailRepository $thumbnailRep, VideoRepository $videoRep) {
        $this->videoContentsRep = $videoContentsRep;
        $this->thumbnailRep = $thumbnailRep;
        $this->videoRep = $videoRep;
    }

    /**
     * 動画コンテンツ一覧取得
     * 
     * @return array 動画コンテンツ一覧
     */
    public function getVideoContentsList() {
        $processedList = [];

        $videoContentsList = $this->videoContentsRep->getVideoContentsList();
        if($videoContentsList != []) {
            foreach($videoContentsList as $data) {
                $processedData = [
                    'videoContentsId' => $data['id'],
                    'title' => $data['title'],
                    'updatedAt' => $data['updated_at'],
                    'thumbnailName' => $data['thumbnail_name'],
                    'thumbnailPath' => $data['thumbnail_path'],
                    'videoId' => $data['video_id'],
                    'videoName' => $data['video_name'],
                    'videoPath' => $data['video_path'],
                    'userId' => $data['user_id'],
                    'userName' => $data['user_name'],
                ];

                $processedList[] = $processedData;
            }
        }

        return $processedList;
    }

    /**
     * 動画コンテンツ詳細取得
     * 
     * @param int $id 動画id 
     * @return array 動画コンテンツ一覧
     */
    public function getVideoContentsDetail(int $id) {
        $contentsData = [];

        $videoContentsDetail = $this->videoContentsRep->getVideoContentsDetail($id);
        if($videoContentsDetail != []) {
            $processedData = [
                'videoContentsId' => $videoContentsDetail['id'],
                'title' => $videoContentsDetail['title'],
                'updatedAt' => $videoContentsDetail['updated_at'],
                'thumbnailName' => $videoContentsDetail['thumbnail_name'],
                'thumbnailPath' => $videoContentsDetail['thumbnail_path'],
                'videoId' => $videoContentsDetail['video_id'],
                'videoName' => $videoContentsDetail['video_name'],
                'videoPath' => $videoContentsDetail['video_path'],
                'userId' => $videoContentsDetail['user_id'],
                'userName' => $videoContentsDetail['user_name'],
            ];

            $contentsData['video'] = $processedData;
        }

        return $contentsData;
    }

    /**
     * 動画投稿
     * 
     * @param array $data 入力情報
     * @return array 登録結果(成功：true、失敗：false), 成功：ユーザー情報、失敗：エラーメッセージ
     */
    public function registerVideoContents(array $data) : array {
        $thumbnailPath = null;
        $videoPath = null;

        try {
            DB::transaction(function() use ($data, $thumbnailPath, $videoPath) {
                $videoContents = $this->videoContentsRep->registerVideoContents($data);

                $data['videoContentsId'] = $videoContents->id;
                $thumbnailPath = Bean::storeNamedFileToStorage($data['thumbnail']['file'], 'thumbnail', $data['thumbnail']['name']);
                $videoPath = Bean::storeNamedFileToStorage($data['video']['file'], 'video', $data['video']['name']);

                $data['thumbnail']['file'] = $thumbnailPath;
                $data['video']['file'] = $videoPath;
Log::info($data);
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
