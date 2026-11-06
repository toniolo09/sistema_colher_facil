<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function index()
    {
        return response()->json(User::all());
    }

    public function store(Request $request)
    {
        $request->validate([
            'nome' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
            'tipo_usuario' => 'required|string|in:consumidor,admin,produtor',
            'telefone' => 'required|string|max:20',
            'nome_propriedade' => 'nullable|string|max:255',
        ]);

        $user = User::create([
            'nome' => $request->nome,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'tipo_usuario' => $request->tipo_usuario,
            'telefone' => $request->telefone,
            'nome_propriedade' => $request->nome_propriedade,
        ]);

        return response()->json($user, 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'message' => 'Credenciais inválidas'
            ], 401);
        }

        $user = User::where('email', $request->email)->firstOrFail();

        // Cria um token de acesso para o Sanctum
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login efetuado com sucesso',
            'access_token' => $token,
            'token_type' => 'Bearer',
            'utilizador' => $user
        ]);
    }

    public function logout(Request $request)
    {
        // Revoga o token atual que o utilizador utilizou para autenticar a requisição
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Sessão terminada com sucesso (Logout efetuado)'
        ]);
    }

    public function show(User $user)
    {
        return response()->json($user);
    }

    public function update(Request $request, User $user)
    {
        $request->validate([
            'nome' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'sometimes|required|string|min:6',
            'tipo_usuario' => 'sometimes|required|string|in:consumidor,admin,produtor',
            'telefone' => 'sometimes|required|string|max:20',
            'nome_propriedade' => 'nullable|string|max:255',
        ]);

        $data = $request->except('password');
        if ($request->filled('password')) {
            $data['password'] = Hash::make($request->password);
        }

        $user->update($data);

        return response()->json($user);
    }

    public function destroy(User $user)
    {
        $user->delete();
        return response()->json(null, 204);
    }
}