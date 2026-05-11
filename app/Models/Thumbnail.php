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
    protected $table = 'thumbnails';

    protected $fillable = [
        'file_name',
        'file_path',
        'created_by',
        'delete_flag',
    ];

}
