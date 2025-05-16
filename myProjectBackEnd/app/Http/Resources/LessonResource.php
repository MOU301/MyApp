<?php

namespace App\Http\Resources;

use App\Http\Controllers\Api\LessondataController;
use App\Models\Lesson;
use App\Models\Lessondata;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LessonResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'=>$this->id,
            'title'=>$this->name,
            'number'=>$this->number,
            'lesson_data'=>LessondataResource::collection(Lessondata::with(['images', 'ansurs', 'bots.ansurs'])->where('lesson_id',$this->id)->orderBy('number')->get())
           
        ];
    }
}
