<?php

class Userop extends CI_Controller
{

    public $viewFolder = "";

    public function __construct()
    {
        parent::__construct();
        date_default_timezone_set('Europe/Istanbul');
        $this->viewFolder = "users_v";
        $this->login_settings = get_login_settings();

        $this->load->model(array("user_admin_model", "user_pairing_model", "login_log_model", "login_wrong_log_model", "login_try_log_model", "banned_list_model", "banned_list_model", "login_settings_model", "emailsettings_model"));
    }

    public function login()
    {
        if (get_active_user()) {
            redirect(base_url(""));
        }

        $viewData = new stdClass();
        $viewData->viewFolder = $this->viewFolder;
        $viewControl = 0;

        $logins_wrong = get_login_wrong_log_timeline("-" . $this->login_settings->banForLoginWrongTime);
        $logins_try = get_login_try_log_timeline("-" . $this->login_settings->banForLoginTryTime);
        $control_ban = control_ban();

        $viewData->user_name_turn = $this->session->userdata("user_name_turn");

        if ((!empty($control_ban) || count($logins_try) >= $this->login_settings->banForLoginTryCount || count($logins_wrong) >= $this->login_settings->banForLoginWrongCount ) && $viewControl == 0) {
            $alert = array(
                "title" => "Erişim Kapalı",
                "content" => "IP adresiniz erişime yasaklandı",
                "icon" => "fa fa-ban",
                "iconClass" => "bg-gradient-red text-white",
                "type" => "default",
                "closeBtnText" => "Kapat",
                "btnText" => "Yardım",
                "btnUrl" => "http://localhost",
            );
            $this->session->set_flashdata("alert", $alert);
            $viewControl = 1;
            $viewData->subViewFolder = "banned";
            $viewData->control_ban = $control_ban;
            $this->load->view("{$viewData->viewFolder}/{$viewData->subViewFolder}/index", $viewData);
        }


        if ($viewControl == 0) {
            $viewData->subViewFolder = "login";
            $this->load->view("{$viewData->viewFolder}/{$viewData->subViewFolder}/index", $viewData);
        }
    }

    public function account_verification($user_id)
    {
        $viewData = new stdClass();
        $viewData->viewFolder = $this->viewFolder;

        if (!empty($user_id)) {
            $user = $this->user_admin_model->get(
                array(
                    "id" => $user_id,
                    "deleted" => 0,
                )
            );

            if (!empty($user)) {
                //Süre kontrolü yapılmalı + wrong_try kontrolü yapılmalı
                $pairing = $this->user_pairing_model->get(
                    array(
                        "user_id" => $user->id,
                        "ip_address" => getip(),
                        "user_type" => "admin",
                        "isActive" => 1,
                        "deleted" => 0,
                    )
                );

                if (!empty($pairing)) {
                    $date = date_create($pairing->updatedAt);
                    date_add($date, date_interval_create_from_date_string($this->login_settings->emailConfirmationTime));
                    $pairing_limit = date_format($date, 'Y-m-d H:i:s');
                    $user->email = email_hide($user->email, 3);
                    $viewData->user = $user;
                    $viewData->pairing_time = $pairing_limit;

                    if ($pairing->approved == 0) {

                        if (date("Y-m-d H:i:s") > $pairing_limit) {
                            $alert = array(
                                "title" => "Doğrulama Süresi Doldu",
                                "content" => "Tekrar giriş yapmanız gerekiyor",
                                "icon" => "fa fa-spinner",
                                "iconClass" => "bg-gradient-yellow text-white",
                                "type" => "default",
                                "closeBtnText" => 'Kapat',
                            );

                            $this->session->set_flashdata("alert", $alert);
                            redirect(base_url("login"));
                        }


                        $viewData->subViewFolder = "verification_code_screen";
                        $this->load->view("{$viewData->viewFolder}/{$viewData->subViewFolder}/index", $viewData);
                    } else {
                        $alert = array(
                            "title" => "IP adresi zaten onaylanmış",
                            "content" => "Hesap bilgilerinizle sisteme giriş yapabilirsiniz",
                            "icon" => "fa fa-address-card",
                            "iconClass" => "bg-gradient-yellow text-white",
                            "type" => "default",
                            "closeBtnText" => 'Kapat',
                        );

                        $this->session->set_flashdata("alert", $alert);
                        redirect(base_url("login"));
                    }
                } else {
                    $alert = array(
                        "title" => "Giriş Yap",
                        "content" => "Hesap bilgilerinizle sisteme giriş yapabilirsiniz",
                        "icon" => "fa fa-user",
                        "iconClass" => "bg-gradient-blue text-white",
                        "type" => "default",
                        "closeBtnText" => 'Kapat',
                    );

                    $this->session->set_flashdata("alert", $alert);
                    redirect(base_url("login"));
                }
            } else {
                $alert = array(
                    "title" => "Hata",
                    "content" => "Hesap Bulunamadı",
                    "icon" => "fa fa-user",
                    "iconClass" => "bg-gradient-red text-white",
                    "type" => "default",
                    "closeBtnText" => 'Kapat',
                );

                $this->session->set_flashdata("alert", $alert);
                redirect(base_url("login"));
            }
        }
    }

