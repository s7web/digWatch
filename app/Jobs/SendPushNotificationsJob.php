<?php

namespace App\Jobs;
use App\TokenStore;
use Illuminate\Support\Facades\Log;



/**
 * Class SendPushNotificationsJob
 * @package App\Jobs
 */
class SendPushNotificationsJob extends Job
{

    /**
     * The number of seconds the job can run before timing out.
     *
     * @var int
     */
    public $timeout = 30;

    /**
     * @var
     */
    /**
     * @var
     */
    public $interestDetails, $notification = [];

    /**
     * @var string
     */
    public $token;


    /**
     * SendPushNotificationsJob constructor.
     *
     * @param array $interestDetails
     * @param array $notification
     * @param string $token
     */
    public function __construct(array $interestDetails, array $notification, string $token)
    {
        $this->interestDetails = $interestDetails;
        $this->notification = $notification;
        $this->token = $token;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $expo = \ExponentPhpSDK\Expo::normalSetup();

        $interestDetails = $this->interestDetails;
        $notification = $this->notification;
        $token = $this->token;

        $expo->subscribe($interestDetails[0], $interestDetails[1]);

        $notify = $expo->notify($interestDetails[0], $notification, true);
        if(isset($notify[0]['details']['error'])){

            $notify[0]['token'] = $token;

            Log::channel('notify-fail-log')->info($notify);
            Log::channel('notify-fail-log')->info('DELETED TOKEN '.$token);

            TokenStore::where('expo_token',$token)->delete();
        }
    }
}
