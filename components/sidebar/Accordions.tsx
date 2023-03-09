import React, { useState, useEffect } from 'react'
import {
    Box, Flex, Icon,
    ListItem,
    UnorderedList,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,

} from '@chakra-ui/react'
import { BiDetail } from 'react-icons/bi'
import { BsClock, } from 'react-icons/bs'
import { useGlobalState, setGlobalState } from "@/globalStates"
import dayjs from 'dayjs'

export default function Acorddions(chatdata: any) {

    const [chatdatas, setChatdata] = useGlobalState<any>("chatData")
    const [jsonData, setJsonData] = useState([{}])

    useEffect(() => {
        if (chatdatas.additional_data) {
            setJsonData(JSON.parse(chatdatas.additional_data))
        } else
            console.log('none')
    }, [])

    return (
        <Flex w='100%' h='auto'>

            <Box w={'100%'} display='flex' alignItems='flex-end' h='100%'>
                <Accordion w='100%' allowMultiple>
                    <AccordionItem>
                        <h2>
                            <AccordionButton>
                                <Box color={'white'} mt={'10px'} as="span" flex='1' textAlign='left'>
                                    <Icon mr={'10px'} fontSize={'23px'} float='left' color='white' as={BiDetail} />
                                    Dados adicionais
                                </Box>
                                <AccordionIcon color={'white'} />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            <UnorderedList listStyleType={'none'} fontSize={'13px'} mt={'-5px'} color={'white'}>
                            <ListItem color={'whiteAlpha.900'}>ID do chat: {useGlobalState("defaultCurrency")}</ListItem>
                                
                                {jsonData.map(e => {
                                    return (
                                        <>
                                            <ListItem color={'whiteAlpha.900'}>{e.key} - {e.value}</ListItem>

                                        </>
                                    )


                                })}

                            </UnorderedList>
                        </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem>

                        <AccordionButton>
                            <Box color={'white'} mt={'10px'} as="span" flex='1' textAlign='left'>
                                <Icon mr={'10px'} fontSize={'23px'} float='left' color='white' as={BsClock} />
                                Times
                            </Box>
                            <AccordionIcon color={'white'} />
                        </AccordionButton>

                        <AccordionPanel pb={4}>
                            <UnorderedList listStyleType={'none'} fontSize={'13px'} mt={'-5px'} color={'white'}>
                                <ListItem color={'whiteAlpha.900'}>Duração do bate-papo {chatdata?.chatdata.chat_duration}s</ListItem>
                                <ListItem color={'whiteAlpha.900'}>Aguardou - {chatdata?.chatdata.wait_time}s</ListItem>
                                <ListItem color={'whiteAlpha.900'}>Criado em - {dayjs.unix(
                                    chatdata?.chatdata.time).fromNow()}</ListItem>
                                {chatdata?.chatdata.cls_time === 0 ? <></> : <ListItem color={'whiteAlpha.900'}>Fechado em: {dayjs.unix(chatdata?.chatdata.cls_time).fromNow()}</ListItem>}

                                <ListItem color={'whiteAlpha.900'}>Started wait at: {dayjs.unix(chatdata?.chatdata.pnd_time).fromNow()}</ListItem>
                                <ListItem>Data de criação:
                                    { } {dayjs.unix(chatdata.chatdata.time).date() < 10 ? `0${dayjs.unix(chatdata.chatdata.time).date()}` : dayjs.unix(chatdata.chatdata.time).date()}/
                                    {dayjs.unix(chatdata.chatdata.time).month() < 10 ? `0${dayjs.unix(chatdata.chatdata.time).month()}` : dayjs.unix(chatdata.chatdata.time).month()}/
                                    {dayjs.unix(chatdata.chatdata.time).year() < 10 ? `0${dayjs.unix(chatdata.chatdata.time).year()}` : dayjs.unix(chatdata.chatdata.time).year()} - { } 
                                    {dayjs.unix(chatdata.chatdata.time).hour() < 10 ? `0${dayjs.unix(chatdata.chatdata.time).hour()}`
                                        : dayjs.unix(chatdata.chatdata.time).hour()}:
                                    {dayjs.unix(chatdata.chatdata.time).minute() < 10 ? `0${dayjs.unix(chatdata.chatdata.time).minute()}`
                                        : dayjs.unix(chatdata.chatdata.time).minute()}
                            </ListItem>
                        </UnorderedList>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>

        </Box>
        </Flex >
    )
}
