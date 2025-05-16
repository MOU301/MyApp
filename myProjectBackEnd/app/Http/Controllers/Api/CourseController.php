<?php

namespace App\Http\Controllers\Api;
use App\Models\Course;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\StoreCourseRequest;
use App\Http\Resources\Course_UserResource;
use App\Http\Resources\CourseResource;
use App\Http\Resources\LessonResource;
use App\Models\Author;
use App\Models\Info;
use App\Models\Lesson;
use App\Models\User;
use Illuminate\Support\Facades\File;
use Illuminate\Container\Attributes\Auth;
use Illuminate\Container\Attributes\Storage;

use function PHPSTORM_META\elementType;
use function PHPSTORM_META\map;
use function PHPUnit\Framework\returnSelf;

class CourseController extends Controller
{
    public function getUserCourses(User $user)
     {
   
     $user_id=$user->id;
     $courses=$user->courses()->with('lessons')->get();
    
     $data=[];
      foreach($courses as $course){
        $arr=[];
        $course_id=$course->id;
        
        $next_lesson=$course->users()->where("user_id",$user->id)->value('next_lesson');
        $lessons = $course->lessons()->with('lessondatas')->orderBy('number')->limit($next_lesson)->get();
        
        $bostter=asset('storage/').'/'.$course->bostter;
        $arr["id"]=$course_id;
        $arr["bostter"]=$bostter;
        $arr['title']=$course->name;
        $arr["author"]=User::find($course->author()->value('user_id'))->value('name');
        $arr['lessons']=LessonResource::collection($lessons);
        array_push($data,$arr);
      }
      return Course_UserResource::collection($data);

    }
   public function BuyCourse(Request $request){
    $user=User::find($request->user_id);
    if($user->courses()->where('id',$request->course_id)->first()){
       return response()->json(['message'=>'old']);
    }else{
        $user->courses()->attach($request->course_id,['next_lesson'=>1]);
        return response()->json(["message"=>'success']);
    }
 
   }
  

    /**
     * Display a listing of the resource.
     */
    public function AdminCourses(){
        return CourseResource::collection(Course::get());
    }
    public function AgreeCourse(Course $course){
        
    //    $n=$course->price*0.9;
    //     $new_price=$course->price+$n;
              if($course->update(["status"=>!$course->status])){
                return response()->json(['message'=>'success']);
              }
    }
    public function index()
    {
     //the all course  must the admin see but the others user can not see 
     //until the admin update the course status to true
    //get all user who kauf the course
   
      return CourseResource::collection(Course::with('users')->where('status',true)->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCourseRequest $request)
    {
       
       //check user_id if find in author not add but if not exit add to authors table
       $author_exist=Author::where('user_id',$request->user_id)->get();
      
       if(count($author_exist)==0){ 
        Author::create(['user_id'=>$request->user_id]);
       }
       $author_id=Author::where('user_id',$request->user_id)->value('id');
       if(count(Course::where('author_id',$author_id)->where('name',$request->name)->get())>0){
        return response()->json(['message'=>'exist']);
       }
       if($request->hasFile('bostter')){
        $bostterPath = $request->file('bostter')->store('course_bostter', 'public');
       
      if( Course::create([
        'author_id'=>$author_id,
       'name'=>$request->name,
       'bostter'=>$bostterPath,
       'price'=>$request->price
       ])){
        return response()->json([
            'message'=>'success'
        ],200);
       }}else{
        return response()->json(['message'=>'']);
       } 
    }

    /**
     * Display the specified resource.
     */
    public function show(Course $course)
    {
        //my courses
        // return $user;
        return $course;
    // return new CourseResource($course) ;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreCourseRequest $request, Course $course )
    {

        
       $author_id=User::find($request->user_id)->author->id;
       if($course->author_id==$author_id){
        if($request->hasFile('bostter')){

            $filePath = storage_path('app/public/' . $course->bostter);
            if(File::exists($filePath)){
                File::delete($filePath);
               }

            $bostter=$request->file('bostter')->store('course_bostter','public');
            $course->update([
                'name'=>$request->name,
                'bostter'=>$bostter,
                'price'=>$request->price
            ]);
            return response()->json([
                'message'=>'update successfully'
            ]);
       }
    }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Course $course)
    {
        //from admin only
     
        if(!$course->status){
            //delete the image form 
            $filePath = storage_path('app/public/' . $course->bostter);

                if(File::exists($filePath)){
                    File::delete($filePath);
                   
                   }
                
                $course->delete();
            return response()->json(['message'=>'success']);
            
        }else{
           if(count($course->users)){
                if($course->update(['status'=>0])){
                    return response()->json(['message'=>'there is persone'.count($course->users).' kauf the course are you sure the course is in database  ?']);
                }
           }else{
              if($course->delete()){
                return response()->json(['message'=>'success']);
              }
           }
            
        }
        
       
        
    }
}
