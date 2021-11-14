<?php $this->load->view("includes/head"); ?>

<body>

    <div id="app" class="app app-header-fixed app-sidebar-fixed">

        <?php $this->load->view("includes/header"); ?>

        <?php $this->load->view("includes/sidebar"); ?>

        <div id="content" class="app-content">

            <?php $this->load->view("$viewFolder/$subViewFolder/content"); ?>
        </div>


        <a href="#" data-click="scroll-top" class="btn-scroll-top fade"><i class="fa fa-arrow-up"></i></a>

    </div>

    <?php $this->load->view("includes/theme_panel"); ?>

    <?php $this->load->view("includes/include_script"); ?>

</body>

</html>