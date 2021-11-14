<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Home extends CI_Controller
{
	public function __construct()
	{
		parent::__construct();
		$this->viewFolder = "home";

		if (!get_active_user()) {
			$agent = get_user_agent();
			if ($this->agent->is_mobile()) {
				$icon = "fa fa-mobile";
			} else {
				$icon = "fa fa-desktop";
			}

			$alert = array(
				"title" => "Cihazınız Tanımlanıyor",
				"content" => $this->input->ip_address() . "<br>" . $agent->device,
				"icon" => $icon,
				"iconClass" => "bg-gradient-yellow text-white",
				"autoclose" => "enable",
				"autocloseTime" => "4000",
				"type" => "default",
				"closeBtnText" => 'Kapat',
			);

			$this->session->set_flashdata("alert", $alert);
			redirect(base_url("login"));
		}
	}

	public function index()
	{
		// $site_set = $this->session->userdata('site_set');
		$viewData = new stdClass();

		/** Tablodan Verilerin Getirilmesi.. */
		// $items = $this->user_model->get_all(
		// 	array(
		// 		"site_id" => $site_set->id,
		// 	)
		// );

		/** View'e gönderilecek Değişkenlerin Set Edilmesi.. */
		$viewData->viewFolder = $this->viewFolder;
		$viewData->subViewFolder = "list";
		// $viewData->items = $items;

		$this->load->view("{$viewData->viewFolder}/{$viewData->subViewFolder}/index", $viewData);
	}
}
