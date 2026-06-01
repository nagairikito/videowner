<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Thumbnail extends Model
{
    /**
     * モデルと関連しているテーブル
     *
     * @var string
     */
    protected $table = 'thumbnails';

    protected $fillable = [
        'file_name',
        'file_path',
        'video_contents_id',
        'created_by',
        'delete_flag',
    ];

}