    public function send_code_again($user_id)
    {

        $user = $this->user_admin_model->get(
            array(
                "id" => $user_id,
                "deleted" => 0,
            )
        );

        if (!empty($user)) {
            $pairing = $this->user_pairing_model->get(
                array(
                    "user_id" => $user->id,
                    "ip_address" => getip(),
                    "user_type" => "admin",
                    "isActive" => 1,
                    "deleted" => 0,
                    "approved" => 0,
                )
            );

            if (!empty($pairing)) {
                $date = date_create($pairing->code_send_time);
                date_add($date, date_interval_create_from_date_string($this->login_settings->emailConfirmationCodeSendTime));
                $code_send_limit = date_format($date, 'Y-m-d H:i:s');

                if ($code_send_limit < date("Y-m-d H:i:s")) {
                    $this->user_pairing_model->update(
                        array(
                            "id" => $pairing->id,
                        ),
                        array(
                            "code_send" => 0,
                            "code_send_time" => date("Y-m-d H:i:s"),
                        )
                    );
                } else {
                    if ($pairing->code_send >= $this->login_settings->emailConfirmationCodeSendCount) {
                        $alert = array(
                            "title" => "Güvenlik",
                            "content" => "Bu IP adresinden çok kez kod gönderimi yapıldı <br> Lütfen daha sonra tekrar deneyin",
                            "icon" => "fa fa-shield-alt",
                            "iconClass" => "bg-gradient-dark text-white",
                            "type" => "default",
                            "closeBtnText" => 'Kapat',
                        );

                        $this->session->set_flashdata("alert", $alert);
                        redirect($_SERVER['HTTP_REFERER']);
                    }
                }

                $code_send = $pairing->code_send + 1;

                $update = $this->user_pairing_model->update(
                    array(
                        "user_id" => $user->id,
                        "isActive" => 1,
                        "deleted" => 0,
                    ),
                    array(
                        "code_send" => $code_send,
                        "code_send_time" => date("Y-m-d H:i:s"),
                    )
                );


                $sended = send_vcode_w_pairing($user, "admin");

                if ($sended == "1") {
                    $alert = array(
                        "title" => "E-Posta",
                        "content" => "E-Posta adresinize bir kod gönderdik",
                        "icon" => "fa fa-envelope",
                        "iconClass" => "bg-gradient-blue text-white",
                        "type" => "default",
                        "closeBtnText" => 'Kapat',
                    );

                    $this->session->set_flashdata("alert", $alert);
                    redirect($_SERVER['HTTP_REFERER']);
                } else if ($sended == "email_devre_disi") {
                    $alert = array(
                        "title" => "Servis Devre Dışı",
                        "content" => "E-Posta servisi devre dışı",
                        "icon" => "fa fa-wrench",
                        "iconClass" => "bg-gradient-red text-white",
                        "type" => "default",
                        "closeBtnText" => 'Kapat',
                    );

                    $this->session->set_flashdata("alert", $alert);
                    redirect(base_url("login"));
                } else {
                    $alert = array(
                        "title" => "Güvenlik",
                        "content" => "Farklı bir IP adresinden giriş yaptığınızı görüyoruz fakat şuan E-Posta servisimiz devre dışı, Lütfen daha sonra giriş yapmayı deneyin.",
                        "icon" => "fa fa-shield-alt",
                        "iconClass" => "bg-gradient-dark text-w2hite",
                        "type" => "default",
                        "closeBtnText" => 'Kapat',
                    );

                    $this->session->set_flashdata("alert", $alert);
                    redirect(base_url("login"));
                }
            } else {
                $alert = array(
                    "title" => "Hata",
                    "content" => "Kullanıcı Sistemde Bulunamadı",
                    "icon" => "fa fa-user",
                    "iconClass" => "bg-gradient-red text-white",
                    "type" => "default",
                    "closeBtnText" => 'Kapat',
                );

                $this->session->set_flashdata("alert", $alert);
                redirect(base_url("login"));
            }
        } else {
            $alert = array(
                "title" => "Hata",
                "content" => "Kullanıcı Sistemde Bulunamadı",
                "icon" => "fa fa-user",
                "iconClass" => "bg-gradient-red text-white",
                "type" => "default",
                "closeBtnText" => 'Kapat',
            );

            $this->session->set_flashdata("alert", $alert);
            redirect(base_url(""));
        }
    }

