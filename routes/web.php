<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/


$router->get('/store-token/{token}', [
    'as' => 'view-token', 'uses' => 'TokenManagerController@viewToken'
]);

$router->get('/dispatch-notifications', [
    'as' => 'view-token', 'uses' => 'TokenManagerController@sendNotify'
]);

$router->get('/notifications', [
    'as' => 'notifications', 'uses' => 'TokenManagerController@viewNotifications'
]);

$router->post('/notifications', [
    'as' => 'notifications-send', 'uses' => 'TokenManagerController@sendNotifications'
]);

$router->get('/', [
    'as' => 'notifications-request', 'uses' => 'TokenManagerController@requestNotifications'
]);

$router->post('/', [
    'as' => 'notifications-request-fetch', 'uses' => 'TokenManagerController@requestNotificationsToken'
]);


Route::get('/log', function () {

// from PHP documentations
  $logFile = file(storage_path().'/logs/failed-notify.log');
  var_dump($logFile);
});



