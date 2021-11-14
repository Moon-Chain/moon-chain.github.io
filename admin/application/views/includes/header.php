<?php $act_user = get_active_user(); ?>

<header id="header" class="app-header">

    <button type="button" class="navbar-toggle navbar-toggle-minify" data-click="sidebar-minify" style="cursor:pointer;">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
    </button>


    <div class="navbar-header">
        <a href="<?php echo base_url(""); ?>" class="navbar-brand">
            Title
        </a>
        <button type="button" class="navbar-toggle" data-click="sidebar-toggled">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
        </button>
    </div>


    <ul class="navbar-nav navbar-right">
        <li class="nav-item">
            <a href="#" data-toggle="search-bar" class="nav-link">
                <i class="fa fa-search nav-icon"></i>
            </a>
        </li>
        <li class="nav-item dropdown">
            <a href="#" data-toggle="dropdown" data-display="static" class="nav-link">
                <i class="far fa-bell nav-icon"></i>
                <span class="nav-label">3</span>
            </a>
            <ul class="dropdown-menu dropdown-menu-right dropdown-menu-lg pt-0 pb-0">
                <li class="dropdown-header"><a href="#" class="dropdown-close">&times;</a>Today</li>
                <li class="dropdown-message">
                    <a href="#">
                        <div class="icon"><i class="fab fa-apple bg-primary"></i></div>
                        <div class="info">
                            <h4 class="title">App Store <span class="time">Just now</span></h4>
                            <p class="desc">Your iOS application has been approved</p>
                        </div>
                    </a>
                </li>
                <li class="dropdown-message">
                    <a href="#">
                        <div class="icon"><i class="fab fa-android bg-success"></i></div>
                        <div class="info">
                            <h4 class="title">Google Play <span class="time">5 min ago</span></h4>
                            <p class="desc">Your android application has been approved</p>
                        </div>
                    </a>
                </li>
                <li class="dropdown-message">
                    <a href="#">
                        <div class="icon"><i class="fab fa-github bg-muted"></i></div>
                        <div class="info">
                            <h4 class="title">Github <span class="time">12 min ago</span></h4>
                            <p class="desc">Error with notifications from Private Repos</p>
                        </div>
                    </a>
                </li>
                <li class="dropdown-header"><a href="#" class="dropdown-close">&times;</a>Yesterday</li>
                <li class="dropdown-message">
                    <a href="#">
                        <div class="icon"><i class="fa fa-envelope bg-purple"></i></div>
                        <div class="info">
                            <h4 class="title">Gmail <span class="time">12:50pm</span></h4>
                            <p class="desc">You have 2 unread email</p>
                        </div>
                    </a>
                </li>
                <li class="dropdown-message">
                    <a href="#">
                        <div class="icon">
                            <div class="img" style="background-image: url(assets/img/user-2.jpg)"></div>
                        </div>
                        <div class="info">
                            <h4 class="title">Corey <span class="time">10:20am</span></h4>
                            <p class="desc">There's so much room for activities!</p>
                        </div>
                    </a>
                </li>
                <li class="dropdown-message">
                    <a href="#">
                        <div class="icon"><i class="fab fa-twitter bg-gradient-aqua"></i></div>
                        <div class="info">
                            <h4 class="title">Twitter <span class="time">12:50pm</span></h4>
                            <p class="desc">@sergiolucas: Most rain in the last two days: 85mm Gabo Island (March)</p>
                        </div>
                    </a>
                </li>
            </ul>
        </li>
        <li class="nav-item dropdown">
            <a href="#" data-toggle="dropdown" data-display="static" class="nav-link">
                <i class="fa fa-cog nav-icon"></i>
            </a>
            <ul class="dropdown-menu dropdown-menu-right dropdown-menu-md pt-0 pb-0">
                <li class="dropdown-header">Notifications Settings</li>
                <li class="dropdown-setting">
                    <div class="icon"><i class="fa fa-envelope text-muted"></i></div>
                    <div class="info">Email</div>
                    <div class="option">
                        <div class="switcher switcher-success">
                            <input type="checkbox" name="setting_1" id="setting_1" checked />
                            <label for="setting_1"></label>
                        </div>
                    </div>
                </li>
                <li class="dropdown-setting">
                    <div class="icon"><i class="fa fa-desktop text-muted"></i></div>
                    <div class="info">Desktop & Mobile</div>
                    <div class="option">
                        <div class="switcher switcher-success">
                            <input type="checkbox" name="setting_2" id="setting_2" checked />
                            <label for="setting_2"></label>
                        </div>
                    </div>
                </li>
                <li class="dropdown-setting">
                    <div class="icon"><i class="fa fa-comment-alt text-muted"></i></div>
                    <div class="info">Text message</div>
                    <div class="option">
                        <div class="switcher switcher-success">
                            <input type="checkbox" name="setting_3" id="setting_3" />
                            <label for="setting_3"></label>
                        </div>
                    </div>
                </li>
                <li class="dropdown-header">Privacy Settings</li>
                <li class="dropdown-setting">
                    <div class="icon"><i class="fa fa-list-ul text-muted"></i></div>
                    <div class="info">Public friends list</div>
                    <div class="option">
                        <div class="switcher switcher-success">
                            <input type="checkbox" name="setting_4" id="setting_4" />
                            <label for="setting_4"></label>
                        </div>
                    </div>
                </li>
                <li class="dropdown-setting">
                    <div class="icon"><i class="fa fa-user-secret text-muted"></i></div>
                    <div class="info">Public profile page</div>
                    <div class="option">
                        <div class="switcher switcher-success">
                            <input type="checkbox" name="setting_5" id="setting_5" checked />
                            <label for="setting_5"></label>
                        </div>
                    </div>
                </li>
            </ul>
        </li>
        <li class="nav-item dropdown">
            <a href="#" data-toggle="dropdown" data-display="static" class="nav-link">
                <span class="nav-img online">
                    <img src="assets/img/user.jpg" alt="" />
                </span>
                <span class="d-none d-md-block"><?php echo $act_user->full_name ?> <b class="caret"></b></span>
            </a>
            <div class="dropdown-menu dropdown-menu-right">
                <a class="dropdown-item" href="<?php echo base_url(""); ?>">Profil</a>
                <a class="dropdown-item" href="<?php echo base_url(""); ?>">Mesaj</a>
                <a class="dropdown-item" href="<?php echo base_url(""); ?>">Envanter</a>
                <a class="dropdown-item" href="<?php echo base_url(""); ?>">Ayarlar</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="<?php echo base_url("logout"); ?>">Çıkış Yap</a>
            </div>
        </li>
    </ul>


    <div class="navbar-search">
        <form action="#" method="POST" name="navbar_search_form">
            <div class="form-group">
                <div class="icon"><i class="fa fa-search"></i></div>
                <input type="text" class="form-control" id="header-search" placeholder="Search admetro..." />
                <div class="icon">
                    <a href="#" data-dismiss="search-bar" class="right-icon"><i class="fa fa-times"></i></a>
                </div>
            </div>
        </form>
    </div>

</header>