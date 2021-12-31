    //------------------- Oyun Senaryosu bu klasöre yazılabilir -------------------

    //geliştirici mod için linkin sonuna ekleyin = ?debugMode=true

    //

    var get_debug_info = location.search.split('debugMode=')[1];
    if (get_debug_info != undefined) {
        debug_mode = (get_debug_info.toLowerCase() === 'true');
    }
    if (!debug_mode) {
        $(document).ready(function () {
            Swal.fire({
                title: '<img style="border-radius:50%; width:60px;" src="' + characters[0].img_url +
                    '"><br>' + 'Hoşgeldin',
                text: 'Hadi bir nickname belirle !',
                input: 'text',
                inputAttributes: {
                    autocapitalize: 'off'
                },
                showCancelButton: true,
                confirmButtonText: 'Hazırım',
                cancelButtonText: 'Anonim devam et',
                allowOutsideClick: false,
                allowEscapeKey: false
            }).then((result) => {
                rootDiv("visible");
                var fuimg = document.querySelectorAll(".foreignUserImg");
                fuimg.forEach(fu => {
                    fu.src = characters[0].img_url;
                });
                tugay_ve_cenk_hoca();
                if (result.isConfirmed) {
                    kullanici_adi = result.value.slice(0, 12);
                    document.getElementById("username_text").innerText = kullanici_adi;
                }
            })


            // toastr["success"](
            //     '<div><input class="input-small" value="textbox"/>&nbsp;<a href="http://johnpapa.net" target="_blank">This is a hyperlink</a></div><div><button type="button" id="okBtn" class="btn btn-primary">Close me</button><button type="button" id="surpriseBtn" class="btn" style="margin: 0 8px 0 8px">Surprise me</button></div>'
            //     );
            // toastr.options = {
            //     "closeButton": false,
            //     "debug": false,
            //     "newestOnTop": false,
            //     "progressBar": false,
            //     "positionClass": "toast-top-right",
            //     "preventDuplicates": false,
            //     "onclick": null,
            //     "showDuration": "300",
            //     "hideDuration": "1000",
            //     "timeOut": "5000",
            //     "extendedTimeOut": "1000",
            //     "showEasing": "swing",
            //     "hideEasing": "linear",
            //     "showMethod": "fadeIn",
            //     "hideMethod": "fadeOut"
            // }
        });

        function tugay_ve_cenk_hoca() {
            get_callModal("tugay", 1500, null,
                function () {
                    speechSound("tugay", findSpeech("tugay_gulme.mp3"), 1500);
                    getMessage("tugay", 'Abi Fug reise küfür ettim, ararsa sakın açma', 3000);
                    callEnded("tugay", 4500);

                    get_callModal("fug_reis", 6500, 9000,
                        function () {
                            speechSound("fug_reis", findSpeech("fog_reis_konusma.mp3"), 1500);
                            callEnded("fug_reis", 9000);
                        },
                        function () {
                            getMessage("fug_reis", 'Eğer bana küfreden varsa oralarda, eğer bana bi yazı yazanlar olursa, onun fug koyarım tamammı, if you do it again..', 1000);
                        },
                        null,
                        function () {
                            getMessage("fug_reis", 'Söyleyeceklerim bu kadardı', 1000);
                        },
                        function () {
                            getMessage("fug_reis", 'You Madafakaa', 1000);
                        }
                    );
                },
                function () {
                    getMessage("tugay",
                        'Abi açsanaaaa Cenk Hoca beni arayıp duruyor',
                        2000);

                    get_callModal("cenk_hoca", 6000, 10000,
                        function () {
                            speechSound("cenk_hoca", findSpeech("bir_yil.mp3"), 1500);
                            callEnded("cenk_hoca", 10000);
                        },
                        null,
                        null,
                        null,
                        null
                    );
                },
                function () {
                    getMessage("tugay",
                        'Abi duymadın galiba, birdaha aramamı ister misin -> ' + createButton("Cenk Hoca", "testter()", ""),
                        2000);
                },
                function () {
                    getMessage("tugay",
                        'Abiiii niye kapatıyon ya, birdaha aramamı ister misin ->' + createImage("https://w7.pngwing.com/pngs/908/632/png-transparent-man-wearing-black-jacket-illustration-morpheus-the-matrix-neo-red-pill-and-blue-pill-youtube-good-pills-will-play-fictional-character-film-character.png", "tugay_ve_cenk_hoca()"),
                        2000);
                },
                function () {
                    getMessage("tugay",
                        'Yüzüme niye kapatıyooonnnnnnnnnnnn, birdaha aramamı ister misin -> <button onclick="tugay_ve_cenk_hoca()">Evet</button>',
                        2000);
                });
        }
    } else {
        rootDiv("visible");
    }