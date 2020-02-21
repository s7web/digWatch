<link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
<script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet">
<!------ Include the above in your HEAD tag ---------->



<div class="container contact-form">
    <div class="contact-image">
        <img src="https://dig.watch/sites/default/files/digitalwatch-logo.png" alt="rocket_contact"/>
    </div>
    <form method="post" onsubmit="return confirm('Are you sure?');">
        <h3>Notification Centar</h3>
        <div class="row">
            <div class="col-md-6">
                <div class="form-group">
                    <input type="text" name="title" class="form-control" placeholder="Title *" value="" />
                </div>
                <div class="form-group">
                    <input type="text" name="subtitle" class="form-control" placeholder="Subtitle *" value="" />
                </div>

                <div class="form-group">
                    <input type="submit" name="btnSubmit" class="btnContact" value="Send Message" />
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <textarea name="body" class="form-control" placeholder="Description *" style="width: 100%; height: 150px;"></textarea>
                </div>
            </div>
            <p style="font-size: 24px;text-align: center;width: 100%;margin-top: 50px;" id="message"></p>
        </div>
    </form>
</div>

<script>
    let searchParams = new URLSearchParams(window.location.search)
    if(searchParams.has('finished') && searchParams.has('msg')){
        $('#message').text(searchParams.get('msg'));
        setTimeout(() => {
            document.cookie = "key=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            window.location.href= "/";
        }, 6000);
    }
</script>

<style>
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
        padding: 1.5%;
        background: #dc3545;
        font-weight: 600;
        color: #fff;
        cursor: pointer;
    }
    .btnContactSubmit
    {
        width: 50%;
        border-radius: 1rem;
        padding: 1.5%;
        color: #fff;
        background-color: #0062cc;
        border: none;
        cursor: pointer;
    }
</style>

