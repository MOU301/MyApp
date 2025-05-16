<?php

namespace App\Http\Resources;

use App\Models\Lesson;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class   CourseResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id"=>$this->id,
            "title"=>$this->name,
            "author"=>$this->author->user->name,
            "bostter"=>asset('storage/').'/'.$this->bostter,
            "price"=>$this->price, 
            'users'=>count($this->users),
            'lessons' =>LessonResource::collection($this->whenLoaded('lessons',$this->lessons()->limit(1)->get()))
            
            // 'user'=>new UserResource($this->whenLoaded('users'))
            // 'lesson'=>new UserResource($this->whenLoaded('users'))
        ];
    }
}
