<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VideoPost extends Model
{
    /**
     * モデルと関連しているテーブル
     *
     * @var string
     */
    protected $table = 'video_posts';

    protected $fillable = [
        'title',
        'created_by',
        'delete_flag',
    ];

}
