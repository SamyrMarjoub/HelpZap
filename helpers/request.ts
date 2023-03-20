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
            'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001',
            Authorization: `Basic ${localStorage.getItem('token')}`,
        },
        data: form
    };

    axios.request(options).then(function (response) {
        ;
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

export async function getListChatsPendente(departaments) {

    const options = {
        method: 'GET',
        url: process.env.BASE_URL + "/restapi/chats",
        params: { departament_ids: '8', status_ids: '[0]' },
        headers: {
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

export async function getListChatActive(departaments) {

    const options = {
        method: 'GET',
        url: process.env.BASE_URL + '/restapi/chats',
        params: { departament_ids: departaments, status: '1', include_messages: 'true' },
        headers: {
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

export async function getChatMessages(e: any) {

    const form = new FormData();
    form.append("", "");

    const options = {
        method: 'GET',
        url: process.env.BASE_URL + '/restapi/fetchchatmessages',
        params: { chat_id: e, extract_media: 'true' },
        headers: {
            'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001',
            Authorization: `Basic ${localStorage.getItem('token')}`,
        },
        data: form
    };
    const response = await axios.request(options)
    if (response.data.error) {
        return { data: { error: true } }
    } else {
        //
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

    const options = {
        method: 'GET',
        url: process.env.BASE_URL + '/restapi/fetchchat',
        params: { chat_id: chatid },
        headers: {

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
        url: process.env.SECOND_BASE_URL + '/helpzap/upload.php',
        headers: {

            'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001',
            Authorization: `basic ${process.env.AUTH}`
        },
        data: form
    };
    const response = await axios.request(options)

    if (response.data.error) {
        return { data: { error: true } }
    } else {
        return `[img]${process.env.SECOND_BASE_URL}/helpzap/files/${response.data.file}[/img]`
    }

}

export async function getFile(fileId: any, meta: boolean) {

    const options: object = {
        method: 'GET',
        url: process.env.BASE_URL + '/restapi/file/' + fileId,
        params: { meta: meta },
        responseType: 'blob',
        headers: {

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
        url: `${process.env.BASE_URL}/restapi/onlineusers`,
        params: {
            include_offline: 'false',
            exclude_invisible: 'true',
            include_disabled: 'false',
            include_user: 'true'
        },
        headers: {
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

export async function Logout() {
    const options = {
        method: 'GET',
        url: `${process.env.BSE_URL}/restapi/setonlinestatus/${localStorage.getItem("userId")}/0`,
        headers: {
            Authorization: `Basic ${localStorage.getItem('token')}`
        }
    };
}

export async function addMsgSystem(chat_id, status, opName) {
    const form = new FormData();
    form.append("chat_id", chat_id);
    form.append("sender", "system");

    const options = {
        method: 'POST',
        url: process.env.BASE_URL + "/restapi/addmsgadmin",
        headers: {
            'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001',
            Authorization: `Basic ${localStorage.getItem('token')}`,
        },
        data: form
    };

    axios.request(options).then(function (response) {
        ;
    }).catch(function (error) {
        console.error(error);
    });
}

export async function getOwnData() {
    const options = {
        method: 'GET',
        url: `${process.env.BASE_URL}/index.php/restapi/user/${localStorage.getItem("userId")}`,
        headers: {
            'Content-Type': 'application/json',
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

export async function getDepartaments() {
    const options = {
        method: 'GET',
        url: `${process.env.BASE_URL}/index.php/restapi/departments`,
        headers: {
            'Content-Type': 'application/json',
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

export async function atribuirChatOp(id, uid) {
    const options = {
        method: 'PUT',
        url: `${process.env.BASE_URL}/restapi/chat/${id}`,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${localStorage.getItem('token')}`
        },
        data: { user_id: uid }
    };

    const response = await axios.request(options)
    if (response.data.error) {
        return { data: { error: true } }
    } else {
        return response
    }
}