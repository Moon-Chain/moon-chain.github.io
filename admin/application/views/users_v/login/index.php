<?php $this->load->view("includes/head"); ?>

<body style="overflow-y: hidden;">

    <div id="app" class="app app-full-height app-without-header">

        <?php $this->load->view("$viewFolder/$subViewFolder/content"); ?>

        <a href="#" data-click="scroll-top" class="btn-scroll-top fade"><i class="fa fa-arrow-up"></i></a>

    </div>

    <?php $this->load->view("includes/theme_panel"); ?>

    <?php $this->load->view("includes/include_script"); ?>

</body>

</html>