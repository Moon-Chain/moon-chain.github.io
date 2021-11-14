<?php

class Users extends CI_Controller
{
    public $viewFolder = "";

    public function __construct()
    {

        parent::__construct();
        $this->viewFolder = "users_v";

        $this->load->model("user_model");
        $this->load->model("authority_model");

        if(!get_active_user()){
            redirect(base_url("login"));
        }

        $this->load->model("company_information_model");
        $izinler = get_izinler();
        if($izinler->d_kullanicilar!=1){
            $alert = array(
                "title" => "İşlem Başarısız",
                "text" => "Sayfaya girme yetkiniz bulunmuyor.",
                "type"  => "error"
            );

            $this->session->set_flashdata("alert", $alert);
            redirect(base_url("dashboard"));
        }


    }

    public function index(){

        $get_user=get_active_user();
        if(!($get_user->authorization >= 2) || $get_user->authorization==99) {
            $alert = array(
                "title" => "İşlem Başarısız",
                "text" => "Sayfaya girme yetkiniz bulunmuyor.",
                "type"  => "error"
            );

            $this->session->set_flashdata("alert", $alert);
            redirect(base_url("dashboard"));
        }


        $site_set = $this->session->userdata('site_set');
        $viewData = new stdClass();

        /** Tablodan Verilerin Getirilmesi.. */
        $items = $this->user_model->get_all(
            array(
                "site_id" => $site_set->id,
            )
        );

        /** View'e gönderilecek Değişkenlerin Set Edilmesi.. */
        $viewData->viewFolder = $this->viewFolder;
        $viewData->subViewFolder = "list";
        $viewData->items = $items;

        $this->load->view("{$viewData->viewFolder}/{$viewData->subViewFolder}/index", $viewData);
    }

    public function new_form(){

        $get_user=get_active_user();
        if(!($get_user->authorization >= 2)) {
            $alert = array(
                "title" => "İşlem Başarısız",
                "text" => "Sayfaya girme yetkiniz bulunmuyor.",
                "type"  => "error"
            );

            $this->session->set_flashdata("alert", $alert);
            redirect(base_url("dashboard"));
        }

        $viewData = new stdClass();

        /** View'e gönderilecek Değişkenlerin Set Edilmesi.. */
        $viewData->viewFolder = $this->viewFolder;
        $viewData->subViewFolder = "add";

        $this->load->view("{$viewData->viewFolder}/{$viewData->subViewFolder}/index", $viewData);

    }

    public function save(){

        $get_user=get_active_user();
        if(!($get_user->authorization >= 2)) {
            $alert = array(
                "title" => "İşlem Başarısız",
                "text" => "Sayfaya girme yetkiniz bulunmuyor.",
                "type"  => "error"
            );

            $this->session->set_flashdata("alert", $alert);
            redirect(base_url("dashboard"));
        }

        $site_set = $this->session->userdata('site_set');
        $this->load->library("form_validation");



        $oldUsers = $this->user_model->get_all(
            array(
                "site_id" => $site_set->id,
            )
        );

        foreach ($oldUsers as $old) {
            if ($this->input->post('user_name') != $old->user_name) {

                $is_unique2 = '';
            } else {

                $is_unique2 = '|is_unique[users.user_name]';
            }
        }

        foreach ($oldUsers as $old) {
            if ($this->input->post('email') != $old->email) {

                $is_unique = '';
            } else {

                $is_unique = '|is_unique[users.email]';
            }
        }



        // Kurallar yazilir..
        $this->form_validation->set_rules("user_name", "Kullanıcı Adı", "required|trim".$is_unique2);
        $this->form_validation->set_rules("full_name", "Ad Soyad", "required|trim");
        $this->form_validation->set_rules("email", "E-posta", "required|trim|valid_email".$is_unique);
        $this->form_validation->set_rules("password", "Şifre", "required|trim|min_length[6]|max_length[8]");
        $this->form_validation->set_rules("re_password", "Şifre Tekrar", "required|trim|min_length[6]|max_length[8]|matches[password]");

        $this->form_validation->set_message(
            array(
                "required"    => "<b>{field}</b> alanı doldurulmalıdır",
                "valid_email" => "Lütfen geçerli bir e-posta adresi giriniz",
                "is_unique"   => "<b>{field}</b> alanı daha önceden kullanılmış",
                "matches"     => "Şifreler birbirlerini tutmuyor"
            )
        );

        // Form Validation Calistirilir..
        $validate = $this->form_validation->run();

        if($validate){

            $insert = $this->user_model->add(
                array(
                    "user_name"     => $this->input->post("user_name"),
                    "full_name"     => $this->input->post("full_name"),
                    "email"         => $this->input->post("email"),
                    "password"      => md5($this->input->post("password")),
                    "isActive"      => 1,
                    "createdAt"     => date("Y-m-d H:i:s"),
                    "site_id" => $site_set->id,
                )
            );

            // TODO Alert sistemi eklenecek...
            if($insert){

                $alert = array(
                    "title" => "İşlem Başarılı",
                    "text" => "Kayıt başarılı bir şekilde eklendi",
                    "type"  => "success"
                );

            } else {

                $alert = array(
                    "title" => "İşlem Başarısız",
                    "text" => "Kayıt Ekleme sırasında bir problem oluştu",
                    "type"  => "error"
                );
            }


            $this->session->set_flashdata("alert", $alert);

            redirect(base_url("users"));

            die();

        } else {

            $viewData = new stdClass();

            /** View'e gönderilecek Değişkenlerin Set Edilmesi.. */
            $viewData->viewFolder = $this->viewFolder;
            $viewData->subViewFolder = "add";
            $viewData->form_error = true;

            $this->load->view("{$viewData->viewFolder}/{$viewData->subViewFolder}/index", $viewData);
        }

    }

