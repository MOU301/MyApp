<?php

use App\Http\Controllers\Api\AdminContronller;
use App\Http\Controllers\Api\ChatController;
use App\Http\Controllers\Api\course;
use App\Http\Controllers\Api\Course_UserController;
use App\Http\Controllers\Api\CourseController;
use App\Http\Controllers\Api\Fill;
use App\Http\Controllers\Api\HomeController;
use App\Http\Controllers\Api\Lesson;
use App\Http\Controllers\Api\LessonController;
use App\Http\Controllers\Api\LessondataController;
use App\Http\Controllers\Api\MailController;
use App\Http\Controllers\Api\User;
use App\Http\Controllers\Api\UserController;
use App\Http\Resources\Course_UserResource;
use App\Models\Course as ModelsCourse;
use App\Models\Lesson as ModelsLesson;
use App\Models\Lessondata;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Monolog\Handler\RotatingFileHandler;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::post('login',[UserController::class,'login']);
Route::post('checklogin',[UserController::class,'checklogin']);
Route::apiResource('users',UserController::class);
Route::get('start',[HomeController::class,'start']);
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::delete("lessondatas/{lessondata}",[LessondataController::class,'deleteItem']); 
    Route::get('allCourses/{user}',[AdminContronller::class,'getAllCourses']);
    Route::post('addlesson',[LessonController::class,'addlesson']);
    Route::apiResource('courses',CourseController::class);
    // Route::post('courses',[CourseController::class,'store']);
    // Route::put('courses/{course}',[CourseController::class,'update']);
    Route::apiResource('user.course.lessons',LessonController::class);
    // Route::post('user/{user}/course/{course}/lessons',[LessonController::class,'store']);
    // Route::put('user/{user}/course/{course}/lessons/{lesson}',[LessonController::class,'update']);
    Route::apiResource('lesson.lessondatas',LessondataController::class);
});
Route::middleware(['auth:sanctum', 'role:super_admin'])->group(function () {
    Route::get("startSuper",[HomeController::class,'startSuper']);
    Route::get('messages',[HomeController::class,'getMessage']);
    Route::put('updateView',[HomeController::class,'updateView']);
    Route::post('addSlider',[HomeController::class,"addSlider"]);
    Route::post("removeSlider",[HomeController::class,"removeSlider"]);
    Route::put('readmessage/{message}',[HomeController::class,"updateMessage"]);
    Route::delete('removeMessage/{message}',[HomeController::class,'removeMessage']);
    Route::put('agreeCourse/{course}',[CourseController::class,'AgreeCourse']);
    
});
Route::middleware('auth:sanctum')->group(function () {
Route::post('addmessage',[HomeController::class,'addMessage']);
Route::get("getSliders",[HomeController::class,"getSliders"]);
Route::post('logout',[UserController::class,'logout']);
Route::post('nextlesson',[LessonController::class,'updateInfo']);
Route::get('user/{user}/courses',[CourseController::class,'getUserCourses']);
Route::get('allcourses',[CourseController::class,'AdminCourses']);
Route::post('/send-email',[MailController::class,'send']);
Route::post('/chat', [ChatController::class, 'talk']);
Route::post('/buyCourse',[CourseController::class,'buyCourse']);
});