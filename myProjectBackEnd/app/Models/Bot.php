<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Bot extends Model
{
    use HasFactory;
    protected $fillable=['ask','feedBack','lessondata_id'];
    public function lessondata():BelongsTo
    {
        return $this->belongsTo(Lessondata::class);
    }
    public function ansurs():HasMany
    {
        return $this->hasMany(Ansur::class);
    }
}