    public function verification_code_post()
    {
        $verification_code = trim($this->input->post("verification_code"));
        $user_id = $this->input->post("user_id");

        $user = $this->user_admin_model->get(
            array(
                "id" => $user_id,
                "deleted" => 0,
            )
        );

        if (!empty($user)) {

            //Timer eklencek (en son ne zaman yanlış kod girildi)
            $pairing = $this->user_pairing_model->get(
                array(
                    "user_id" => $user->id,
                    "ip_address" => getip(),
                    "user_type" => "admin",
                    "isActive" => 1,
                    "deleted" => 0,
                    "approved" => 0,
                )
            );

            if (!empty($pairing)) {

                $date = date_create($pairing->wrong_try_time);
                date_add($date, date_interval_create_from_date_string($this->login_settings->emailConfirmationWrongTryTime));
                $wrong_try_limit = date_format($date, 'Y-m-d H:i:s');


                if ($wrong_try_limit < date("Y-m-d H:i:s")) {
                    $this->user_pairing_model->update(
                        array(
                            "id" => $pairing->id,
                        ),
                        array(
                            "wrong_try" => 0,
                            "wrong_try_time" => date("Y-m-d H:i:s"),
                        )
                    );
                } else {
                    if ($pairing->wrong_try >= $this->login_settings->emailConfirmationWrongTryCount) {
                        $alert = array(
                            "title" => "Güvenlik",
                            "content" => "Bu IP adresinden çok kez deneme yapıldı <br> Lütfen daha sonra tekrar deneyin",
                            "icon" => "fa fa-shield-alt",
                            "iconClass" => "bg-gradient-dark text-white",
                            "type" => "default",
                            "closeBtnText" => 'Kapat',
                        );

                        $this->session->set_flashdata("alert", $alert);
                        redirect(base_url("login"));
                    }
                }

                //Code_send kontrolü kapatıldı

                if ($pairing->verification_code == $verification_code) {

                    $update = $this->user_pairing_model->update(
                        array(
                            "user_id" => $user->id,
                            "isActive" => 1,
                            "deleted" => 0,
                        ),
                        array(
                            "approved" => 1,
                        )
                    );

                    if ($update) {
                        $alert = array(
                            "title" => "IP Doğrulandı",
                            "content" => getip() . "<br>IP adresi beyaz listeye eklendi",
                            "icon" => "fa fa-address-card",
                            "iconClass" => "bg-gradient-green text-white",
                            "type" => "default",
                            "closeBtnText" => 'Kapat',
                        );

                        $this->session->set_flashdata("alert", $alert);
                        $this->session->set_userdata("user_admin", $user);
                        redirect(base_url(""));
                    }
                } else {
                    $wrong_try = $pairing->wrong_try + 1;

                    $update = $this->user_pairing_model->update(
                        array(
                            "user_id" => $user->id,
                            "isActive" => 1,
                            "deleted" => 0,
                        ),
                        array(
                            "wrong_try" => $wrong_try,
                            "wrong_try_time" => date("Y-m-d H:i:s"),
                        )
                    );

                    $alert = array(
                        "title" => "Hata",
                        "content" => "Girilen kod eşleşmiyor",
                        "icon" => "fa fa-asterisk",
                        "iconClass" => "bg-gradient-red text-white",
                        "type" => "default",
                        "closeBtnText" => 'Kapat',
                    );

                    $this->session->set_flashdata("alert", $alert);
                    redirect($_SERVER['HTTP_REFERER']);
                }
            } else {
                $alert = array(
                    "title" => "Hata",
                    "content" => "Sistemde bir hata oluştu",
                    "icon" => "fa fa-user",
                    "iconClass" => "bg-gradient-red text-white",
                    "type" => "default",
                    "closeBtnText" => 'Kapat',
                );

                $this->session->set_flashdata("alert", $alert);
                redirect(base_url("login"));
            }
        } else {
            $alert = array(
                "title" => "Hata",
                "content" => "Kullanıcı Sistemde Bulunamadı",
                "icon" => "fa fa-user",
                "iconClass" => "bg-gradient-red text-white",
                "type" => "default",
                "closeBtnText" => 'Kapat',
            );

            $this->session->set_flashdata("alert", $alert);
            redirect(base_url(""));
        }
    }

