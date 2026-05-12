<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Video extends Model
{
    /**
     * モデルと関連しているテーブル
     *
     * @var string
     */
    protected $table = 'videos';

    protected $fillable = [
        'file_name',
        'file_path',
        'video_post_id',
        'created_by',
        'delete_flag',
    ];

}
