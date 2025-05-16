<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Course extends Model
{
  use HasFactory;
  protected $fillable =['id','author_id','name','status','bostter','price','status'];
public function author():BelongsTo{
  return $this->belongsTo(Author::class);
}
public function lessons():HasMany
{
  return $this->hasMany(Lesson::class);
}
public function users():BelongsToMany
{
    return $this->belongsToMany(User::class,'course_user')->withPivot('next_lesson');
}
}