    public function do_login()
    {
        $viewData = new stdClass();
        $viewData->viewFolder = $this->viewFolder;
        $this->load->model("user_admin_model");
        $this->load->model("emailsettings_model");
        $this->load->library("form_validation");

        $agent = get_user_agent();
        $logins_wrong = get_login_wrong_log_timeline("-" . $this->login_settings->banForLoginWrongTime);
        $logins_try = get_login_try_log_timeline("-" . $this->login_settings->banForLoginTryTime);
        $control_ban = control_ban();

        if (count($logins_wrong) >= $this->login_settings->banForLoginWrongCount) {
            redirect(base_url(""));
        }

        if (count($logins_try) >= $this->login_settings->banForLoginTryCount) {
            redirect(base_url(""));
        }

        if (!empty($control_ban)) {
            redirect(base_url(""));
        }

        if (get_active_user()) {
            redirect(base_url(""));
        }


        $this->form_validation->set_rules("user_name", "Kullanıcı adı", "required|trim");
        $this->form_validation->set_rules("user_password", "Şifre", "required|trim");

        $this->form_validation->set_message(
            array(
                "required"    => "<b>{field}</b> alanı doldurulmalıdır",
                "valid_email" => "Lütfen geçerli bir e-posta adresi giriniz",
                "min_length"  => "<b>{field}</b> en az 6 karakterden oluşmalıdır",
                "max_length"  => "<b>{field}</b> en fazla 8 karakterden oluşmalıdır",
            )
        );

        $adminuser = $this->input->post("user_name");
        $adminpass = $this->input->post("user_password");

        $user = $this->user_admin_model->get(
            array(
                "username" => $adminuser,
                "deleted" => 0,
            )
        );

        if (!empty($user)) {
            $viewData->user_name_turn = $user->username;
            $this->session->set_flashdata("user_name_turn", $viewData->user_name_turn);
        } else {
            $user = $this->user_admin_model->get(
                array(
                    "email" => $adminuser,
                    "deleted" => 0,
                )
            );

            if (!empty($user)) {
                $viewData->user_name_turn = $user->email;
                $this->session->set_flashdata("user_name_turn", $viewData->user_name_turn);
            }
        }

        if (!empty($user)) {
            if ($user->password == md5($adminpass)) {

                $pairing_control = $this->user_pairing_model->get(array(
                    "user_id" => $user->id,
                    "ip_address" => getip(),
                    "user_type" => "admin",
                    "approved" => 0,
                    "isActive" => 1,
                    "deleted" => 0,
                ));

                if (!empty($pairing_control)) {
                    $date = date_create($pairing_control->wrong_try_time);
                    date_add($date, date_interval_create_from_date_string($this->login_settings->emailConfirmationWrongTryTime));
                    $wrong_try_limit = date_format($date, 'Y-m-d H:i:s');

                    if ($wrong_try_limit < date("Y-m-d H:i:s")) {
                        $this->user_pairing_model->update(
                            array(
                                "id" => $pairing_control->id,
                            ),
                            array(
                                "wrong_try" => 0,
                                "wrong_try_time" => date("Y-m-d H:i:s"),
                            )
                        );
                    } else {
                        if ($pairing_control->wrong_try >= $this->login_settings->emailConfirmationWrongTryCount) {
                            $alert = array(
                                "title" => "Güvenlik",
                                "content" => "Bu IP adresinden çok kez deneme yapıldı <br> Lütfen daha sonra tekrar deneyin",
                                "icon" => "fa fa-shield-alt",
                                "iconClass" => "bg-gradient-dark text-white",
                                "type" => "default",
                                "closeBtnText" => 'Kapat',
                            );

                            $this->session->set_flashdata("alert", $alert);
                            redirect(base_url("login"));
                        }
                    }

                    $date = date_create($pairing_control->code_send_time);
                    date_add($date, date_interval_create_from_date_string($this->login_settings->emailConfirmationCodeSendTime));
                    $code_send_limit = date_format($date, 'Y-m-d H:i:s');

                    if ($code_send_limit < date("Y-m-d H:i:s")) {
                        $this->user_pairing_model->update(
                            array(
                                "id" => $pairing_control->id,
                            ),
                            array(
                                "code_send" => 0,
                                "code_send_time" => date("Y-m-d H:i:s"),
                            )
                        );
                    } else {
                        if ($pairing_control->code_send >= $this->login_settings->emailConfirmationCodeSendCount) {
                            $alert = array(
                                "title" => "Güvenlik",
                                "content" => "Bu IP adresinden çok kez kod gönderimi yapıldı <br> Lütfen daha sonra tekrar deneyin",
                                "icon" => "fa fa-shield-alt",
                                "iconClass" => "bg-gradient-dark text-white",
                                "type" => "default",
                                "closeBtnText" => 'Kapat',
                            );

                            $this->session->set_flashdata("alert", $alert);
                            redirect(base_url("login"));
                        }
                    }
                }

                $pairing_exists = $this->user_pairing_model->get(array(
                    "user_id" => $user->id,
                    "ip_address" => getip(),
                    "user_type" => "admin",
                    "approved" => 1,
                    "isActive" => 1,
                    "deleted" => 0,
                ));

                if (empty($pairing_exists)) {
                    $sended = send_vcode_w_pairing($user, "admin");
                    if ($sended == "1") {

                        $alert = array(
                            "title" => "E-Posta",
                            "content" => "E-Posta adresinize bir kod gönderdik",
                            "icon" => "fa fa-envelope",
                            "iconClass" => "bg-gradient-blue text-white",
                            "type" => "default",
                            "closeBtnText" => 'Kapat',
                        );

                        $this->session->set_flashdata("alert", $alert);
                        redirect(base_url("userop/account_verification/") . $user->id);
                    } else if ($sended == "email_devre_disi") {
                        $alert = array(
                            "title" => "Servis Devre Dışı",
                            "content" => "Farklı bir IP adresinden giriş yaptığınızı görüyoruz fakat şuan E-Posta servisimiz devre dışı, Lütfen daha sonra giriş yapmayı deneyin",
                            "icon" => "fa fa-wrench",
                            "iconClass" => "bg-gradient-red text-white",
                            "type" => "default",
                            "closeBtnText" => 'Kapat',
                        );

                        $this->session->set_flashdata("alert", $alert);
                        redirect(base_url("login"));
                    } else {
                        $alert = array(
                            "title" => "Hata",
                            "content" => "İşlem gerçekleştirilemiyor",
                            "icon" => "fa fa-wrench",
                            "iconClass" => "bg-gradient-red text-white",
                            "type" => "default",
                            "closeBtnText" => 'Kapat',
                        );

                        $this->session->set_flashdata("alert", $alert);
                        redirect(base_url("login"));
                    }
                }

                $old_trys = $this->login_try_log_model->get_all(
                    array(
                        "ip_address" => getip(),
                        "converted" => 0,
                    )
                );

                foreach ($old_trys as $old_try) {
                    $update = $this->login_try_log_model->update(
                        array(
                            "id" => $old_try->id,
                        ),
                        array(
                            "converted" => 1,
                        )
                    );
                }

                $this->session->set_userdata("user_admin", $user);

                $insert = $this->login_log_model->add(array(
                    "createdAt" => date("Y-m-d H:i:s"),
                    "user_type" => "admin",
                    "browser" => $agent->browser . ' ' . $agent->version,
                    "robot" => $agent->robot,
                    "platform" => $agent->platform,
                    "device" => $agent->device,
                    "ip_address" => getip(),
                    "user_id" => $user->id,
                    "try_username" => $adminuser,
                    // "try_password" => $adminpass,
                ));

                $alert = array(
                    "title" => "Giriş Başarılı",
                    "content" => "Hoşgeldin " . $user->full_name,
                    "icon" => "fa fa-key",
                    "iconClass" => "bg-gradient-green text-white",
                    "type" => "default",
                    "closeBtnText" => 'Kapat',
                );

                $this->session->set_flashdata("alert", $alert);
                redirect(base_url(""));
            } else {

                $this->login_wrong_log_model->add(array(
                    "createdAt" => date("Y-m-d H:i:s"),
                    "user_type" => "admin",
                    "browser" => $agent->browser . ' ' . $agent->version,
                    "robot" => $agent->robot,
                    "platform" => $agent->platform,
                    "device" => $agent->device,
                    "ip_address" => getip(),
                    "user_id" => $user->id,
                    "try_username" => $adminuser,
                    // "try_password" => $adminpass,
                ));

                $alert = array(
                    "title" => "Hata",
                    "content" => "Girdiğiniz Parola Yanlış",
                    "icon" => "fa fa-key",
                    "iconClass" => "bg-gradient-red text-white",
                    "type" => "default",
                    "closeBtnText" => "Kapat",
                    // "btnText" => "Tamam",
                    // "btnUrl" => "http://localhost",
                );

                $this->session->set_flashdata("alert", $alert);
            }
        } else {
            $this->login_try_log_model->add(array(
                "createdAt" => date("Y-m-d H:i:s"),
                "user_type" => "admin",
                "browser" => $agent->browser . ' ' . $agent->version,
                "robot" => $agent->robot,
                "platform" => $agent->platform,
                "device" => $agent->device,
                "ip_address" => getip(),
                "try_username" => $adminuser,
                // "try_password" => $adminpass,
            ));

            $alert = array(
                "title" => "Hata",
                "content" => "Böyle bir üyelik yok.",
                "icon" => "fa fa-key",
                "iconClass" => "bg-gradient-red text-white",
                "type" => "default",
                "closeBtnText" => "Kapat",
            );

            $this->session->set_flashdata("alert", $alert);
            $viewData->user_name_turn =  "";
        }

        if (count($logins_wrong) >= $this->login_settings->banForLoginWrongCount) {
            redirect(base_url(""));
        }

        if (count($logins_try) >= $this->login_settings->banForLoginTryCount) {
            redirect(base_url(""));
        }

        if (!empty($control_ban)) {
            redirect(base_url(""));
        }

        if (get_active_user()) {
            redirect(base_url(""));
        }


        redirect(base_url("login"));

        /** Ban sistemi için burası düzgün çalışmıyor*/
        // $viewData->subViewFolder = "login";
        // $this->load->view("{$viewData->viewFolder}/{$viewData->subViewFolder}/index", $viewData);
    }

