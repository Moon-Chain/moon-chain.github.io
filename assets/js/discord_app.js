var startTime = Date.now();
var debug_mode = false;
var active_call = false;
var active_call_id = null;
var active_screen_id = null;
var call_interval;
var startCallST;
var closeCallST;
var active_call_sound;
var call_ended = true;
var mic_is_open = false;
var last_message_timeout;
var calling_now_id = null;
var calling_start_time;
var if_call_closed_function = null;
var variable_if_call_closed = null;
var variable_if_speech_not_ended = null;
var discord_call_sound = new sound("assets/sounds/discord_call.mp3");
var discord_join_sound = new sound("assets/sounds/discord_join.mp3");
var discord_leave_sound = new sound("assets/sounds/discord_leave.mp3");
var discord_mute_sound = new sound("assets/sounds/discord_mute.mp3");
var discord_unmute_sound = new sound("assets/sounds/discord_unmute.mp3");
var discord_notification_sound = new sound("assets/sounds/discord_notification.mp3");

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();
const monthNames = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
    "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
];
today_text = dd + ' ' + monthNames[today.getMonth()] + ' ' + yyyy;
today = dd + '.' + mm + '.' + yyyy;


$(document).ready(function () {
    var date_text_list = document.querySelectorAll(".date_today");
    date_text_list.forEach(date_text => {
        date_text.innerText = today;
    });

    var date_text_list = document.querySelectorAll(".date_today_text");
    date_text_list.forEach(date_text => {
        date_text.innerText = today_text;
    });
});

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function () {
        this.sound.play();
    }
    this.stop = function () {
        this.sound.pause();
    }
}

function getM(character_value, message) {
    character = get_character(character_value);
    character_chat = chat_list[character.id];
    character_chat.push(message);
    notification(character.id, "notification");

    if (active_screen_id == character.id) {
        message_line_html =
            '<div class="message_line"><img class="characterImg profilePhoto" src="' + character.img_url +
            '" /><div class="mbox"><strong class="character_DisplayName">' +
            character.display_name +
            '</strong> <span class="date_today" style="font-size:12px; text-indent: 50px; color:#72767D">' +
            today +
            '</span><span class="message">' + message +
            '</span><p></p></div></div>';

        message_box = document.querySelectorAll(".message_box");
        message_box.forEach(box => {
            box.innerHTML = box.innerHTML + message_line_html;
        });
    }
}

function getMessage(character_value, message, ms = 0) {
    last_message_timeout = setTimeout(function () {
        getM(character_value, message)
    }, ms);
}

function deleteMessages(character_value = null, select) {
    if (select == "all") {
        characters.forEach(ch => {
            chat_list[ch.id] = [];
        });
    } else {
        if (character_value != null) {
            character = get_character(character_value);
            chat_list[character.id] = [];
        }
    }
}

function createSpeechSound(sound_url) {
    var a_talk_user = document.getElementById("character_user");
    var audioCtx = new AudioContext();
    var url = sound_url;
    var source;
    var created_audio = new Audio(url);
    var processor = audioCtx.createScriptProcessor(2048, 1, 1);
    var meter = document.getElementById('meter');

    created_audio.addEventListener('canplaythrough', function () {
        source = audioCtx.createMediaElementSource(created_audio);
        source.connect(processor);
        source.connect(audioCtx.destination);
        processor.connect(audioCtx.destination);
        // created_audio.play();
    }, false);

    // loop through PCM data and calculate average
    // volume for a given 2048 sample buffer

    // konuştukça yeşil yanan halkayı oluşturur
    processor.onaudioprocess = function (evt) {
        var input = evt.inputBuffer.getChannelData(0),
            len = input.length,
            total = i = 0,
            rms;
        while (i < len) total += Math.abs(input[i++]);
        rms = Math.sqrt(total / len);
        average = (rms * 100);
        if (average > 7) {
            a_talk_user.getElementsByClassName("servericon")[0].classList.add("talk");
        } else {
            a_talk_user.getElementsByClassName("servericon")[0].classList.remove("talk");
        }

    };

    return created_audio;
}

