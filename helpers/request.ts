const utf8 = require("utf8")
import axios from "axios";

export async function loginRequest(username: string, password: string) {


    const form = new FormData();
    form.append("username", username);
    form.append("password", password);
    form.append("generate_token", "true");
    form.append("device", "unknown");

    const options = {
        method: 'POST',
        url: process.env.BASE_URL + "/restapi/login",
        headers: {
            'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001'
        },
        data: form
    };


    const response = await axios.request(options)
    if (response.data.error) {
        return { data: { error: true } }
    } else {
        const enconded = Buffer.from(utf8.encode(username + ":" + password)).toString('base64')
        localStorage.setItem('token', enconded)
        localStorage.setItem("userId", response.data.user_id)

        const third = {
            method: 'GET',
            url: process.env.BASE_URL + `/restapi/updatelastactivity/${localStorage.getItem("userId")}`,
            headers: {
                cookie: 'PHPSESSID=vtcu91khfc7psb4fiqm1cvb595; lhc_vid=05a94d5ffee7232c1f83',
                Authorization: 'Basic ZGV2LnNhbXlyOlNhbWlyMTIz'
            }
        };

        const res = await axios.request(third)

        const data = {
            method: 'GET',
            url: process.env.BASE_URL + `/restapi/setonlinestatus/${localStorage.getItem("userId")}/1`,
            headers: { Authorization: 'Basic ZGV2LnNhbXlyOlNhbWlyMTIz' }
        };

        const isOnlineTrue = await axios.request(data)
        console.log("ID" + localStorage.getItem("userId") + isOnlineTrue)
        return response
    }

}

export async function sendMessagesBack(msg: any, chatId: any) {

    const form = new FormData();
    form.append("chat_id", chatId);
    form.append("msg", msg);
    form.append("sender", "operator");

    const options = {
        method: 'POST',
        url: process.env.BASE_URL + "/restapi/addmsgadmin",
        headers: {
            cookie: 'PHPSESSID=392e7qtjmuf7i711fjn6j70cc8; lhc_vid=05a94d5ffee7232c1f83',
            'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001',
            Authorization: `Basic ${localStorage.getItem('token')}`,
        },
        data: form
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });
}

export async function getNumberChatPendente(departaments) {

    try {
        const options = {
            method: 'GET',
            url: process.env.BASE_URL + '/restapi/chatscount',
            params: { departament_ids: departaments, status_ids: [0] },
            headers: {
                cookie: 'PHPSESSID=l3rs5ilid0ntaab94lrfvh48ft; lhc_vid=05a94d5ffee7232c1f83',
                'Content-Type': 'application/json',
                Authorization: `Basic ${localStorage.getItem('token')}`,
            }
        };

        const response = await axios.request(options)
        if (response.data.error) {
            return { data: { error: true } }
        } else {
            return response
        }

    } catch (error) {
        console.error(error)
    }

}

export async function setuserOnline() {
    const options = {
        method: 'GET',
        url: process.env.BASE_URL + `/restapi/updatelastactivity/${localStorage.getItem("userId")}`,
        headers: {
            cookie: 'PHPSESSID=vtcu91khfc7psb4fiqm1cvb595; lhc_vid=05a94d5ffee7232c1f83',
            Authorization: 'Basic ZGV2LnNhbXlyOlNhbWlyMTIz'
        }
    };

    const response = await axios.request(options)
    if (response.data.error) {
        return { data: { error: true } }
    } else {
        return response
    }

}

export async function getListChatsPendente(departaments) {

    const options = {
        method: 'GET',
        url: process.env.BASE_URL + "/restapi/chats",
        params: { departament_ids: departaments, status_ids: '[0]' },
        headers: {
            cookie: 'PHPSESSID=vtcu91khfc7psb4fiqm1cvb595; lhc_vid=05a94d5ffee7232c1f83',
            Authorization: 'Basic ZGV2LnNhbXlyOlNhbWlyMTIz'
        }
    };


    const response = await axios.request(options)
    if (response.data.error) {
        return { data: { error: true } }
    } else {
        return response
    }
}

