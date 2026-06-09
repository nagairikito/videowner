<?php

namespace App\Repositories;

use App\Models\VideoContents;

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

        $videoContents = $this->repository
            ->join('thumbnails', 'video_contents.id', 'thumbnails.video_contents_id')
            ->join('videos', 'video_contents.id', 'videos.video_contents_id')
            ->join('users', 'video_contents.created_by', 'users.id')
            ->where('video_contents.delete_flag', 0)
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

        return $videoContents->toArray();
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
            ->where('video_contents.delete_flag', 0)
            ->where('video_contents.id', $id)
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
            ->first();

        return $videoContents->toArray();
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
            'created_by' => $data['created_by'],
        ]);

        return $videoContents;
    }
}