// incele - ses oyunu için mikrofon algılayıcı
var foreign_user = document.getElementById("foreign_user");
navigator.mediaDevices.getUserMedia({
        audio: true,
    })
    .then(function (stream) {
        const audioContext = new AudioContext();
        const analyser = audioContext.createAnalyser();
        const microphone = audioContext.createMediaStreamSource(stream);
        const scriptProcessor = audioContext.createScriptProcessor(2048, 1, 1);

        analyser.smoothingTimeConstant = 0.8;
        analyser.fftSize = 1024;

        microphone.connect(analyser);
        analyser.connect(scriptProcessor);
        scriptProcessor.connect(audioContext.destination);
        scriptProcessor.onaudioprocess = function () {
            const array = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(array);
            const arraySum = array.reduce((a, value) => a + value, 0);
            const average = arraySum / array.length;
            // console.log(Math.round(average));

            if (foreign_user != undefined) {
                if (average > 10 && mic_is_open) {
                    foreign_user.getElementsByClassName("servericon")[0].classList.add("talk");
                } else {
                    foreign_user.getElementsByClassName("servericon")[0].classList.remove("talk");
                }
            }

        };
    })
    .catch(function (err) {
        /* handle the error */
        console.error(err);
    });


function get_callModal(character_value, time, close_time, if_accept, if_denied, if_missed, if_call_closed, if_speech_not_ended) {
    character = get_character(character_value);
    startCallST = setTimeout(function () {
        callModal(character_value, close_time, if_accept, if_denied, if_missed, if_call_closed, if_speech_not_ended)
    }, time);
}

function callModal(character_value, close_time, if_accept, if_denied, if_missed, if_call_closed, if_speech_not_ended) {
    character = get_character(character_value);
    calling_now_id = character.id;
    calling_start_time = setTimeout(function () {
        missedCall(character_value);
        calling_now_id = null;
        if (if_missed != null) {
            if_missed();
        }
    }, 10000);
    playSound();
    call_interval = setInterval(playSound, 500);
    Swal.fire({
        customClass: "call_style",
        title: '<img class="shaking" style="border-radius:50%; width:80px;" src="' + character.img_url +
            '"><br>' +
            character.name + " " + character.surname,
        text: "Gelen arama...",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: '<i class="bx bx-sm bxs-phone-call"></i>',
        confirmButtonColor: '#3BA55D',
        denyButtonText: '<i class="bx bx-sm bxs-phone-off"></i>',
        denyButtonColor: '#ED4245',
        allowOutsideClick: false,
        allowEscapeKey: false
    }).then((result) => {
        if (result.isConfirmed) {
            characters.forEach(ccst => {
                if (ccst != character.id) {
                    ccst.closeCallST = false;
                }
            });
            close_time != undefined || close_time != null ? closeCall_ST(character_value, close_time) : null;
            active_call_id = character.id;
            active_call = true;

            variable_if_call_closed = if_call_closed;
            variable_if_speech_not_ended = if_speech_not_ended;
            calling_now_id = null;
            clearTimeout(calling_start_time);
            if (if_accept != null) {
                if_accept()
            }
            stopSound();
        } else if (result.isDenied) {
            if_call_closed_function = null;
            calling_now_id = null;
            clearTimeout(calling_start_time);
            if (if_denied != null) {
                if_denied();
            }
            stopSound();
        }
    })
}

function missedCall(character_value) {
    Swal.close();
    character = get_character(character_value);
    stopSound();
    discord_leave_sound.play();
    getMessage(character_value, '<i style="color:#ED4245" class="bx bxs-phone"></i>' + character.display_name + ' kullanıcısından bir cevapsız arama.');
}

function closeCall() {
    character_value = active_call_id;
    character = get_character(character_value);
    active_call_id = null;
    active_call = false;
    discord_leave_sound.play();
    character.closeCallST = false;
    notification(character_value, "end_call");
    get_screen(character_value, "only_message")
    clearInterval(call_interval);
    clearTimeout(startCallST);
    if (call_ended) {
        if_call_closed_function = variable_if_call_closed;
    } else {
        if_call_closed_function = variable_if_speech_not_ended;
    }
    if (if_call_closed_function != null) {
        if_call_closed_function();
        if_call_closed_function = null;
    }
    if (active_call_sound != undefined) {
        active_call_sound.pause();
    }
}

function closeCall_ST(character_value, time) {
    character = get_character(character_value);
    character.closeCallST = true;
    setTimeout(function () {
        closeCall_with_control(character_value)
    }, time)
}

function closeCall_with_control(character_value) {
    character = get_character(character_value);
    if (active_call_id == character.id && character.closeCallST == true) {
        closeCall();
        character.closeCallST = false;
    }
}

//arama sesini oynat
function playSound() {
    discord_call_sound.play();
}

//arama sesini durdur
function stopSound() {
    discord_call_sound.stop();
    clearInterval(call_interval);
}

function click_server(character_value) {
    notification(character_value, "read_notification");
    get_screen(character_value, "only_message");
}