    //Burası test için
    public function ban_sifirla()
    {
        $viewData = new stdClass();
        $viewData->viewFolder = $this->viewFolder;
        $this->load->model("banned_list_model");
        $this->load->library("login_try_log_model");

        $banned_list = $this->banned_list_model->get_all(
            array()
        );

        foreach ($banned_list as $banned) {
            $this->banned_list_model->delete(
                array(
                    "id" => $banned->id,
                )
            );
        }

        $login_trys = $this->login_try_log_model->get_all(
            array()
        );

        foreach ($login_trys as $login_try) {
            $this->login_try_log_model->delete(
                array(
                    "id" => $login_try->id,
                )
            );
        }

        $login_wrongs = $this->login_wrong_log_model->get_all(
            array()
        );

        foreach ($login_wrongs as $login_wrong) {
            $this->login_wrong_log_model->delete(
                array(
                    "id" => $login_wrong->id,
                )
            );
        }

        return redirect(base_url(""));
    }

    public function logout()
    {
        $this->session->unset_userdata("user_admin");
        $this->session->unset_userdata("site_set");
        redirect(base_url("login"));
    }

    public function forget_password()
    {


        if (get_active_user()) {
            redirect(base_url());
        }

        $viewData = new stdClass();

        /** View'e gönderilecek Değişkenlerin Set Edilmesi.. */
        $viewData->viewFolder = $this->viewFolder;
        $viewData->subViewFolder = "forget_password";

        $this->load->view("{$viewData->viewFolder}/{$viewData->subViewFolder}/index", $viewData);
    }

