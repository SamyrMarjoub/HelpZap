import React, { useEffect, memo } from "react"
import {
    Box, Flex, Text,
    Icon, useColorMode

} from '@chakra-ui/react'
import { BsWhatsapp, BsFillChatLeftTextFill } from 'react-icons/bs'
import dayjs from 'dayjs'
import { useGlobalState, setGlobalState } from "@/globalStates"

export default function Chats() {

    const isOpenChat = useGlobalState("openChat")
    const [globalactives, setGlobalActives] = useGlobalState("ChatsAtivos")
    const { toggleColorMode, colorMode } = useColorMode();
    const [getChatsActive, setChatsActive] = useGlobalState("ChatsAtivos")
    const [atualChat] = useGlobalState("defaultCurrency");

    const Component = memo(
        function ChatComponent({ e, index, atualChatId }: { e: any, index: any, atualChatId: any }) {

            console.log("atuachat", atualChatId)
            if (atualChat === e.id)
                localStorage.setItem(`Unred_${e.id}`, getChatsActive[index].messages.filter(obj => obj.user_id === 0).length);

            const totalMsgsStats = Number(getChatsActive[index].messages.filter(obj => obj.user_id === 0).length -
                localStorage.getItem(`Unred_${e.id}`));



            return (
                <>

                    <Box onClick={() => [setGlobalState("defaultCurrency", e.id), setGlobalState("isOpenChat", true),
                    ]} overflow={'auto'} transition={'0.1s all linear'} _hover={{ bg: 'blue.900' }}
                        cursor='pointer' display={'flex'} justifyContent='center' id={e.id} h='50px' w='full'
                        border={colorMode === "light" ? "1px solid #ffffff93" : "none"}
                        borderTop={colorMode === 'light' ? "" : "1px solid #23272f"}
                        borderBottom={colorMode === 'light' ? "" : "1px solid #23272f"}>
                        <Flex alignItems={'center'} w='95%' h='100%'>
                            <Flex mr={'10px'} w='40px' borderRadius={'50px'}
                                justifyContent='center' alignItems={'center'} h='35px' bg={totalMsgsStats <= 0 || e.id === atualChat ? "blue.400" : "green.400"}>
                                <Icon color={'white'} as={BsWhatsapp} />
                            </Flex>
                            <Flex position={'relative'} flexDirection={'column'} justifyContent='center' h='full' w='full'>
                                <Text mt={'1px'} fontSize='13px' fontWeight={'medium'} color='white' lineHeight={'15px'}>{e.nick}</Text>
                                <Text color={'whiteAlpha.700'} fontSize={'12px'} mt='3px'> <Icon float={'left'} mt='2px' mr={'3px'} as={BsFillChatLeftTextFill} />
                                    {getChatsActive[index]?.messages[getChatsActive[index].messages.length - 1].msg.length > 10 ?
                                        getChatsActive[index]?.messages[getChatsActive[index].messages.length - 1].msg.slice(0, 10) + "..."
                                        : getChatsActive[index]?.messages[getChatsActive[index].messages.length - 1].msg}</Text>
                                <Text color={'white'} fontSize='12px' position={'absolute'} right='10px' bottom={'3px'}>{dayjs.unix(e.last_user_msg_time).fromNow()}</Text>
                                <Box display={totalMsgsStats <= 0 || e.id === atualChat ? "none" : "block"}
                                    bg='whatsapp.200' width={'20px'} height='20px' borderRadius={'25px'}
                                    position='absolute' right={'10px'} textAlign='center' fontSize={'13px'}
                                    color={'black'} top='8px'>{totalMsgsStats}</Box>
                            </Flex>

                        </Flex>

                    </Box>
                </>

            )
        })
    return (
        <Box h='100%' w='100%' overflow={'auto'}>
            {isOpenChat ? globalactives.map((e: any, index: any) => {
                return (
                    <Component key={e.id} e={e} index={index} atualChatId={atualChat} />
                )
            }) : <></>}

        </Box>
    )
}