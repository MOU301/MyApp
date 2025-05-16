<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CourseSuperResource extends JsonResource
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
            "author_name"=>$this->author->user->name,
            "price"=>$this->price,
            "state"=>$this->status,
            "users"=>count($this->users),
            "lessons"=>count($this->lessons)
        ];
    }
}
