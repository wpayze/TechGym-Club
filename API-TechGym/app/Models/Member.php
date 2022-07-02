<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Member extends Model
{
    use HasFactory;
    protected  $fillable = [
        "names",
        "surnames",
        "email",
        "profession",
        "address",
        "phone",
        "emergency_phone",
        "birthday",
        "gender",
        "branch_id"
    ];

    public function image () {
        return $this->morphOne(Image::class, 'imageable');
    }
}
