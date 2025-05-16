<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreLessonDataRequest;
use App\Http\Resources\LessondataResource;
use App\Models\Course;
use App\Models\Lesson;
use App\Models\Lessondata;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use PDO;

use function PHPSTORM_META\type;

class LessondataController extends Controller
{

  
    /**
     * Display a listing of the resource.
     */
    public function index(Lesson $lesson)
    {
        return LessondataResource::collection($lesson->lessondatas);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request,Lesson $lesson)
    {
      if(count($lesson->lessondatas()->where('type',$request->type)->where('number',$request->number)->get())==0){ 
      $file_arr=['video','audio','dialog'];
        if(in_array($request->type,$file_arr)){
          $request->validate([
            'type'=>'required',
            'number'=>'required',
            'src'=>'required|file|mimes:jpg,jpeg,png,mp4,mp3,wav|max:51200'
          ]);
          if($request->hasFile('src')){
            if($request->type=='video'){
                $src=$request->file('src')->store('video','public');
            }elseif($request->type=='audio'){
                $src=$request->file('src')->store('audio','public');
            }else{
                $src=$request->file('src')->store('image','public');
            }
          }
        }else{
          $request->validate([
            'type'=>'required',
            'number'=>'required',
            'text'=>'required',
            'ansur'=>'required'
          ]);
        }
      
            if($lesson->lessondatas()->create([
                  'number'=>$request->number,
                  'type'=>$request->type,
                  'text'=>$request->text ?? null,
                  'ansur'=>$request->ansur ?? null,
                  'src'=>$src ?? null
            ])){
              return response()->json(['message'=>'successfully add']);
            }else{
              return response()->json(['message'=>'retry again']);
            }
      }else{
        return response()->json(['message'=>'the item is exsit change the number or type']);
      }
       
        
        
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
    public function update(Request $request,Lesson $lesson,Lessondata $lessondata)
    { 
     
      $file_arr=['video','audio','dialog'];
      if(in_array($request->type,$file_arr)){
        
        $request->validate([
          'type'=>'required',
          'number'=>'required',
          'src'=>'required|file|mimes:jpg,jpeg,png,mp4,mp3,wav|max:51200'
        ]);
        if($request->hasFile('src')){

          $filePath = storage_path('app/public/' . $lessondata->src);
                if(File::exists($filePath)){
                    File::delete($filePath);
                   }

          if($request->type=='video'){
              $src=$request->file('src')->store('video','public');
          }elseif($request->type=='audio'){
              $src=$request->file('src')->store('audio','public');
          }else{
              $src=$request->file('src')->store('image','public');
          }
        }
       }else{
        
        $request->validate([
            'number'=>'required',
            'type'=>'required',
             'text'=>'required',
             'ansur'=>'required'
        ]);
       }

       if($lesson->lessondatas()->where("id",$lessondata->id)->update([
            'number'=>$request->number,
            'type'=>$request->type,
            'text'=>$request->text ?? null,
            'ansur'=>$request->ansur ?? null,
            
            'src'=>$src ?? null
       ])){
             return response()->json(['message'=>'update the lessondata']);
         }else{
             return response()->json(['message'=>'retry again']);
         }
    }

    /**
     * Remove the specified resource from storage.
     */
  public function destroy(Lesson $lesson,Lessondata $lessondata){
    
  }
    public function deleteItem(Lessondata $lessondata)
    {
      // return $lessondata;
      if($lessondata->src!=null){
          $filePath = storage_path('app/public/' . $lessondata->src);
          if(File::exists($filePath)){
              File::delete($filePath);
              }
        }
       if($lessondata->delete()){
        return response()->json(['message'=>'success']);
       }else{
        return response()->json(['message'=>'error']);
       }
    }
}
