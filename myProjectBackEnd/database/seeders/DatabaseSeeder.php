<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Course_User;
use App\Models\Author;
use App\Models\Info;
use App\Models\Lesson;
use App\Models\Lesson_Data;
use App\Models\Lessondata;
use App\Models\User;
use App\Models\User_cours;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        
       
       $users= User::factory(10)->create();
      
          for($i=0 ; $i<3 ; $i++){
             Author::create([
                'user_id'=>$users[$i]->id
              ]);
    }
 
    for($i=1 ; $i<4 ; $i++){
      Course::factory()->create([
                'bostter'=>'image.jpg',
                    'price'=>"15",
                    'author_id'=>$i,
                    'status'=>false
            ]);
    }
    $courses=collect(Course::all());
        foreach ($users as $user) {
            $user->courses()->attach(
                $courses->random(rand(1, count($courses)))->pluck('id')->toArray()
            );
        }
        for($j=1 ; $j<count($courses); $j++){
            for($i=1 ; $i<5; $i++){
          Lesson::factory()->create([
              'course_id'=>$courses[$j]->id,
              'number'=>$i,
            ]);
        }
        }
 $lessons=Lesson::all();
 
    $array_data=['video','fillText','fillWithImage','audio','trueFalse','questionAndAnsur','dialog'];
    $files_data=['video','audio'];
    
        foreach($lessons as $lesson){
            
            for($i=1; $i<count($array_data) ; $i++){
                if(in_array($array_data[$i-1],$files_data)){
                    Lessondata::create([
                        'lesson_id'=>$lesson->id,
                        'number'=>$i,
                        'type'=>$array_data[$i-1],
                        'text'=>null,

                    ]);
                }else{
            Lessondata::create([
                'lesson_id'=>$lesson->id,
                'number'=>$i,
                'type'=>$array_data[$i-1],
                'text'=>"Lorem ipsum dolor *** amet consectetur adipisicing ***.Recusandae praesentium et unde blanditiis labor",
            ]);
            }
            } 
        }

  //all user can see the data for course to one lesson 
  // this mean that add all user to all course with  next_lesson=1 in infos table
//this table only for update 
  foreach($users as $user){
    foreach($courses as $course){
        Info::create([
            'user_id'=>$user->id,
            'course_id'=>$course->id,
            'next_lesson'=>1
        ]);
    }
} 


        // $this->call(Course_UserSeeder::class);
        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
      
}

}
