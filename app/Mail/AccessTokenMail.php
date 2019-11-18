<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class AccessTokenMail extends Mailable
{
    use Queueable, SerializesModels;

    public $uuid;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($uuid)
    {
        $this->uuid = $uuid;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from('DigWatch@accesstoken.com')
                    ->view('mails.acctoken')
                    ->text('Dig Watch Access token');


    }
}