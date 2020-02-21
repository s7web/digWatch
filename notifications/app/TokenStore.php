<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class TokenStore extends Model {

    protected $fillable = ['token_store'];

    protected $dates = [];

    public static $rules = [
        // Validation rules
    ];

    // Relationships

}
