<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;



class AuthController extends Controller
{
    public function register(Request $request)
    {
        $v = Validator::make($request->all(), [
            'name' => 'required|min:3|',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:3|confirmed',
        ]);
        if ($v->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $v->errors()
            ], 422);
        }
        $user = new User;
        $user->name = $request->name;
        $user->email = $request->email;

        //      $user->password=Hash::make($request->password);
        $user->password = bcrypt($request->password);
        $user->save();
        $token = $user->createToken('main')->plainTextToken;

        // return response()->json(['status' => 'success'], 200);
        return response([
            'user' => $user,
            'token' => $token
        ]);
    }
    public function login(Request $request)
    {
        $credentials = $request->validate([

            'email' => 'required|email|string|exists:users,email',
            'password' => [
                'required'
            ],
            'remember' => 'boolean'


        ]);

        $remember = $credentials['remember'] ?? false;
        unset($credentials['remember']);


        if (!Auth::attempt($credentials, $remember)) {
            return response([
                'error' => 'The Provided credentials are not the correct'

            ], 422);
        }
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;



        return response([
            'success' => "Successfully Logged in!",
            'user' => $user,
            'token' => $token
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'status' => 'success',
            'msg' => 'Logged out Successfully.'

        ], 200);
    }

    public function user(Request $request)
    {
        $user = User::find(Auth::user()->id);
        return response()->json([
            'status' => 'success',
            'data' => $user
        ]);
    }




    // public function refresh()
    // {
    //     /** @var TYPE_NAME $token */
    //     if ($token = $this->guard()->refresh()) {
    //         return response()
    //             ->json(['status' => 'successs'], 200)
    //             ->header('Authorization', $token);
    //     }
    //     return response()->json(['error' => 'refresh_token_error'], 401);
    // }

    private function guard()
    {
        return Auth::guard();
    }
}
