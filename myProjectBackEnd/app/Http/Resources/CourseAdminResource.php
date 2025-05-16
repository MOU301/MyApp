<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CourseAdminResource extends JsonResource
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
            "bostter"=>$this->bostter ?  asset('storage/' . $this->bostter) : null,
            "price"=>$this->price,
            'users'=>count($this->users),
            "state"=>$this->status,
            'lessons' => LessonResource::collection($this->whenLoaded('lessons',$this->lessons)) ?? null
            // "course_lessons"=>new LessonResource($this->whenLoaded('lessons'))
            
            // 'user'=>new UserResource($this->whenLoaded('users'))
            // 'lesson'=>new UserResource($this->whenLoaded('users'))
        ];
    }
}
