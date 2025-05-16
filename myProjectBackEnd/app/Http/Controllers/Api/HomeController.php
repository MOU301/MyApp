<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Http\Resources\Course_UserResource;
use App\Http\Resources\CourseResource;
use App\Http\Resources\CourseSuperResource;
use App\Http\Resources\MessageResource;
use App\Http\Resources\SliderResource;
use App\Http\Resources\UserResource;
use App\Http\Resources\ViewResource;
use App\Models\Course;
use App\Models\Message;
use App\Models\Slider;
use App\Models\User;
use App\Models\View;
use Illuminate\Http\Client\ResponseSequence;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

use function PHPSTORM_META\map;

class HomeController extends Controller
{
   public function start(){
      $sliders=Slider::pluck('image');
      $courses=Course::with('lessons')->get();
      $views=View::with('user.courses')->where('state',true)->get();
      
      $slidersUrl=[];
      foreach($sliders as $slider){
         $link=asset('sotrage/').$slider;
      $slidersUrl[]=$link;
      }
      return response()->json(
        ["data"=>[
            "slider"=>$slidersUrl,
            "courses"=>CourseResource::collection($courses),
            "views"=>ViewResource::collection($views)
            ]
        ]);
   }
   public function addMessage(Request $request){
      if(Message::create([
         "user_id"=>$request->user_id,
         "message"=>$request->message
         ])){
             return response()->json(['message'=>'success']);
         }else{
            return response()->json(['message'=>"retry send the message"]);
         }
   }
   public function getMessage(){
      $message=Message::with('user')->get();
      return MessageResource::collection($message);
   }
   public function removeMessage(Message $message){
   
      $message->delete();
      return response()->json(['message'=>'success']);
     
      
   }
   public function updateMessage(Message $message){
      if($message->update([
         "status"=>true
      ])){
         return response()->json(['message'=>'success']);
      }else{
         return response()->json(['message'=>'error']);
      }
   }
   public function startSuper(){

      $slider=Slider::pluck('image')->toArray();
    
      $courses=Course::all();
      $views=View::with('user.courses')->get();
      $users=User::with('courses')->get();
      $message=Message::with('user')->get();
      $sliderUrl=array_map(function($image){
         return asset('storage/'.$image);
      },$slider);
      return response()->json(
        ["data"=>[
            "slider"=>$sliderUrl,
            "courses"=>CourseSuperResource::collection($courses),
            "views"=>ViewResource::collection($views),
            "users"=>UserResource::collection($users),
            "messages"=>MessageResource::collection($message)
            ]
        ]);
   }
   public function updateView(Request $request){
     foreach($request->views as $item){
     View::where('id',$item['id'])->update(['state'=>$item['state']]);
    }
    return response()->json(["message"=>"success "]);
   }
   public function addSlider(Request $request){
   
     $request->validate([
         'slider' => 'required|array',
      ]);
     // delete the image in data
      $sliderData=Slider::all();
     foreach($sliderData as $slider){
      $slider->delete();
     }
    
     $sliderUse=[];
     foreach ($request->slider as $file) {
      if(!is_string($file)){
        $image = $file->store('sliders', 'public');
        array_push($sliderUse,$image);
         Slider::create(['image'=>$image]);
      }else{
        $fileN=str_replace(asset('storage').'/','',$file);
        Slider::create(['image'=>$fileN]);
         array_push($sliderUse,$fileN);
      }
     } 
     $allImages=File::files('storage/sliders');
    $allImagesName=[];
     foreach($allImages as $file){
      $fileName=$file->getFilename();
      array_push($allImagesName,'sliders/'.$fileName);
     }
   

     foreach($allImagesName as $fileName){
       if(!in_array($fileName ,$sliderUse)){
         File::delete('storage/'.$fileName);
       }
     }
   
    return response()->json(['message'=>'success']);
   
   }
   public function removeSlider(Request $request){
      $image=str_replace(asset('storage/').'/','',$request->image);
      $slider=Slider::where('image',$image)->first();
      $filePath = public_path('storage/'. $slider->image);
        if(File::exists($filePath)){
           if(File::delete($filePath)){
             $slider->delete();
             return response()->json(['message'=>'success']); 
           }else{
            return 'error';
           }
         }else{
            return 'not found image';
         }
        
   }
   public function getSliders(){
      $sliders=Slider::all();
      return $sliders;
   }

}