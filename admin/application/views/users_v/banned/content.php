<?php $settings = get_settings(); ?>

<div class="login" style="margin-right:40px; margin-left:40px;">

    <div class="login-cover"></div>
    <div class="login-content">

        <div class="login-brand">
            <a href="<?php echo base_url(""); ?>">Güvenlik <b><?php echo $settings->title; ?></b></a>
        </div>

        <h3 class="m-b-20"><span>Giriş Engellendi</span></h3>

        <div style="font-size:20px; text-align:center">
            <input type="hidden" id="timer_clock_active" value="banned">
            <span>Kalan Süre:</span>
            <?php 
            $date = date_create($control_ban->finishAt); ?>
            <input type="hidden" value="<?php echo date_format($date, 'Y-m-d H:i:s'); ?>">
            <span id="timer_clock"></span>
            
        </div>

        <div class="login-desc m-b-30 bg-danger text-light" style="padding:4px;">
            Güvenliğin sağlanması için giriş yapmanı geçici olarak engelledik. Tekrar giriş yapmayı denemeden önce, giriş bilgilerini kontrol et ve güvenli bir ağda her zamanki cihazını kullandığından emin ol.
        </div>

        <div class="login-desc m-t-30">
            Hesabınıza ulaşamıyor musunuz? <a href="<?php echo base_url("userop/ban_sifirla"); ?>">Yardım Al</a>.
        </div>
    </div>

</div>