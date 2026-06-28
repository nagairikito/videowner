<?php

namespace App\Services;

use App\Repositories\VideoContentsRepository;
use App\Repositories\ThumbnailRepository;
use App\Repositories\VideoRepository;
use App\Constants\Message;
use App\Constants\Bean;
use App\Helpers\StorageHelper;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

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
    public function getVideoContentsList(array $conditions = []) {
        $processedList = [];

        $videoContentsList = $this->videoContentsRep->getVideoContentsList($conditions);
        if($videoContentsList != []) {
            foreach($videoContentsList as $data) {
                $processedData = [
                    'videoContentsId' => $data['id'],
                    'title' => $data['title'],
                    'updatedAt' => $data['updated_at'],
                    'thumbnailName' => $data['thumbnail_name'],
                    'thumbnailPath' => asset('storage/' . $data['thumbnail_path']),
                    'videoId' => $data['video_id'],
                    'videoName' => $data['video_name'],
                    'videoPath' => asset('storage/' . $data['video_path']),
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
                'thumbnailId' => $videoContentsDetail['thumbnail_id'],
                'publishedFlag' => $videoContentsDetail['published_flag'],
                'thumbnailName' => $videoContentsDetail['thumbnail_name'],
                'thumbnailPath' => asset('storage/' . $videoContentsDetail['thumbnail_path']),
                'videoId' => $videoContentsDetail['video_id'],
                'videoName' => $videoContentsDetail['video_name'],
                'videoPath' => asset('storage/' . $videoContentsDetail['video_path']),
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
                $data['thumbnail']['name'] = Bean::generateAlphanumeric() . '_' . $data['thumbnail']['name'];
                $data['video']['name'] = Bean::generateAlphanumeric() . '_' . $data['video']['name'];
                $videoContents = $this->videoContentsRep->registerVideoContents($data);

                $data['videoContentsId'] = $videoContents->id;
                $thumbnailPath = StorageHelper::storeNamedFileToStorage($data['thumbnail']['file'], 'thumbnail', $data['thumbnail']['name']);
                $videoPath = StorageHelper::storeNamedFileToStorage($data['video']['file'], 'video', $data['video']['name']);

                $data['thumbnail']['file'] = $thumbnailPath;
                $data['video']['file'] = $videoPath;

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

    /**
     * 動画コンテンツ編集
     * 
     * @param array $data 入力情報
     * @return array 登録結果(成功：true、失敗：false), 成功：ユーザー情報、失敗：エラーメッセージ
     */
    public function editVideoContents(array $data) : array {
        $thumbnailPath = null;
        $videoPath = null;

        try {
            DB::transaction(function() use ($data, $thumbnailPath, $videoPath) {
                $target = $this->getVideoContentsDetail($data['videoContentsId']);
                $data['thumbnail']['id'] = $target['video']['thumbnailId'];
                $data['video']['id'] = $target['video']['videoId'];

                $this->videoContentsRep->updateVideoContents($data);

                if($data['thumbnail']['file'] != null || $data['thumbnail']['file'] != '' && $data['thumbnail']['path'] == '') {
                    $thumbnailName = Bean::generateAlphanumeric() . '_' . $data['thumbnail']['name'];
                    $thumbnailPath = StorageHelper::storeNamedFileToStorage($data['thumbnail']['file'], 'thumbnail', $thumbnailName);
                    $data['thumbnail']['file'] = $thumbnailPath;
                } else {
                    $path = Bean::getWordFromTarget('thumbnail/', $data['thumbnail']['path']);
                    $data['thumbnail']['file'] = $path;
                }
                $this->thumbnailRep->updateThumbnail($data);

                if($data['video']['file'] != null || $data['video']['file'] != '' && $data['video']['path'] == '') {
                    $videoName = Bean::generateAlphanumeric() . '_' . $data['video']['name'];
                    $videoPath = StorageHelper::storeNamedFileToStorage($data['video']['file'], 'video', $videoName);
                    $data['video']['file'] = $videoPath;
                } else {
                    $path = Bean::getWordFromTarget('video/', $data['video']['path']);
                    $data['video']['file'] = $path;
                }
                $this->videoRep->updateVideo($data);

                if($data['thumbnail']['file'] != '' && $data['thumbnail']['path'] == '') {
                    $targetThumbnailPath = Bean::getWordFromTarget('thumbnail/', $target['video']['thumbnailPath']);
                    StorageHelper::deleteFileFromStorage($targetThumbnailPath);
                }
                
                if($data['video']['file'] != '' && $data['video']['path'] == '') {
                    $targetVideoPath = Bean::getWordFromTarget('video/', $target['video']['videoPath']);
                    StorageHelper::deleteFileFromStorage($targetVideoPath);
                }
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

    /**
     * 動画コンテンツ削除(ハードデリート)
     * 
     * @param array $data 入力情報
     * @return array 登録結果(成功：true、失敗：false), 成功：ユーザー情報、失敗：エラーメッセージ
     */
    public function deleteVideoContents(array $data) : array {
        $target = $this->videoContentsRep->getVideoContentsDetail($data['videoContentsId']);

        if(!$target) {
            return [false, Message::DELETE_VIDEO_CONTENTS["NOT_FOUND_VIDEO_CONTENTS"]];
        }

        if($target['user_id'] != Auth::id()) {
            return [false, Message::DELETE_VIDEO_CONTENTS["MISMATCH_USER_ID"]];
        }

        try {
            DB::transaction(function () use ($target) {

                $this->videoContentsRep->deleteVideoContents($target['id']);
                $this->thumbnailRep->deleteThumbnail($target['thumbnail_id']);
                $this->videoRep->deleteVideo($target['video_id']);

                StorageHelper::deleteFileFromStorage($target['thumbnail_path']);
                StorageHelper::deleteFileFromStorage($target['video_path']);
            });
        } catch(Exception $e) {
            Log::error($e->getMessage());
            return [false, Message::DELETE_VIDEO_CONTENTS["DELETE_FAIL"]];
        }

        return [true, Message::DELETE_VIDEO_CONTENTS["DELETE_SUCCESS"]];
    }

    /**
     * 動画コンテンツ削除(ソフトデリート)
     * 
     * @param array $data 入力情報
     * @return array 登録結果(成功：true、失敗：false), 成功：ユーザー情報、失敗：エラーメッセージ
     */
    public function softDeleteVideoContents(array $data) : array {
        $target = $this->videoContentsRep->getVideoContentsDetail($data['videoContentsId']);

        if(!$target) {
            return [false, Message::DELETE_VIDEO_CONTENTS["NOT_FOUND_VIDEO_CONTENTS"]];
        }

        if($target['user_id'] != Auth::id()) {
            return [false, Message::DELETE_VIDEO_CONTENTS["MISMATCH_USER_ID"]];
        }

        try {
            DB::transaction(function () use ($target) {
                $this->videoContentsRep->softDeleteVideoContents($target['id']);
            });
        } catch(Exception $e) {
            Log::error($e->getMessage());
            return [false, Message::DELETE_VIDEO_CONTENTS["DELETE_FAIL"]];
        }

        return [true, Message::DELETE_VIDEO_CONTENTS["DELETE_SUCCESS"]];
    }
}
