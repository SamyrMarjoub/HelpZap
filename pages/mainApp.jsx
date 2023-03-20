import React, { useState, useEffect, useMemo } from 'react'
import {
    Box, Flex, Input, Text,
    Button, Icon, Stack,
    Textarea,
    Spinner, useToast, useColorMode, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure, FormControl, FormLabel, IconButton,

} from '@chakra-ui/react'
import { BsFillEmojiSmileFill, BsFillChatDotsFill, BsFillGearFill } from 'react-icons/bs'
import { AiOutlinePaperClip, AiOutlineClose } from 'react-icons/ai'
import { HiUser } from 'react-icons/hi'
import { MdSend, MdModeEdit, MdDelete } from 'react-icons/md'
import { FcDocument } from 'react-icons/fc'
import {
    getListChatActive,
    getListChatsPendente, getChatMessages,
    sendMessagesBack, setChatStatus, getchatInfo, uploadFile,
    getUserDepartaments, setuserOnline, Logout,
    getOwnData,
    atribuirChatOp
} from '@/helpers/request'
import dayjs from 'dayjs'
import locale from 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useGlobalState, setGlobalState } from "@/globalStates"
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { FaSun, FaMoon } from 'react-icons/fa'
import axios from 'axios'
import Head from 'next/head'
//SideBarComponents

import Acorddions from '@/components/sidebar/Accordions'
import NoChats from '@/components/sidebar/NoChats'
import Chats from '@/components/sidebar/Chat'

//Main Components
import NoBodyComponent from '@/components/mainapp/noBodyComponent'
import HeaderComponent from '@/components/mainapp/HeaderComponent'
import BodyComponent from '@/components/mainapp/BodyComponent'

