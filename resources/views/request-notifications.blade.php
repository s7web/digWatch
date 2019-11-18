<link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
<script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet">
<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.0/axios.min.js" integrity="sha256-S1J4GVHHDMiirir9qsXWc8ZWw74PHHafpsHp5PXtjTs=" crossorigin="anonymous"></script>
<!------ Include the above in your HEAD tag ---------->

<div class="container contact-form">
    <div class="contact-image">
        <img src="https://dig.watch/sites/default/files/digitalwatch-logo.png" alt="rocket_contact"/>
    </div>
    <form method="post" action="/notifications" onsubmit="event.preventDefault(); setKey();">
        <h3>Notification Centar</h3>
        <div class="row">
            <div class="col-md-12">
                <div class="form-group">
                    <input type="text" name="keyword" id="keyword" class="form-control" placeholder="" />
                </div>
                <div class="form-group">
                    <input type="submit" name="btnSubmit" class="btnContact" value="Submit key" />
                </div>
                <p id="message"></p>
            </div>

        </div>
    </form>
    <div class="row">
        <div class="col-md-12">
            <button onclick="event.preventDefault(); fetchKey();" id="requestkey" type="submit" name="btnSubmitReq" class="btnSubmitReq" value="" >Request your access</button>
        </div>
    </div>
</div>

<script>
    const setKey = () => {

        var dt = new Date();
        dt.setHours( dt.getHours() + 1 );

        var key = $('#keyword').val();
        document.cookie = "key="+key+";expires="+dt.toString()+"; path=/";

        window.location.href = "/notifications";

        return false;
    };
    const fetchKey = () => {

        $('#message').text('Request sent, check your email address');

        setTimeout(() => {
            $('#message').text('');

        }, 4000);

        axios.post('/')
            .then(response => {

               console.log('res',response.data);
            })
            .catch(error => console.error(error));

        return false;
    };
</script>



<style>
    #message{
        position: absolute;
    }
    body{
        background: -webkit-linear-gradient(left, #65c3e5, #0075b0,#818281,#f59401);
        font-family: 'Roboto', sans-serif;
    }
    .contact-form{
        background: #fff;
        margin-top: 10%;
        margin-bottom: 5%;
        width: 80%;
        -webkit-box-shadow: 0 24px 38px 3px rgba(0,0,0,0.14), 0 9px 46px 8px rgba(0,0,0,0.12), 0 11px 15px -7px rgba(0,0,0,0.2);
        box-shadow: 0 24px 38px 3px rgba(0,0,0,0.14), 0 9px 46px 8px rgba(0,0,0,0.12), 0 11px 15px -7px rgba(0,0,0,0.2);

    }
    .contact-form .form-control{
        border-radius:1rem;
    }
    .contact-image{
        text-align: center;
    }
    .contact-image img{
        width: 250px;
        margin-top: -3%;
        background: white;
        padding: 12px;
        object-fit: cover;
        -webkit-box-shadow: 0 24px 38px 3px rgba(0,0,0,0.14), 0 9px 46px 8px rgba(0,0,0,0.12), 0 11px 15px -7px rgba(0,0,0,0.2);
        box-shadow: 0 24px 38px 3px rgba(0,0,0,0.14), 0 9px 46px 8px rgba(0,0,0,0.12), 0 11px 15px -7px rgba(0,0,0,0.2);

    }
    .contact-form form{
        padding: 14%;
    }
    .contact-form form .row{
        margin-bottom: -7%;
    }
    .contact-form h3{
        margin-bottom: 8%;
        margin-top: -10%;
        text-align: center;
        color: #0062cc;
    }
    .contact-form .btnContact {
        width: 50%;
        border: none;
        border-radius: 1rem;
        padding: 1.2%;
        background: #dc3545;
        font-weight: 600;
        color: #fff;
        cursor: pointer;
    }
    .btnSubmitReq
    {
        width: 50%;
        border-radius: 1rem;
        padding: 1.5%;
        color: #fff;
        background-color: #0062cc;
        border: none;
        cursor: pointer;
        margin: 16px auto;
        text-align: center;
        display: block;
    }
</style>

