    //------------------- Oyun Senaryosu bu klasöre yazılabilir -------------------

    //geliştirici mod için linkin sonuna ekleyin = ?debugMode=true

    //

    var get_debug_info = location.search.split('debugMode=')[1];
    var hap_secildi = false;
    var secilen_hap = null;
    var toast;
    var user_joined = false
    var kardelen_proje = false;
    var moderator_basvuruldu = false;
    var hacker_programi_alindi = false;
    var form_clicked_value = 0;
    var otgus = new sound("assets/sounds/speech_sounds/otgus.wav");
    var montdrum = new sound("assets/sounds/speech_sounds/montage_drum.mp3");
    var bitcord_mode = false;
    var gorev_basladi = false;
    var gorev_baslangic_degeri = 0;


    if (get_debug_info != undefined) {
        debug_mode = (get_debug_info.toLowerCase() === 'true');
    }
    if (!debug_mode) {
        $(document).ready(function () {
            Swal.fire({
                title: 'Bitcord\'a hoşgeldin',
                confirmButtonText: 'Devam <i class="fa fa-arrow-right"></i>',
                allowOutsideClick: false,
                allowEscapeKey: false
            }).then((result) => {
                Swal.fire({
                    title: 'Öncelikle yeni yılın kutlu olsun! <br>Bu oyun OTG üyelerine yeni yıl hediyesi olarak tasarlandı.',
                    text: 'Bitcord - Simülasyon Oyunu',
                    confirmButtonText: 'Devam <i class="fa fa-arrow-right"></i>',
                    allowOutsideClick: false,
                    allowEscapeKey: false
                }).then((result) => {
                    Swal.fire({
                        title: '<img style="border-radius:50%; width:60px;" src="' + characters[0].img_url +
                            '"><br>' + 'Hoşgeldin',
                        text: 'Hadi, benzersiz bir nickname belirle !',
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
                        toastr.options = {
                            positionClass: "toast-bottom-right",
                            closeButton: true,
                        }
                        toast = toastr["info"](
                            '<div>Gerçekçi deneyim için Tam ekran modu aktif</div>'
                        );
                        toggleFullScreen();
                        rootDiv("visible");
                        var fuimg = document.querySelectorAll(".foreignUserImg");
                        fuimg.forEach(fu => {
                            fu.src = characters[0].img_url;
                        });
                        setTimeout(function () {
                            start_game();
                        }, 2000);

                        if (result.isConfirmed) {
                            kullanici_adi = result.value.slice(0, 12);
                            character = get_character("user");
                            character.display_name = kullanici_adi;
                            document.getElementById("username_text").innerText = kullanici_adi;
                        }
                    });
                });
            });
        });
    } else {
        rootDiv("visible");
    }

    function fug_reis() {
        get_callModal("fug_reis", 6500, 9000,
            function () {
                playSpeechSound("fug_reis", findSpeech("fog_reis_konusma.mp3"), 1500);
                speechEnded_indicator("fug_reis", 9000);
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
    }

    function playAnySound(sound_loc) {
        if (sound_loc == "otgus") {
            otgus.play();
        } else if (sound_loc == "montage_drum") {
            montdrum.play();
        }
    }

    // oyunu başlatır
    function start_game() {
        setTimeout(() => {
            oyunBiter()
        }, 1000);
    }

    // sahne 1
    function otg_join() {
        getMessage("ahmet", "Çok eğlendik ya cidden DSLHKLHDSKHKDSALGDG", 2000);
        getMessage("berkay", "Ahmet en son çıkarken ne demişti SKJEBHSJKBS", 5000);
        getMessage("ahmet", "Knk kafaam güzel, kusura bakma", 8000);
        getMessage("berkay", '"Kusura bakma kanka, kafam güzel - Ahmet SELGBKJESLAKBJB"', 10000);
        getMessage("berkay", "Nasıl biliyorum ama XD", 16000);
        getMessage("akin", "Selam knk, benim gri hırkamı gördün mü, bulursan bana söylersin. Bu arada yeni yılın kutlu olsun !", 21000);
        getMessage("can_ilbey", "Yeni yılın kutlu olsun !", 24000);
        getMessage("omerf", "Selam knk, yeni yılın kutlu olsun. Hadi OTG Bitcord'una gel " + createButton("Katıl", "otg_ile_baslangic(),destroyThis(this)"), 30000);
    }

    // sahne 2 - buton ile geçiş var
    function otg_ile_baslangic() {
        if (!user_joined) {
            user_joined = true;
            getMessage("otg", get_character("user").display_name + " gruba katıldı", 2000);
            getMessage("otg", createMessageHtml("kardelen", "Yeni yılınız kutlu olsun :>"), 5000);
            getMessage("otg", createMessageHtml("ata", "Hoşgeldin, " + get_character("user").display_name), 7000);
            getMessage("otg", createMessageHtml("kardelen", "Hoşgeldin, " + get_character("user").display_name), 9000);
            getMessage("otg", createMessageHtml("berkay", createImage("assets/images/cotg_us_transparent.png", null, "width:200px;") + " <div>OTG US yeni yıllar diler</div>"), 13000);
            getMessage("otg", createMessageHtml("yusuf", 'otgus.wav <i class="fa fa-arrow-right"></i> ' + createButton("Dinle", "playAnySound('otgus')")), 19000);
            getMessage("otg", createMessageHtml("ahmet", "KASGPĞÜIADPSĞGGPIĞDSIPĞHGIPĞSDHPIPĞDSHŞDSLH"), 25000);
            getMessage("otg", createMessageHtml("oktay", "oha"), 28000);
            getMessage("otg", createMessageHtml("oktay", "ÇOK İYİ ASFJKNSLŞDNGSLDFHLJKFDGNHFDJKGHM"), 32000);
            getMessage("otg", createMessageHtml("ahmet", "hepi niv yiır"), 35000);
            getMessage("ata", "Selam " + get_character("user").display_name + " !", 39000);
            getMessage("ata", "Yardıma ihtiyacın olduğunda moderatörlerimizle iletişime geçebilirsin.", 42000);
            getMessage("otg", createMessageHtml("yavuz", "<div>peki şuna ne diyorsunuz</div><div> " + createImage("assets/images/iphone13.jpg", null, "width:200px;") + "</div>"), 47000);
            getMessage("otg", createMessageHtml("berkay", "Iphone 13 mü o "), 54000);
            getMessage("otg", createMessageHtml("berkay", "Aklıma bu geldi " + createButton("izle", "createYoutubeIframeToast('https://www.youtube.com/embed/-V0BWAtM5zw')")), 61000);
            getMessage("otg", createMessageHtml("ahmet", "LSŞDNKNSLDHJKGHMFDFASFJHLJKFDGN"), 78000);
            getMessage("otg", createMessageHtml("omerf", "hahahahh"), 81000);
            getMessage("otg", createMessageHtml("ata", "!clear 16"), 85000);
            deleteMessages("otg", null, 87000);
            setTimeout(function () {
                garticphone_sahnesi()
            }, 88000)
        }
    }

    // sahne 3 - timeout ile geçiş var
    function garticphone_sahnesi() {
        getMessage("otg", "Mesaj geçmişi temizlendi.", 1000);
        getMessage("otg", createMessageHtml("ata", "Lütfen abuk şeyler atmayalım."), 3000);
        getMessage("otg", createMessageHtml("berkay", 'Pardon <i class="bx bx-md bx-smile"></i>'), 7000);
        getMessage("otg", createMessageHtml("kardelen", 'Ufak bir melodi yaptım dinlemek için <i class="fa fa-arrow-right"></i> ' + createButton("Tıkla", "kardelenin_projesi(), destroyThis(this)")), 11000);
        getMessage("otg", createMessageHtml("omerf", 'Komikti aslında'), 18000);
        getMessage("otg", createMessageHtml("ahmet", "GarticPhone gelen ?"), 22000);
        getMessage("otg", createMessageHtml("can_ilbey", "Davet linki at"), 25000);
        getMessage("otg", createMessageHtml("yavuz", "Ben gelirim"), 28000);
        getMessage("otg", createMessageHtml("ahmet", "https://garticphone.com/tr/?c=03f092a4ad"), 32000);
        getMessage("otg", createMessageHtml("yavuz", '<div style="display:block;"><span class="name_tagged">@skyla</span></div>' + createImage("assets/images/ece_cizim.png", null, "width:400px;")), 48000);
        getMessage("otg", createMessageHtml("ece", "Ha ha ha"), 53000);
        getMessage("otg", createMessageHtml("ahmet", "QWEIOBIONIQWB Yeni yılda baya güleceğiz galiba"), 56000);
        getMessage("otg", createMessageHtml("oktay", "Katılıyorum XD"), 61000);
        deleteMessages("otg", null, 80500);
        getMessage("otg", "Mesaj geçmişi temizlendi.", 81000);
        getMessage("otg", createMessageHtml("ata", '<div style="display:block;"><span class="ntfc_tagged">@Duyuru</span></div> Herkese merhaba! <br> <br> Konsept Akşamları etkinliği için hep beraber bu akşam 20.00’da OTG Discord sunucumuzda toplanıyoruz!' + createImage("assets/images/emogies/1.png") + '  <br> <br> Etkinliğimizde, önceden belirlediğimiz bir tema kapsamında toplanan referanslardan ilham alarak hayal ediyoruz ve sonrasında oyun geliştirmenin ilgilendiğimiz alanında tasarlıyoruz ve üretiyoruz! ' + createImage("assets/images/emogies/3.png") + '  <br> <br> Temaya göre hazırladığımız referansları her zaman olduğu gibi etkinliğimizin başında açıklayacağız, ilgisi olan herkesi bekleriz!' + createImage("assets/images/emogies/2.png")), 86000);
        setTimeout(function () {
            cenk_hoca_gruba_katiliyor()
        }, 97000);
    }

    // ara sahne 3-4 buton ile geçiş var
    function kardelenin_projesi(try_value = null) {
        call_time = 10000;
        if (try_value == true) {
            call_time = 0;
            deleteMessages("kardelen", null, 0);
        }
        dynamic = function () {
            get_callModal("kardelen", call_time + 1000, 20000,
                function () {
                    getMessage("kardelen", "Hazır mısın", 1000);
                    playSpeechSound("kardelen", findSpeech("kardelen_melodi.mp3"), 2000);
                    getMessage("kardelen", 'Dinlediğin için teşekkürler :D <div>' + createButton(createImage("assets/images/emogies/1.png"), "projeyi_begen(this)", null, "emoji_button", "kp_like") + "</div>", 19000);
                    speechEnded_indicator("kardelen", 19500);
                },
                function () {
                    clear_gml("kardelen");
                    getMessage("kardelen", 'Melodiyi dinlemek istersen çağrıyı açman gerekiyor ' + createButton("Tıkla", 'kardelenin_projesi(true)'), 1000);
                },
                function () {
                    clear_gml("kardelen");
                    getMessage("kardelen", 'Melodiyi dinlemek istersen çağrıyı açman gerekiyor ' + createButton("Tıkla", 'kardelenin_projesi(true)'), 1000);
                },
                function () {
                    clear_gml("kardelen");
                },
                function () {
                    clear_gml("kardelen");
                    getMessage("kardelen", 'Heyy! Sonuna kadar dinlemedin ' + createButton("Tıkla", 'kardelenin_projesi(true)'), 1000);
                });
        }

        if (kardelen_proje != true) {
            kardelen_proje = true;
            getMessage("kardelen", "Yeni bir melodi üzerinde çalışıyorum", 2000);
            getMessage("kardelen", "Bir dk ses gönderemiyorum", 5000);
            dynamic();

        } else if (try_value != null) {
            dynamic();
        }
    }

    function projeyi_begen(vaee) {
        vaee.classList.add("active_emoji");
        deleteMessages("kardelen", null, 1000);
        getMessage("kardelen", "Beğendiğine sevindim !", 2000);
        getMessage("kardelen", 'Tekrar dinlemek istersen ' + createButton("Tıkla", 'kardelenin_projesi(true)'), 4000);
    }

    // sahne 4 - timeout ile geçiş var
    function cenk_hoca_gruba_katiliyor(tekrar_val = null) {
        var cenk_ariyor = function () {
            get_callModal("cenk_hoca", 43000, 18000,
                function () {
                    deleteMessages("otg", null, 11000);
                    playSpeechSound("cenk_hoca", findSpeech("leblebi.mp3"), 1500);
                    speechEnded_indicator("cenk_hoca", 9000);
                    getMessage("otg", "Cenk Hoca gruptan atıldı.", 16000);
                    getMessage("otg", createMessageHtml("ata", '<div style="display:block;"><span class="ntfc_tagged">@Duyuru</span></div><div>OTG Bitcord\'da sunucu kurallarına aykırı davranışlar cezalandırılır.</div>'), 19000);
                    getMessage("otg", createMessageHtml("omerf", "Cenk Hocayı bile OTG den atan hayat bize neler yapmaz XD"), 22000);
                    getMessage("otg", createMessageHtml("berkay", "Abi bu senaryoyu kim yazyıyor ya FKGLBLKHDSJKBE"), 26000);
                    getMessage("otg", createMessageHtml("can_ilbey", "Cenk Hoca nasıl geldi biri açıklasın harbi"), 29000);
                    setTimeout(function () {
                        berkay_ile_hacknet_diyalog();
                    }, 43000);
                }, null, null, null, null);
        }

        if (tekrar_val == null) {
            getMessage("otg", createMessageHtml("cenk_hoca", "Leblebi"), 2000);
            getMessage("otg", createMessageHtml("ata", "Hoşgeldin Cenk !"), 4000);
            getMessage("otg", createMessageHtml("omerf", "Hoşgeldin Cenk"), 7000);
            getMessage("otg", createMessageHtml("cenk_hoca", "Hoşbuldum beyaz çocuk"), 10000);
            getMessage("otg", createMessageHtml("omerf", "Beyaz çocuk ?"), 13000);
            getMessage("otg", createMessageHtml("cenk_hoca", "Mike Tyson ne dediydi ?"), 18000);
            getMessage("otg", createMessageHtml("omerf", "Hocam tam anlayamadım ama ?"), 22000);
            getMessage("otg", createMessageHtml("ahmet", "Cenk hocanın grupta ne işi var SKJBGHSEJBGKÖFDJB"), 25000);
            getMessage("otg", createMessageHtml("mee6", 'GG <span class="name_tagged">@Cenk Hoca</span> , you just advanced to level 2!'), 26000);
            getMessage("omerf", 'Cenk Hocayla konuştun mu ?', 32000);
            getMessage("omerf", 'Adam tam makara ya DSFGKFJK', 38000);

            cenk_ariyor();
        } else if (tekrar_val == true) {
            cenk_ariyor();
        }
    }

    // sahne 5 - timeout ile geçiş var (arama kabul edildikten sonra)
    function berkay_ile_hacknet_diyalog() {
        deleteMessages("berkay", null, 500);
        getMessage("berkay", "Selam !", 1000);
        getMessage("berkay", "Daha önce hiç, Hacknet oynamış mıydın ?", 4000);
        getMessage("berkay", "En sevdiğim oyunlardan biridir, Özellike oyunun soundtrack'lerine bayılırım", 9000);
        getMessage("ahmet", "Cyberpunk'a ne dersin KJDSBKGSDJBMWEIB", 12000);
        getMessage("berkay", '"ara sıra cyberpunk ara sıra skyrim"', 16000);
        getMessage("ahmet", 'ara sıra cyberpunk ara sıra skyrim', 25000);
        getMessage("akin", "Hırkamı buldum knk, teşekkür ederim yine de", 30000);
        getMessage("berkay", "Ahmetin kafası güzel gerçekten ?", 35000);
        getMessage("berkay", "Sana gelen mesajları görebiliyorum evet, yöntemini sana da öğretirim belki :D", 40000);
        getMessage("berkay", "Ama bir kere tavşan deliğine düşünce, geri dönüşün olmaz.", 45000);
        deleteMessages("berkay", null, 52000);
        getMessage("berkay", "İnsanların diğer canlılardan farkı nedir biliyor musun ?", 56000);
        getMessage("berkay", "İnsan muhtaç olduğu doğa/mekan ile denge sağlamak yerine o mekanı yok etmeyi tercih eder, sonuna kadar sömürür ve yok eder.", 60000);
        getMessage("berkay", "Gerçeğin çölüne hoş geldin - Morpheus", 64000);

        setTimeout(function () {
            otg_moderator_ariyor();
        }, 70000);
    }

    // sahne 6 - timeout ile geçiş var
    function otg_moderator_ariyor() {
        deleteMessages("otg", null, 1000);
        getMessage("otg", createMessageHtml("ata", "Arkadaşlar OTG Bitcord'da garip şeyler oluyor."), 2000);
        getMessage("otg", createMessageHtml("ece", "Ne gibi ?"), 5000);
        getMessage("otg", createMessageHtml("yusuf", "Grupta bir ejderha var, daha garip ne olabilir ?"), 6000);
        getMessage("otg", createMessageHtml("ata", "davetsiz üyeler form doldurmadan nasıl katılabilir ki ?. Cenk adında biri katıldı ve sunucu kurallarına aykırı davranışlar sergilediği için gruptan atıldı."), 11000);
        getMessage("ahmet", "<div>knk yeni ayakkabı aldım, sen anlarsın. Nasıl ?</div> " + createImage("assets/images/yeni_ayakkabi.png", null, "width:300px;"), 22000);
        getMessage("otg_guard", "OTG nin moderatöre ihtiyacı var, moderatörlerimiz oldukça yoğun", 27000);
        getMessage("otg_guard", "Başvuranların faaliyetleri baz alınarak tercih yapılacaktır. Şansını dene", 34000);
        getMessage("otg_guard", "Moderatör başvurusu " + createButton("Tıkla", "moderator_basvuru()"), 38000);
    }

    // sahne 7 - button ile geçiş var
    function moderator_basvuru() {
        if (!moderator_basvuruldu) {
            moderator_basvuruldu = true;
            toastr.options = {
                positionClass: "toast-bottom-right",
                newestOnTop: false,
                progressBar: false,
                preventDuplicates: false,
                onclick: null,
                disableTimeOut: true,
                tapToDismiss: false,
                extendedTimeOut: 0,
                timeOut: 0,
                showEasing: "swing",
                hideEasing: "linear",
                showMethod: "fadeIn",
                hideMethod: "fadeOut"
            }
            toast = toastr["info"](
                '<div>Moderatör başvuru talebin inceleniyor...</div>'
            );

            setTimeout(function () {
                toast.remove();
                setTimeout(function () {
                    toastr.options = {
                        closeButton: true,
                    }
                    toast = toastr["success"](
                        '<div>Sana güzel bir haberimiz var.</div>'
                    );
                    getMessage("otg_guard", 'Gizli bir moderatöre ihtiyacımız var. Grupta yeni olduğun için falan filan.. Şapşal resmi yazılar. Tüm günü bunları yazmaktan yoruldum.', 2000);
                    getMessage("otg_guard", 'Evet botların da duyguları vardır.', 6000);
                    getMessage("otg_guard", 'Yazmaya üşendim, arıyorum', 9000);
                    setTimeout(function () {
                        moderator_olarak_devam_et();
                    }, 31000);
                    get_callModal("otg_guard", 15000, 10000,
                        function () {
                            playSpeechSound("otg_guard", findSpeech("moderator_kabul.mp3"), 2000);
                            speechEnded_indicator("otg_guard", 10000);
                        },
                        function () {
                            clear_gml("otg_guard");
                            getMessage("otg_guard", 'Moderatör olarak alındın tebrikler ', 1000);
                        },
                        function () {
                            clear_gml("otg_guard");
                            getMessage("otg_guard", 'Moderatör olarak alındın tebrikler ', 1000);
                        },
                        function () {
                            clear_gml("otg_guard");
                        },
                        null);

                })
            }, 20000);

        } else {
            toastr.options = {
                positionClass: "toast-bottom-right",
                closeButton: true,
            }
            if (form_clicked_value < 8) {
                toastr["error"](
                    '<div>Sadece 1 defa başvurabilirsin.</div>'
                );
                form_clicked_value++;
            } else {
                if (!achievements.form_form_form_and_form) {
                    achievements.form_form_form_and_form = true;
                    toastr["success"](
                        '<div>Başarım kazanıldı</div><div>- Beni mod yapıııın!</div>'
                    );
                }

            }
        }
    }

    // sahne 8 - button ile geçiş var
    function moderator_olarak_devam_et() {
        deleteMessages("otg", null, 1500);
        getMessage("otg", 'Aktif faaliyet kontrolü yapabilmek için gruba 1 gizli moderatör alınmıştır.', 2000);
        getMessage("otg", createMessageHtml("ece", 'Hayırlı olsun'), 4000);
        getMessage("otg", createMessageHtml("omerf", 'Ooo Süper'), 5000);
        getMessage("otg", createMessageHtml("berkay", 'Gizli moderatör ne abi Amongus mu oynuyoruz SJHBSKSLBJSHBS'), 9000);
        getMessage("otg", createMessageHtml("ahmet", 'Mükemmel haber'), 14000);
        getMessage("otg", createMessageHtml("ahmet", '<div style="display:block;"><span class="name_tagged">@moonchain</span></div> ĞPHINELKNJKBUWE'), 17000);
        getMessage("otg", createMessageHtml("kardelen", 'Harika!'), 18000);
        getMessage("otg", createMessageHtml("omerf", 'Gruba bir moderatör daha katılmış oldu, hadi bakalım.'), 21000);
        getMessage("otg", createMessageHtml("omerf", 'Ben moderatör olduğum halde troll üyeleri bulamadım. Acaba yeni gizli mod bulabilecek mi ?'), 26000);
        // getMessage("otg_guard", "Troll üyeler tespit ettiğinde OTG GUARD'a bildirebilirsin. ", 32000);

        setTimeout(function () {
            omer_troll_yapacagini_soyler()
        }, 33000);
    }

    // sahne 9 - timeout ile geçiş var
    function omer_troll_yapacagini_soyler() {
        getMessage("omerf", "knk şimdi sen en yakın arkadaşımsın diye söylüyorum", 3000);
        getMessage("omerf", "OTG ye Konsept akşamında (bu akşam) bir troll saldırısı yapacağız", 7000);
        getMessage("omerf", "plana göre Sen, Ben ve Berkay yani üçümüz. Bu troll ekibinin bir parçasıyız.", 12000);
        getMessage("omerf", "ben mod olduğum için troll üyeleri bulamıyorlar dfbksdkbjsb", 17000);
        getMessage("omerf", "hazır yeni 'gizli' moderatörümüz de gruba eklenmişken, Büyük bir eğlencenin zamanı geldi ne dersin ? ", 23000);
        deleteMessages("otg_guard", null, 25000);
        getMessage("otg_guard", "Hey! Kadim koruyucu. Orada havalar nasıl ?", 29000);
        getMessage("otg_guard", "Gözümüzü kapattığımız an, düşman daima bir adım atar.", 32000);
        deleteMessages("otg", null, 34000);
        deleteMessages("omerf", null, 34000);
        getMessage("otg", createMessageHtml("kardelen", '<div style="display:block;"><span class="ntfc_tagged">@Duyuru</span></div> Konsept Akşamları etkinliğimiz 15 dakika sonra başlayacak, hepinizi Çalışma Alanı sesli kanalına bekliyoruz! ' + createImage("assets/images/emogies/1.png")), 35000);
        getMessage("omerf", "OTG yi hackledim, iyi izle", 44000);
        character_content_change("otg", "img_url", "omg_logo.webp", 48000);
        character_content_change("otg", "display_name", "OMG", 50000);
        getMessage("omerf", 'OMG ( Oh My God ! ) grubu DLKJGBDKBDLKKB, bakalım yeni modumuz ne yapacak XD', 56000);
        setTimeout(function () {
            berkay_atilma_sahnesi()
        }, 56000);
    }

    // sahne 10 - timeout ile geçiş var
    function berkay_atilma_sahnesi() {
        getMessage("otg", createMessageHtml("ahmet", 'LKABLGJRLKBALKŞLG'), 2000);
        getMessage("otg", createMessageHtml("akin", 'Gerçekten mi ?'), 6000);
        getMessage("otg", createMessageHtml("kardelen", 'Bu ne ?'), 9000);
        getMessage("otg", createMessageHtml("berkay", 'Ahmet gülmen çok şüpheli duruyor ama bugün fazla güldün zaten xd'), 14000);
        getMessage("otg", createMessageHtml("ata", 'Şüphe derken :D belki biz değiştirdik grubun logosunu ve ismini ?'), 21000);
        getMessage("otg", createMessageHtml("ahmet", 'Berkay yakalandın, ventle hemen MGJBRKB'), 25000);
        getMessage("otg", createMessageHtml("berkay", 'Abi ciddi misiniz :D'), 29000);
        getMessage("otg", get_character("berkay").display_name + " gruptan atıldı.", 33000);
        getMessage("otg", 'Berkay was an <span style="color:red; font-weight:bold;">Impostor</span><br><span style="color:red; font-weight:bold;">1 Impostor</span>  Left', 36000);
        getMessage("otg", createMessageHtml("yusuf", 'otgus.wav <i class="fa fa-arrow-right"></i> ' + createButton("Dinle", "playAnySound('otgus')")), 40000);
        getMessage("otg", createMessageHtml("oktay", 'ya Yusuf DLKJGBHRDJLKBGDBKGRB'), 44000);
        getMessage("otg", createMessageHtml("ata", 'troll üye derdimiz kalmadığına göre logomuzu düzeltebiliriz.'), 48000);
        character_content_change("otg", "img_url", "otg.webp", 51000);
        character_content_change("otg", "display_name", "OTG", 53000);
        getMessage("omerf", "Haydaa, olay Berkay'a patladı.", 57000);
        getMessage("omerf", "Neyse daha iyi oldu, artık troll üye kalmadığını sanıyorlar. İşimize gelir", 61000);
        setTimeout(function () {
            mod_aciklama()
        }, 70000);
    }

    // sahne 11 - timeout ile geçiş var
    function mod_aciklama() {
        getMessage("otg", createMessageHtml("ata", "gizli mod'un artık anlamı yok, herkes kimin moderatör olduğunu bilmeli"), 2000);
        getMessage("otg", createMessageHtml("ata", "gizli moderatörümüz..."), 6000);
        getMessage("otg", createMessageHtml("kardelen", "3..."), 9000);
        getMessage("otg", createMessageHtml("kardelen", "2.."), 10000);
        getMessage("otg", createMessageHtml("kardelen", "1."), 12000);
        getMessage("otg", createMessageHtml("ata", '<div style="display:block;"><span class="name_tagged">@' + get_character("user").display_name + '</span></div> gizli moderatörlüğün hakkında ne düşünüyorsun :D'), 14000);
        getMessage("otg", createMessageHtml("ahmet", "haydaa"), 18000);
        getMessage("otg", createMessageHtml("kardelen", 'woah'), 23000);
        getMessage("otg", createMessageHtml("yusuf", 'davul_efekt.wav <i class="fa fa-arrow-right"></i> ' + createButton("Dinle", "playAnySound('montage_drum')")), 27000);
        getMessage("otg", createMessageHtml("ece", "ya Yusuf SGLKJBEKLŞBSEGLB"), 31000);
        getMessage("otg", createMessageHtml("oktay", "Yusuf WKLABOIWEBIW"), 34000);
        getMessage("otg", createMessageHtml("ahmet", "Bak bu iyiydi dfkgjfdg"), 34000);
        getMessage("otg", createMessageHtml("omerf", "Hadi ya ?"), 37000);
        setTimeout(
            function () {
                can_ilbey_sahne()
            }, 40000
        );
    }

    function can_ilbey_sahne() {

        getMessage("otg", createMessageHtml("oktay", "Dürüm ne kadar"), 2000);
        getMessage("otg", createMessageHtml("ata", "?"), 7000);
        getMessage("otg", createMessageHtml("omerf", "yine başlıyoruz " + createButton("izle", "createYoutubeIframeToast('https://www.youtube.com/embed/-1qju6V1jLM')")), 13000);
        getMessage("otg", createMessageHtml("ahmet", "ah shit. here we go again.."), 20000);
        getMessage("otg", createMessageHtml("can_ilbey", '<span class="name_tagged">@' + get_character("oktay").display_name + '</span> nasıl dürüm olduğuna bağlı..'), 26000);
        getMessage("otg", createMessageHtml("oktay", "88 TL olan dürümden bahsediyordum"), 32000);
        getMessage("otg", createMessageHtml("can_ilbey", '88 TL'), 40000);
        getMessage("otg", createMessageHtml("oktay", "hmm"), 46000);
        getMessage("otg", createMessageHtml("ahmet", "zamlar daha vurmadı galiba, ya da zamlı hali"), 52000);
        getMessage("otg", createMessageHtml("mee6", 'GG <span class="name_tagged">@' + get_character("can_ilbey").display_name + '</span> , you just advanced to level 2!'), 60000);
        getMessage("otg", createMessageHtml("oktay", "galiba zam geldi"), 66000);
        getMessage("otg", createMessageHtml("can_ilbey", "yok yok dfkjfdk sadece level atladım"), 72000);
        getMessage("otg", createMessageHtml("ece", "zamdan bahsetmeyin ya"), 79000);
        getMessage("otg", createMessageHtml("ece", "pembe boyaların da fiyatı artmış"), 83000);
        getMessage("otg", createMessageHtml("mee6", "Adding a new video by " + get_character("berkay").display_name + " " + createButton("izle", "createYoutubeIframeToast('https://www.youtube.com/embed/wlF4P9kvoVU')")), 84000);

        setTimeout(
            function () {
                testi_gectin()
            }, 86000
        );
    }

    // sahne 12 - timeout ile geçiş var
    function testi_gectin() {
        deleteMessages("omerf", null, 1000);
        getMessage("omerf", "Moderatör senmişsin demek", 4000);
        getMessage("omerf", "Tabiii İspiyonlamak için geç kalmış olabilirsin", 12000);
        getMessage("omerf", "Aslında başından beri biliyorduk hahaha", 17000);
        getMessage("omerf", "Hesabına erişimimiz var biliyorsun", 22000);
        getMessage("omerf", "Sadece seni test ediyorduk", 27000);
        getMessage("omerf", "Ekibe katılmaya hak kazandın", 32000);
        getMessage("omerf", "Şimdi, Berkay ile iletişime geç", 37000);
        getMessage("berkay", "Testi geçtin. Bravo..", 42000);
        getMessage("berkay", "Tabi biz ne kadar geçtin desek de, sen istiyor musun bilmiyoruz ?", 46000);
        getMessage("berkay", "Sonuçta sadece arkadaşını satmadın o kadar", 50000);
        getMessage("berkay", "Dediğim gibi, tavşan deliğine düşersen.. geri dönüşün olmaz.", 55000);
        getMessage("berkay", "Soğuk diyince aklına ilk hangi renk geliyor ?", 60000);
        getMessage("berkay", "Ya da sıcak ?", 65000);
        getMessage("omerf", "Yine felsefe yapıyor değil mi, aahh. ", 70000);
        getMessage("omerf", "Asıl soruyu ben soracağım. açık ve net.", 75000);
        getMessage("omerf", "Soğuk mu Sıcak mı ? <span style='color:blue;'>Soğuk</span> dersen birbirimize soğur ve küseriz, <span style='color:red;'>sıcak</span> dersen kalplerimiz ısınır ve en yakın arkadaş olarak kalırız", 80000);
        getMessage("omerf", "Cevabı kime vereceğini biliyorsun...", 85000);
        setTimeout(function () {
            morpheus_hap_sahnesi();
        }, 87000);
    }

    // sahne 13 - timeout ile geçiş var
    function morpheus_hap_sahnesi() {

        deleteMessages("morpheus", null);
        get_callModal("morpheus", 1500, null,
            function () {
                playSpeechSound("morpheus", findSpeech("morpheus_hap_konusma.mp3"), 1500);
                getMessage("morpheus", createImage("assets/images/mavi_hap.png", "hap_secimi('mavi')", "width:50px; margin-top:16px;"), 24000);
                getMessage("morpheus", createImage("assets/images/kirmizi_hap.png", "hap_secimi('kirmizi')", "width:50px; margin-top:16px;"), 32000);
                speechEnded_indicator("morpheus", 40000);
                closeCall_ST("morpheus", 40000);
                getMessage("berkay", "maviyi seçersen oyun biter, kırmızıyı seçersen devam ederiz.", 46000);
            },
            function () {
                clearInterval(glitch_interval);
                if (!hap_secildi) {
                    clear_gml("morpheus");
                    getMessage("morpheus", 'Aramayı açman gerekiyor ' + createButton("Tıkla", "morpheus_hap_sahnesi(),destroyThis(this)", null, null), 1000);
                }
            },
            function () {
                clearInterval(glitch_interval);
                if (!hap_secildi) {
                    clear_gml("morpheus");
                    getMessage("morpheus", 'Senaryoyu tekrar oynatmak için ' + createButton("Tıkla", "morpheus_hap_sahnesi(),destroyThis(this)", null, null), 1000);
                }
            },
            function () {
                clearInterval(glitch_interval);
                clear_gml("morpheus");
            },
            function () {
                clearInterval(glitch_interval);
                clear_gml("morpheus");
                if (!hap_secildi) {
                    getMessage("morpheus", 'Konuşmayı Morpheus\'un yüzüne kapatmamalısın ' + createButton("Tıkla", "morpheus_hap_sahnesi(),destroyThis(this)", null, null), 1000);
                }
            });
    }

    // sahne 14 - timeout ile geçiş var
    function hap_secimi(hap_rengi) {
        if (!hap_secildi) {
            if (hap_rengi == "mavi") {
                secilen_hap = "mavi";
                hap_secildi = true;
                closeCall();
                notifications_clear("morpheus");
                getMessage("morpheus", "Maviyi seçtin demek, başka bir seçim hakkın olmayacak");
                deleteMessages("morpheus");
                omerf_hap_secildi();
            } else if (hap_rengi == "kirmizi") {
                secilen_hap = "kirmizi";
                hap_secildi = true;
                closeCall();
                getMessage("morpheus", "Kırmızıyı seçtin demek, başka bir seçim hakkın olmayacak");
                deleteMessages("morpheus");
                omerf_hap_secildi();
            }
        }
    }

    function omerf_hap_secildi() {
        if (secilen_hap == "mavi") {
            getMessage("omerf", "Demek Mavi hapı seçtin", 1500);
            getMessage("omerf", "ASDVWAVWAV", 3500);
            getMessage("omerf", "testi geçtin", 6500);
            setTimeout(() => {
                lux_white_aciklama()
            }, 7000);
        } else if (secilen_hap == "kirmizi") {
            deleteMessages("omerf", null, 1000);
            getMessage("omerf", "Soğuk mu sıcak mı ?", 1500);
            getMessage("omerf", "Ah şu Morpheus ve onun şakaları yok mu", 3500);
            getMessage("omerf", createImage("assets/images/morpheusxd.jpg", null, "width:400px;"), 6500);
            getMessage("omerf", "DŞGBSDJGORBJSLGKBKSLGAFNLAWKJBWPALŞBAJKBB", 8500);
            getMessage("omerf", "Neyse, madem bizim tarafımızı seçtin", 15000);
            getMessage("omerf", "Hadi OTG.. Pardon OMG'nin icabına bakalım XD", 17000);
            getMessage("omerf", "Bir dk knk bekle", 19000);
            getMessage("omerf", "Berkay sana programı gönderecek", 24000);
            deleteMessages("berkay", null, 2500);
            getMessage("berkay", "Selamlar !!", 29000);
            getMessage("berkay", "Ufak bir gövde gösterisi geliyor :>", 35000);
            character_content_change("mee6", "img_url", "devill6.webp", 40000);
            character_content_change("mee6", "display_name", "(!)DEVILL6", 44000);
            getMessage("berkay", "İstediğim kişinin discord hesabına erişebilirim, çok şeytanca değil mi ?", 49000);
            getMessage("berkay", "Sana da programı atacağım, müzikle birlikte saldırı yapacağız", 55000);
            getMessage("berkay", "Bu müziği özellikle seçtim (Hacknet soundtrack)", 60000);
            getMessage("berkay", "Artık seni Luxury grubuna alabiliriz.", 65000);
            getMessage("berkay", "Lux 0 - Join " + createButton("Tıkla", "hacker_programi(),destroyThis(this)"), 70000);
        }
    }

    function muzikle_birlikte() {
        deleteMessages("mee6", null);
        getMessage("mee6", "Adding a new music - Carpenter Brut", 1000);
        get_callModal("mee6", 3000, null,
            function () {
                playSpeechSound("mee6", findSpeech("hacknet_soundtrack_carpenter_brut.mp3"), 1500);
            },
            function () {
                getMessage("mee6", "Müzik dinlemek için" + createButton("Tıkla", "muzikle_birlikte()"), 1500);
            },
            function () {
                getMessage("mee6", "Müzik dinlemek için" + createButton("Tıkla", "muzikle_birlikte()"), 1500);
            },
            function () {
                getMessage("mee6", "Tekrar dinlemek için" + createButton("Tıkla", "muzikle_birlikte()"), 1500);
            },
            function () {
                getMessage("mee6", "Tekrar dinlemek için" + createButton("Tıkla", "muzikle_birlikte()"), 1500);
            });
    }

    function hacker_programi() {
        if (!hacker_programi_alindi) {
            hacker_programi_alindi = true;
            getMessage("lux_black", get_character("user").display_name + ' gruba katıldı.', 2000);
            getMessage("lux_black", createMessageHtml("omerf", "Vayy, Luxury'ye katıldın demek, Aslında tahmin ediyordum.."), 6000);
            getMessage("lux_black", createMessageHtml("omerf", "Tabii, güvenilir arkadaş bulmak zor"), 12000);
            getMessage("lux_black", createMessageHtml("berkay", "Hack işlemleri için bu grubu kullanacağız"), 17000);
            getMessage("lux_black", createMessageHtml("berkay", "Burası Bitcord grubu gibi dursa da aslında değil, bu da gizli kalmamızı sağlıyor"), 22000);
            getMessage("lux_black", createMessageHtml("berkay", '<span class="name_tagged">@' + get_character("user").display_name + '</span>' + ' madem tavşan deliğine düştün..'), 27000);
            getMessage("lux_black", createMessageHtml("berkay", "Sana hesap kırmayı öğretelim"), 32000);
            getMessage("lux_black", createMessageHtml("berkay", "Arşiv üyeliğini başlatıyorum"), 38000);
            getMessage("hacker_team", "Hacker Arşiv'e hoşgeldin, kalıcı üyeliğin başlatıldı", 44000);
            getMessage("berkay", "Arşive hoşgeldin. gerekli programları arşivden bulabilirsin. Aklına ne gelirse. Twitter'ın veritabanı bile var.", 51000);
            getMessage("berkay", "FORCE_tools.exe yi kurduğunda, işlemlere başlayabiliriz.", 57000);
            getMessage("hacker_team", "Hesap kırmak için kullanılır - FORCE_tools.exe " + createButton("Tıkla", "downloadProgram('force_tools')"), 62000);
            getMessage("berkay", "Tehlikeli diyecektir, sorun yok. Gerçekçi bir deneyim demiştik değil mi ?", 66000);

        }
    }

    function force_tool_tanitim_senaryosu() {
        program_list.force_tools = false;
        var baslatma = JSON.parse(JSON.stringify(forceStarted));
        var kullanim = JSON.parse(JSON.stringify(forceUsed));
        get_callModal("berkay", 2000, null,
            function () {
                program_list.force_tools = true;
                playSpeechSound("berkay", findSpeech("ft_tanitim1.mp3"), 2000);
                tanitim2 = setInterval(function () {
                    if (forceStarted > baslatma) {
                        playSpeechSound("berkay", findSpeech("ft_tanitim2.mp3"), 2000, false);
                        clearInterval(tanitim2);
                    }
                }, 1500);

                tanitim3 = setInterval(function () {
                    if (forceUsed > kullanim) {
                        playSpeechSound("berkay", findSpeech("ft_tanitim3.mp3"), 2000, false);
                        clearInterval(tanitim3);
                        speechEnded_indicator("berkay", 13500);
                        closeCall_ST("berkay", 14000);
                        setTimeout(
                            function () {
                                omer_ve_berkay_birbirini_hackler();
                            }, 15000
                        );
                        if (active_program != undefined) {
                            active_program.remove();
                        }
                    }
                }, 1500);
            },
            function () {
                program_list.force_tools = true;
                clear_gml("berkay");
                getMessage("berkay", 'Tanıtımı geçemezsin ' + createButton("Tıkla", 'force_tool_tanitim_senaryosu()'), 1000);
            },
            function () {
                program_list.force_tools = true;
                clear_gml("berkay");
                getMessage("berkay", 'Tanıtımı geçemezsin ' + createButton("Tıkla", 'force_tool_tanitim_senaryosu()'), 1000);
            },
            function () {
                program_list.force_tools = true;
                clear_gml("berkay");
            },
            function () {
                program_list.force_tools = true;
                clear_gml("berkay");
                getMessage("berkay", 'Tanıtımı geçemezsin ' + createButton("Tıkla", 'force_tool_tanitim_senaryosu()'), 1000);
            });
    }

    function omer_ve_berkay_birbirini_hackler() {
        character_content_change("omerf", "surname", "Sürahi", 2000);
        getMessage("lux_black", createMessageHtml("omerf", "Haha. baya komik."), 7000);
        getMessage("lux_black", createMessageHtml("berkay", "DLGKBDBLSJF"), 9000);
        getMessage("lux_black", createMessageHtml("omerf", "Süphani'den, Sürahi yapmak aklına nasıl geldi merak ediyorum"), 12000);
        getMessage("lux_black", createMessageHtml("ahmet", "Sürahi mi DGBLRDKRDJBRDKRDBRL"), 17000);
        getMessage("lux_black", createMessageHtml("omerf", "Ahmet ?"), 21000);
        getMessage("lux_black", createMessageHtml("berkay", "Noluyo lan ?"), 26000);
        getMessage("lux_black", createMessageHtml("berkay", "Ahmet ? Buraya nasıl geldin"), 31000);
        getMessage("lux_black", createMessageHtml("omerf", '<span class="ntfc_tagged">Noluyo lan ?</span> ' + createButton("izle", "createYoutubeIframeToast('https://www.youtube.com/embed/Pj2M5-mdw58')")), 35000);
        getMessage("lux_black", createMessageHtml("berkay", 'fdgbdjfkdlbrd'), 50000);
        getMessage("lux_black", createMessageHtml("ahmet", 'QWEWJKBWERIBN'), 52000);
        getMessage("lux_black", createMessageHtml("omerf", "Ahmet sen nasıl geldin cidden ?"), 57000);
        getMessage("lux_black", createMessageHtml("ahmet", "Tansiyon ilacı"), 63000);
        getMessage("lux_black", createMessageHtml("omerf", "Ne ?"), 67000);
        getMessage("lux_black", createMessageHtml("ahmet", "Tansiyon ilacı işte"), 71000);
        getMessage("lux_black", createMessageHtml("omerf", "Knk şifreli konuşmana gerek yok, özel gruptayız"), 76000);
        getMessage("lux_black", createMessageHtml("ahmet", "Ya ne şifresi JHGBJSDRBKHJB "), 82000);
        getMessage("lux_black", createMessageHtml("ahmet", "Siz hapla gelmediniz mi " + createButton("izle", "createYoutubeIframeToast('https://www.youtube.com/embed/jg-11bhXlGo')")), 86000);
        getMessage("lux_black", createMessageHtml("omerf", "Bende olanı niye bana koyuyosun"), 120000);
        getMessage("lux_black", createMessageHtml("ahmet", "Onu boşver SDHGJB olayı anladıysan sıkıntı yok"), 126000);
        getMessage("lux_black", createMessageHtml("berkay", "Morpheus ile konuşmak herkese nasip olmuyor XD"), 132000);
        getMessage("lux_black", createMessageHtml("morpheus", "Hiç gerçek olduğunu düşündüğün bir rüya gördün mü ?"), 137000);
        getMessage("lux_black", createMessageHtml("ahmet", "Aynen knk nasip olmuyor FJHBGJDBHRJI"), 142000);
        getMessage("lux_black", createMessageHtml("berkay", "dkjgfkdgb kendisi bizim üye alırken kullandığımız bitcord botu"), 150000);
        getMessage("lux_black", createMessageHtml("ahmet", "Nasıl yani gerçek değil mi ?"), 156000);
        getMessage("lux_black", createMessageHtml("morpheus", "Gerçeği nasıl tanımlarsın ?"), 162000);
        getMessage("lux_black", createMessageHtml("ahmet", "Abii dsfgkbjdkgb"), 168000);
        getMessage("lux_black", createMessageHtml("ahmet", "Bitcord'da takılırken sayenizde matrixi izlemiş kadar oldum"), 173000);
        getMessage("lux_black", createMessageHtml("ahmet", 'neyse ben kaçıyom, size kolay gelsin.'), 178000);
        getMessage("lux_black", createMessageHtml("omerf", 'Görüşürüz <span class="name_tagged">@' + get_character("ahmet").display_name) + '</span>', 184000);
        getMessage("lux_black", get_character("ahmet").display_name + ' gruptan ayrıldı.', 190000);
        setTimeout(function () {
            hacker_grubunda_troll();
        }, 191000);
    }

    function hacker_grubunda_troll() {
        character_content_change("berkay", "name", "Kaykay", 2000);
        getMessage("lux_black", createMessageHtml("omerf", "dfgdkgjkdf"), 7000);
        getMessage("lux_black", createMessageHtml("berkay", "abi kaykay nedir fdjhgbdkb"), 12000);
        getMessage("lux_black", createMessageHtml("omerf", "güzeldi kabul et"), 17000);
        getMessage("lux_black", createMessageHtml("berkay", "bilemedim şimdi bkdgjd"), 22000);
        deleteMessages("lux_black", null, 25000);
        getMessage("lux_black", createMessageHtml("berkay", get_character("akin").name + " nerde acaba."), 28000);
        getMessage("lux_black", createMessageHtml("berkay", 'Konsept akşamını trollememiz lazım.'), 34000);
        getMessage("lux_black", createMessageHtml("berkay", '<span class="name_tagged">@' + get_character("akin").display_name + '</span>'), 39000);
        getMessage("lux_black", createMessageHtml("omerf", 'uyuyor galiba ya,'), 45000);
        getMessage("lux_black", createMessageHtml("berkay", "o zamannn"), 50000);
        character_content_change("akin", "surname", "Pizzabasan", 53000);
        getMessage("lux_black", createMessageHtml("omerf", 'Bu iyiydi fjhbdbdg'), 59000);
        getMessage("lux_black", createMessageHtml("berkay", "geldiğinde ne tepki verecek acaba nkwjsjbw"), 64000);
        getMessage("otg", createMessageHtml("oktay", "HGAHSHDHF Pizza"), 70000);
        getMessage("otg", createMessageHtml("ata", "Aramızda bir amongus daha var sanırım"), 75000);
        getMessage("lux_black", createMessageHtml("berkay", 'Birazdan yapacaklarımız bundan daha eğlenceli olacak'), 81000);
        setTimeout(
            function () {
                deleteMessages("lux_black", 0);
                trolleme_gorevi();
            }, 85000);

    }

    function trolleme_gorevi() {
        gorev_basladi = true;
        program_list.force_tools = true;
        gorev_baslangic_degeri = JSON.parse(JSON.stringify(forceUsed));
        gorev = setInterval(function () {
            if (forceUsed >= gorev_baslangic_degeri + 5) {
                clearInterval(gorev);
                trolleme_gorevi_tamamlandi();
            }
        }, 2000);
        getMessage("lux_black", createMessageHtml("berkay", '<span class="name_tagged">@' + get_character("user").display_name + '</span>' + ' Sana yeni bir görev veriyorum'), 2000);
        getMessage("lux_black", createMessageHtml("berkay", 'Konsept akşamında <span style="color:#FF642E;">5 farklı kişinin</span> hesabına girip verilerini değiştirmeni (trollemeni) istiyorum'), 8000);
        getMessage("lux_black", createMessageHtml("berkay", 'Bunu Force programı ile kolaylıkla yapabilirsin'), 14000);
        getMessage("lux_black", createMessageHtml("berkay", 'Öğrettiğim gibi'), 20000);
        getMessage("lux_black", createMessageHtml("berkay", 'Bide..'), 25000);
        getMessage("lux_black", createMessageHtml("berkay", 'Müziksiz hack olur mu :D'), 30000);
        getMessage("lux_black", createMessageHtml("berkay", 'Hacker müziği geliyor'), 35000);
        setTimeout(() => {
            muzikle_birlikte();
        }, 37000);
        getMessage("otg", createMessageHtml("kardelen", '<div style="display:block;"><span class="ntfc_tagged">@Duyuru</span></div> Konsept Akşamları etkinliğimiz başladı! ' + createImage("assets/images/emogies/4.png")), 40000);
        getMessage("lux_black", createMessageHtml("berkay", 'Etkinlik başladı, acele et !'), 45000);
    };

    function trolleme_gorevi_tamamlandi() {
        closeCall();
        getMessage("otg", createMessageHtml("ata", get_character("otg").display_name + " ye bir saldırı yapılıyor."), 2000);
        getMessage("otg", createMessageHtml("oktay", "DGJDRLŞBDGBK"), 6000);
        getMessage("otg", createMessageHtml("ece", "Noluyor ya"), 11000);
        getMessage("otg", createMessageHtml("ahmet", "SKDGJBSOGBLIRBEB"), 16000);
        getMessage("lux_black", createMessageHtml("akin", "her şeyi anladım da benim hesabımı niye trollediniz"), 24000);
        if (hacked_list.find(elem => elem == get_character("ahmet").id) != undefined) {
            getMessage("otg", createMessageHtml("ahmet", "beni hacklemişler"), 27000);
        }
        if (hacked_list.find(elem => elem == get_character("yusuf").id) != undefined) {
            getMessage("otg", createMessageHtml("yusuf", "Grubun Ejderini kim hackledi ?"), 29000);
        }
        if (hacked_list.find(elem => elem == get_character("ata").id) != undefined) {
            getMessage("otg", createMessageHtml("ata", "Moderatörlerimiz de hacklenimş :D, bende dahil"), 30000);
        }
        if (hacked_list.find(elem => elem == get_character("kardelen").id) != undefined) {
            getMessage("otg", createMessageHtml("kardelen", "En son araplar tarafından hacklenmiştim"), 31000);
            getMessage("otg", createMessageHtml("kardelen", "Hesabımı araplardan kurtardım diye seviniyordum, şimdi amongus çıktı :>"), 34000);
        }
        if (hacked_list.find(elem => elem == get_character("yavuz").id) != undefined) {
            getMessage("otg", createMessageHtml("yavuz", "Beni niye trollediniz ?"), 35000);
            getMessage("otg", createMessageHtml("ahmet", get_character("yavuz").display_name + " ahahjajhha"), 38000);
        }
        if (hacked_list.find(elem => elem == get_character("oktay").id) != undefined) {
            getMessage("otg", createMessageHtml("oktay", "Çok güldüm, şimdi beni de hacklediler"), 36000);
        }
        if (hacked_list.find(elem => elem == get_character("ece").id) != undefined) {
            getMessage("otg", createMessageHtml("ece", "Saçlarımdan ne istiyorsun pis hacker gjfdhgjg"), 39000);
        }
        if (hacked_list.find(elem => elem == get_character("cenk_hoca").id) != undefined) {
            getMessage("otg", createMessageHtml("cenk_hoca", "Leb lebebi, Leb lebiii"), 41000);
            getMessage("otg", createMessageHtml("oktay", "Cenk hoca da hacklenimş"), 44000);
        }
        if (hacked_list.find(elem => elem == get_character("can").id) != undefined) {
            getMessage("otg", createMessageHtml("can", "Abii ciddi misin. Tetris oynuyorum, bana nasıl bulaştı"), 32000);
        }

        setTimeout(() => {
            hack_rollback();
        }, 42000);
    }

    function hack_rollback() {
        deleteMessages("lux_black", 1000);
        deleteMessages("otg", 1000);
        getMessage("lux_black", createMessageHtml("berkay", 'HAHAHAH Harika iş çıkardın'), 2000);
        getMessage("lux_black", createMessageHtml("omerf", 'Başarılı GDFLOKRMJE'), 7000);
        getMessage("lux_black", createMessageHtml("akin", 'OTG yi trolledin tamam da, beni niye trolledin'), 11000);
        getMessage("lux_black", createMessageHtml("berkay", get_character("user").display_name + " yapmadı :D, sen uyuyordun galiba. O sıra trolledik"), 17000);
        getMessage("lux_black", createMessageHtml("akin", 'Pizzabasan ne demek dfkgjdf'), 21000);
        if (hacked_list.find(elem => elem == get_character("akin").id) == undefined) {
            getMessage("lux_black", createMessageHtml("akin", "hadi onu anladım, 2 kere niye trollediniz ?"), 25000);
            getMessage("lux_black", createMessageHtml("omerf", 'onu biz yapmadık xd'), 30000);
        }

        getMessage("lux_black", createMessageHtml("berkay", 'Bizi çok güldürdün ' + get_character("user").display_name), 35000);
        getMessage("lux_black", createMessageHtml("omerf", 'Bence ödüllendirmeliyiz'), 38000);
        getMessage("lux_black", createMessageHtml("berkay", 'Katılıyorum'), 44000);
        getMessage("lux_black", createMessageHtml("berkay", 'Sana bir cüzdan hesabı açtım, kontrol et'), 50000);
        getMessage("crypto_team", "Your Bitcoin Wallet - Q45KBI3-435V-XDE2-OBUEWRB", 55000);
        getMessage("lux_black", createMessageHtml("berkay", 'Şimdilik 4.3 BTC yi hesabına yatırıyorum'), 60000);
        getMessage("crypto_team", "Balance: 4,323940394.. BTC", 62000);
        getMessage("crypto_team", "Total: 204.323 $", 63000);
        getMessage("lux_black", createMessageHtml("omerf", 'fena para xd'), 68000);
        getMessage("lux_black", createMessageHtml("ahmet", 'kesinlikle fenaa'), 73000);
        getMessage("lux_black", createMessageHtml("omerf", 'sen çıkmamış mıydın, nasıl gelip duruyorsun'), 78000);
        getMessage("lux_black", createMessageHtml("berkay", 'tansiyon ilacıyla'), 82000);
        getMessage("lux_black", createMessageHtml("ahmet", 'DGKBDLBŞRBGGR'), 86000);
        getMessage("lux_black", createMessageHtml("omerf", 'OWERPBOWPBWPEWB'), 91000);

        setTimeout(() => {
            fbi_open_the_door();
        }, 91000);

    }

    function fbi_open_the_door() {
        getMessage("crypto_team", "Balance Updated...", 2000);
        deleteMessages("crypto_team", null, 3500);
        getMessage("crypto_team", "Your Balance Now..", 5000);
        getMessage("crypto_team", "Balance: 0,0 BTC", 10000);
        getMessage("crypto_team", "Total: 0 $", 15000);
        getMessage("lux_black", createMessageHtml("ahmet", get_character("user").display_name + ' az önce biri hesabını hortumladı.'), 23000);
        getMessage("lux_black", createMessageHtml("omerf", get_character("user").display_name + ' yakalandı galiba'), 29000);
        getMessage("otg", createMessageHtml("ata", '<div style="display:block;"><span class="ntfc_tagged">@Duyuru</span></div> BTC şuan çöküşte'), 33000);
        getMessage("otg", createMessageHtml("ahmet", 'Duyuru dfkgjbdfkbd'), 38000);
        getMessage("lux_black", createMessageHtml("berkay", get_character("user").display_name + ' GG'), 40000);
        getMessage("fbi", 'Open The Door', 45000);
        getMessage("lux_black", createMessageHtml("ahmet", "FBI " + createButton("izle", "createYoutubeIframeToast('https://www.youtube.com/embed/OsEnH-LOOdU')")), 50000);

        setTimeout(() => {
            lux_white_aciklama();
        }, 80000)
    }

    function lux_white_aciklama() {
        getMessage("lux_white", get_character("user").display_name + " gruba katıldı.", 5000);
        getMessage("fbi", 'Bu kadar eğlence yeter.', 10000);
        getMessage("lux_white", createMessageHtml("berkay", 'Yanlış yerden yazdım shsjgb'), 15000);
        getMessage("lux_white", createMessageHtml("berkay", 'Bu kadar eğlence yeter.'), 19000);
        getMessage("lux_white", createMessageHtml("berkay", 'Luxury nin aydınlık tarafına hoşgeldin'), 24000);
        getMessage("lux_white", createMessageHtml("berkay", 'Luxury neden 2 tane diye soracaksındır'), 30000);
        getMessage("lux_white", createMessageHtml("ata", 'Tabi sorman gereken kişiye göre değişir'), 35000);
        getMessage("lux_white", createMessageHtml("ata", 'Hoşgeldin !'), 40000);
        getMessage("lux_white", createMessageHtml("kardelen", 'Hoşgeldin ! ' + get_character("user").display_name), 45000);
        getMessage("lux_white", createMessageHtml("ahmet", get_character("user").display_name) + " nin kafasını karıştırdınız", 50000);
        getMessage("lux_white", createMessageHtml("ahmet", "OTG nin derin devletine hoşgeldin !"), 55000);
        getMessage("lux_white", createMessageHtml("berkay", "Önce insanları yoldan çıkarıyoruz, sonra tarafımıza çekiyoruz"), 60000);
        getMessage("lux_white", createMessageHtml("ahmet", "FDLHKDLHNŞDN"), 64000);
        getMessage("lux_white", createMessageHtml("ata", "Orası öyle, lakin sadece bu tarz insanlar ile güvenliğimizi sağlayabiliriz."), 66000);
        getMessage("lux_white", createMessageHtml("ata", "Mesele sadece güvenliği arttırmak değil."), 74000);
        getMessage("lux_white", createMessageHtml("ata", "Düşmanımızı da azaltmamız gerekiz."), 80000);
        getMessage("lux_white", createMessageHtml("berkay", "sahte düşman üreterek borsayı kontrol ediyoruz KSJGBSKGBSL"), 80000);
        getMessage("lux_white", createMessageHtml("ata", "Benzer işler evet"), 85000);

        setTimeout(() => {
            oyunBiter();
        }, 100000)
    }

    function oyunBiter() {
        getMessage("fbi", "Thank you for playing !", 1000);
        getMessage("fbi", "See you later" + createImage("assets/images/emogies/4.png"), 4000);
        get_screen("fbi", "only_message");

        // increase_timer = 0;
        // characters.forEach(element => {
        //     increase_timer = increase_timer + 1000;
        //     setTimeout(() => {
        //         notification(element.id, "message", "no_sound");
        //     }, increase_timer);
        // });

        setTimeout(() => {
            glitch_interval = setInterval(function () {
                doGlitch("div", "scanlines", true, 2000)
                doGlitch("span", "glow", true, 2000)
            }, 4000);
            dial_up.play();
        }, 6000);
        setTimeout(() => {
            clearInterval(glitch_interval);
            rootDiv("hidden");
            setTimeout(() => {
                dial_up.stop();
                setTimeout(() => {
                    windows_error.play();
                }, 100);
                Swal.fire({
                    title: 'Oyun bitti',
                    text: "Umarım eğlenmişsindir. Belki bir farklı Bitcord'da görüşmek üzere.",
                    showCancelButton: false,
                    confirmButtonText: 'Mükemmel !',
                    allowOutsideClick: false,
                    allowEscapeKey: false
                }).then((result) => {
                    setTimeout(() => {
                        windows_error.play();
                    }, 100);
                    if (result.isConfirmed) {
                        achievements_html = "";
                        if (!achievements.hack_yourself) {
                            achievements_html = achievements_html + "<div> - Kendini Hackle</div>";
                        }
                        if (!achievements.form_form_form_and_form) {
                            achievements_html = achievements_html + "<div> - Beni mod yapıııın!</div>";
                        }


                        Swal.fire({
                            title: 'Kazandığın başarımlar: <br> <div>' + achievements_html + '</div>',
                        }).then((result) => {
                            setTimeout(() => {
                                windows_error.play();
                            }, 100);
                            if (result.isConfirmed) {
                                Swal.fire({
                                    title: 'Oyunun yapımında HTML,CSS ve JS kullanılmıştır',
                                    text: 'Açık kaynak kodlu ve dinamik yazılmıştır, kendi senaryonuzu üretip sizin de bir oyun yapabilmeniz için kütüphane haline getirilmiştir.',
                                    icon: 'info',
                                    showCancelButton: false,
                                    confirmButtonText: 'Proje',
                                    allowOutsideClick: false,
                                    allowEscapeKey: false
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        window.open("https://github.com/Moon-Chain/moon-chain.github.io");
                                    }
                                })
                            }
                        })

                    }
                })
            }, 5000);
        }, 16000);
    }


    // ------------------ Tools ------------------

    function downloadProgram(name) {
        console.log(name)
        if (name == "force_tools" && program_list.force_tools == false) {

            toastr.options = {
                positionClass: "toast-bottom-right",
                closeButton: true,
            }
            toast = toastr["error"](
                '<div>Yazılım tehlikeli olabilir ?</div><div><button type="button" onclick="clickSound(), addProgram(\'' + name + '\')">Kur</button></div>'
            );
        }
    }

    function addProgram(name) {
        program_panel = document.getElementById("program_panel");
        if (name == "force_tools" && program_list.force_tools != true) {
            program_panel.innerHTML = program_panel.innerHTML + '<div class="programs" onclick="clickSound(), forcetools()">FORCE_tools.exe</div>';
            program_list.force_tools = true;

            toastr.options = {
                positionClass: "toast-top-right",
                newestOnTop: false,
                progressBar: false,
                preventDuplicates: false,
                onclick: null,
                disableTimeOut: true,
                tapToDismiss: false,
                extendedTimeOut: 0,
                timeOut: 0,
                showEasing: "swing",
                hideEasing: "linear",
                showMethod: "fadeIn",
                hideMethod: "fadeOut"
            }
            toast = toastr["info"](
                '<div>Force_tools.exe <button onclick="forcetools()">Run</button></div>'
            );

            getMessage("berkay", "Programını şimdilik kapatıyorum. Hemen çalıştırma, sana göstereceklerim var.", 4000);
            setTimeout(function () {
                if (active_program != undefined) {
                    active_program.remove();
                }
                program_list.force_tools = false;
            }, 5000);
            setTimeout(
                function () {
                    force_tool_tanitim_senaryosu();

                    setTimeout(function () {
                        if (active_program != undefined) {
                            active_program.remove();
                        }
                    }, 1000);
                }, 6000
            );
        }
    }

    function forcetools() {
        if (program_list.force_tools) {
            if (active_program != undefined) {
                active_program.remove();
            }

            ignored_users = [];
            ignored_users.push(get_character("fug_reis").id);
            ignored_users.push(get_character("hacker_team").id);
            ignored_users.push(get_character("crypto_team").id);
            ignored_users.push(get_character("berkay").id);
            ignored_users.push(get_character("morpheus").id);
            ignored_users.push(get_character("omerf").id);
            ignored_users.push(get_character("lux_black").id);
            ignored_users.push(get_character("lux_white").id);
            ignored_users.push(get_character("fbi").id);

            var option_list;
            characters.forEach(ch => {
                hacked_find = ignored_users.find(elem => elem == ch.id);
                if (hacked_find == undefined) {
                    option_list = option_list + '<option value="' + ch.id + '">' + ch.name + ' ' + ch.surname + '</option>';
                }
            });

            var select_html = '<select name="fselect">' + option_list + '</select>';

            setTimeout(function () {
                toastr.options = {
                    positionClass: "toast-bottom-right",
                    closeButton: true,
                }
                toastr["success"](
                    'FORCE_tools.EXE'
                );
            }, 500);


            setTimeout(function () {
                toastr.options = {
                    closeButton: true,
                    newestOnTop: false,
                    progressBar: false,
                    preventDuplicates: false,
                    onclick: null,
                    disableTimeOut: true,
                    tapToDismiss: false,
                    extendedTimeOut: 0,
                    timeOut: 0,
                    showEasing: "swing",
                    hideEasing: "linear",
                    showMethod: "fadeIn",
                    hideMethod: "fadeOut"
                }
                active_program = toastr["warning"](
                    '<div><form id="nmap" action="javascript:void(0)" onsubmit="forceStart()" method="post"><div><span>Select User</span></div><div>' + select_html + '<div><div><button onclick="clickSound()" type="submit" style="cursor:pointer;" class="btn btn-primary">Hesabı kır</button><div></form></div>'
                );
            }, 1500);
        }
    }

    function forceStart() {
        forceStarted++;
        var elements = document.getElementById("nmap").elements;
        user_id = elements['fselect'].value;
        setTimeout(function () {
            active_program.remove();
        }, 500);
        setTimeout(function () {
            toastr.options = {
                positionClass: "toast-bottom-right",
                closeButton: true,
            }
            active_program = toastr["success"](
                '<div>Hesap işleniyor...</div>'
            );
        }, 1000);
        setTimeout(function () {
            active_program.remove();
        }, 5000);
        setTimeout(function () {
            fchar = get_character(user_id);
            toastr.options = {
                closeButton: true,
                newestOnTop: false,
                progressBar: false,
                preventDuplicates: false,
                onclick: null,
                disableTimeOut: true,
                tapToDismiss: false,
                extendedTimeOut: 0,
                timeOut: 0,
            }
            active_program = toastr["error"]('<div><span id="forced_user">name</span><hr><p>Şu olarak değiştir</p><form id="forcerequest" action="javascript:void(0)" onsubmit="forceRequest(' + fchar.id + ')" method="post"><input type="text" name="name" placeholder="Ad"><input type="text" name="surname" placeholder="Soyad"><input type="text" name="display_name" placeholder="Kullanıcı Adı"><input type="text" name="img_url" placeholder="Görsel URL"><div><button onclick="clickSound()" type="submit" style="cursor:pointer;"class="btn btn-primary">Değiştir</button></div></form></div>');
            document.getElementById("forced_user").innerText = fchar.name + " " + fchar.surname;
        }, 6000);
    }

    function forceRequest(user_id) {
        forceUsed++;
        var elements = document.getElementById("forcerequest").elements;
        fchar = get_character(user_id);

        if (gorev_basladi) {
            toastr.options = {
                positionClass: "toast-bottom-right",
                closeButton: true,
            }
            toastr["success"](
                "hacklendi"
            );
        }

        hacked_find = hacked_list.find(element => element == fchar.id);
        if (hacked_find == undefined) {
            hacked_list.push(fchar.id);
        }

        if (elements['name'].value != "" && elements['name'].value != fchar.name) {
            character_content_change(fchar.id, "name", elements['name'].value, 0, true);
        }
        if (elements['surname'].value != "" && elements['surname'].value != fchar.surname) {
            character_content_change(fchar.id, "surname", elements['surname'].value, 0, true);
        }
        if (elements['display_name'].value != "" && elements['display_name'].value != fchar.display_name) {
            character_content_change(fchar.id, "display_name", elements['display_name'].value, 0, true);
        }
        if (elements['img_url'].value != "" && elements['img_url'].value != fchar.img_url) {
            character_content_change(fchar.id, "img_url", elements['img_url'].value, 0, true);
        }

        if (fchar.id == 0 && !achievements.hack_yourself) {
            setTimeout(function () {
                toastr.options = {
                    positionClass: "toast-bottom-right",
                    closeButton: true,
                }
                toastr["success"](
                    'Başarım kazanıldı - Hack yourself'
                );
            }, 80000);
            getMessage("berkay", "abi sen ciddi misin ? cidden kendi hesabını mı hackleyeceksin", 2000);
            getMessage("berkay", "bari profil fotoğrafını değiştir XD", 5000);
            getMessage("berkay", "örn. Görsel URL kısmına <input value='assets/images/profile/mee6.webp'> yazabilirsin", 8000);
            achievements.hack_yourself = true;
        }
    }


    //incele
    // getMessage("otg", createMessageHtml("berkay", createYoutubeIframe("https://www.youtube.com/embed/wlF4P9kvoVU"),500,300), 1000);

    // if(debug_mode){
    // debug mod paneli yazmak için
    //     document.getElementById("");
    // }

    // glitch kodu
    // glitch_interval = setInterval(function(){
    //     doGlitch("div","scanlines",true,2000)
    //     doGlitch("span","glow",true,2000)
    // },4000);