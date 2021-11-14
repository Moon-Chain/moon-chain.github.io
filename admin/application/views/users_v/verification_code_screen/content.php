<?php $settings = get_settings(); ?>

<div class="login">
    <div class="login-cover"></div>
    <div class="login-content">

        <div class="login-brand">
            <a href="<?php echo base_url(""); ?>">Doğrulama Servisi <b><?php echo $settings->title; ?></b></a>
        </div>

        <h3 class="m-b-20"><span>IP Adresinizi Doğrulayın</span></h3>
        <div class="login-desc m-b-30">
            <span style="color:#ffffff;"><?php echo $user->email; ?></span> E-Posta adresine doğrulama kodu gönderdik
            <br>
            Devam edebilmek için belirtilen süre içinde kodu doğrulayınız.
        </div>
        <div style="font-size:20px; text-align:center">
            <input type="hidden" id="timer_clock_active" value="verification">
            <span>Kalan Süre:</span>
            <input type="hidden" value="<?php echo $pairing_time; ?>">
            <span id="timer_clock"></span>
        </div>

        <div class="login-desc m-b-30">
            <form action="<?php echo base_url("userop/verification_code_post"); ?>" method="POST" name="login_form">
                <input name="user_id" type="hidden" class="form-control" value="<?php echo $user->id; ?>" />
                <div class="form-group">
                    <label>Doğrulama Kodu<span class="text-danger">*</span></label>
                    <input autofocus name="verification_code" type="text" class="form-control" />
                </div>
                <div class="d-flex align-items-center">
                    <a class="btn btn-primary width-150 btn-rounded" style="text-decoration: none; margin-right:10px;" href="<?php echo base_url("userop/send_code_again/$user->id"); ?>"><i class="fa fa-undo"></i> Tekrar Gönder</a>
                    <button type="submit" class="btn btn-success width-150 btn-rounded">Doğrula <i class="fa fa-check"></i></button>
                </div>
            </form>
        </div>

    </div>

</div>