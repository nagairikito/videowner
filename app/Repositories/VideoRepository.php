<?php

namespace App\Repositories;

use App\Models\Video;

/**
 * 動画 Repository
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
        $this->repository->video_contents_id = $data['videoContentsId'];
        $this->repository->created_by = $data['created_by'];

        return $this->repository->save();
    }

    /**
     * 動画削除(ハードデリート)
     * 
     * @param int $id 動画ID
     * @return bool 登録結果（成功ならtrue、失敗ならfalse）
     */
    public function deleteVideo(int $id) : bool {
        $result = $this->repository
                    ->where('id', $id)
                    ->delete();

        return $result;
    }
}
