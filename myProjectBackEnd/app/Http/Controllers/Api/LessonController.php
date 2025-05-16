<?php

namespace App\Http\Controllers\Api;
use Illuminate\Support\Facades\File;
use App\Http\Controllers\Controller;
use App\Http\Resources\LessonResource;
use App\Models\Ansur;
use App\Models\Author;
use App\Models\Bot;
use App\Models\Course;
use App\Models\Image;
use App\Models\Info;
use App\Models\Lesson;
use App\Models\Lessondata;
use App\Models\User;
use Illuminate\Container\Attributes\Auth;
use Illuminate\Container\Attributes\Storage;
use Illuminate\Database\Eloquent\Relations\Pivot;
use Illuminate\Http\Client\ResponseSequence;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage as FacadesStorage;
use PhpParser\Node\Expr\Cast\Object_;
use PHPUnit\Framework\Constraint\Count;

use function PHPUnit\Framework\isArray;
use function PHPUnit\Framework\returnSelf;
use function Symfony\Component\VarDumper\Dumper\esc;

class LessonController extends Controller
{
   
    
public function updateInfo(Request $request){

//    return response()->json(['message'=>'ja genau']);
    $user=User::find($request->user_id);
    $result=$user->courses()->where('id',$request->course_id)->get();

    if(count($result)>0){
            $next_lesson=$user->courses()->where('id',$request->course_id)->value('next_lesson');

          
            $lessons=Lesson::where('course_id',$request->course_id)->orderBy('number')->get();
            
                if($request->lesson_number==$next_lesson ){
                        if(count($lessons)>=$next_lesson+1){
                            $next_lesson+=1;
                            $user->courses()->updateExistingPivot($request->course_id,['next_lesson'=>$next_lesson]);
                            return response()->json([
                                'message'=>'success'
                                ]);
                        }else{
                            return response()->json([
                                'message'=>'finsh'
                            ]);
                        }
                    }else{
                            return response()->json(['message'=>'no update']);
                    }  
    }else{
        return response()->json([
            'message'=>'buy'
        ]);
    }


}
// public function updatelesson(Request $request,Lesson $lesson){
   
// }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    { 
   $user_id=$request->user;
   $course_id=$request->course;
   $next_lesson='';
//    $next_lesson=Info::where('user_id',$user_id)->where('course_id',$course_id)->value('next_lesson');
    $lessons=Lesson::where('course_id',$request->course)->orderBy('number')->limit($next_lesson)->get();
  