export async function getListChatActive(departaments) {

    const form = new FormData();
    form.append("chat_id", "6608");
    form.append("status", "2");

    const options = {
        method: 'GET',
        url: process.env.BASE_URL + '/restapi/chats',
        params: { departament_ids: departaments, status_ids: '1', include_messages: 'true' },
        headers: {
            cookie: 'PHPSESSID=vtcu91khfc7psb4fiqm1cvb595; lhc_vid=05a94d5ffee7232c1f83',
            Authorization: 'Basic ZGV2LnNhbXlyOlNhbWlyMTIz'
        }
    };


    const response = await axios.request(options)
    if (response.data.error) {
        return { data: { error: true } }
    } else {
        return response
    }
}

export async function getChatMessages(e: any) {

    const form = new FormData();
    form.append("", "");

    const options = {
        method: 'GET',
        url: process.env.BASE_URL + '/restapi/fetchchatmessages',
        params: { chat_id: e, extract_media: 'true' },
        headers: {
            cookie: 'PHPSESSID=vtcu91khfc7psb4fiqm1cvb595; lhc_vid=05a94d5ffee7232c1f83',
            'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001',
            Authorization: 'Basic ZGV2LnNhbXlyOlNhbWlyMTIz'
        },
        data: form
    };
    const response = await axios.request(options)
    if (response.data.error) {
        return { data: { error: true } }
    } else {
        // console.log(response.data.result.messages)
        return response
    }
}

export async function setChatStatus(chatid: any, status: any) {

    const form = new FormData();
    form.append("chat_id", chatid);
    form.append("status", status);

    const options = {
        method: 'POST',
        url: process.env.BASE_URL + '/restapi/setchatstatus',
        headers: {
            cookie: 'PHPSESSID=l3rs5ilid0ntaab94lrfvh48ft; lhc_vid=05a94d5ffee7232c1f83',
            'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001',
            Authorization: `Basic ${localStorage.getItem('token')}`,
        },
        data: form
    };

    const response = await axios.request(options)
    if (response.data.error) {
        return { data: { error: true } }
    } else {
        return response
    }
}

export async function getchatInfo(chatid: any) {

    // const options = {
    //     method: 'GET',
    //     url: process.env.BASE_URL + '/restapi/fetchchat',
    //     params: {chat_id: chatid},
    //     headers: {
    //       cookie: 'PHPSESSID=vtcu91khfc7psb4fiqm1cvb595; lhc_vid=05a94d5ffee7232c1f83',
    //       Authorization: `Basic ${localStorage.getItem('token')}`,
    //     }
    //   };

    const options = {
        method: 'GET',
        url: process.env.BASE_URL + '/restapi/fetchchat',
        params: { chat_id: chatid },
        headers: {
            cookie: 'PHPSESSID=vtcu91khfc7psb4fiqm1cvb595; lhc_vid=05a94d5ffee7232c1f83',
            Authorization: `Basic ${localStorage.getItem('token')}`,
        }
    };
    const response = await axios.request(options)
    if (response.data.error) {
        return { data: { error: true } }
    } else {
        return response
    }
}

export async function uploadFile(file: any) {

    const form = new FormData();
    form.append("arquivo", file);
    
    const options = {
      method: 'POST',
      url: 'https://chat.alcifmais.com.br/helpzap/upload.php',
      headers: {
        cookie: 'lhc_vid=784616ba036b5ebc3a5c',
        'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001',
        Authorization: 'basic VNHN4gecypgQr3Vj8voYkqbWutNlXDQuJVxdw4gqcdMnOITYWI8yfNs1HJRC'
      },
      data: form
    };
    const response = await axios.request(options)

    if (response.data.error) {
        return { data: { error: true } }
    } else {
        return `[img]https://chat.alcifmais.com.br/helpzap/files/${response.data.file}[/img]`
    }

}

