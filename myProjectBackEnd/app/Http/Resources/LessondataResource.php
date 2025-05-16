<?php

namespace App\Http\Resources;

use App\Models\Bot;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LessondataResource extends JsonResource
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
            "number"=>$this->number,
            "type"=>$this->type,
            "src"=>$this->whenLoaded("images",function (){
                return $this->images->map(function($image){
                    return asset('storage/'.$image->src);
                });
                
            }) ?? null,
            "text"=>$this->text ?? null,
            "bot"=>BotResource::collection($this->whenLoaded('bots')),
            

            "ansur"=>$this->whenLoaded('ansurs',function(){
                return $this->ansurs->pluck('ansur');
            }) ?? null,
        ];
        // return parent::toArray($request);
    }
}
