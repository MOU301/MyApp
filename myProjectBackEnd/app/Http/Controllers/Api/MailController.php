<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\ContactMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class MailController extends Controller
{
public function send(Request $request){
    return "send the email";
    $request->validate([
        'user_email' => 'required|email',
        'message' => 'required|string',
    ]);
   
 
    Mail::to($request->user_email)->send(new ContactMail($request->message));
    
  return response()->json(['message'=>'success']);
}
}
