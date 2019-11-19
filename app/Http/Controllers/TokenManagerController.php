<?php

namespace App\Http\Controllers;

use App\AccessToken;
use App\Jobs\SendPushNotificationsJob;
use App\Mail\AccessTokenMail;
use App\TokenStore;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Queue;
use Illuminate\Support\Str;


/**
 * Class TokenManagerController
 * @package App\Http\Controllers
 */
class TokenManagerController extends Controller
{

    public function sendNotifications(Request $request)
    {

        $this->validate($request, [
            'title'    => 'required|string|max:255',
            'body'     => 'required|string|max:1000',
            'subtitle' => 'required|string|max:255',
        ]);

        if ($request->cookie('key') !== AccessToken::first()->token) {
            return redirect('/');
        }

        $client = new Client();

        $data = $request->only('title', 'subtitle', 'body');


        $res = $client->get('http://notification-centar.test/dispatch-notifications?title='.$data['title'].'&subtitle='.$data['subtitle'].'&body='.$data['body'].'&token='.$request->cookie('key').'');

        $response = $res->getBody();

        return redirect("/notifications?finished=true&msg=".$response);


    }

    public function viewNotifications(Request $request)
    {

        if ( ! $request->has('finished')) {
            if (AccessToken::get()->count() > 0 && $request->cookie('key') === AccessToken::first()->token) {
                return view('notifications');
            } else {
                return redirect('/');
            }
        }

        if ($request->cookie('key') && $request->has('finished') && $request->get('msg')) {
            AccessToken::truncate();
            return view('notifications');
        }

    }

    public function requestNotifications()
    {
        return view('request-notifications');
    }

    public function requestNotificationsToken()
    {
        AccessToken::truncate();

        $uuid = sha1(time().'digwatchrequest');

        AccessToken::create([
            'token' => $uuid,
        ]);

        Mail::to(env('_SENDEMAIL'))->send(new AccessTokenMail($uuid));

        return '';

    }

    public function viewToken($token): string
    {
        Log::info('User-token: '.$token);

        $tokenStore = new TokenStore();

        $tokenStore->expo_token = $token;

        try {
            $tokenStore->saveOrFail();
        } catch (\Exception $e) {
            //if ($e->getCode() == 23000) {}
        }

        return 'Token logged';

    }

    public function sendNotify(Request $request): string
    {

        $this->validate($request, [
            'title'    => 'required|string|max:255',
            'body'     => 'required|string|max:1000',
            'subtitle' => 'required|string|max:255',
            'token' => 'required|string|max:255',
        ]);

        if ($request->get('token') !== AccessToken::first()->token) {
            return false;
        }


        $tokens = TokenStore::get();

        $title    = $request->input('title');
        $body     = $request->input('body');
        $subtitle = $request->input('subtitle');

        $tokens->each(function ($item, $key) use ($title, $body, $subtitle) {

            $interestDetails = ['token-'.time(), $item->expo_token];

            $notification = [
                'body'                 => $body,
                'title'                => $title,
                'subtitle'             => $subtitle,
                'sound'                => 'default',
                'priority'             => 'high',
                'channelId'            => 'news-notify',
                'badge'                => 1,
                '_displayInForeground' => true,
            ];

            //dispatch(new SendPushNotificationsJob($interestDetails, $notification, $item->expo_token));

            $expo = \ExponentPhpSDK\Expo::normalSetup();

            //$interestDetails = $this->interestDetails;
            //$notification = $this->notification;
            $token = $item->expo_token;

            $expo->subscribe($interestDetails[0], $interestDetails[1]);

            $notify = $expo->notify($interestDetails[0], $notification, true);

            if(isset($notify[0]['details']['error'])){

                $notify[0]['token'] = $token;

                Log::channel('notify-fail-log')->info($notify);
                Log::channel('notify-fail-log')->info('DELETED TOKEN '.$token);

                TokenStore::where('expo_token',$token)->delete();
            }


        });

        return ('Notification Queue started for '.$tokens->count().' items');
    }
}
