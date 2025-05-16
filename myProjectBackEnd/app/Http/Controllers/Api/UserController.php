<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\LoginResource;
use App\Http\Resources\UserResource;
use App\Models\User;
use GuzzleHttp\Promise\Create;
use Illuminate\Cache\Repository;
use Illuminate\Http\Client\ResponseSequence;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator ;
use Illuminate\Support\Facades\View;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Str;
use LengthException;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user=new User();
        return  UserResource::collection($user->get());
        // $users=User::get();
        // if(count($users)>5){
        //     return UserResource::collection($users);
        // }else{
        //     return response()->json(['message'=>'no there are not users hier now '],200);
        // }
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
       
        $request->validate([
            'name' => 'required|string|max:255',
            'email'=>'required',
            "password"=>'required'
          
            
        ]);
$test=User::where('email',$request->email)->get();
   if(count($test)>0){
    return response()->json(['message'=>'email change']);
   }else{
    if(User::create([
        'name' => $request->name, 
        'email'=>$request->email,
        "password"=>Hash::make($request->password),
        'role' => 'admin'
])){
    return response()->json(['message'=>'success']); 
}
   }
    
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
     return $user;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
 

public function login(Request $request){
   
  //validate the data by request;
  $request->validate([
    'email'=>'required|email',
    'password'=>'required'
  ]);

   $user=User::where('email',$request->email)->first();
   
//    return count($user)>0;

   if(!$user){
      return response()->json(['message'=>'the email is wrong']);
   }
   if(!Hash::check($request->password,$user->password)){
   return response()->json(['message'=>'the password is wrong']);
   }

   $token=$user->createToken('api-token')->plainTextToken;
 
   $data=array();
   $data["id"]=$user->id;
   $data["author_id"]=$user->author->id ?? null;
   $data["name"]=$user->name;
   $data["email"]=$user->email;
   $data['role']=$user->role;
   $data["token"]=$token;
  
    return response()->json([
        'message'=>'success',
        'data'=>$data
    ]);
    }
public function checklogin(Request $request){
   $user=User::where('email',$request->email)->first();
   return $user->id;
}
public function logout(Request $request){
    $request->user()->tokens()->delete();
   return response()->json([
    'message'=>'success'
   ]);
}
}
