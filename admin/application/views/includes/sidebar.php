<?php $act_user = get_active_user(); ?>

<sidebar id="sidebar" class="app-sidebar">

    <div data-scrollbar="true" data-height="100%">

        <ul class="nav">
            <li class="nav-profile">
                <div class="profile-img">
                    <img src="assets/img/user.jpg" />
                </div>
                <div class="profile-info">
                    <h4><?php echo $act_user->full_name; ?></h4>
                    <p>Frontend Developer</p>
                </div>
            </li>
            <li class="nav-divider"></li>
            <li class="nav-header">Navigation</li>
            <li class="active">
                <a href="index.html">
                    <span class="nav-icon"><i class="fa fa-th-large"></i></span>
                    <span class="nav-text">Home</span>
                </a>
            </li>
            <li>
                <a href="analytics.html">
                    <span class="nav-icon"><i class="fa fa-chart-pie"></i></span>
                    <span class="nav-text">Analytics</span>
                </a>
            </li>
            <li class="has-sub">
                <a href="#">
                    <span class="nav-icon"><i class="fa fa-envelope"></i> </span>
                    <span class="nav-text">Email <span class="nav-label">20+</span></span>
                    <span class="nav-caret"><b class="caret"></b></span>
                </a>
                <ul class="nav-submenu">
                    <li><a href="email_inbox.html">Inbox</a></li>
                    <li><a href="email_compose.html">Compose</a></li>
                    <li><a href="email_detail.html">Detail</a></li>
                </ul>
            </li>
            <li class="nav-divider"></li>
            <li class="nav-header">Components</li>
            <li>
                <a href="widgets.html">
                    <span class="nav-icon"><i class="fa fa-qrcode bg-gradient-red text-white"></i></span>
                    <span class="nav-text">Widgets</span>
                </a>
            </li>
            <li class="has-sub">
                <a href="#">
                    <span class="nav-icon"><i class="fa fa-heart bg-gradient-orange text-white"></i></span>
                    <span class="nav-text">UI Kits</span>
                    <span class="nav-caret"><b class="caret"></b></span>
                </a>
                <ul class="nav-submenu">
                    <li><a href="ui_bootstrap.html"><span class="nav-text">Bootstrap</span></a></li>
                    <li><a href="ui_buttons.html"><span class="nav-text">Buttons</span></a></li>
                    <li><a href="ui_typography.html"><span class="nav-text">Typography</span></a></li>
                    <li><a href="ui_tabs_accordions.html"><span class="nav-text">Tabs & Accordions</span></a></li>
                    <li><a href="ui_modal_notification.html"><span class="nav-text">Modal & Notification</span></a></li>
                    <li><a href="ui_card.html"><span class="nav-text">Card</span></a></li>
                    <li><a href="ui_icons.html"><span class="nav-text">Icons</span></a></li>
                </ul>
            </li>
            <li class="has-sub">
                <a href="#">
                    <span class="nav-icon"><i class="fa fa-file-alt bg-gradient-orange text-white"></i></span>
                    <span class="nav-text">Forms</span>
                    <span class="nav-caret"><b class="caret"></b></span>
                </a>
                <ul class="nav-submenu">
                    <li><a href="form_elements.html"><span class="nav-text">Form Elements</span></a></li>
                    <li><a href="form_plugins.html"><span class="nav-text">Form Plugins</span></a></li>
                    <li><a href="form_wizards.html"><span class="nav-text">Wizards</span></a></li>
                    <li><a href="form_jquery_file_upload.html"><span class="nav-text">File Upload</span></a></li>
                    <li><a href="form_summernote.html"><span class="nav-text">Summernote</span></a></li>
                </ul>
            </li>
            <li class="has-sub">
                <a href="#">
                    <span class="nav-icon"><i class="fa fa-table bg-gradient-green text-white"></i></span>
                    <span class="nav-text">Tables</span>
                    <span class="nav-caret"><b class="caret"></b></span>
                </a>
                <ul class="nav-submenu">
                    <li><a href="table_basic.html"><span class="nav-text">Basic Tables</span></a></li>
                    <li><a href="table_data.html"><span class="nav-text">DataTables</span></a></li>
                </ul>
            </li>
            <li>
                <a href="chart.html">
                    <span class="nav-icon"><i class="fa fa-chart-bar bg-gradient-purple text-white"></i></span>
                    <span class="nav-text">Chart</span>
                </a>
            </li>
            <li class="has-sub">
                <a href="#">
                    <span class="nav-icon"><i class="fa fa-map-marker-alt bg-gradient-blue text-white"></i></span>
                    <span class="nav-text">Map</span>
                    <span class="nav-caret"><b class="caret"></b></span>
                </a>
                <ul class="nav-submenu">
                    <li><a href="map_vector.html"><span class="nav-text">Vector Map</span></a></li>
                    <li><a href="map_google.html"><span class="nav-text">Google Map</span></a></li>
                </ul>
            </li>
            <li class="has-sub">
                <a href="#">
                    <span class="nav-icon"><i class="fa fa-code-branch"></i></span>
                    <span class="nav-text">Layout</span>
                    <span class="nav-caret"><b class="caret"></b></span>
                </a>
                <ul class="nav-submenu">
                    <li><a href="layout_starter.html"><span class="nav-text">Starter Page</span></a></li>
                    <li><a href="layout_fixed_footer.html"><span class="nav-text">Fixed Footer</span></a></li>
                    <li><a href="layout_full_width.html"><span class="nav-text">Full Width</span></a></li>
                    <li><a href="layout_boxed_layout.html"><span class="nav-text">Boxed Layout</span></a></li>
                    <li><a href="layout_full_height.html"><span class="nav-text">Full Height</span></a></li>
                </ul>
            </li>
            <li class="has-sub">
                <a href="#">
                    <span class="nav-icon"><i class="fa fa-globe"></i></span>
                    <span class="nav-text">Pages</span>
                    <span class="nav-caret"><b class="caret"></b></span>
                </a>
                <ul class="nav-submenu">
                    <li><a href="page_gallery.html"><span class="nav-text">Gallery</span></a></li>
                    <li><a href="page_coming_soon.html"><span class="nav-text">Coming Soon Page</span></a></li>
                    <li><a href="page_search_results.html"><span class="nav-text">Search Results</span></a></li>
                    <li><a href="page_404_error.html"><span class="nav-text">404 Error Page</span></a></li>
                    <li><a href="page_login.html"><span class="nav-text">Login</span></a></li>
                    <li><a href="page_register.html"><span class="nav-text">Register</span></a></li>
                </ul>
            </li>
            <li class="nav-divider"></li>
            <li class="nav-header">Users</li>
            <li>
                <a href="profile.html">
                    <span class="nav-icon"><i class="fa fa-user-circle"></i></span>
                    <span class="nav-text">Profile</span>
                </a>
            </li>
            <li>
                <a href="calendar.html">
                    <span class="nav-icon"><i class="fa fa-calendar"></i></span>
                    <span class="nav-text">Calendar</span>
                </a>
            </li>
            <li>
                <a href="settings.html">
                    <span class="nav-icon"><i class="fa fa-cog"></i></span>
                    <span class="nav-text">Settings</span>
                </a>
            </li>
            <li>
                <a href="helper.html">
                    <span class="nav-icon"><i class="fa fa-question-circle"></i></span>
                    <span class="nav-text">Helper</span>
                </a>
            </li>
            <li class="has-sub">
                <a href="#">
                    <span class="nav-icon"><i class="fa fa-list-ul"></i> </span>
                    <span class="nav-text">Menu Level</span>
                    <span class="nav-caret"><b class="caret"></b></span>
                </a>
                <ul class="nav-submenu">
                    <li class="has-sub">
                        <a href="#">
                            <span class="nav-text">Menu 1.1</span>
                            <span class="nav-caret"><b class="caret"></b></span>
                        </a>
                        <ul class="nav-submenu">
                            <li class="has-sub">
                                <a href="#">
                                    <span class="nav-text">Menu 2.1</span>
                                    <span class="nav-caret"><b class="caret"></b></span>
                                </a>
                                <ul class="nav-submenu">
                                    <li><a href="#"><span class="nav-text">Menu 3.1</span></a></li>
                                    <li><a href="#"><span class="nav-text">Menu 3.2</span></a></li>
                                </ul>
                            </li>
                            <li><a href="#"><span class="nav-text">Menu 2.2</span></a></li>
                            <li><a href="#"><span class="nav-text">Menu 2.3</span></a></li>
                        </ul>
                    </li>
                    <li><a href="#"><span class="nav-text">Menu 1.2</span></a></li>
                    <li><a href="#"><span class="nav-text">Menu 1.3</span></a></li>
                </ul>
            </li>
            <li class="nav-divider"></li>
            <li class="nav-header">Projects</li>
            <li class="nav-project">
                <a href="#">
                    <div class="project-icon">
                        <i class="fa fa-mobile-alt"></i>
                    </div>
                    <div class="project-info">
                        <h4 class="project-title">Mobile App Dev</h4>
                        <div class="progress">
                            <div class="progress-bar bg-gradient-blue-purple-to-right" style="width: 70%;" role="progressbar"></div>
                        </div>
                    </div>
                    <div class="project-percentage">70%</div>
                </a>
            </li>
            <li class="nav-project">
                <a href="#">
                    <div class="project-icon">
                        <i class="fa fa-headphones"></i>
                    </div>
                    <div class="project-info">
                        <h4 class="project-title">New Audio Project</h4>
                        <div class="progress">
                            <div class="progress-bar bg-gradient-blue-purple-to-right" style="width: 40%;" role="progressbar"></div>
                        </div>
                    </div>
                    <div class="project-percentage">40%</div>
                </a>
            </li>
            <li class="nav-project">
                <a href="#">
                    <div class="project-icon">
                        <i class="fab fa-github"></i>
                    </div>
                    <div class="project-info">
                        <h4 class="project-title">Repository Settings</h4>
                        <div class="progress">
                            <div class="progress-bar bg-gradient-blue-purple-to-right" style="width: 50%;" role="progressbar"></div>
                        </div>
                    </div>
                    <div class="project-percentage">50%</div>
                </a>
            </li>
            <li class="nav-divider"></li>
            <li class="nav-copyright">&copy; 2019 seanTheme All Right Reserved</li>
        </ul>

    </div>

</sidebar>