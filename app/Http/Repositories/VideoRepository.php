<?php

namespace App\Http\Repositories;

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
        $movie = $this->repository->where('id', $id)->first();

        return $movie;
    }

    /**
     * 動画登録処理
     * 
     * @param array $data 入力情報
     * @return bool 登録結果（成功ならtrue、失敗ならfalse）
     */
    public function postVideo(array $data) : bool {
        $this->repository->title = $data['userName'];
        $this->repository->file_name = $data['userName'];
        $this->repository->created_by = $data['loginId'];
        $this->repository->thumbnail = $data['password'];

        return $this->repository->save();
    }
}
