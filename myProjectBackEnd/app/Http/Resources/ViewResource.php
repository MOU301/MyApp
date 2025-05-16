<?php

namespace App\Http\Resources;

use App\Models\Course;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ViewResource extends JsonResource
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
            'name' => $this->user->name,
            'body' => $this->body,
            'learn' => $this->user->courses->pluck('name')->toArray(),
        ];
    }
}
