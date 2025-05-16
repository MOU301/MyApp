<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Image extends Model
{
    use HasFactory; 
    protected $fillable = ['lessondata_id','src'];
    public function lessondata():BelongsTo
    {
        return $this->belongsTo(Lessondata::class);
    }
}
