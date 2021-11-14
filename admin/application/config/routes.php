<?php
defined('BASEPATH') OR exit('No direct script access allowed');

$route['default_controller'] = 'home';
$route['404_override'] = '';
$route['translate_uri_dashes'] = FALSE;

$route["resimekle"]           = "dashboard/testresim";

$route["login"]           = "userop/login";
$route["logout"]          = "userop/logout";
$route["sifremi-unuttum"] = "userop/forget_password";
$route["reset-password"]  = "userop/reset_password";
