<script src="<?php echo base_url("assets"); ?>/js/app.min.js"></script>
<script src="<?php echo base_url("assets"); ?>/js/rocket-loader.min.js" data-cf-settings="f45ed7b22d759226c3d9b4d0-|49" defer=""></script>

<!-- <script src="<?php echo base_url("assets"); ?>/js/demo/dashboard.demo.js"></script> -->
<?php $this->load->view("includes/alert"); ?>

<script>
    document.oncontextmenu = rightClick;

    function rightClick(e) {
        e.preventDefault();
    }

    $(document).ready(function() {
        var timer_clock_active = document.getElementById("timer_clock_active");
        if (timer_clock_active) {
            timeDecreaser(timer_clock_active.value);
        }
    });

    function timeDecreaser(show_type) {
        var timer_clock = document.getElementById("timer_clock");
        timer_clock.innerText = "---";
        var myVar = setInterval(do_work_timer, 1000);

        function do_work_timer() {
            var real_time = timer_clock.previousElementSibling.value;

            var end = real_time;
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var seconds = date.getSeconds();

            newdate = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;

            var date1 = new Date(newdate);
            var date2 = new Date(end);

            if (date2.getTime() <= date1.getTime()) {
                clearInterval(do_work_timer);
                location.reload();
            }

            var diff = date2.getTime() - date1.getTime();

            var msec = diff;
            var hh = Math.floor(msec / 1000 / 60 / 60);
            msec -= hh * 1000 * 60 * 60;
            var mm = Math.floor(msec / 1000 / 60);
            msec -= mm * 1000 * 60;
            var ss = Math.floor(msec / 1000);
            msec -= ss * 1000;

            if (show_type == "verification") {
                if (hh != 0) {
                    var hh = hh + ":";
                }
                if (mm != 0) {
                    var mm = mm + ":";
                }

                var string_time = hh + mm + ss;
            } else if (show_type == "banned") {
                var string_time = "";
                if (hh != 0) {
                    var hh = hh + " Saat";
                    string_time = string_time + hh + " ";
                }
                if (mm != 0) {
                    var mm = mm + " Dakika";
                    string_time = string_time + mm + " ";
                }
                if (ss != 0) {
                    var ss = ss + " Saniye";
                    string_time = string_time + ss;
                }
            }

            timer_clock.innerText = string_time;
            real_time.value = string_time;
        }
    }
</script>