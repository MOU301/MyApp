<?php

namespace App\Console\Commands;
use Illuminate\Support\Facades\File;
use Illuminate\Console\Command;
use App\Models\Course;
use App\Models\Lessondata;
class CleanUnusedFiles extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'files:delete-unused';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $useFiles1=Lessondata::pluck('src')->toArray();
        $useFiles2=Course::pluck('bostter')->toArray();
        $useFiles=array_merge($useFiles1,$useFiles2);

        // echo "<pre>";
        // print_r($useFiles);
        // echo "</pre>";

        $description=['audio','video','image','course_bostter'];
        foreach($description as $dir){
         $storedFiles=File::files(storage_path("app/public/$dir"));
          foreach($storedFiles as $file){
            $name=$dir."/".basename($file) ;
            if(!in_array($name,$useFiles)){
                File::delete($file);
            }
          }
        }
        $this->info("Unused files cleanup completed!");
    }
}