    public function update_form($id){

        $get_user=get_active_user();
        if(!($get_user->authorization >= 0)) {
            $alert = array(
                "title" => "İşlem Başarısız",
                "text" => "Sayfaya girme yetkiniz bulunmuyor.",
                "type"  => "error"
            );

            $this->session->set_flashdata("alert", $alert);
            redirect(base_url("dashboard"));
        }

        $site_set = $this->session->userdata('site_set');
        $viewData = new stdClass();

        /** Tablodan Verilerin Getirilmesi.. */
        $item = $this->user_model->get(
            array(
                "id"    => $id,
                "site_id" => $site_set->id,
            )
        );
        
        /** View'e gönderilecek Değişkenlerin Set Edilmesi.. */
        $viewData->viewFolder = $this->viewFolder;
        $viewData->subViewFolder = "update";
        $viewData->item = $item;

        $this->load->view("{$viewData->viewFolder}/{$viewData->subViewFolder}/index", $viewData);


    }

    public function yetki_ver_form($id){

        $get_user=get_active_user();
        if(!($get_user->authorization >= 2)) {
            $alert = array(
                "title" => "İşlem Başarısız",
                "text" => "Sayfaya girme yetkiniz bulunmuyor.",
                "type"  => "error"
            );

            $this->session->set_flashdata("alert", $alert);
            redirect(base_url("dashboard"));
        }

        $site_set = $this->session->userdata('site_set');
        $viewData = new stdClass();

        /** Tablodan Verilerin Getirilmesi.. */
        $item = $this->user_model->get(
            array(
                "id"    => $id,
                "site_id" => $site_set->id,
            )
        );

        $authoritys = $this->authority_model->get_all(
            array(
                "id !="    => "2",
            )
        );



        /** View'e gönderilecek Değişkenlerin Set Edilmesi.. */
        $viewData->viewFolder = $this->viewFolder;
        $viewData->subViewFolder = "yetki_ver";

        $viewData->aut = $authoritys;
        $viewData->item = $item;

        $this->load->view("{$viewData->viewFolder}/{$viewData->subViewFolder}/index", $viewData);


    }

    public function update_aut($id){

        $get_user=get_active_user();
        if(!($get_user->authorization >= 2)) {
            $alert = array(
                "title" => "İşlem Başarısız",
                "text" => "Sayfaya girme yetkiniz bulunmuyor.",
                "type"  => "error"
            );

            $this->session->set_flashdata("alert", $alert);
            redirect(base_url("dashboard"));
        }

        $site_set = $this->session->userdata('site_set');
        $this->load->library("form_validation");




        $this->form_validation->set_message(
            array(

            )
        );



        // Form Validation Calistirilir..
        $validate = $this->form_validation->run();

            // Upload Süreci...
            $update = $this->user_model->update(
                array("id" => $id,
                    "site_id" => $site_set->id,),
                array(
                    "authorization"      => $this->input->post("aut_id"),
                )
            );

            // TODO Alert sistemi eklenecek...
            if($update){

                $alert = array(
                    "title" => "İşlem Başarılı",
                    "text" => "Şifreniz başarılı bir şekilde güncellendi",
                    "type"  => "success"
                );

            } else {

                $alert = array(
                    "title" => "İşlem Başarısız",
                    "text" => "Şifre Güncelleme sırasında bir problem oluştu",
                    "type"  => "error"
                );
            }

            // İşlemin Sonucunu Session'a yazma işlemi...
            $this->session->set_flashdata("alert", $alert);

            redirect(base_url("users"));





    }

