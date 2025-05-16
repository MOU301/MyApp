<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BotResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);
        return [
            'ask'=>$this->ask,
            'feedBack'=>$this->feedBack,
            'ansur'=>$this->whenLoaded('ansurs',function(){
                return $this->ansurs->pluck('ansur');
            })
        ];
    }
}