    public function reset_password()
    {

        $this->load->library("form_validation");

        // Kurallar yazilir..
        $this->form_validation->set_rules("email", "E-posta", "required|trim|valid_email");
        $this->form_validation->set_rules("name", "Site adı", "required|trim");

        $this->form_validation->set_message(
            array(
                "required"    => "<b>{field}</b> alanı doldurulmalıdır",
                "valid_email" => "Lütfen geçerli bir <b>e-posta</b> adresi giriniz",
            )
        );

        if ($this->form_validation->run() === FALSE) {

            $viewData = new stdClass();

            /** View'e gönderilecek Değişkenlerin Set Edilmesi.. */
            $viewData->viewFolder = $this->viewFolder;
            $viewData->subViewFolder = "forget_password";
            $viewData->form_error = true;

            $this->load->view("{$viewData->viewFolder}/{$viewData->subViewFolder}/index", $viewData);
        } else {

            $set = $this->login_settings_model->get(
                array(
                    "company_name" => $this->input->post("name")
                )
            );

            $user = $this->user_model->get(
                array(
                    "isActive"  => 1,
                    "email"     => $this->input->post("email"),
                    "site_id"  => $set->id,
                )
            );

            if ($user && $set) {

                $this->load->helper("string");
                $temp_password = random_string();

                $send = send_email($set->id, $user->email, "Şifremi Unuttum", "CMS'e geçici olarak <b>{$temp_password}</b> şifresiyle giriş yapabilirsiniz");

                if ($send) {
                    echo "E-posta başarılı bir şekilde gonderilmiştir..";

                    $this->user_model->update(
                        array(
                            "id"    => $user->id
                        ),
                        array(
                            "password"  => md5($temp_password)
                        )
                    );


                    $alert = array(
                        "title" => "İşlem Başarılı",
                        "text" => "Şifreniz başarılı bir şekilde resetlendi. Lütfen E-postanızı kontrol ediniz!",
                        "type"  => "success"
                    );

                    $this->session->set_flashdata("alert", $alert);

                    redirect(base_url("login"));

                    die();
                } else {

                    //                    echo $this->email->print_debugger();
                    $alert = array(
                        "title" => "İşlem Başarısız",
                        "text" => "E-posta gönderilirken bir problem oluştu!!",
                        "type"  => "error"
                    );

                    $this->session->set_flashdata("alert", $alert);

                    redirect(base_url("sifremi-unuttum"));

                    die();
                }
            } else {

                $alert = array(
                    "title" => "İşlem Başarısız",
                    "text" => "Böyle bir kullanıcı bulunamadı!!!",
                    "type"  => "error"
                );

                $this->session->set_flashdata("alert", $alert);

                redirect(base_url("sifremi-unuttum"));
            }
        }
    }
}
