        // Karakter Listesi
        var random = Math.floor(Math.random() * 6);
        var random_discord_avatar = "https://cdn.discordapp.com/embed/avatars/" + random + ".png";
        var profile_file = "../assets/images/profile/";


        const characters = [];
        characters[0] = {
            id: 0,
            img_url: random_discord_avatar,
            name: "Anonymous",
            surname: "Player",
            display_name: "Player",
            unread_message: 0,
            show: false,
            closeCallST: false
        }
        characters[1] = {
            id: 1,
            img_url: profile_file + "otg.webp",
            name: "Oyun Tasarlama ve ",
            surname: "Geliştirme Kulübü",
            display_name: "OTG",
            unread_message: 0,
            show: false,
            closeCallST: false
        }
        characters[2] = {
            id: 2,
            img_url: profile_file + "hacker_team.webp",
            name: "Archieve",
            surname: "Execute",
            display_name: "Hacker Archieve",
            unread_message: 0,
            show: false,
            closeCallST: false
        }
        characters[3] = {
            id: 3,
            img_url: profile_file + "crypto_team.webp",
            name: "Crypto",
            surname: "Execute",
            display_name: "Wallet Generator",
            unread_message: 0,
            show: false,
            closeCallST: false
        }
        characters[4] = {
            id: 4,
            img_url: profile_file + "berkay.webp",
            name: "Berkay",
            surname: "Ölçe",
            display_name: "moonchain",
            unread_message: 0,
            show: false,
            closeCallST: false
        }
        characters[5] = {
            id: 5,
            img_url: profile_file + "morpheus.webp",
            name: "Laurence",
            surname: "Fishburne",
            display_name: "Morpheus",
            unread_message: 0,
            show: false,
            closeCallST: false
        }
        characters[6] = {
            id: 6,
            img_url: profile_file + "omerf.webp",
            name: "Ömer F.",
            surname: "Süphani",
            display_name: "LordUn!qu<3",
            unread_message: 0,
            show: false,
            closeCallST: false
        }
        characters[7] = {
            id: 7,
            img_url: profile_file + "yusuf.webp",
            name: "Yusuf",
            surname: "Kızılkaya",
            display_name: "Kızılejderha",
            unread_message: 0,
            show: false,
            closeCallST: false
        }
        characters[8] = {
            id: 8,
            img_url: profile_file + "mee6.webp",
            name: "music",
            surname: "bot",
            display_name: "(!)MEE6 - Bot",
            unread_message: 0,
            show: false,
            closeCallST: false
        }
        characters[9] = {
            id: 9,
            img_url: profile_file + "ahmetf.webp",
            name: "Ahmet F.",
            surname: "Demirel",
            display_name: "Valentine",
            unread_message: 0,
            show: false,
            closeCallST: false
        }
        characters[10] = {
            id: 10,
            img_url: profile_file + "ata.webp",
            name: "Ata D.",
            surname: "Oktay",
            display_name: "Beez",
            unread_message: 0,
            show: false,
            closeCallST: false
        }
        characters[11] = {
            id: 11,
            img_url: profile_file + "kardelen.webp",
            name: "Kardelen",
            surname: "Erdinç",
            display_name: "perduuus",
            unread_message: 0,
            show: false,
            closeCallST: false
        }
        characters[12] = {
            id: 12,
            img_url: profile_file + "yavuz.webp",
            name: "Yavuz B.",
            surname: "Yalçın",
            display_name: "Orbbloff",
            unread_message: 0,
            show: false,
            closeCallST: false
        }
        characters[13] = {
            id: 13,
            img_url: profile_file + "oktay.webp",
            name: "Oktay",
            surname: "Kaya",
            display_name: "Laluka",
            unread_message: 0,
            show: false,
            closeCallST: false
        }
        characters[14] = {
            id: 14,
            img_url: profile_file + "ece.webp",
            name: "Ece",
            surname: "Munar",
            display_name: "Skyla",
            unread_message: 0,
            show: false,
            closeCallST: false
        }
        characters[15] = {
            id: 15,
            img_url: profile_file + "akin.webp",
            name: "Akın",
            surname: "Yağbasan",
            display_name: "Izvae",
            unread_message: 0,
            show: false,
            closeCallST: false
        }
        characters[16] = {
            id: 16,
            img_url: profile_file + "cenk_hoca.png",
            name: "Cenk",
            surname: "Hoca",
            display_name: "CenkTyson01",
            unread_message: 0,
            show: false,
            closeCallST: false
        }
        characters[17] = {
            id: 17,
            img_url: profile_file + "can.webp",
            name: "Can",
            surname: "Sargın",
            display_name: "SARGIN",
            unread_message: 0,
            show: false,
            closeCallST: false
        }
        characters[18] = {
            id: 18,
            img_url: profile_file + "otg_us.webp",
            name: "OTG",
            surname: "US",
            display_name: "OTG Guard",
            unread_message: 0,
            show: false,
            closeCallST: false
        }
        characters[19] = {
            id: 19,
            img_url: profile_file + "bitcord_nitro.webp",
            name: "Bitcord",
            surname: "Nitro",
            display_name: "Bitcord",
            unread_message: 0,
            show: false,
            closeCallST: false
        }
        characters[20] = {
            id: 20,
            img_url: profile_file + "lux_black.webp",
            name: "Luxury",
            surname: "Black",
            display_name: "LUX 0",
            unread_message: 0,
            show: false,
            closeCallST: false
        }
        characters[21] = {
            id: 21,
            img_url: profile_file + "lux_white.webp",
            name: "Luxury",
            surname: "White",
            display_name: "LUX 1",
            unread_message: 0,
            show: false,
            closeCallST: false
        }
        characters[22] = {
            id: 22,
            img_url: profile_file + "canilbey.webp",
            name: "Can İ.",
            surname: "Sezgin",
            display_name: "canilbey",
            unread_message: 0,
            show: false,
            closeCallST: false
        }
        characters[23] = {
            id: 23,
            img_url: profile_file + "fbi.webp",
            name: "Federal B.",
            surname: "Investigation",
            display_name: "FBI",
            unread_message: 0,
            show: false,
            closeCallST: false
        }
        characters[24] = {
            id: 24,
            img_url: profile_file + "fug_reis.png",
            name: "Fug",
            surname: "Reis",
            display_name: "CCC FUG REIS CCC",
            unread_message: 0,
            show: false,
            closeCallST: false
        }

        function get_character(name_or_id) {
            switch (name_or_id) {
                case "user":
                    return_val = characters[0];
                    break;
                case "otg":
                    return_val = characters[1];
                    break;
                case "hacker_team":
                    return_val = characters[2];
                    break;
                case "crypto_team":
                    return_val = characters[3];
                    break;
                case "berkay":
                    return_val = characters[4];
                    break;
                case "morpheus":
                    return_val = characters[5];
                    break;
                case "omerf":
                    return_val = characters[6];
                    break;
                case "yusuf":
                    return_val = characters[7];
                    break;
                case "mee6":
                    return_val = characters[8];
                    break;
                case "ahmet":
                    return_val = characters[9];
                    break;
                case "ata":
                    return_val = characters[10];
                    break;
                case "kardelen":
                    return_val = characters[11];
                    break;
                case "yavuz":
                    return_val = characters[12];
                    break;
                case "oktay":
                    return_val = characters[13];
                    break;
                case "ece":
                    return_val = characters[14];
                    break;
                case "akin":
                    return_val = characters[15];
                    break;
                case "cenk_hoca":
                    return_val = characters[16];
                    break;
                case "can":
                    return_val = characters[17];
                    break;
                case "otg_guard":
                    return_val = characters[18];
                    break;
                case "bitcord_nitro":
                    return_val = characters[19];
                    break;
                case "lux_black":
                    return_val = characters[20];
                    break;
                case "lux_white":
                    return_val = characters[21];
                    break;
                case "can_ilbey":
                    return_val = characters[22];
                    break;
                case "fbi":
                    return_val = characters[23];
                    break;
                case "fug_reis":
                    return_val = characters[24];
                    break;
                default:
                    return_val = null;
                    break;
            }
            return_val == null ? return_val = characters[name_or_id] : null;
            return_val == null ? alert(name_or_id + " adlı kullanıcı bulunamadı, characters.js dosyasında bir hata olabilir.") : null;
            return return_val;
        }

        var chat_list = []
        var message_timeout_list = []
        characters.forEach(ch => {
            chat_list[ch.id] = [];
            message_timeout_list[ch.id] = [];
        });