//Exportação default do arquivo principal
export default function MainApp(datas) {

    const [load, setload] = useState(false)
    const router = useRouter()
    const [id, setId] = useGlobalState('defaultCurrency')
    const [openChats, setOpenChats] = useGlobalState("openChat")
    const [departaments, setDepartaments] = useGlobalState("userDepartaments")
    const [ownData, setOwnData] = useGlobalState("OwnData")
    const { toggleColorMode, colorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()
    let objs = datas.data
    dayjs.extend(relativeTime)
    dayjs.locale(locale)

    function setOnlineUser() {
        setuserOnline().then(response => {
        })
    }

    function getUserDepartament() {
        getUserDepartaments(localStorage.getItem("userId")).then(response => {
            //
            setGlobalState("userDepartaments", response.data.result.map(obj => obj.id))

        })
    }

    function Logouts() {
        Logout().then(() => {

        })
    }

    function getOwnDatabyId() {

        getOwnData().then((res) => {
            setGlobalState("OwnData", res.data.result)
            //
        }).catch((err) => {
            console.log(err)
        })
    }

    //UseEffect que verifica se o úsuario está logado ou não
    useEffect(() => {

        if (navigator.onLine) {
            if (localStorage.getItem('token')) {
                setload(true)
                getUserDepartament()
                return
            } else {
                router.push('/login')

            }
        } else {
            router.push("/noNetwork")
        }

    }, [])

    //UseEffect verifica se há conexão com internet
    useEffect(() => {
        const time = setInterval(() => {
            if (navigator.onLine) {
                return
            } else {
                router.push("/noNetwork")
            }
        }, 5000)
        return () => {
            clearInterval(time);
        };

    }, [])

    //UseEffct que mantém o usuario com status online
    useEffect(() => {

        const time = setInterval(() => {
            setOnlineUser()
        }, 30000)

        return () => {
            clearInterval(time);
        };

    }, [])

    //UseEffect que pega seus proprios dados na api
    useEffect(() => {
        getOwnDatabyId()
    }, [])

    //Principais Componentes renderizados

    function SideBar() {

        const [usersData, setUsersData] = useGlobalState("usersData")
        const [getChatsActive, setChatsActive] = useGlobalState("ChatsAtivos")
        const [chatData, setChatData] = useGlobalState("chatData")
        const [proximoIsLoading, setProximoIsLoading] = useGlobalState("proximoIsLoading")

        function buttonClick() {
            if (usersData.length === 0) {
                return
            } else {
                setGlobalState("proximoIsLoading", true)
                getchatInfo(usersData[0].id).then(async (res) => {

                    if (res.data.chat.user_id === 0) {
                        await setChatStatus(usersData[0].id, 1)
                        await atribuirChatOp(usersData[0].id, ownData.id)
                        setGlobalState("proximoIsLoading", false)
                        getChatListPendente("No proximo")
                        getChatActive()
                    } else {
                        return

                    }

                }).finally(() => {
                    setTimeout(() => {
                        setGlobalState("proximoIsLoading", false)

                    }, 1000)
                })

            }

        }

        function getChatListPendente() {
            const response = getListChatsPendente(departaments).then((response) => {
                setGlobalState("usersData", response.data.list.slice())
                if (response.data.list.length > 0 && document.hidden) {
                    notificacao("Há pessoas na fila de espera")
                }
            }).catch((err) => {
                console.error(err)
            })
        }
        async function notificacao(mensagem) {
            let permission = await Notification.requestPermission();
            const greeting = new Notification('HelpZap', {
                body: mensagem,
                // icon: "../../public/helpLogo.jpg"
            });
        }
        function getChatActive() {
            getListChatActive().then((response) => {
                //
                getChatsActive.sort((x, y) => {
                    return x.time - y.time
                })
                const totalmsg = localStorage.getItem("visitormsgLength") ? localStorage.getItem("visitormsgLength") : 0
                const map = response.data.list.slice()
                const filtered = map.filter(objs => objs.user_id === Number(localStorage.getItem("userId")))
                const user_ids = filtered.map(obj => obj.messages)
                const ids = user_ids.map(obj => obj.map(obj => obj.user_id))
                const zeros = ids.flatMap(arr => arr).filter(numero => numero === 0);
                if (totalmsg < zeros.length && document.hidden) {
                    notificacao("Chegou uma nova mensagem!")
                } else if (totalmsg < zeros.length && !document.hidden) {
                    const audio = document.createElement("audio")
                    audio.src = "/notification.mp3"
                    audio.play()
                }

                localStorage.setItem("visitormsgLength", zeros.length)
                setGlobalState("ChatsAtivos", response.data.list.filter(e => String(e.user_id) === localStorage.getItem("userId"))
                )
            }).catch((err) => {
                console.error(err)
            })

        }


        function getChatData() {
            const response = getchatInfo(id).then((response) => {
                if (response.data.chat) {
                    setGlobalState("chatData", response.data.chat)
                    localStorage.setItem('id', response.data.chat.id)
                } else {
                    return
                }
                //

            }).catch((err) => {
                console.error(err)
            })
        }

        useEffect(() => {
            if (id !== 0) {
                getChatData()
            } else {

            }
        }, [id])

        useEffect(() => {
            getChatListPendente()
            getChatActive()
        }, [])

        // useEffect(()=>{
        //     if(getChatsActive.length === 0){
        //         setGlobalState("openChat", 0)
        //     }
        // }, [])
        useEffect(() => {

            const time = setInterval(() => {
                getChatListPendente()
                getChatActive()

            }, 5000);

            return () => {
                clearInterval(time);
            };

        }, []);



        return (
            <Box overflow={'hidden'} w={'300px'} h='100%' bg={colorMode === "light" ? "blue.400" : "#121212"}>
                <Flex flexDir={'column'} w='full' alignItems={'center'} h='full' >

                    {/* Header sidebar */}
                    <Box display={'flex'} w='full' h='60px' bg={colorMode === "light" ? "blue.600" : "#121212"}>
                        <Box p={'10px'} display={'flex'} alignItems='center' flex={'1'}>
                            <Text fontSize={'25px'} color={'white'} onClick={() => router.push("/")} cursor='pointer'>Helpzap</Text>
                        </Box>
                        <Box p={'10px'} display={'flex'} justifyContent='flex-end' alignItems='center' flex={'1'}>
                            <Icon cursor={'pointer'} onClick={onOpen} fontSize={'25px'} color={'white'} as={BsFillGearFill} />
                        </Box>

                    </Box>

                    {/* Aguardar/Pessoas */}
                    <Box w='full' display={'flex'} h='160px' bg={colorMode === "light" ? "blue.500" : "#1E1E1E"}>
                        <Box flex={1}>
                            <Flex w='full' h='full' flexDirection={'column'}
                                justifyContent='center' alignItems={'center'} >
                                <Icon color={'whiteAlpha.800'} fontSize={'50px'} as={HiUser} />
                                <Text color={'white'} fontWeight='bold' fontSize={'20px'}>{usersData.length} Pessoas</Text>
                                <Text color={'whiteAlpha.800'} fontSize={'16px'}>Aguardando</Text>

                            </Flex>
                        </Box>
                        <Box flex={1} display='flex' justifyContent={'center'} alignItems='center'>
                            <Stack w='full' justifyContent={'center'} direction='column' spacing={4}>

                                <Button id='active' isLoading={proximoIsLoading} onClick={() => [setOpenChats(2), buttonClick()]} w='85%' h='30px'>Proximo</Button>

                            </Stack>
                        </Box>
                    </Box>

                    {/* Lista de chats e accordions */}
                    <Flex overflow={'auto'} w='full' h='100%' alignItems={openChats === 0 ? "center" : ""} flexDirection={'column'}
                        justifyContent={openChats === 0 ? "center" : "space-between"}
                        bg={colorMode === "light" ? "blue.600" : "#121212"}>

                        {/* Lista de chats */}
                        {openChats !== 0 ? <Chats /> : <NoChats />}
                        {/* Accordions */}
                        {openChats !== 0 && id !== 0 ? <Acorddions chatdata={chatData} /> : <></>}



                    </Flex>
                </Flex>
            </Box>
        )
    }

    function MainDiv() {

        const [messages, setMessages] = useGlobalState("messages")
        const [sendMessages, setSendMessage] = useState("")
        const [emojiOpen, setEmojiOpen] = useGlobalState("emojiOpen")
        const [file, setFile] = useState(null)
        const [previewUrl, setPreviewUrl] = useState('')
        const [images, setGetImages] = useState("")
        const { isOpen, onOpen, onClose } = useDisclosure()
        const [isOpenAddMsg, setIsOpenAddMsg] = useState(false)
        const [addfastMessage, setaddfastMessage] = useState("")
        const [addTitulo, setTitulo] = useState("")
        const [updateTitulo, setUpdatetitulo] = useState("")
        const [updateMessage, setUpdatemessage] = useState("")
        const [msgs, setMsgs] = useState(datas.data)
        const [isUpdateOpen, setIsUpdateOpen] = useState(false)
        const [updateId, setUpdateId] = useState("")
        const [isaddOpen, setIsaddopen] = useState(false)
        const [messagedata, setmessageData] = useState({ id: "", titulo: "", msg: "" })
        const [isFilterOpen, setIsFilterOpen] = useState(false)
        const [msgFiltered, setmsgFiltered] = useState("")
        const [getChatsActive, setGetChatsActive] = useGlobalState("ChatsAtivos")
        // const [stream, setStream] = useState(null);
        // const [recorder, setRecorder] = useState(null);
        // const [isRecording, setIsRecording] = useState(false);
        // const [audioURL, setAudioURL] = useState(null);

        function scroll() {
            const div = document.getElementById('container-scroller')
            if (div) {
                div.scrollTop = div.scrollHeight;
                // alert('ok')
            }
        }


        // useEffect(() => {

        //     const time = setInterval(() => {
        //         if (getChatsActive[0]?.messages?.length !== 0 && localStorage.getItem(`Unred_${id}`) !== getChatsActive[0]?.messages?.length && getChatsActive.length) {
        //             notificacao()
        //         } else return
        //     }, 1500)

        //     return () => {
        //         clearInterval(time);
        //     };

        // }, [])
        // function getMsgs(){
        //     if(id !== 0){

        //     }
        // }


        //função para abrir chat e pegar as mensagens e exibi-las.
        function chatClick() {

            if (id !== 0) {

                const response = getChatMessages(id).then((response) => {
                    let toScroll = false;
                    if (response && JSON.stringify(messages) !== JSON.stringify(response.data.result.messages.slice())) toScroll = true
                    setGlobalState("openChat", true)
                    setGlobalState("messages", response?.data.result.messages.slice())

                    if (toScroll)
                        scroll()

                }).catch((err) => {
                    console.error(err)
                })


            } else {
                return
            }
        }

        //função para mandar mensagem ao chat
        function pasteImg() {
            var items = event.clipboardData.items;
            for (var i = 0; i < items.length; i++) {
                if (items[i].type.indexOf('image') !== -1) {
                    var blob = items[i].getAsFile();
                    var url = URL.createObjectURL(blob);

                    // Insere a URL da imagem no input text
                    const input = document.getElementById('textarea')
                    var file = new File([blob], 'imagem.png', { type: 'image/png' });
                    setFile(file)
                }
            }
        }

        function sendMessageFunction(e) {

            if (e?.key === 'Enter' || e?.type === 'click') {
                if (sendMessages === "" && file === null) {
                    toast({
                        title: 'Erro',
                        description: "Adicione ao menos 1 caractere!",
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                        position: 'top'
                    })
                } else {

                    const operatorName = ownData.name
                    const msgformated = `*${operatorName}*:\n\n ${sendMessages}`
                    if (file) uploadFiles() 
                
                    e.preventDefault()
                    sendMessagesBack(file ? "" : msgformated, id).then((response) => {
                        setTimeout(() => {
                            chatClick()
                            setTimeout(() => {
                                scroll()
                            }, 200)
                        }, 500)
                        setSendMessage('')

                    }).catch((err) => {
                        console.error(err)
                    })
                }

            }
        }

        function FileReaders() {
            if (file) {
                const reader = new FileReader()
                //
                reader.readAsDataURL(file)
                reader.onload = () => {
                    const string = String(reader.result)
                    setPreviewUrl(string)
                }
            } else {
                return
            }
        }

        const addEmoji = (e) => {
            let sym = e.unified.split("-");
            let codesArray = [];
            sym.forEach((el) => codesArray.push("0x" + el));
            let emoji = String.fromCodePoint(...codesArray);
            setSendMessage(sendMessages + emoji);
        };

        function uploadFiles() {

            uploadFile(file).then((response) => {

                setGetImages(response)
                //

            }).catch((error) => {
                toast({
                    title: 'Erro',
                    description: "Erroz!!",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                    position: 'top'
                })
                console.log(error)
            })


        }

        async function getFastmsgs() {
            const id = localStorage.getItem("userId")
            const res = await axios.get(`/api/getMsg/${id}`)
            // console.log("aqui", res.data)
            setMsgs(res.data)
            objs = res.data

            //
        }

        async function addFastmsgs() {
            const userId = localStorage.getItem("userId")
            if (addfastMessage.length === 0 || addTitulo === 0) {
                toast({
                    title: 'Erro!!',
                    description: "Campos não podem estar vazios.",
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                    position: 'top'
                })
            } else {
                const res = await axios.post(`/api/postMsg`, { msg: addfastMessage, titulo: addTitulo, userId: userId })
                getFastmsgs()
                setIsOpenAddMsg(false)

            }
        }

        async function deleteFastmsgs(id) {
            const res = await axios.delete(`/api/deleteMsg/${id}`)
            getFastmsgs()
        }

        async function updateFastmsgs() {
            const res = await axios.put(`/api/updateMsg/${updateId}`, { msg: updateMessage, titulo: updateTitulo })
            getFastmsgs()
            setIsOpenAddMsg(false)
        }

        function filtermsgs() {
            const filtered = objs.filter(titulo =>
                Object.values(titulo).some(valor =>
                    typeof valor === "string" && valor.toLocaleLowerCase().includes(msgFiltered.toLocaleLowerCase())
                )
            );
            setMsgs(filtered)
        }


        // useEffect(() => {
        //     Solicita acesso ao microfone
        //     navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        //       setStream(stream);
        //       setRecorder(new MediaRecorder(stream));
        //     }).catch((error) => {
        //       console.log(error);
        //     });
        //   }, []);

        //   const startRecording = () => {
        //     if (recorder) {
        //       recorder.start();
        //       setIsRecording(true);
        //     }
        //   };

        //   const stopRecording = () => {
        //     if (recorder) {
        //       recorder.stop();
        //       setIsRecording(false);
        //     }
        //   };

        //   useEffect(() => {
        //     if (recorder) {
        //       recorder.addEventListener('dataavailable', (event) => {
        //         setAudioURL(URL.createObjectURL(event.data));
        //        
        //       });
        //     }
        //   }, [recorder]);



        useEffect(() => {
            if (msgFiltered === 0) {
                setMsgs(objs)
            } else filtermsgs()
        }, [msgFiltered])

        useEffect(() => {
            if (!isFilterOpen) {
                setMsgs(objs)
            }
        }, [isFilterOpen])

        const memoizedBodyComponent = useMemo(() => {
            return <BodyComponent messages={messages} />;
        }, [messages]);

        useEffect(() => {
            if (images !== "") {
                sendMessagesBack(images, id).then(() => {
                    setTimeout(() => {
                        chatClick()
                        setTimeout(() => {
                            scroll()
                            setFile("")
                            setPreviewUrl("")
                        }, 200)
                    }, 500)

                })


            }
        }, [images])
        useEffect(() => {
            FileReaders()
        }, [file])

        //useEffect que só irá ser ativado se id for mudado
        useEffect(() => {
            chatClick()
        }, [id])

        //UseEffect do setInterval
        useEffect(() => {
            const time = setInterval(() => {
                chatClick()
                //

            }, 5000);
            return () => {
                clearInterval(time);
            };
        }, [messages, id])

        //UseEffect do scroll, após 0.2s ele executa a função
        //para o scroll do bodycomponent ficar sempre no fim
        useEffect(() => {

            setTimeout(() => {
                scroll()
            }, 200)

        }, [])

        useEffect(() => {
            if (messages.length > 1) {
                let filteredArray = messages.filter(function (object) {
                    return object.msg.includes('file=');
                });
                //
            } else return

        }, [messages])

        useEffect(() => {
            getFastmsgs()

        }, [])
        //retorno principal da função MainApp
        return (
            <Box flex={'1'} bg={colorMode === "light" ? "white" : "#23272f"} >
                <Flex w='full' flexDir={'column'} justifyContent='space-between' h='full'>

                    {/* Header Div */}
                    <Flex h='60px' justifyContent={'center'} w='100%'
                        bg={colorMode === "light" ? "gray.200" : "#23272f"}>
                        {id !== 0 ? <HeaderComponent /> : <> </>}

                    </Flex>

                    {/* body div */}
                    <Flex justifyContent={'center'} id='container-scroller'
                        overflow={'auto'} flex={'1'} bg={colorMode === "light" ? "gray.200" : "#23272f"} w='full'>

                        {id !== 0 ? memoizedBodyComponent : <NoBodyComponent />}

                    </Flex>

                    {/* Campo de pesquisa Div */}
                    <Flex borderTop={colorMode === "light" ? "1px solid #0000004d" : "none"} position={'relative'} h='auto' justifyContent={'center'} bg={colorMode === "light" ? "gray.200" : "#23272f"} w='full'>
                        {id !== 0 ? <Flex w='95%' h='100%'>
                            <Box padding={previewUrl === "" ? "0" : "20px"} w={'85%'} h='100%'>
                                {previewUrl === '' ? <></> : <Box w='fit-content' position={'relative'}>
                                    {file.type.includes("video/") ? <video controls src={previewUrl} width='200' height={'200'} alt='' /> : file.type.includes("image/") ? <Image src={previewUrl} alt='' width={200} height={200} /> : <Icon fontSize={'50px'} as={FcDocument} />}
                                    <Icon cursor={'pointer'} fontSize={'20px'} onClick={() => [setPreviewUrl(''), setFile('')]} position={'absolute'} top='0px' right={'-25px'} as={AiOutlineClose} />
                                </Box>}



                                <Textarea id='textarea' onPaste={pasteImg} outline={'none !important'} onKeyDown={sendMessageFunction}
                                    display={previewUrl === "" ? 'block' : "none"}
                                    value={sendMessages} onChange={(e) => setSendMessage(e.target.value)}
                                    fontSize={'17px'} _placeholder={{ fontSize: '17px' }}
                                    minH={'auto'} h={'100%'} boxShadow='initial !important'
                                    resize={'none'} placeholder='Digite sua mensagem...' />

                            </Box>
                            <Flex w='15%' justifyContent={'space-between'}>
                                <Box display={'flex'} justifyContent='space-evenly' alignItems='center' w={'80%'} h='full'>
                                    <Icon onClick={() => { emojiOpen ? setGlobalState("emojiOpen", false) : setGlobalState("emojiOpen", true) }} display={previewUrl === "" ? "block" : "none"} _hover={{ color: 'blue.700' }} cursor={'pointer'} fontSize={'23px'} as={BsFillEmojiSmileFill} />
                                    <Icon onClick={onOpen} display={previewUrl === "" ? "block" : "none"} _hover={{ color: 'blue.700' }} cursor={'pointer'} fontSize={'23px'} as={BsFillChatDotsFill} />
                                    <Icon onClick={() => document.getElementById('file').click()} _hover={{ color: 'blue.700' }} cursor={'pointer'} fontSize={'25px'} as={AiOutlinePaperClip} />
                                    {/* <Icon onClick={startRecording} marginRight={previewUrl === "" ? "initial" : "-35px"} display={previewUrl === "" ? "block" : "none"} _hover={{ color: 'blue.700' }} cursor={'pointer'} ml='-6px' fontSize={'20px'} as={FaMicrophone} />
                                    <Button onClick={stopRecording}>para</Button> */}
                                    <Input accept="image/*, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={(e) => setFile(e.target.files[0])} display={'none'} id='file' type={'file'} />

                                    <Modal isOpen={isOpen} onClose={onClose}>
                                        <ModalOverlay display={'none'} />
                                        <ModalContent>
                                            <ModalHeader>Mensagens rápidas</ModalHeader>
                                            <ModalCloseButton />
                                            <ModalBody>
                                                <Button onClick={() => setIsFilterOpen(isFilterOpen ? false : true)} mb={'15px'} width={'100%'}>Filtrar mensagem</Button>
                                                {isFilterOpen ? <Flex >
                                                    <Input onChange={(e) => setmsgFiltered(e.target.value)} type={'search'} flex='1' mb={'15px'} placeholder='Titulo da mensagem..' />
                                                </Flex> : <></>}
                                                <Box maxH={'130px'} overflow='auto'>
                                                    {msgs.length === 0 ? <Text>Você não possui mensagens rapidas salvas, adicione agora mesmo</Text>
                                                        : <>{msgs.map((e, index) => <Flex key={"flex" + index} position={'relative'} borderTop={colorMode === "light" ? "1px solid gray" : "1px solid #ffffff29"} p='2px' justifyContent={'space-between'}>
                                                            <Text cursor={'pointer'} onClick={() => [setSendMessage(e.msg), onClose()]} fontSize={'13px'} p='5px' maxWidth={'250px'} >{e.titulo}</Text>
                                                            <Icon onClick={() => [setIsaddopen(false), setIsUpdateOpen(true), setIsOpenAddMsg(isOpenAddMsg ? false : true), setUpdateId(e.id), setmessageData({ id: e.id, titulo: e.titulo, msg: e.msg })]} position={'absolute'} right='20px' top={'7px'} cursor={'pointer'} transition={'all 0.1s linear'} _hover={{ color: 'blue.400' }} fontSize={'20px'} mr='10px' color={colorMode === "light" ? 'black' : "white"} as={MdModeEdit} />
                                                            <Icon onClick={() => deleteFastmsgs(e.id)} position={'absolute'} right='5px' top={'7px'} cursor={'pointer'} transition={'all 0.1s linear'} _hover={{ color: 'red' }} fontSize={'20px'} color={colorMode === "light" ? 'black' : "white"} as={MdDelete} />

                                                        </Flex>
                                                        )}</>}
                                                </Box>
                                                {isOpenAddMsg ? <Flex flexDir={'column'} mt='20px'>
                                                    <Input placeholder='Titulo...' defaultValue={isUpdateOpen ? messagedata.titulo : ""}
                                                        onChange={e => isUpdateOpen ? setUpdatetitulo(e.target.value) : isaddOpen ? setTitulo(e.target.value) : "1"}
                                                        type={'text'} mr='10px' />
                                                    <Textarea resize={'none'} placeholder='Mensagem...' mb={'10px'} mt='10px' defaultValue={isUpdateOpen ? messagedata.msg : ""}
                                                        onChange={e => isUpdateOpen ? setUpdatemessage(e.target.value) : isaddOpen ? setaddfastMessage(e.target.value) : "1"}
                                                        type={'text'} mr='10px' />
                                                    <Button onClick={isUpdateOpen ? updateFastmsgs : addFastmsgs}>{isUpdateOpen ? "Atualizar" : isaddOpen ? "Adicionar" : "1"}</Button>
                                                </Flex> : <></>}

                                            </ModalBody>

                                            <ModalFooter >

                                                <Button onClick={() => [setIsUpdateOpen(false), setIsaddopen(true), setIsOpenAddMsg(isOpenAddMsg ? false : true)]} variant={'outline'} mr='10px'>{isOpenAddMsg ? "Cancelar" : "Adicionar mensagem rápida"}</Button>

                                                <Button colorScheme='blue' onClick={onClose}>
                                                    Fechar
                                                </Button>

                                            </ModalFooter>
                                        </ModalContent>
                                    </Modal>

                                </Box>

                                {/* aqui */}
                                <Box w={'20%'} h='full' display={'flex'} alignItems='center'>
                                    <Icon onClick={sendMessageFunction} color={'blue.700'} cursor={'pointer'} fontSize={'30px'} as={MdSend} />

                                </Box>
                            </Flex>
                        </Flex> : <></>}
                        {emojiOpen ? <Box position={'absolute'} top={'-440px'} right={'10px'} >
                            <Picker theme={colorMode === "light" ? "light" : "dark"} data={data} locale={'pt'} onEmojiSelect={addEmoji} />
                        </Box> : <></>}

                    </Flex>

                </Flex>
            </Box >
        )
    }

    //Se load for true, irá exibir a página principal, senão irá exibir uma tela de carregamento.
    if (load) {
        return (

            <Flex w='full' overflow={'hidden'} h='100vh'>
                <Head>
                    <title>Helpzap</title>
                    <meta name="description" content="Generated by create next app" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <SideBar />
                <MainDiv />

                <Modal onClose={onClose} isOpen={isOpen} isCentered>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Configurações</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody flexDir={'column-reverse'} display={'flex'}>
                            <Button onClick={() => [Logouts, localStorage.removeItem('token'), router.push('/login'), localStorage.clear()]} colorScheme={'red'} h={'50px'}>Fazer Logout</Button>

                            <FormControl mb={'20px'} w={'100%'} display='flex' justifyContent={'space-between'} alignItems='center'>
                                <FormLabel fontWeight={700} htmlFor='email-alerts' mb='0'>
                                    Modo {colorMode === "light" ? "Escuro" : "Claro"}
                                </FormLabel>
                                <IconButton
                                    aria-label="toggle theme"
                                    rounded="full"
                                    size="lg"
                                    onClick={toggleColorMode} icon={colorMode === "dark" ? <FaSun /> : <FaMoon />}
                                />
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={onClose}>Fechar</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Flex >
        )
    } else {
        return (
            <Box w={'full'} display='flex' alignItems={'center'} justifyContent={'center'} h='100vh' bg={'blue.500'}>
                <Head>
                    <title>Helpzap</title>
                    <meta name="description" content="Generated by create next app" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <Spinner
                    thickness='4px'
                    speed='0.65s'
                    color='gray.300'
                    size='xl'
                />
            </Box>
        )
    }


}

export async function getServerSideProps(context) {
    // try {
    //     const { userId } = context.query
    //     const res = await fetch(`/api/getMsg/${userId}`)
    //     const data = await res.json()

    //     if (!data) {
    //         console.log("erro")
    //     } else {
    //         // console.log(data)
    //     }

    //     return {
    //         props: {
    //             data: data
    //         }
    //     }
    // } catch (error) {
    //     console.err(error)
    // }

    return {
        props: {
            data: []
        }
    }

}