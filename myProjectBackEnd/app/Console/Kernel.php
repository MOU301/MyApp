<?php

namespace App\Console;

use App\Console\Commands\CleanUnusedFiles;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected $commands = [
        CleanUnusedFiles::class, // Register your custom command here
    ];
    protected function schedule(Schedule $schedule)
    {
        // Add scheduled tasks here
        $schedule->command('files:delete-unused')->daily();
    }

    /**
     * Register the commands for the application.
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');
        require base_path('routes/console.php');
        // require base_path('routes/console.php');
    }
}