function notification(character_value, type) {
    var find_user;
    character = get_character(character_value);

    var user_list = document.getElementById("user_list");
    if (character != null) {
        var find_user = document.getElementById("user_" + character.id);
    }

    //Html oluşturulmadan önce okunmamış mesaj verisi 1 arttırılır
    type == "notification" ? character.unread_message = character.unread_message + 1 : null;

    if (type == "end_call") {
        active_call_id = null;
        active_call = false;
        if (find_user != undefined) {
            var notification_call_badge = find_user.getElementsByClassName("notification")[0].getElementsByClassName("user_active_call")[0];
            notification_call_badge.classList.remove("user_active_call");
            notification_call_badge.classList.add("call_badge_visibility");
        }
        return;
    }

    var add_user_active_call_class = character.id == active_call_id ? "user_active_call" : false;
    var html = '<div id="user_' + character.id + '" class="server" onclick="click_server(' + character.id +
        ')"><img class="servericon" src="' +
        character.img_url +
        '"><div class="notification"><span class="call_badge call_badge_visibility ' +
        add_user_active_call_class + '"><i class="bx bxs-volume-full"></i></span><span class="badge" style="visibility: hidden;">' +
        character.unread_message + '</span></div></div>';

    if (type == "notification") {
        discord_notification_sound.play();
        if (find_user != null) {
            find_user.remove();
        }

        user_list.innerHTML = html + user_list.innerHTML;
        find_user = document.getElementById("user_" + character.id);
        var notification_badge = find_user.getElementsByClassName("notification")[0].getElementsByClassName(
            "badge")[0];
        notification_badge.style.visibility = "visible";

    } else if (type == "call") {
        if (active_call) {
            var user_active_call = document.getElementsByClassName("user_active_call")[0];
            user_active_call != undefined ? user_active_call.classList.remove("user_active_call") : null;
        }

        active_call = true;
        active_call_id = character.id;
        if (find_user != null) {
            find_user.remove();
        }
        user_list.innerHTML = html + user_list.innerHTML;
        find_user = document.getElementById("user_" + character.id);
        var notification_call_badge = find_user.getElementsByClassName("notification")[0]
            .getElementsByClassName("call_badge")[0];
        if (character.unread_message > 0) {
            var notification_badge = find_user.getElementsByClassName("notification")[0]
                .getElementsByClassName("badge")[0];
            notification_badge.style.visibility = "visible";
        }
        notification_call_badge.classList.add("user_active_call");
    } else if (type == "read_notification") {
        find_user = document.getElementById("user_" + character.id);
        var notification_badge = find_user.getElementsByClassName("notification")[0]
            .getElementsByClassName("badge")[0];
        notification_badge.style.visibility = "hidden";
    }
}

function open_mic() {
    var mics_button = document.querySelectorAll(".open_mic");
    var mic_notification = document.getElementById("foreign_user");
    mics_button.forEach(microphone_button => {
        var mic_button_logo = microphone_button.getElementsByTagName("i")[0];

        if (mic_is_open) {
            mic_is_open = false;
            microphone_button.classList.add("pressed");
            mic_button_logo.classList.remove("bxs-microphone");
            mic_button_logo.classList.add("bxs-microphone-off");
            mic_notification.getElementsByClassName("call_screen_notification")[0]
                .getElementsByClassName("badge")[0]
                .style.visibility = "visible";
            discord_mute_sound.play();
        } else {
            mic_is_open = true;

            microphone_button.classList.remove("pressed");
            mic_button_logo.classList.remove("bxs-microphone-off");
            mic_button_logo.classList.add("bxs-microphone");
            mic_notification.getElementsByClassName("call_screen_notification")[0]
                .getElementsByClassName("badge")[0]
                .style.visibility = "hidden";
            discord_unmute_sound.play();

        }

    });

    // var mic_button_logo = microphone_button.getElementsByTagName("i")[0];
    // if (mic_logo.classList.contains("bxs-microphone-off")) {
    //     microphone_button.style.backgroundColor = "#36393F";
    //     microphone_button.style.color = "#ffffff";
    //     mic_button_logo.classList.remove("bxs-microphone-off");
    //     mic_button_logo.classList.add("bxs-microphone");
    // } else {
    //     microphone_button.style.backgroundColor = "#ffffff";
    //     microphone_button.style.color = "#000000";
    //     mic_button_logo.classList.remove("bxs-microphone");
    //     mic_button_logo.classList.add("bxs-microphone-off");
    // }
}

