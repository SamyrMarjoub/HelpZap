import React, { useState } from 'react'
import { useGlobalState } from '@/globalStates'
import { getDevMsgs, sendMsgdev } from '@/helpers/request'
import { Box, Checkbox, Flex, Input, Text, Textarea, Fade, ScaleFade, Slide, SlideFade, Collapse, Icon, useDisclosure } from '@chakra-ui/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { MdOutlineDone } from 'react-icons/md'
import axios from 'axios'
export default function contactdev() {

    const [ísCheckedBoxed, setIsCheckecBoxed] = useState(false)
    const [ownData, setOwnData] = useGlobalState("OwnData")
    const [suportextarea, setSuportextarea] = useState("")
    const [emailseup, setEmailsup] = useState("")
    const [namesup, setNamesup] = useState("")
    const [supsuccess, setSupSuccess] = useState(false)
    const router = useRouter()
    const { isOpen, onToggle } = useDisclosure()

    async function sendTicket(){
        const response = await axios.post("/api/sendTicket", {name:namesup, email:emailseup, text:suportextarea})
        console.log(response)
    }
    
    async function supportContact(e) {
        
        e.preventDefault()
        if (ísCheckedBoxed && suportextarea.length > 5 && namesup.length > 2 && emailseup.length > 10) {
            sendTicket()
            setSuportextarea("")
            setNamesup("")
            setEmailsup("")
            setSupSuccess(true)
            onToggle()
        
        } else return
    }

    function SuccessComponent() {

        return (
            <>
                <ScaleFade initialScale={0.9} in={isOpen}>
                    <Box
                        p='40px'
                        color='white'
                        rounded='30px'
                        // shadow='md'
                        display={'flex'}
                        justifyContent={'center'}
                        flexDir={'column'}
                        alignItems={'center'}

                    >
                        <Icon color={'green.400'} fontSize={'150px'} as={MdOutlineDone} />
                        <Text fontSize={'30px'} textAlign={'center'}>Feito, o desenvolvedor enviará um e-mail a você quando o problema for resolvido.</Text>
                        <Text as={'span'} onClick={()=> router.push('/mainApp')} color={'whiteAlpha.700'} mt={'30px'} _hover={{color:'cyan'}} cursor={'pointer'}>Voltar ao chat</Text>
                    </Box>
                </ScaleFade>

            </>
        )
    }

    return (
        <>
            <Box margin={'auto'} display={'flex'} flexDir={'column'} justifyContent={'center'} alignItems={'center'} borderRadius={'20px'} w='90%' h='100vh'>
                <Box height={'100%'} justifyContent={'center'} alignItems={'center'} flexDir={'column'} position={'relative'} w='50%' display={'flex'} >
                    {supsuccess ? <SuccessComponent /> : <>
                        <Image style={{ cursor: 'pointer' }} onClick={() => router.push('/')} width={200} height={200} src='/HelpZapblack.png' />

                        <Text mt={'50px'} mb={'30px'} as={'span'} fontSize={'50px'} color={'white'}>Contatar Desenvolvedor</Text>

                        <Box>
                            <Text mb={'10px'} color={'white'} fontSize={'17px'}>
                                Se você encontrar algum problema técnico na aplicação que pareça ser um erro desconhecido, sugerimos que você utilize o recurso de suporte ao cliente do HelpZap, enviando um ticket para a equipe de desenvolvimento. Dessa forma, você pode obter ajuda para resolver o problema. No entanto, recomendamos que você use esse recurso somente quando <Text color={'cyan'} as={'span'}>necessário</Text>, para que a equipe de suporte possa lidar com os problemas de forma mais eficiente.
                            </Text>
                            <Checkbox mb={'15px'} onChange={(e) => setIsCheckecBoxed(e.target.checked)} fontSize={'10px'} mt={'10px'}>Concordo em usar o suporte apenas para problemas técnicos na aplicação</Checkbox>
                        </Box>

                        <form onSubmit={supportContact} style={{ width: '100%' }}>
                            {ísCheckedBoxed ?
                                <>
                                    <Flex mt={'15px'} w='full'>
                                        <Input fontSize={'16px'} height={'50px'} value={namesup} onChange={(e) => setNamesup(e.target.value)} minLength={2} required mr={'20px'} w={'50%'} pL={'20px'} type='text' placeholder='Digite seu nome..' />
                                        <Input fontSize={'16px'} height={'50px'} value={emailseup} onChange={(e) => setEmailsup(e.target.value)} minLength={10} required w={'50%'} type='email' placeholder='Digite seu email..' pL='20px' />

                                    </Flex> <Textarea maxLength={140} height={'100'} value={suportextarea} minLength={5} resize={'none'} required fontSize={'16px'} onChange={(e) => setSuportextarea(e.target.value)} mt={'10px'} mb={'10px'} placeholder='Digite aqui uma breve descrição do problema'></Textarea> </>

                                : <></>}
                            <Input mt={'10px'} type='submit' cursor={ísCheckedBoxed && suportextarea.length > 5 ? "pointer" : 'not-allowed'} w='full' h='50px' bg={ísCheckedBoxed && suportextarea.length > 5 ? "blue.400" : 'gray.600'} fontSize={'18px'} _hover={{ bg: ísCheckedBoxed ? 'blue.700' : "" }} value={'Enviar Ticket'} />
                        </form>
                    </>
                    }

                </Box>
            </Box>
        </>
    )
}
