<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Membership extends Model
{
    use HasFactory;
    protected $fillable = [
        "name",
        "price",
        "months",
        "status",
        "company_id"
    ];

    public function image () {
        return $this->morphOne(Image::class, 'imageable');
    }
}
