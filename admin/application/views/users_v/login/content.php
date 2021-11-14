<?php $settings = get_settings(); ?>

<div class="login">

    <div class="login-cover"></div>

    <div class="login-content">
        <div class="login-brand">
            <a href="<?php echo base_url(""); ?>">Giriş Yap <b><?php echo $settings->title; ?></b></a>
        </div>

        <h3 class="m-b-20"><span>Giriş Yap</span></h3>

        <div class="login-desc m-b-30">
            Güvenliğiniz için lütfen kimliğinizi doğrulayın.
        </div>

        <form action="<?php echo base_url("userop/do_login"); ?>" method="POST" name="login_form">
            <div class="form-group">
                <label>Kullanıcı adı veya E-Posta <span class="text-danger">*</span></label>
                <input autofocus required name="user_name" type="text" class="form-control" value="<?php echo !empty($user_name_turn) ? $user_name_turn : ""; ?>" placeholder="Kullanıcı adı veya E-Posta" />
            </div>
            <div class="form-group">
                <label>Parola <span class="text-danger">*</span></label>
                <input name="user_password" type="password" class="form-control" value="" placeholder="Parola" />
            </div>
            <div class="m-b-30">
                <div class="checkbox-inline">
                    <input type="checkbox" id="login-remember-me" value="0"> <label for="login-remember-me">Beni hatırla</label>
                </div>
            </div>
            <div class="d-flex align-items-center">
                <button type="submit" class="btn btn-primary width-150 btn-rounded">Giriş Yap</button>
                <a href="#" class="m-l-10">Şifremi unuttum?</a>
            </div>
        </form>

        <!-- <div class="login-desc m-t-30">
            Henüz üye değil misiniz? <a href="<?php echo base_url("register"); ?>">Buradan Kaydolun.</a>.
        </div> -->
    </div>

</div>