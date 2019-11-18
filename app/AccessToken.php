<?php
/**
 * Created by PhpStorm.
 * User: dejankikas
 * Date: 11/15/19
 * Time: 2:38 PM
 */

namespace App;

use Illuminate\Database\Eloquent\Model;

class AccessToken extends Model
{
    protected $table = 'access_tokens';

    protected $fillable = ['token'];

    protected $dates = [];

}

