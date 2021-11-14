<?php
$alert = $this->session->userdata("alert");
$alert_2 = $this->session->userdata("alert_2"); ?>

<?php if ($alert) { ?>

    <script>
        //Eğer ekstra buton eklendiğinde attr veya url i boş ise close button ile aynı işlevi sağlar
        var handleNotification = function() {
            $.notification({
                title: '<?php echo !empty($alert["title"]) ? $alert["title"] : ""; ?>',
                content: '<?php echo !empty($alert["content"]) ? $alert["content"] : ""; ?>',
                icon: '<?php echo !empty($alert["icon"]) ? $alert["icon"] : ""; ?>',
                iconClass: '<?php echo !empty($alert["iconClass"]) ? $alert["iconClass"] : ""; ?>',
                closeBtn: '<?php echo !empty($alert["closeBtnText"]) ? $alert["closeBtnText"] : "disabled"; ?>',
                closeBtnText: '<?php echo !empty($alert["closeBtnText"]) ? $alert["closeBtnText"] : ""; ?>',
                autoclose: '<?php echo !empty($alert["autoclose"]) ? $alert["autoclose"] : ""; ?>',
                autocloseTime: '<?php echo !empty($alert["autocloseTime"]) ? $alert["autocloseTime"] : ""; ?>',
                btn: "<?php echo (!empty($alert["btnUrl"]) || !empty($alert["btnAttr"]) || !empty($alert["btnText"])) ? true : ""; ?>",
                btnUrl: "<?php echo !empty($alert["btnUrl"]) ? $alert["btnUrl"] : "#"; ?>",
                btnAttr: "<?php echo !empty($alert["btnAttr"]) ? $alert["btnAttr"] : (empty($alert["btnUrl"]) ? "data-dismiss='notification'" : ""); ?>",
                btnText: "<?php echo !empty($alert["btnText"]) ? $alert["btnText"] : "Tamam"; ?>",
            });
        };

        $(document).ready(function() {
            handleNotification();
        });
    </script>

<?php } ?>

<?php if ($alert_2) { ?>

    <script>
        //Eğer ekstra buton eklendiğinde attr veya url i boş ise close button ile aynı işlevi sağlar
        var handleNotification2 = function() {
            $.notification({
                title: '<?php echo !empty($alert_2["title"]) ? $alert_2["title"] : ""; ?>',
                content: '<?php echo !empty($alert_2["content"]) ? $alert_2["content"] : ""; ?>',
                icon: '<?php echo !empty($alert_2["icon"]) ? $alert_2["icon"] : ""; ?>',
                iconClass: '<?php echo !empty($alert_2["iconClass"]) ? $alert_2["iconClass"] : ""; ?>',
                closeBtn: '<?php echo !empty($alert_2["closeBtnText"]) ? $alert_2["closeBtnText"] : "disabled"; ?>',
                closeBtnText: '<?php echo !empty($alert_2["closeBtnText"]) ? $alert_2["closeBtnText"] : ""; ?>',
                autoclose: '<?php echo !empty($alert_2["autoclose"]) ? $alert_2["autoclose"] : ""; ?>',
                autocloseTime: '<?php echo !empty($alert_2["autocloseTime"]) ? $alert_2["autocloseTime"] : ""; ?>',
                btn: "<?php echo (!empty($alert_2["btnUrl"]) || !empty($alert_2["btnAttr"]) || !empty($alert_2["btnText"])) ? true : ""; ?>",
                btnUrl: "<?php echo !empty($alert_2["btnUrl"]) ? $alert_2["btnUrl"] : "#"; ?>",
                btnAttr: "<?php echo !empty($alert_2["btnAttr"]) ? $alert_2["btnAttr"] : (empty($alert_2["btnUrl"]) ? "data-dismiss='notification'" : ""); ?>",
                btnText: "<?php echo !empty($alert_2["btnText"]) ? $alert_2["btnText"] : "Tamam"; ?>",
            });
        };

        $(document).ready(function() {
            handleNotification2();
        });
    </script>

<?php } ?>