<?php

namespace App\Repositories;

use App\Models\Video;

/**
 * 新規ユーザー登録 Repository
 */
class VideoRepository extends Repository {

    /** 動画テーブル Model */
    private Video $repository;
    
    /**
     * コンストラクタ
     */
    public function __construct(Video $repository) {
        $this->repository = $repository;
    }

    /**
     * IDによる動画情報単体取得
     * 
     * @param int $id ID
     * @return Video|null 動画情報、存在しない場合はnull 
     */
    public function getVideoById(int $id) : ?Video {
        $video = $this->repository->where('id', $id)->first();

        return $video;
    }

    /**
     * 動画登録処理
     * 
     * @param array $data 入力情報
     * @return bool 登録結果（成功ならtrue、失敗ならfalse）
     */
    public function registerVideo(array $data) : bool {
        $this->repository->file_name = $data['video']['name'];
        $this->repository->file_path = $data['video']['file'];
        $this->repository->video_post_id = $data['videoPostId'];
        $this->repository->created_by = $data['created_by'];

        return $this->repository->save();
    }
}
