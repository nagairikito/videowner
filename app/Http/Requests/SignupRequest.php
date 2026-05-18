<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SignupRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
         return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'userName'               => 'required|string|max:255',
            'loginId'                => 'required|unique:users,login_id|string|regex:/^[a-zA-Z0-9._-]+$/|min:8|max:32',
            'password'               => 'required|string|regex:/^[a-zA-Z0-9._-]+$/|min:8|max:32',
        ];
    }

    /**
     * バリデーションメッセージをカスタマイズする
     *      
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function messages(): array
    {
        return [
            'userName.required'  => '名前は必須です',
            'userName.string'    => '文字形式で入力してください',
            'userName.max'       => '255文字以下で入力してください',
            'loginId.required'   => 'ログインIDは必須です',
            'loginId.unique'     => 'このログインＩＤは既に使用されています',
            'loginId.string'     => '文字形式で入力してください',
            'loginId.regex'      => '「英数字」「.」「-」「_」のみ使用できます',
            'loginId.min'        => '8文字以上で入力してください',
            'loginId.max'        => '255文字以下で入力してください',
            'password.required'  => 'パスワードは必須です',
            'password.string'    => '文字形式で入力してください',
            'password.regex'     => '「英数字」「.」「-」「_」のみ使用できます',
            'password.min'       => '8文字以上で入力してください',
            'password.max'       => '255文字以下で入力してください',
        ];
    }

}