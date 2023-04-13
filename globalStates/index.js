import { createGlobalState } from 'react-hooks-global-state';

const { setGlobalState, useGlobalState } = createGlobalState({
    defaultCurrency: 0,
    ChatsAtivos:[],
    openChat:false,
    chatData:[],
    message:"",
    sendMessages:"",
    awaitingchats:0,
    emojiOpen:false,
    userId:"",
    userDepartaments:[],
    messages:[],
    isOpenChat:false,
    OnlineOp:[],
    OwnData:[],
    names:[],
    proximoIsLoading:false,
    usersData:[],
    isSending:false,
    isSecondModalOpen:false

})

export { setGlobalState, useGlobalState }