<?php

namespace App\Providers;

use GuzzleHttp\Psr7\Request;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Client\Request as ClientRequest;
use Illuminate\Queue\Middleware\RateLimited;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    // public function boot(): void
    // {
    //     RateLimited::for('api',function (Request $request){
    //         return Limit::perMinute(60)->by($request->user()?: $request->ip());
        
    //     });
    // }
}
