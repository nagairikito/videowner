<?php

namespace App\Repositories;

use App\Models\VideoContents;
use App\Constants\SystemConst;
use Illuminate\Support\Facades\Log;

/**
 * 動画コンテンツ Repository
 */
class VideoContentsRepository extends Repository {

    /** 動画コンテンツテーブル Model */
    private VideoContents $repository;
    
    /**
     * コンストラクタ
     */
    public function __construct(VideoContents $repository) {
        $this->repository = $repository;
    }

    /**
     * 動画コンテンツ一覧取得
     * 
     * @return VideoContents|array 動画コンテンツ情リスト、存在しない場合は空配列 
     */
    public function getVideoContentsList(array $conditions = []) : VideoContents|array {
        
        $wheres = [];

        if(array_key_exists('userIds', $conditions) && count($conditions['userIds']) > 0 ) {
            foreach($conditions['userIds'] as $id) {
                $wheres[] = ['video_contents.created_by', '=', $id];
            }
        }
        if(array_key_exists('publishedFlag', $conditions) && $conditions['publishedFlag'] == false) {
            $wheres[] = ['video_contents.published', '=', SystemConst::VIDEO_CONTENTS['PRIVATE']];
        }

        $videoContents = $this->repository
            ->join('thumbnails', 'video_contents.id', 'thumbnails.video_contents_id')
            ->join('videos', 'video_contents.id', 'videos.video_contents_id')
            ->join('users', 'video_contents.created_by', 'users.id')
            ->where('video_contents.delete_flag', SystemConst::VIDEO_CONTENTS['NON_DELETED'])
            ->where('video_contents.published', SystemConst::VIDEO_CONTENTS['PUBLISHED'])
            ->where($wheres)
            ->select([
                'video_contents.id',
                'video_contents.title',
                'video_contents.updated_at',
                'thumbnails.file_name as thumbnail_name',
                'thumbnails.file_path as thumbnail_path',
                'videos.id as video_id',
                'videos.file_name as video_name',
                'videos.file_path as video_path',
                'users.id as user_id',
                'users.user_name',
            ])
            ->get();
Log::info($videoContents);
        return $videoContents ? $videoContents->toArray() : [];
    }

    /**
     * 動画コンテンツ詳細取得
     * 
     * @param int $id 動画コンテンツID
     * @return VideoContents|array 動画コンテンツ情リスト、存在しない場合は空配列 
     */
    public function getVideoContentsDetail(int $id) : VideoContents|array {
        $videoContents = $this->repository
            ->join('thumbnails', 'video_contents.id', 'thumbnails.video_contents_id')
            ->join('videos', 'video_contents.id', 'videos.video_contents_id')
            ->join('users', 'video_contents.created_by', 'users.id')
            ->where('video_contents.delete_flag', SystemConst::VIDEO_CONTENTS['NON_DELETED'])
            ->where('video_contents.published', SystemConst::VIDEO_CONTENTS['PUBLISHED'])
            ->where('video_contents.id', $id)
            ->select([
                'video_contents.id',
                'video_contents.title',
                'video_contents.updated_at',
                'video_contents.published as published_flag',
                'thumbnails.id as thumbnail_id',
                'thumbnails.file_name as thumbnail_name',
                'thumbnails.file_path as thumbnail_path',
                'videos.id as video_id',
                'videos.file_name as video_name',
                'videos.file_path as video_path',
                'users.id as user_id',
                'users.user_name',
            ])
            ->first();

            return $videoContents ? $videoContents->toArray() : [];
    }

    /**
     * 動画投稿処理
     * 
     * @param array $data 入力情報
     * @return VideoContents 登録結果（成功ならVideoPostオブジェクト、失敗なら例外）
     */
    public function registerVideoContents(array $data) : VideoContents {
        $videoContents = VideoContents::create([
            'title' => $data['title'],
            'published' => $data['publishedFlag'],
            'created_by' => $data['created_by'],
        ]);

        return $videoContents;
    }

    /**
     * 動画コンテンツ更新
     * 
     * @param array $data 入力情報
     * @return bool 登録結果（成功ならVideoPostオブジェクト、失敗なら例外）
     */
    public function updateVideoContents(array $data) : bool {
        $target = $this->repository->find($data['videoContentsId']);
        $target->title = $data['title'];
        $target->title = $data['publishedFlag'];
        
        return $target->save();
    }

    /**
     * 動画コンテンツ削除(ハードデリート)
     * 
     * @param int $id 動画コンテンツID
     * @return bool $result 削除結果
     */
    public function deleteVideoContents(int $id) : bool {
        $result = $this->repository
        ->where('id', $id)
        ->delete();

        return $result;
    }

    /**
     * 動画コンテンツ削除(ソフトデリート)
     * 
     * @param int $id 動画コンテンツID
     * @return bool $result 削除結果
     */
    public function softDeleteVideoContents(int $id) : bool {
        $target = $this->repository->where('id', $id)->first();
        $target->delete_flag = 1;

        return $target->save();
    }
}