function get_screen(character_value, type) {
    character = get_character(character_value);
    active_screen_id = character.id;
    var selected_container;
    container_list = ["call_container", "only_message_container"]
    container_list.forEach(item => {
        container = document.getElementById(item);
        container.classList.remove("display_block");
        container.classList.add("display_none");
    });

    if (type == "call" || type == "only_message") {
        message_box = document.querySelectorAll(".message_box");
        message_box.forEach(box => {
            box.innerHTML = "";
        });
        var all_messages_html = "";

        character_chat = chat_list[character.id];
        if (character_chat != null) {
            character_chat.forEach(ch => {
                old_message_line_html =
                    '<div class="message_line"><img class="characterImg profilePhoto" src="' + character.img_url +
                    '" /><div class="mbox"><strong class="character_DisplayName">' +
                    character.display_name +
                    '</strong> <span class="date_today" style="font-size:12px; text-indent: 50px; color:#72767D">' +
                    today +
                    '</span><span class="message">' + ch +
                    '</span><p></p></div></div>';
                all_messages_html = all_messages_html + old_message_line_html;

                message_box = document.querySelectorAll(".message_box");
                message_box.forEach(box => {
                    box.innerHTML = all_messages_html;
                });
            });
        }
    }

    active_call_id == character.id ? type = "call" : null;

    if (type == "call") {
        character.unread_message = 0;
        var selected_container = document.getElementById("call_container");
        selected_container.classList.remove("display_none");
        selected_container.classList.add("display_block");
    } else if (type == "only_message") {
        character.unread_message = 0;
        var selected_container = document.getElementById("only_message_container");
        selected_container.classList.remove("display_none");
        selected_container.classList.add("display_block");
    }

    var cntext = document.querySelectorAll(".character_DisplayName");
    var cndtext = document.querySelectorAll(".character_NameSurname");
    var cnimg = document.querySelectorAll(".characterImg");
    var futext = document.querySelectorAll(".foreignUserName");
    var fuimg = document.querySelectorAll(".foreignUserImg");
    cntext.forEach(cn => {
        cn.innerText = character.display_name;
    });
    cndtext.forEach(cn => {
        cn.innerText = character.name + " " + character.surname;
    });
    cnimg.forEach(cn => {
        cn.src = character.img_url;
    });

    futext.forEach(fu => {
        fu.innerText = characters[0].display_name;
    });
    fuimg.forEach(fu => {
        fu.src = characters[0].img_url;
    });
}

function speechSound(character_value, speech_sound, time = 1500) {
    discord_join_sound.play();
    call_ended = false;
    notification(character_value, "call");
    get_screen(character_value, "call");
    if (speech_sound != null) {
        startCallST = setTimeout(function () {
            active_call_sound = createSpeechSound(speech_sound);
            active_call_sound.play();
        }, time);
    }
}

function callEnded(character_value, time = 0) {
    setTimeout(function () {
        callEnded_with_control(character_value)
    }, time);
}

function callEnded_with_control(character_value) {
    character = get_character(character_value);
    if (character.id == active_call_id) {
        call_ended = true;
    }
}

function createButton(btn_innertext, btn_onclick_val, btn_style, btn_class) {
    var onclick_html = null;
    var style_html = null;
    var class_html = null;
    style_html = btn_style != undefined || btn_style != null ? 'style="' + btn_style + '"' : null;
    onclick_html = btn_onclick_val != undefined || btn_onclick_val != null ? 'onclick="' + btn_onclick_val + '"' : null;
    class_html = btn_class != undefined || btn_class != null ? 'class="' + btn_class + '"' : null;
    var buttonhtml = '<button ' + style_html + onclick_html + '>' + btn_innertext + '</button>';
    return buttonhtml;
}

function createImage(img_src, btn_onclick_val, btn_style, btn_class) {
    var onclick_html = null;
    var style_html = null;
    var class_html = null;
    style_html = btn_style != undefined || btn_style != null ? 'style="' + btn_style + '"' : 'style="width:40px;"';
    onclick_html = btn_onclick_val != undefined || btn_onclick_val != null ? 'onclick="' + btn_onclick_val + '"' : null;
    class_html = btn_class != undefined || btn_class != null ? 'class="' + btn_class + '"' : null;
    var buttonhtml = '<img src="' + img_src + '"' + style_html + onclick_html + '>';
    return buttonhtml;
}

function findSpeech(speech_name) {
    return "assets/sounds/speech_sounds/" + speech_name;
}

function rootDiv(mode) {
    var bar = document.getElementById("rootDiv");
    mode == "visible" ? bar.style.visibility = "visible" : bar.style.visibility = "hidden";
}