    public function update_password_form($id){

        $get_user=get_active_user();
        if(!($get_user->authorization >= 2)) {
            $alert = array(
                "title" => "İşlem Başarısız",
                "text" => "Sayfaya girme yetkiniz bulunmuyor.",
                "type"  => "error"
            );

            $this->session->set_flashdata("alert", $alert);
            redirect(base_url("dashboard"));
        }

        $site_set = $this->session->userdata('site_set');
        $viewData = new stdClass();

        /** Tablodan Verilerin Getirilmesi.. */
        $item = $this->user_model->get(
            array(
                "id"    => $id,
                "site_id" => $site_set->id,
            )
        );

        /** View'e gönderilecek Değişkenlerin Set Edilmesi.. */
        $viewData->viewFolder = $this->viewFolder;
        $viewData->subViewFolder = "password";
        $viewData->item = $item;

        $this->load->view("{$viewData->viewFolder}/{$viewData->subViewFolder}/index", $viewData);


    }

    public function update($id){

        $get_user=get_active_user();
        if(!($get_user->authorization >= 0)) {
            $alert = array(
                "title" => "İşlem Başarısız",
                "text" => "Sayfaya girme yetkiniz bulunmuyor.",
                "type"  => "error"
            );

            $this->session->set_flashdata("alert", $alert);
            redirect(base_url("dashboard"));
        }

        $site_set = $this->session->userdata('site_set');
        $this->load->library("form_validation");

        $oldUser = $this->user_model->get(
            array(
                "id"    => $id,
                "site_id" => $site_set->id,
            )
        );

        $oldUsers = $this->user_model->get_all(
            array(
                "id !="    => $id,
                "site_id" => $site_set->id,
            )
        );

        foreach ($oldUsers as $old) {
            if ($this->input->post('user_name') != $old->user_name) {

                $is_unique2 = '';
            } else {

                $is_unique2 = '|is_unique[users.user_name]';
            }
        }

        foreach ($oldUsers as $old) {
            if ($this->input->post('email') != $old->email) {

                $is_unique = '';
            } else {

                $is_unique = '|is_unique[users.email]';
            }
        }

        if($oldUser->user_name != $this->input->post("user_name")){
            $this->form_validation->set_rules("user_name", "Kullanıcı Adı", "required|trim".$is_unique.$is_unique2);
        }

        if($oldUser->email != $this->input->post("email")){
            $this->form_validation->set_rules("email", "E-posta", "required|trim|valid_email".$is_unique.$is_unique2);
        }



        $this->form_validation->set_rules("full_name", "Ad Soyad", "required|trim");


        $this->form_validation->set_message(
            array(
                "required"    => "<b>{field}</b> alanı doldurulmalıdır",
                "valid_email" => "Lütfen geçerli bir e-posta adresi giriniz",
                "is_unique"   => "<b>{field}</b> alanı daha önceden kullanılmış",
            )
        );

        // Form Validation Calistirilir..
        $validate = $this->form_validation->run();

        if($validate){

            // Upload Süreci...
            $sifre = $this->input->post("password");
            $usermodel = $this->user_model->get(array("id" => $id));

            if($usermodel->password==$sifre || $sifre=="") {

                $update = $this->user_model->update(
                    array("id" => $id),
                    array(
                        "user_name" => $this->input->post("user_name"),
                        "full_name" => $this->input->post("full_name"),
                        "email" => $this->input->post("email"),
                        "site_id" => $site_set->id,
                    )
                );
            }
            else {

                $update = $this->user_model->update(
                    array("id" => $id),
                    array(
                        "user_name" => $this->input->post("user_name"),
                        "password" => md5($this->input->post("password")),
                        "full_name" => $this->input->post("full_name"),
                        "email" => $this->input->post("email"),
                        "site_id" => $site_set->id,
                    )
                );

            }

            // TODO Alert sistemi eklenecek...
            if($update){

                $alert = array(
                    "title" => "İşlem Başarılı",
                    "text" => "Kayıt başarılı bir şekilde güncellendi",
                    "type"  => "success"
                );

                $user = $this->user_model->get(
                    array(
                        "user_name" => $this->input->post("user_name"),
                        "site_id" => $site_set->id,
                    )
                );


            } else {

                $alert = array(
                    "title" => "İşlem Başarısız",
                    "text" => "Kayıt Güncelleme sırasında bir problem oluştu",
                    "type"  => "error"
                );
            }

            // İşlemin Sonucunu Session'a yazma işlemi...

            $get_user=get_active_user();
            if(($get_user->authorization == 2)) {
                $this->session->set_flashdata("alert", $alert);
                redirect(base_url("users/update_form/1"));
            }
            else {
                $this->session->set_flashdata("alert", $alert);
                redirect(base_url("dashboard"));
            }

        } else {

            $viewData = new stdClass();

            /** View'e gönderilecek Değişkenlerin Set Edilmesi.. */
            $viewData->viewFolder = $this->viewFolder;
            $viewData->subViewFolder = "update";
            $viewData->form_error = true;

            /** Tablodan Verilerin Getirilmesi.. */
            $viewData->item = $this->user_model->get(
                array(
                    "id"    => $id,
                    "site_id" => $site_set->id,
                )
            );

            $this->load->view("{$viewData->viewFolder}/{$viewData->subViewFolder}/index", $viewData);
        }

    }