    return LessonResource::collection($lessons);
    //after the user finsh from this lesson and do the test  musst update the data in info table and pluse 1 to next_lesson
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request,User $user,Course $course)
    {
     
        $request->validate([
            "name"=>"required",
           "lesson_data"=>'required|array',
           "lesson_data.*.number"=>"required",
           "lesson_data.*.type" => 'required|string'
        ]);
        
        $author=$user->author;
        $next_lesson=1;
        if($author){
            if(!isset($request->number)){
                $latest_lesson=$course->lessons()->orderby('number','desc')->value('number');
                    if(isset($latest_lesson)){
                    $next_lesson=$latest_lesson+1;
                    }
            }else{
                $next_lesson=$request->number;
            }
        if(count($course->lessons()->where('name',$request->name)->get())==0){
            
            $lesson=Lesson::create([
                        "name"=>$request->name,
                        "number"=>$next_lesson,
                        "course_id"=>$course->id  
            ]);   
         
            $lesson_id=$lesson->id;
            foreach($request->lesson_data as $index=>$data){
             $images=[];//name the image after storage in

            
                $lessondata=Lessondata::create([
                    'lesson_id'=>$lesson_id,
                    'type'=>$data['type'],
                    'number'=>$data['number'],
                    'text'=>$data['text'] ?? null,
                   ]);
                   $lessondata_id=$lessondata->id;
                   if($data['type']=='bot'){
                      
                       foreach($data['bot'] as $i=>$e){
                        $bot=Bot::create([
                            'lessondata_id'=>$lessondata_id,
                            "ask"=>$e['ask'],
                            "feedBack"=>$e['feedBack'] ?? null,   
                        ]);
                        $bot_id=$bot->id;
                     
                        for($i=0 ; $i<count($e['ansur']) ; $i++){
                            Ansur::create([
                                'bot_id'=>$bot_id,
                                "ansur"=>$e['ansur'][$i]
                            ]);
                        }
                       }
                   }
                    
                    if($request->hasFile("lesson_data.$index.src.0")){
                               
                        foreach($data['src'] as $i=>$e){
                               
                                $file=$request->file("lesson_data.$index.src.$i");
                                if($data['type']=='video'){
                                    $pathName=$file->store('video','public');
                                }else if($data['type']=='audio'){
                                    $pathName=$file->store('audio','public');
                                }else{
                                    $pathName=$file->store('image','public');
                                }
                                array_push($images,$pathName);
                        }
                        for($i=0; $i<count($images) ; $i++){
                          Image::create([
                            "lessondata_id"=>$lessondata_id,
                             "src"=>$images[$i]
                           ]);
                        }
                     }
                    if(isset($data['ansur'])){
                        for($i=0 ; $i<count($data['ansur']) ; $i++){
                            Ansur::create([
                                "lessondata_id"=>$lessondata->id,
                                "ansur"=>$data['ansur'][$i]
                            ]);  
                        } 
                    }   
                }
                return response()->json(['message'=>'success']);       
        }else{return response()->json(['message'=>'change the name please']);}
      }else{return 'there is not in author';}
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request,User $user,Course $course,Lesson $lesson)
    {
        //    return $request;
        // $request->validate([
        //     "name"=>"required",
        // //    "lesson_data"=>'required',
        // //    "lesson_data.*.number"=>"required",
           
        // //    "lesson_data.*.src.*" => 'required|file|mimes:jpg,jpeg,png,mp4,mp3,wav|max:51200'
        // ]);
        
           $update=false;
            $lesson->update([
                        "name"=>$request->name,
                        "number"=>$request->number ,
                        "course_id"=>$course->id,
            ]);   
            
            $lesson_id=$lesson->id;
            foreach($request->lesson_data as $index=>$data){
           
             $images=[];//name the image after storage in
             $lessondata_id=null;
             if(isset($data["id"])){
                //old lessondata item
              $lessondata_id=$data['id'];
             
            //   $lessondatas=Lessondata::where('lesson_id',$lesson->id)->get();
              
              $lessondata=Lessondata::find($lessondata_id);
              
              
                    $lessondata->update([
                        'type'=>$data['type'],
                        'number'=>$data['number'],
                        'text'=>$data['text'] ?? null, 
                    ]);
                    $update=true;  
             }else{
                //add new lessondata item
                $update=false;
                $lessondata=Lessondata::create([
                    'lesson_id'=>$lesson_id,
                    'type'=>$data['type'],
                    'number'=>$data['number'],
                    'text'=>$data['text'] ?? null,
                   ]);
                   
             }
         
             ///the item new there is has file else update
            if(isset($data['src'])){
     
             foreach($data['src'] as $i=>$e){
               
                if($request->hasFile("lesson_data.$index.src.$i")){
                  
                  $file=$request->file("lesson_data.$index.src.$i");

                    if ($file) {
                        if($data['type']=='video'){
                            $pathName=$file->store('video','public');
                        }else if($data['type']=='audio'){
                            $pathName=$file->store('audio','public');
                        }else{
                            $pathName=$file->store('image','public');
                        } 
                   }
                }else{
                    $relativePath = str_replace(asset('storage') . '/', '', $e);
                    $filePath = storage_path('app/public/' . $relativePath);
                 
                    if (File::exists($filePath)) {
                        $pathName = $relativePath;
                    } else {
                        return response()->json(['message' => 'error']);
                    }
                    
                }
             array_push($images,$pathName);
             }
                $oldsrc=Image::where('lessondata_id',$lessondata->id)->pluck('src');
                if(count($oldsrc)>0){
                    for($i=0 ;$i<count($oldsrc); $i++){
                        if(!in_array($oldsrc[$i],$images)){
                            
                            //delete the item from storage
                            $imagePath=storage_path('app/public/'.$oldsrc[$i]);
                            if(File::exists($imagePath)){
                                if(File::delete($imagePath)){
                                //delete form database
                                $image=Image::where('src',$oldsrc[$i])->get();
                                foreach($image as $item){
                                    $item->delete();
                                }
                                
                                }
                            }else{
                                return 'not exist';
                            }
                        }
                    }
                }
                if(count($images)>0){
                    for($i=0; $i<count($images) ; $i++){
                        Image::create([
                            "lessondata_id"=>$lessondata->id,
                            "src"=>$images[$i]
                        ]);
                    } 
                }
                
                
                // return Image::where('lessondata_id',$lessondata_id)->pluck('src');
                }
            if(isset($data['ansur'])){
             
                if($update){
                        $oldansur=Ansur::where('lessondata_id',$lessondata_id)->get();
                        if(count($oldansur)>0){
                            for($i=0 ; $i<count($oldansur) ; $i++){
                                $oldansur[$i]->delete();
                            }
                    }
                }
                //delete  all the old ansur and add the new ansur
                for($i=0 ; $i<count($data['ansur']) ; $i++){
                    Ansur::create([
                        "lessondata_id"=>$lessondata->id,
                        "ansur"=>$data['ansur'][$i]
                    ]);  
                } 
            }
            if(isset($data['bot'])){
              
                if($update){
         
                Bot::where('lessondata_id',$lessondata->id)->delete();
                       
                    
                }
              
                foreach($data['bot'] as $ii=>$dd){
               
                    $bot=Bot::create([
                        "lessondata_id"=>$lessondata->id,
                        "ask"=>$dd['ask'],
                        "feedBack"=>$dd['feedBack'],
                    ]);
                
                    for($j=0 ; $j<count($dd['ansur']) ; $j++){
                        
                    Ansur::create([
                    "bot_id"=>$bot->id,
                    "ansur"=>$dd['ansur'][$j],
                    ]);
                    }
                    
                }
                 
           
              }  
    
        }
        //    $this->cleanupUnusedMedia();
            return response()->json(['message'=>'success']);              
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user,Course $course,Lesson $lesson)
    {  
  
        $author_id=$user->author->id;
        if($course->author_id==$author_id){
            if($lesson->delete()){
                $this->cleanupUnusedMedia(); 
                return response()->json(['message'=>'success']);
            }else{
                return response()->json(['message'=>'error']);
            }
    }else{
       return response()->json(['message'=>'you not the author']);
    }
}
protected function cleanupUnusedMedia()
{
    $folders = ['image', 'video', 'audio'];
    $usedFiles = \App\Models\Image::pluck('src')->toArray();

    foreach ($folders as $folder) {
        $files = File::files(public_path("storage/{$folder}"));

        foreach ($files as $file) {
            $relativePath = $folder . '/' . $file->getFilename();

            if (!in_array($relativePath, $usedFiles)) {
                File::delete($file->getPathname());
            }
        }
    }
}

}
