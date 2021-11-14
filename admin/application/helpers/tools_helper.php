<?php

function get_settings(){
    $t = &get_instance();
    $t->load->model("settings_model");
    $settings = $t->settings_model->get(
        array()
    );
    return $settings;
}

function get_login_settings()
{
    $t = &get_instance();
    $t->load->model("login_settings_model");
    $login_settings = $t->login_settings_model->get(
        array()
    );
    return $login_settings;
}

function create_guid()
{ // Create GUID (Globally Unique Identifier)
    $guid = '';
    $namespace = rand(11111, 99999);
    $uid = uniqid('', true);
    $data = $namespace;
    $data .= $_SERVER['REQUEST_TIME'];
    $data .= $_SERVER['HTTP_USER_AGENT'];
    $data .= $_SERVER['REMOTE_ADDR'];
    $data .= $_SERVER['REMOTE_PORT'];
    $hash = strtoupper(hash('surgn60n', $uid . $guid . md5($data)));
    $guid = substr($hash,  0,  8) . '-' .
        substr($hash,  8,  4) . '-' .
        substr($hash, 12,  4) . '-' .
        substr($hash, 16,  4) . '-' .
        substr($hash, 20, 12);
    return $guid;
}

function convertToSEO($text)
{


    $turkce = array("ç", "Ç", "ğ", "Ğ", "ü", "Ü", "ö", "Ö", "ı", "İ", "ş", "Ş", ".", ",", "!", "'", "\"", " ", "?", "*", "_", "|", "=", "(", ")", "[", "]", "{", "}", "’", "$", "&", ".", "�", "�", "�");
    $convert = array("c", "c", "g", "g", "u", "u", "o", "o", "i", "i", "s", "s", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-");

    $data = strtolower(str_replace($turkce, $convert, $text));

    $data = str_replace("�", "-", $data);

    $data = seflink($data);

    return $data;
}

function seflink($text)
{
    $find = array('�', '�', '�', '�', '�', '�', '�', '�', '�', '�', '�', '�', '+', '#');
    $replace = array('c', 's', 'g', 'u', 'i', 'o', 'c', 's', 'g', 'u', 'o', 'i', 'plus', 'sharp');
    $text = strtolower(str_replace($find, $replace, $text));
    $text = preg_replace("@[^A-Za-z0-9\-_\.\+]@i", ' ', $text);
    $text = trim(preg_replace('/\s+/', ' ', $text));
    $text = str_replace(' ', '-', $text);
    return $text;
}

function get_active_user()
{
    $t = &get_instance();
    $admin_session = $t->session->userdata("user_admin");

    $t->load->model("user_admin_model");

    if (!empty($admin_session)) {
        $user_admin = $t->user_admin_model->get(
            array(
                "id" => $admin_session->id,
            )
        );
    }

    if (!empty($user_admin))
        return $user_admin;
    else
        return false;
}

function get_user_agent()
{
    $t = &get_instance();
    $t->load->library('user_agent');

    // $rhead = $t->input->request_headers();

    $device = $_SERVER['HTTP_USER_AGENT'];
    $device = between('(', ')', $device);

    $return_val = new stdClass();
    $return_val->browser = $t->agent->browser();
    $return_val->version = $t->agent->version();
    $return_val->robot = $t->agent->robot();
    $return_val->platform = $t->agent->platform();
    $return_val->device = $device;

    return $return_val;
}

function getip()
{
    if (getenv("HTTP_CLIENT_IP")) {
        $ip = getenv("HTTP_CLIENT_IP");
    } elseif (getenv("HTTP_X_FORWARDED_FOR")) {
        $ip = getenv("HTTP_X_FORWARDED_FOR");
        if (strstr($ip, ',')) {
            $tmp = explode(',', $ip);
            $ip = trim($tmp[0]);
        }
    } else {
        $ip = getenv("REMOTE_ADDR");
    }
    return $ip;
}

function control_ban($user = "")
{
    $t = &get_instance();
    $t->load->model("login_try_log_model");
    $t->load->model("banned_list_model");

    if (empty($user)) {
        $user = getip();
    }

    $date_now = date("Y-m-d H:i:s");
    $banned_user = $t->banned_list_model->get(
        array(
            "user" => $user,
            "createdAt <=" => $date_now,
            "finishAt >=" => $date_now,
            "isEnd" => 0,
        )
    );

    return $banned_user;
}

function get_login_wrong_log_timeline($control_val = "-1 days", $ip_address = "")
{
    $t = &get_instance();
    $t->load->model("login_wrong_log_model");
    $t->load->model("login_log_model");
    $t->load->model("banned_list_model");

    $login_settings = get_login_settings();

    if (empty($ip_address)) {
        $ip_address = getip();
    }

    $dateNowPlus = date("Y-m-d H:i:s", strtotime($control_val));

    $logins = $t->login_wrong_log_model->get_all(
        array(
            "createdAt >=" => $dateNowPlus,
            "ip_address" => $ip_address,
        ),
        "id DESC"
    );

    $control_ban = control_ban();
    if (empty($control_ban) && count($logins) >= $login_settings->banForLoginWrongCount) {

        //finishAt değeri (+1 days) information a göre değişecek = (kullanıcılar ne kadar ban yesin)

        $finishAt = "+" . "$login_settings->banForLoginWrongTime";

        $banned = $t->banned_list_model->add(
            array(
                "ban_type" => "ip",
                "user" => $ip_address,
                "ban_description" => "Login_Wrong_Timeline",
                "createdAt" => date("Y-m-d H:i:s"),
                "finishAt" => date("Y-m-d H:i:s", strtotime($finishAt)),
                "isEnd" => 0,
            )
        );

        if ($banned) {
            foreach ($logins as $login) {
                $t->login_try_log_model->update(
                    array(
                        "id" => $login->id,
                    ),
                    array(
                        "converted" => 1,
                    )
                );
            }
        }
    }

    return $logins;
}

function get_login_try_log_timeline($control_val = "-1 days", $ip_address = "")
{
    $t = &get_instance();
    $t->load->model("login_try_log_model");
    $t->load->model("login_log_model");
    $t->load->model("banned_list_model");

    $login_settings = get_login_settings();

    if (empty($ip_address)) {
        $ip_address = getip();
    }

    $dateNowPlus = date("Y-m-d H:i:s", strtotime($control_val));

    $logins = $t->login_try_log_model->get_all(
        array(
            "createdAt >=" => $dateNowPlus,
            "ip_address" => $ip_address,
            "converted" => 0,
        ),
        "id DESC"
    );

    $control_ban = control_ban();
    if (empty($control_ban) && count($logins) >= $login_settings->banForLoginTryCount) {

        //finishAt değeri (+1 days) information a göre değişecek = (kullanıcılar ne kadar ban yesin)

        $finishAt = "+" . "$login_settings->banForLoginTryTime";

        $banned = $t->banned_list_model->add(
            array(
                "ban_type" => "ip",
                "user" => $ip_address,
                "ban_description" => "Login_Try_Timeline",
                "createdAt" => date("Y-m-d H:i:s"),
                "finishAt" => date("Y-m-d H:i:s", strtotime($finishAt)),
                "isEnd" => 0,
            )
        );

        if ($banned) {
            foreach ($logins as $login) {
                $t->login_try_log_model->update(
                    array(
                        "id" => $login->id,
                    ),
                    array(
                        "converted" => 1,
                    )
                );
            }
        }
    }

    return $logins;
}

function send_email($toEmail = "", $subject = "", $message = "")
{
    $t = &get_instance();

    $t->load->model("emailsettings_model");


    $email_settings = $t->emailsettings_model->get(
        array(
            "isActive"  => 1,
            "deleted" => 0,
        )
    );

    if (!empty($email_settings)) {
        $config = array(
            "protocol"   => $email_settings->protocol,
            "smtp_host"  => $email_settings->host,
            "smtp_port"  => $email_settings->port,
            "smtp_user"  => $email_settings->user,
            "smtp_pass"  => $email_settings->password,
            "starttls"   => true,
            "charset"    => "utf-8",
            "mailtype"   => "html",
            "wordwrap"   => true,
            "newline"    => "\r\n",
        );

        $t->load->library("email", $config);
        $t->email->from($email_settings->user, "INFOBY - NoReply");
        $t->email->to($toEmail);
        $t->email->subject($subject);
        $t->email->message($message);
        return $t->email->send();
    } else {
        return "email_yok";
    }
}

function after($content, $inthat)
{
    if (!is_bool(strpos($inthat, $content)))
        return substr($inthat, strpos($inthat, $content) + strlen($content));
}

function before($t, $inthat)
{
    return substr($inthat, 0, strpos($inthat, $t));
}

function between($content, $that, $inthat)
{
    return before($that, after($content, $inthat));
}

function email_hide($input_value, $show_length)
{
    $mail_address = after("@", $input_value);
    $input_value = before("@", $input_value);
    $text_length = strlen($input_value) - $show_length;
    $input_value = explode(" ", $input_value);

    foreach ($input_value as $i => $value) {
        $input_value[$i]    = mb_substr($value, 0, $show_length);
        $kac_karakter   = strlen($value);
        $input_value[$i]    = $input_value[$i] . str_repeat('*', $text_length);
        $input_value[$i]    = $input_value[$i] . "@" . $mail_address;
    }

    return implode(" ", $input_value);
}

function send_vcode_w_pairing($user, $user_type)
{
    $t = &get_instance();
    $return_val = "0";

    $email_settings = $t->emailsettings_model->get(
        array(
            "isActive" => 1,
            "deleted" => 0,
        )
    );

    if (!empty($email_settings)) {

        if (!empty($user) && !empty($user_type)) {

            //Süre kontrolü gerekiyor (risk yoktur eklenmese de olur)
            $verification_code = rand(10000, 99999);

            $old_pairing = $t->user_pairing_model->get(array(
                "user_id" => $user->id,
                "ip_address" => getip(),
                "user_type" => "admin",
            ));


            $new_pairing = 0;
            $update = 0;
            if (empty($old_pairing)) {
                $new_pairing = $t->user_pairing_model->add(array(
                    "user_id" => $user->id,
                    "ip_address" => getip(),
                    "user_type" => "admin",
                    "createdAt" => date("Y-m-d H:i:s"),
                    "updatedAt" => date("Y-m-d H:i:s"),
                    "approved" => 0,
                    "verification_code" => $verification_code,
                    "wrong_try" => 0,
                    "code_send" => 0,
                    "isActive" => 1,
                    "deleted" => 0,
                ));
            } else {
                if ($old_pairing->approved == 0) {
                    $update = $t->user_pairing_model->update(
                        array(
                            "id" => $old_pairing->id,
                        ),
                        array(
                            "verification_code" => $verification_code,
                            "updatedAt" => date("Y-m-d H:i:s"),
                        )
                    );
                }
            }

            if ($new_pairing || $update) {
                $email_message  = "Kodunuz: $verification_code";
                $send = send_email($user->email, "Kimlik Doğrulama Kodu", $email_message);
                if ($send) {
                    $return_val = "1";
                }
            }
        }
        return $return_val;
        
    } else {
        return "email_devre_disi";
    }
}