    public function update_password($id){

        $get_user=get_active_user();
        if(!($get_user->authorization >= 2)) {
            $alert = array(
                "title" => "İşlem Başarısız",
                "text" => "Sayfaya girme yetkiniz bulunmuyor.",
                "type"  => "error"
            );

            $this->session->set_flashdata("alert", $alert);
            redirect(base_url("dashboard"));
        }

        $site_set = $this->session->userdata('site_set');
        $this->load->library("form_validation");

        $this->form_validation->set_rules("password", "Şifre", "required|trim|min_length[6]|max_length[8]");
        $this->form_validation->set_rules("re_password", "Şifre Tekrar", "required|trim|min_length[6]|max_length[8]|matches[password]");

        $this->form_validation->set_message(
            array(
                "required"    => "<b>{field}</b> alanı doldurulmalıdır",
                "matches"     => "Şifreler birbirlerini tutmuyor"
            )
        );

        // Form Validation Calistirilir..
        $validate = $this->form_validation->run();

        if($validate){

            // Upload Süreci...
            $update = $this->user_model->update(
                array("id" => $id,
                    "site_id" => $site_set->id,),
                array(
                    "password"      => md5($this->input->post("password")),
                )
            );

            // TODO Alert sistemi eklenecek...
            if($update){

                $alert = array(
                    "title" => "İşlem Başarılı",
                    "text" => "Şifreniz başarılı bir şekilde güncellendi",
                    "type"  => "success"
                );

            } else {

                $alert = array(
                    "title" => "İşlem Başarısız",
                    "text" => "Şifre Güncelleme sırasında bir problem oluştu",
                    "type"  => "error"
                );
            }

            // İşlemin Sonucunu Session'a yazma işlemi...
            $this->session->set_flashdata("alert", $alert);

            redirect(base_url("users"));

        } else {

            $viewData = new stdClass();

            /** View'e gönderilecek Değişkenlerin Set Edilmesi.. */
            $viewData->viewFolder = $this->viewFolder;
            $viewData->subViewFolder = "password";
            $viewData->form_error = true;

            /** Tablodan Verilerin Getirilmesi.. */
            $viewData->item = $this->user_model->get(
                array(
                    "id"    => $id,
                    "site_id" => $site_set->id,
                )
            );

            $this->load->view("{$viewData->viewFolder}/{$viewData->subViewFolder}/index", $viewData);
        }

    }

    public function delete($id){

        $get_user=get_active_user();
        if(!($get_user->authorization >= 2)) {
            $alert = array(
                "title" => "İşlem Başarısız",
                "text" => "Sayfaya girme yetkiniz bulunmuyor.",
                "type"  => "error"
            );

            $this->session->set_flashdata("alert", $alert);
            redirect(base_url("dashboard"));
        }

        $site_set = $this->session->userdata('site_set');
        $delete = $this->user_model->delete(
            array(
                "id"    => $id,
                "site_id" => $site_set->id,
            )
        );

        // TODO Alert Sistemi Eklenecek...
        if($delete){

            $alert = array(
                "title" => "İşlem Başarılı",
                "text" => "Kayıt başarılı bir şekilde silindi",
                "type"  => "success"
            );

        } else {

            $alert = array(
                "title" => "İşlem Başarısız",
                "text" => "Kayıt silme sırasında bir problem oluştu",
                "type"  => "error"
            );


        }

        $this->session->set_flashdata("alert", $alert);
        redirect(base_url("users"));


    }

    public function isActiveSetter($id){

        $get_user=get_active_user();
        if(!($get_user->authorization >= 2)) {
            $alert = array(
                "title" => "İşlem Başarısız",
                "text" => "Sayfaya girme yetkiniz bulunmuyor.",
                "type"  => "error"
            );

            $this->session->set_flashdata("alert", $alert);
            redirect(base_url("dashboard"));
        }

        $site_set = $this->session->userdata('site_set');
        if($id){

            $isActive = ($this->input->post("data") === "true") ? 1 : 0;

            $this->user_model->update(
                array(
                    "id"    => $id,
                    "site_id" => $site_set->id,
                ),
                array(
                    "isActive"  => $isActive
                )
            );
        }
    }

}
