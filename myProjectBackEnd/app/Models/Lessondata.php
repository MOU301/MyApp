<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Lessondata extends Model
{
    use HasFactory;
  protected $fillable=['lesson_id','type','text','number'];
    public function lesson()
    {
        return $this->belongsTo(Lesson::class, 'lesson_id');
    }
    public function bots():HasMany
    {
      return $this->hasMany(Bot::class);
    }
    public function ansurs():HasMany
    {
      return $this->hasMany(Ansur::class);
    }
    public function images():HasMany 
    {
      return $this->hasMany(Image::class);
    }
    
}