export async function getFile(fileId: any, meta: boolean) {

    const options: object = {
        method: 'GET',
        url: process.env.BASE_URL + '/restapi/file/' + fileId,
        params: { meta: meta },
        responseType: 'blob',
        headers: {
            cookie: 'PHPSESSID=vtcu91khfc7psb4fiqm1cvb595; lhc_vid=05a94d5ffee7232c1f83',
            'Content-Type': 'application/json',
            Authorization: `Basic ${localStorage.getItem('token')}`,
        }
    };


    const response = await axios.request(options)
    if (response.data.error) {
        return { data: { error: true } }
    } else {
        return response
    }

}

export async function getUserDepartaments(id: string) {

    const options = {
        method: 'POST',
        url: `${process.env.BASE_URL}/restapi/user_departments/${id}`,
        headers: {
            cookie: 'PHPSESSID=vtcu91khfc7psb4fiqm1cvb595; lhc_vid=05a94d5ffee7232c1f83',
            Authorization: `Basic ${localStorage.getItem('token')}`
        }
    };

    const response = await axios.request(options)
    if (response.data.error) {
        return { data: { error: true } }
    } else {
        return response
    }

}

export async function transferirChat(chat_id, uid, dep_id) {

    const options = {
        method: 'PUT',
        url: `${process.env.BASE_URL}/restapi/chat/${chat_id}`,
        headers: {
            cookie: 'PHPSESSID=vtcu91khfc7psb4fiqm1cvb595; lhc_vid=05a94d5ffee7232c1f83',
            'Content-Type': 'application/json',
            Authorization: `Basic ${localStorage.getItem('token')}`
        },
        data: { user_id: uid, dep_id: dep_id }
    };

    const response = await axios.request(options)
    if (response.data.error) {
        return { data: { error: true } }
    } else {
        return response
    }

}

export async function getOnlineOperators() {
    const options = {
        method: 'GET',
        url: 'https://chat.alcifmais.com.br/index.php/restapi/onlineusers',
        params: {
            include_offline: 'false',
            exclude_invisible: 'true',
            include_disabled: 'false',
            include_user: 'true'
        },
        headers: { Authorization: 'Basic ZGV2LnNhbXlyOlNhbWlyMTIz' }
    };

    const response = await axios.request(options)
    if (response.data.error) {
        return { data: { error: true } }
    } else {
        return response
    }


}

export async function Logout() {
    const options = {
        method: 'GET',
        url: `${process.env.BSE_URL}/restapi/setonlinestatus/${localStorage.getItem("userId")}/0`,
        headers: { Authorization: 'Basic ZGV2LnNhbXlyOlNhbWlyMTIz' }
    };
}

export async function addMsgSystem(chat_id, status, opName) {
    const form = new FormData();
    form.append("chat_id", chat_id);
    form.append("msg", status === "0" ? "Chat transferido para " + opName : status === "2" ? "Chat encerrado." : `${opName} aceitou o Bate-Papo!!`);
    form.append("sender", "system");

    const options = {
        method: 'POST',
        url: process.env.BASE_URL + "/restapi/addmsgadmin",
        headers: {
            cookie: 'PHPSESSID=392e7qtjmuf7i711fjn6j70cc8; lhc_vid=05a94d5ffee7232c1f83',
            'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001',
            Authorization: `Basic ${localStorage.getItem('token')}`,
        },
        data: form
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });
}

export async function getOwnData() {
    const options = {
        method: 'GET',
        url: `https://chat.alcifmais.com.br/index.php/restapi/user/${localStorage.getItem("userId")}`,
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Basic ZGV2LnNhbXlyOlNhbWlyMTIz'
        }
    };
    const response = await axios.request(options)
    if (response.data.error) {
        return { data: { error: true } }
    } else {
        return response
    }
}

export async function getDepartaments() {
    const options = {
        method: 'GET',
        url: 'https://chat.alcifmais.com.br/index.php/restapi/departments',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Basic ZGV2LnNhbXlyOlNhbWlyMTIz'
        }
    };

    const response = await axios.request(options)
    if (response.data.error) {
        return { data: { error: true } }
    } else {
        return response
    }
}