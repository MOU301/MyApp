<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CourseAdminResource;
use App\Http\Resources\CourseResource;
use App\Models\Author;
use App\Models\User;

class AdminContronller extends Controller
{
  public function getAllCourses(User $user){
  $author=$user->author;
  if(!isset($author)){
   Author::create(["user_id"=>$user->id]);
   $courses=[];
   }else{
    $courses= $author->courses()->with('lessons')->get();
   }
  return CourseAdminResource::collection($courses);
  }
}
