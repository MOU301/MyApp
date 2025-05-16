<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Lesson extends Model
{
    use HasFactory; 
    protected $fillable = ['name', 'number', 'course_id'];
    public function lessons():BelongsTo
    {
        return $this->belongsTo(Course::class);
    }
   public function lessondatas():HasMany
   {
    return $this->hasMany(Lessondata::class);
   }

}
