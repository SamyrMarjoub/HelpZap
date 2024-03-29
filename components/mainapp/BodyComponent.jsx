import React, { useMemo } from 'react'
import {
    Box, Text, Grid, useColorMode, Icon
} from '@chakra-ui/react'
import dayjs from 'dayjs'
import { getFile } from '@/helpers/request';
import { MdOutlineArchive } from 'react-icons/md'
import { FcDocument } from 'react-icons/fc'
import { useGlobalState } from '@/globalStates';
export default function BodyComponent({ messages }) {

    const { toggleColorMode, colorMode } = useColorMode();
    const [atualChat] = useGlobalState("defaultCurrency");

    const messageList = useMemo(() => {

        if (messages && messages.lenght > 0 && messages[0].id_chat === atualChat) {
            localStorage.setItem(`Unred_${messages[0].id_chat}`, messages.filter(obj => obj.user_id === "0").length);
        }

        return messages.map((e) => {


            if (e.msg && e.msg.includes("[file")) {
                let sorc = e.msg.replace("[file=", "").replace("]", "");
                let id = sorc.match(/\d{4}/d)

                const idImg = sorc.split("_")[0];
                const img = getFile(idImg, false).then(res => {
                    let url = "";
                    if (res.data.size < 1) {
                        url = `${process.env.BASE_URL}/site_admin/file/downloadfile/` + idImg + "/" + nameImg

                    } else {
                        url = URL.createObjectURL(res.data);
                    }

                    document.getElementById("img" + idImg).src = url;
                    //
                }).catch(err => {
                    console.error(err)
                })
                const nameImg = sorc.split("_")[1];
                //
                return (<Box key={"msg" + e.id} position={'relative'} mb='20px' flexDir='column' mt={'20px'}
                    justifySelf={e.user_id === "0" ? "start" : "end"}
                    display={'flex'} justifyContent='flex-start' w='auto'
                    h='auto' pt={'3'} pb='3' padding={'5px'} borderRadius='10px'
                    bg={e.user_id === "0" && colorMode === "light" ? "white" : e.user_id > "1" && colorMode === "light" ? "gray.300"
                        : e.user_id === "-1" && colorMode === "light" ? "beige" : e.user_id === "-2" && colorMode === "light" ? "blue.100"
                            : e.user_id === "0" && colorMode === "dark" ? "#1D1D1D" : e.user_id > "1" && colorMode === "dark" ? "#121212" :
                                e.user_id === "-1" && colorMode === "dark" ? "#9747FF" : e.user_id === "-2" && colorMode === "dark" ? "#E53E3E" : ""}>
                    {e.media[0]?.type?.includes("video") ? <video width={'300'} height='200' controls id={'img' + idImg} /> : e.media[0]?.type?.includes("image") ? <img onClick={(e) => {
                        const img = document.getElementById("img" + idImg);
                        const link = document.createElement("a");
                        link.href = img.src;
                        getFile(idImg, true).then(res => {
                            const data = res.data
                            link.download = data.upload_name;
                            link.click();

                        })

                    }} style={{ cursor: 'pointer' }} width={'300'} id={"img" + idImg} /> : <div id={"img" + idImg} >
                        <a href={`${process.env.BASE_URL}/site_admin/file/downloadfile/${id}/${nameImg}`} download={true}>
                            <Icon as={MdOutlineArchive} fontSize='50px' color={'#E53E3E'} />

                        </a>
                        <Text fontSize={'13px'}>{e.msg.split("\n")[0]}<br />
                            <a style={{ color: "blue" }} href={`${e.media[0]?.url?.replace("http:", "https:")}`}
                            > {e.msg.split("\n")[1]} </a></Text> </div>}


                    <Text mt={'0px'} textAlign={'end'} fontSize={'11px'}>
                        {dayjs.unix(e.time).hour() < 10 ? `0${dayjs.unix(e.time).hour()}`
                            : dayjs.unix(e.time).hour()}:
                        {dayjs.unix(e.time).minute() < 10 ? `0${dayjs.unix(e.time).minute()}`
                            : dayjs.unix(e.time).minute()} </Text>
                </Box>)
            }

            if (e.msg.includes("[img]")) {
                return (
                    <Box key={"msg_img" + e.id} position={'relative'} mb='20px' flexDir='column' mt={'20px'} justifySelf={e.user_id === "0" ? "start" : "end"}
                        display={'flex'} justifyContent='flex-start' w='fit-content'
                        h='auto' pt={'3'} pb='3' padding={'5px'} borderRadius='10px'
                        bg={e.user_id === "0" && colorMode === "light" ? "white" : e.user_id > "1" && colorMode === "light" ? "gray.300"
                            : e.user_id === "-1" && colorMode === "light" ? "beige" : e.user_id === "-2" && colorMode === "light" ? "blue.100"
                                : e.user_id === "0" && colorMode === "dark" ? "#1D1D1D" : e.user_id > "1" && colorMode === "dark" ? "#121212" :
                                    e.user_id === "-1" && colorMode === "dark" ? "#9747FF" : e.user_id === "-2" && colorMode === "dark" ? "#E53E3E" : ""}>
                        {/\.(jpe?g|png|gif)$/i.test(e.msg.replace(/\[img\]|\[\/img\]/g, "")) ? <img width={'300'} height='200' src={e.msg.replace(/\[img\]|\[\/img\]/g, "")} />
                            : /\.(mp4|mov|avi)$/i.test(e.msg) ? <video width={'300'} height='200' src={e.msg.replace(/\[img\]|\[\/img\]/g, "")} /> : /\.(mp3|wav)$/i.test(e.msg) ? <audio src={e.msg.replace(/\[img\]|\[\/img\]/g, "")} controls></audio>
                                : /\.(docx?|pdf|xlsx?|zip)$/i.test(e.msg.replace(/\[img\]|\[\/img\]/g, "")) ? <Icon fontSize={'50px'} as={FcDocument} /> :
                                    <Icon fontSize={'50px'} color='red' as={FcDocument} />}
                        <Text mt={'-5px'} textAlign={'end'} fontSize={'11px'}>{dayjs.unix(e.time).hour() < 10 ?
                            `0${dayjs.unix(e.time).hour()}` : dayjs.unix(e.time).hour()}: {dayjs.unix(e.time).minute()
                                < 10 ? `0${dayjs.unix(e.time).minute()}` : dayjs.unix(e.time).minute()} </Text>
                    </Box>
                )
                // }

            } else {
                return (
                    <Box key={"msg_puro" + e.id} position={'relative'} borderRadius='10px' mb='20px' flexDir='column' mt={'20px'} borderTopRightRadius={e.user_id > 0 ? "0px" : "10px"} borderTopLeftRadius={e.user_id == 0 ? "0px" : "10px"} justifySelf={e.user_id === "0" ? "start" : "end"}
                        display={'flex'} justifyContent='flex-start' w='fit-content'
                        h='auto' pt={'3'} pb='3' padding={'5px'}
                        bg={e.user_id === "0" && colorMode === "light" ? "white" : e.user_id > "1" && colorMode === "light" ? "gray.300"
                            : e.user_id === "-1" && colorMode === "light" ? "beige" : e.user_id === "-2" && colorMode === "light" ? "blue.100"
                                : e.user_id === "0" && colorMode === "dark" ? "#1D1D1D" : e.user_id > "1" && colorMode === "dark" ? "#121212" :
                                    e.user_id === "-1" && colorMode === "dark" ? "#9747FF" : e.user_id === "-2" && colorMode === "dark" ? "#E53E3E" : ""}>
                        <Text lineHeight={'18px'}>{e.msg.replaceAll("*", "").split("\n").map(e => <>{e}<br /></>)}</Text>
                        <Text mt={'-2px'} textAlign={'end'} fontSize={'11px'}>{dayjs.unix(e.time).hour() < 10 ? `0${dayjs.unix(e.time).hour()}` : dayjs.unix(e.time).hour()}: {dayjs.unix(e.time).minute() < 10 ? `0${dayjs.unix(e.time).minute()}` : dayjs.unix(e.time).minute()} </Text>
                    </Box>
                )
            }


        })
    }, [messages]);


    return (
        <Box w='95%' h='100%' >
            <Grid w='100%' h='auto' templateColumns={'repeat(1, 1fr)'} alignItems='center'>
                {messageList}

            </Grid>
        </Box>
    )
}