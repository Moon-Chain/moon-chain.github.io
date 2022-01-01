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
    var otgus = new sound("assets/sounds/speech_sounds/otgus.wav");
    var montdrum = new sound("assets/sounds/speech_sounds/montage_drum.mp3");


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
                            otg_join();
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

    // cenk_hoca_gruba_katiliyor();

    // sahne 1
    function otg_join() {
        getMessage("ahmet", "Çok eğlendik ya cidden DSLHKLHDSKHKDSALGDG", 2000);
        getMessage("berkay", "Ahmet en son çıkarken ne demişti SKJEBHSJKBS", 5000);
        getMessage("ahmet", "Knk kafaam güzel, kusura bakma", 8000);
        getMessage("akin", "Selam knk, benim gri hırkamı gördün mü, bulursan bana söylersin. Bu arada yeni yılın kutlu olsun !", 15000);
        getMessage("omerf", "Selam knk, yeni yılın kutlu olsun. Hadi OTG Bitcord'una gel " + createButton("Katıl", "otg_ile_baslangic()"), 20000);
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
            getMessage("otg", createMessageHtml("yavuz", "<div>peki şuna ne diyorsunuz</div><div> " + createImage("assets/images/otg_islamic.png", null, "width:200px;") + "</div>"), 47000);
            getMessage("otg", createMessageHtml("berkay", createYoutubeIframe("https://www.youtube.com/embed/IX8qyn0cNEU", 500, 300)), 54000);
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
        getMessage("otg", createMessageHtml("kardelen", 'Ufak bir melodi yaptım dinlemek için <i class="fa fa-arrow-right"></i> ' + createButton("Tıkla", "kardelenin_projesi()")), 11000);
        getMessage("otg", createMessageHtml("omerf", 'Komikti aslında'), 13000);
        getMessage("otg", createMessageHtml("ahmet", "GarticPhone gelen ?"), 16000);
        getMessage("otg", createMessageHtml("akin", "Davet linki at"), 21000);
        getMessage("otg", createMessageHtml("yavuz", "Ben gelirim"), 24000);
        getMessage("otg", createMessageHtml("ahmet", "https://garticphone.com/tr/?c=03f092a4ad"), 27000);
        getMessage("otg", createMessageHtml("yavuz", '<div style="display:block;"><span class="name_tagged">@skyla</span></div>' + createImage("assets/images/ece_cizim.png", null, "width:400px;")), 43000);
        getMessage("otg", createMessageHtml("ece", "Ha ha ha"), 48000);
        getMessage("otg", createMessageHtml("ahmet", "QWEIOBIONIQWB Yeni yılda baya güleceğiz galiba"), 51000);
        getMessage("otg", createMessageHtml("oktay", "Katılıyorum XD"), 54000);
        deleteMessages("otg", null, 71500);
        getMessage("otg", "Mesaj geçmişi temizlendi.", 72000);
        getMessage("otg", createMessageHtml("ata", '<div style="display:block;"><span class="ntfc_tagged">@Duyuru</span></div> Herkese merhaba! <br> <br> Konsept Akşamları etkinliği için hep beraber bu akşam 20.00’da OTG Discord sunucumuzda toplanıyoruz! 🥳  <br> <br> Etkinliğimizde, önceden belirlediğimiz bir tema kapsamında toplanan referanslardan ilham alarak hayal ediyoruz ve sonrasında oyun geliştirmenin ilgilendiğimiz alanında tasarlıyoruz ve üretiyoruz! 👀  <br> <br> Temaya göre hazırladığımız referansları her zaman olduğu gibi etkinliğimizin başında açıklayacağız, ilgisi olan herkesi bekleriz! ✨'), 73000);

        setTimeout(function () {
            cenk_hoca_gruba_katiliyor()
        }, 77000);
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
                    getMessage("kardelen", 'Dinlediğin için teşekkürler :D <div>' + createButton("🥳", "projeyi_begen(this)", null, "emoji_button", "kp_like") + "</div>", 19000);
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
            get_callModal("cenk_hoca", 43000, 10000,
                function () {
                    deleteMessages("otg", null, 11000);
                    playSpeechSound("cenk_hoca", findSpeech("bir_yil.mp3"), 1500);
                    speechEnded_indicator("cenk_hoca", 9000);
                    getMessage("otg", "Cenk Hoca gruptan atıldı.", 16000);
                    getMessage("otg", createMessageHtml("ata", '<div style="display:block;"><span class="ntfc_tagged">@Duyuru</span></div><div>OTG Bitcord\'da sunucu kurallarına aykırı davranışlar cezalandırılır.</div>'), 19000);
                    getMessage("otg", createMessageHtml("omerf", "Cenk Hocayı bile OTG den atan hayat bize neler yapmaz XD"), 22000);
                    getMessage("otg", createMessageHtml("berkay", "Abi bu senaryoyu kim yazyıyor ya FKGLBLKHDSJKBE"), 26000);
                    getMessage("otg", createMessageHtml("akin", "Cenk Hoca nasıl geldi biri açıklasın harbi"), 29000);
                    setTimeout(function () {
                        berkay_ile_hacknet_diyalog();
                    }, 33000);
                }, null, null, null, null);
        }

        if (tekrar_val == null) {
            getMessage("otg", 'Cenk Hoca gruba katıldı', 1000);
            getMessage("otg", createMessageHtml("ata", "Hoşgeldin Cenk !"), 4000);
            getMessage("otg", createMessageHtml("omerf", "Hoşgeldin Cenk"), 7000);
            getMessage("otg", createMessageHtml("cenk_hoca", "Hoşbuldum beyaz çocuk"), 10000);
            getMessage("otg", createMessageHtml("omerf", "Beyaz çocuk ?"), 13000);
            getMessage("otg", createMessageHtml("cenk_hoca", "Mike Tyson ne dediydi ?"), 18000);
            getMessage("otg", createMessageHtml("omerf", "Hocam tam anlayamadım ama ?"), 22000);
            getMessage("otg", createMessageHtml("ahmet", "Cenk hocanın grupta ne işi var SKJBGHSEJBGKÖFDJB"), 25000);
            getMessage("omerf", 'Cenk Hocayla konuştun mu ?', 30000);
            getMessage("omerf", 'Adam tam makara ya DSFGKFJK', 34000);

            cenk_ariyor();
        } else if (tekrar_val == true) {
            cenk_ariyor();
        }
    }

    // sahne 5 - timeout ile geçiş var (arama kabul edildikten sonra)
    function berkay_ile_hacknet_diyalog() {
        getMessage("berkay", "Selam !", 1000);
        getMessage("berkay", "Daha önce hiç, Hacknet oynamış mıydın ?", 4000);
        getMessage("berkay", "En sevdiğim oyunlardan biridir, Özellike oyunun soundtrack'lerine bayılırım", 9000);
        getMessage("ahmet", "Cyberpunk'a ne dersin KJDSBKGSDJBMWEIB", 12000);
        getMessage("akin", "Hırkamı buldum knk, teşekkür ederim yine de", 14000);
        getMessage("berkay", "Ahmetin kafası güzel gerçekten ?", 16000);
        getMessage("berkay", "Sana gelen mesajları görebiliyorum evet, yöntemini sana da öğretirim belki :D", 20000);
        getMessage("berkay", "Ama bir kere tavşan deliğine düşünce, geri dönüşün olmaz.", 24000);
        deleteMessages("berkay", null, 31000);
        getMessage("berkay", "İnsanların diğer canlılardan farkı nedir biliyor musun ?", 34000);
        getMessage("berkay", "İnsan muhtaç olduğu doğa/mekan ile denge sağlamak yerine o mekanı yok etmeyi tercih eder, sonuna kadar sömürür ve yok eder.", 38000);
        getMessage("berkay", "Gerçeğin çölüne hoş geldin - Morpheus", 44000);

        setTimeout(function () {
            otg_moderator_ariyor();
        }, 45000);
    }

    // sahne 6 - timeout ile geçiş var
    function otg_moderator_ariyor() {
        deleteMessages("otg", null, 1000);
        getMessage("otg", createMessageHtml("ata", "Arkadaşlar OTG Bitcord'da garip şeyler oluyor."), 2000);
        getMessage("otg", createMessageHtml("ece", "Ne gibi ?"), 5000);
        getMessage("otg", createMessageHtml("yusuf", "Grupta bir ejderha var, daha garip ne olabilir ?"), 6000);
        getMessage("otg", createMessageHtml("ata", "davetsiz üyeler form doldurmadan nasıl katılabilir ki ?. Cenk adında biri katıldı ve sunucu kurallarına aykırı davranışlar sergilediği için gruptan atıldı."), 11000);
        getMessage("ahmet", "<div>knk yeni ayakkabı aldım, sen anlarsın. Nasıl ?</div> " + createImage("assets/images/yeni_ayakkabi.webp", null, "width:300px;"), 22000);
        getMessage("otg_guard", "OTG nin moderatöre ihtiyacı var, moderatörlerimiz oldukça yoğun", 27000);
        getMessage("otg_guard", "Başvuranların faaliyetleri baz alınarak tercih yapılacaktır. Şansını dene", 34000);
        getMessage("otg_guard", "Moderatör başvurusu " + createButton("Tıkla", "moderator_basvuru()"), 38000);
    }

    // sahne 7 - button ile geçiş var
    function moderator_basvuru() {
        if (!moderator_basvuruldu) {
            moderator_basvuruldu = true;
            deleteMessages("otg_guard", null, 1000);
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
                    getMessage("otg_guard", 'Gizli bir moderatöre ihtiyacımız var. Grupta yeni olduğun için gizli moderatör olarak görev yapman adına seni moderatör yaptık, kolay gelsin.', 2000);
                    setTimeout(function () {
                        moderator_olarak_devam_et();
                    }, 12000);
                    get_callModal("otg_guard", 8000, 10000,
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
            toastr["error"](
                '<div>Sadece 1 defa başvurabilirsin.</div>'
            );
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
        getMessage("omerf", "plana göre Sen, Ömer ve Berkay yani üçümüz. Bu troll ekibinin bir parçasıyız.", 12000);
        getMessage("omerf", "ben mod olduğum için troll üyeleri bulamıyorlar dfbksdkbjsb", 17000);
        getMessage("omerf", "hazır yeni 'gizli' moderatörümüz de gruba eklenmişken, Büyük bir eğlencenin zamanı geldi ne dersin ? ", 23000);
        getMessage("otg_guard", "Hey! Kadim koruyucu. Orada havalar nasıl ?", 29000);
        getMessage("otg_guard", "Gözümüzü kapattığımız an, düşman daima bir adım atar.", 32000);
        deleteMessages("otg", null, 34000);
        deleteMessages("omerf", null, 34000);
        getMessage("otg", createMessageHtml("kardelen", '<div style="display:block;"><span class="ntfc_tagged">@Duyuru</span></div> Konsept Akşamları etkinliğimiz 15 dakika sonra başlayacak, hepinizi Çalışma Alanı sesli kanalına bekliyoruz! ✨'), 35000);
        getMessage("omerf", "OTG yi hackledim, iyi izle", 41000);
        character_content_change("otg", "img_url", "omg_logo.webp", 46000);
        character_content_change("otg", "display_name", "OMG", 50000);
        getMessage("omerf", "OMG grubu DLKJGBDKBDLKKB, bakalım yeni modumuz ne yapacak XD", 55000);
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
        getMessage("otg", createMessageHtml("ata", 'troll üye derdimiz kalmadığına göre şu logoyu düzeltebiliriz.'), 48000);
        character_content_change("otg", "img_url", "otg.webp", 51000);
        character_content_change("otg", "display_name", "OTG", 53000);
        getMessage("omerf", "Haydaa, olay Berkay'a patladı.", 57000);
        getMessage("omerf", "Neyse daha iyi oldu, artık troll üye kalmadığını sanıyorlar. İşimize gelir", 61000);
        setTimeout(function () {
            mod_aciklama()
        }, 64000);
    }

    // sahne 11 - timeout ile geçiş var
    function mod_aciklama() {
        getMessage("otg", createMessageHtml("ata", "gizli mod'un artık anlamı yok, herkes kimin moderatör olduğunu bilmeli"), 2000);
        getMessage("otg", createMessageHtml("ata", "gizli moderatörümüz..."), 6000);
        getMessage("otg", createMessageHtml("kardelen", "3..."), 9000);
        getMessage("otg", createMessageHtml("kardelen", "2.."), 10000);
        getMessage("otg", createMessageHtml("kardelen", "1."), 12000);
        getMessage("otg", createMessageHtml("ata", '<div style="display:block;"><span class="name_tagged">@' + get_character("user").display_name + '</span></div> moderatörlüğün hakkında ne düşünüyorsun :D'), 14000);
        getMessage("otg", createMessageHtml("ahmet", "haydaa"), 18000);
        getMessage("otg", createMessageHtml("kardelen", 'woah'), 23000);
        getMessage("otg", createMessageHtml("yusuf", 'davul_efekt.wav <i class="fa fa-arrow-right"></i> ' + createButton("Dinle", "playAnySound('montage_drum')")), 27000);
        getMessage("otg", createMessageHtml("ece", "ya Yusuf SGLKJBEKLŞBSEGLB"), 31000);
        getMessage("otg", createMessageHtml("oktay", "Yusuf WKLABOIWEBIW"), 34000);
        getMessage("otg", createMessageHtml("ahmet", "Bak bu iyiydi dfkgjfdg"), 34000);
        getMessage("otg", createMessageHtml("omerf", "Hadi ya ?"), 37000);
        setTimeout(
            function () {
                testi_gectin()
            }, 37000
        );
    }

    // sahne 12 - timeout ile geçiş var
    function testi_gectin() {
        getMessage("omerf", "Moderatör senmişsin demek", 4000);
        getMessage("omerf", "Tabiii İspiyonlamak için geç kalmış olabilirsin", 8000);
        getMessage("omerf", "Aslında başından beri biliyorduk hahaha", 12000);
        getMessage("omerf", "Hesabına erişimimiz var biliyorsun", 16000);
        getMessage("omerf", "Sadece seni test ediyorduk", 20000);
        getMessage("omerf", "Ekibe katılmaya hak kazandın", 24000);
        getMessage("omerf", "Şimdi, Berkay ile iletişime geç", 28000);
        deleteMessages("omerf", null, 1000);
        getMessage("berkay", "Testi geçtin. Bravo..", 32000);
        getMessage("berkay", "Tabi biz ne kadar geçtin desek de, sen istiyor musun bilmiyoruz ?", 36000);
        getMessage("berkay", "Sonuçta sadece arkadaşını satmadın o kadar", 39000);
        getMessage("berkay", "Dediğim gibi, tavşan deliğine düşersen.. geri dönüşün olmaz.", 44000);
        getMessage("berkay", "Soğuk diyince aklına ilk hangi renk geliyor ?", 47000);
        getMessage("berkay", "Ya da sıcak ?", 51000);
        getMessage("omerf", "Yine felsefe yapıyor değil mi, aahh. ", 55000);
        getMessage("omerf", "Asıl soruyu ben soracağım. açık ve net.", 59000);
        getMessage("omerf", "Soğuk mu Sıcak mı ? <span style='color:blue;'>Soğuk</span> dersen birbirimize soğur ve küseriz, <span style='color:red;'>sıcak</span> dersen kalplerimiz ısınır ve en yakın arkadaş olarak kalırız", 66000);
        getMessage("omerf", "Cevabı kime vereceğini biliyorsun...", 76000);
        setTimeout(function () {
            morpheus_hap_sahnesi();
        }, 78000);
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
            },
            function () {
                if (!hap_secildi) {
                    clear_gml("morpheus");
                    getMessage("morpheus", 'Aramayı açman gerekiyor ' + createButton("Tıkla", "morpheus_hap_sahnesi()", null, null), 1000);
                }
            },
            function () {
                if (!hap_secildi) {
                    clear_gml("morpheus");
                    getMessage("morpheus", 'Senaryoyu tekrar oynatmak için ' + createButton("Tıkla", "morpheus_hap_sahnesi()", null, null), 1000);
                }
            },
            function () {
                clear_gml("morpheus");
            },
            function () {
                clear_gml("morpheus");
                if (!hap_secildi) {
                    getMessage("morpheus", 'Konuşmayı Morpheus\'un yüzüne kapatmamalısın ' + createButton("Tıkla", "morpheus_hap_sahnesi()", null, null), 1000);
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
        } else if (secilen_hap == "kirmizi") {
            deleteMessages("omerf",null,1000);
            getMessage("omerf", "Soğuk mu sıcak mı ?", 1500);
            getMessage("omerf", "Ah şu Morpheus ve onun şakaları yok mu", 3500);
            getMessage("omerf", createImage("assets/images/morpheusxd.jpg", null, "width:400px;"), 6500);
            getMessage("omerf", "DŞGBSDJGORBJSLGKBKSLGAFNLAWKJBWPALŞBAJKBB", 8500);
            getMessage("omerf", "Neyse, madem bizim tarafımızı seçtin", 15000);
            getMessage("omerf", "Hadi OTG.. Pardon OMG'nin icabına bakalım XD", 17000);
            getMessage("omerf", "Bir dk knk bekle", 19000);
            getMessage("omerf", "Berkay sana programı gönderecek", 24000);
            deleteMessages("berkay",null,2500);
            getMessage("berkay", "Selamlar !!", 29000);
            getMessage("berkay", "Ufak bir gövde gösterisi geliyor :>", 33000);
            character_content_change("mee6", "img_url", "devill6.webp", 36000);
            character_content_change("mee6", "display_name", "(!)DEVILL6", 39000);
            getMessage("berkay", "İstediğim kişinin discord hesabına erişebilirim, çok şeytanca değil mi ?", 42000);
            getMessage("berkay", "Sana da programı atacağım, müzikle birlikte saldırı yapacağız", 47000);
            getMessage("berkay", "Bu müziği özellikle seçtim (Hacknet soundtrack)", 50000);
            getMessage("berkay", "Hacker Archieve " + createButton("Tıkla", "hacker_programi()"), 54000);
        }
    }

    function muzikle_birlikte() {
        deleteMessages("mee6", null);
        getMessage("mee6", "Müzik geliyor..", 50000);
        get_callModal("mee6", 54000, null,
            function () {
                playSpeechSound("mee6", findSpeech("hacknet_soundtrack_carpenter_brut.mp3"), 1500);
                speechEnded_indicator("mee6", 60000);
                closeCall_ST("mee6", 60000);
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
        if(!hacker_programi_alindi){
            hacker_programi_alindi = true;
            getMessage("hacker_team", "Hesap kırmak için kullanılır - FORCE_tools.exe " + createButton("Tıkla", "downloadProgram('force_tools')"), 1500);
            getMessage("crypto_team", "Your Bitcoin Wallet - Q45KBI3-435V-XDE2-OBUEWRB", 6000);
        }
    }


    //incele
    // getMessage("otg", createMessageHtml("berkay", createYoutubeIframe("https://www.youtube.com/embed/wlF4P9kvoVU"),500,300), 1000);