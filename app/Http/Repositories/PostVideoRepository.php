<?php

namespace App\Http\Repositories;

use App\Models\VideoPost;

/**
 * 新規ユーザー登録 Repository
 */
class PostVideoRepository extends Repository {

    /** 動画テーブル Model */
    private VideoPost $repository;
    
    /**
     * コンストラクタ
     */
    public function __construct(VideoPost $repository) {
        $this->repository = $repository;
    }

    /**
     * IDによる動画情報単体取得
     * 
     * @param int $id ID
     * @return VideoPost|null 動画情報、存在しない場合はnull 
     */
    public function getVideoById(int $id) : ?VideoPost {
        $movie = $this->repository->where('id', $id)->first();

        return $movie;
    }

    /**
     * 動画投稿処理
     * 
     * @param array $data 入力情報
     * @return bool 登録結果（成功ならtrue、失敗ならfalse）
     */
    public function postVideo(array $data) : VideoPost {
        $videoPost = VideoPost::create([
            'title' => $data['title'],
            'created_by' => $data['user_id'],
        ]);

        return $videoPost;
    }
}
