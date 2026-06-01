<?php

namespace App\Repositories;

use App\Models\Thumbnail;

/**
 * サムネイル Repository
 */
class ThumbnailRepository extends Repository {

    /**サムネイルルテーブル Model */
    private Thumbnail $repository;
    
    /**
     * コンストラクタ
     */
    public function __construct(Thumbnail $repository) {
        $this->repository = $repository;
    }

    /**
     * IDによる動画情報単体取得
     * 
     * @param int $id ID
     * @return Thumbnail|null 動画情報、存在しない場合はnull 
     */
    public function getVideoById(int $id) : ?Thumbnail {
        $movie = $this->repository->where('id', $id)->first();

        return $movie;
    }

    /**
     * サムネイル登録
     * 
     * @param array $data 入力情報
     * @return bool 登録結果（成功ならtrue、失敗ならfalse）
     */
    public function registerThumbnail(array $data) : bool {
        $this->repository->file_name = $data['thumbnail']['name'];
        $this->repository->file_path = $data['thumbnail']['file'];
        $this->repository->video_contents_id = $data['videoContentsId'];
        $this->repository->created_by = $data['created_by'];

        return $this->repository->save();
    }
}
