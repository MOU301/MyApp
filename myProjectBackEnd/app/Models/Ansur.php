<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Ansur extends Model
{
    use HasFactory; 
    protected $fillable = ['lessondata_id','bot_id','ansur'];
    public function lessondata():BelongsTo
    {
        return $this->belongsTo(Lessondata::class);
    }
    public function bot():BelongsTo
    {
        return $this->belongsTo(Bot::class);
    }
 
   
}
