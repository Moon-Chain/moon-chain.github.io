        // Karakter Listesi
        var random = Math.floor(Math.random() * 6);
        var random_discord_avatar = "https://cdn.discordapp.com/embed/avatars/" + random + ".png";
        var profile_file = "assets/images/profile/";

        const characters = [];
        characters[0] = {
            id: 0,
            img_url: random_discord_avatar,
            name: "Anonim",
            surname: "",
            display_name: "Anonymous",
            unread_message: 0,
            show: false,
            closeCallST: false
        }
        characters[1] = {
            id: 1,
            img_url: profile_file + "profile_berkay.webp",
            name: "Berkay",
            surname: "Ölçe",
            display_name: "moonchain",
            unread_message: 0,
            show: false,
            closeCallST: false
        }
        characters[2] = {
            id: 2,
            img_url: profile_file + "tugay.webp",
            name: "Tugay",
            surname: "Demir",
            display_name: "Tugayy",
            unread_message: 0,
            show: false,
            closeCallST: false
        }
        characters[3] = {
            id: 3,
            img_url: profile_file + "umut.webp",
            name: "Umut",
            surname: "Tandoğan",
            display_name: "Umutt",
            unread_message: 0,
            show: false,
            closeCallST: false
        }
        characters[4] = {
            id: 4,
            img_url: profile_file + "taha.webp",
            name: "Berk T.",
            surname: "Çetin",
            display_name: "tb",
            unread_message: 0,
            show: false,
            closeCallST: false
        }
        characters[5] = {
            id: 5,
            img_url: profile_file + "soner.webp",
            name: "Soner",
            surname: "Ay",
            display_name: "cash0nline",
            unread_message: 0,
            show: false,
            closeCallST: false
        }
        characters[6] = {
            id: 6,
            img_url: profile_file + "cenk_hoca.png",
            name: "Cenk",
            surname: "Hoca",
            display_name: "cenkTyson01",
            unread_message: 0,
            show: false,
            closeCallST: false
        }
        characters[7] = {
            id: 7,
            img_url: profile_file + "fug_reis.png",
            name: "Fug",
            surname: "Reis",
            display_name: "CCC FUGREIS CCC",
            unread_message: 0,
            show: false,
            closeCallST: false
        }

        function get_character(name_or_id) {
            switch (name_or_id) {
                case "user":
                    return_val = characters[0];
                    break;
                case "berkay":
                    return_val = characters[1];
                    break;
                case "tugay":
                    return_val = characters[2];
                    break;
                case "umut":
                    return_val = characters[3];
                    break;
                case "taha":
                    return_val = characters[4];
                    break;
                case "soner":
                    return_val = characters[5];
                    break;
                case "cenk_hoca":
                    return_val = characters[6];
                    break;
                case "fug_reis":
                    return_val = characters[7];
                    break;
                default:
                    return_val = null;
                    break;
            }
            return_val == null ? return_val = characters[name_or_id] : null;
            return return_val;
        }

        var chat_list = []
        characters.forEach(ch => {
            chat_list[ch.id] = [];
        });