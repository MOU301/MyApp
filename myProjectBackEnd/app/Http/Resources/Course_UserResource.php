<?php

namespace App\Http\Resources;

use App\Models\Info;
use App\Models\Lesson;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class Course_UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return parent::toArray($request);
        // $user_id=$request->user;
        // $course_id=$request->course;
        // $next_lesson=Info::where('user_id',$user_id)->where('course_id',$course_id)->value('next_lesson');
        //  $lessons=Lesson::where('course_id',$request->course)->limit($next_lesson)->get();
        // return [
        //     $this->whenLoaded('courses',fn()=>$this->courses->map(function($course){
        //         return [
        //                 "course_id"=>$course->id,
        //                 "course_name"=>$course->name,
        //                 "course_auther"=>$course->author_id,
        //                 "course_bostter"=>$course->bostter,
        //                 "course_price"=>$course->price,
        //                 'kauf'=>count($course->users),
                        
        //                 "lessons"=>$this->whenLoaded('lessons',fn()=>$this)
        //                 // 'first_lesson' => LessonResource::collection($this->whenLoaded('lessons',$course->lessons))
        //             ];
        //     }))
        //     // 'mycourses'=>$this->whenLoaded('courses',
        //     //              fn()=>$this->courses->map(function($course){
        //     //                 return [
        //     //                     "course_id"=>$this->id,
        //     //                     "course_name"=>$this->name,
        //     //                     "course_auther"=>$this->author_id,
        //     //                     "course_bostter"=>$this->bostter,
        //     //                     "course_price"=>$this->price,
        //     //                     'kauf'=>count($this->users),
        //     //                     'first_lesson' => LessonResource::collection($this->whenLoaded('lessons',$this->lessons))
        //     //                 ];

        //     // }))
        // ];
    }
}
