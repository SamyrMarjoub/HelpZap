import React, { useEffect, useState } from 'react'
import { Box, Flex, Input, Text, Checkbox, Spinner, Button, useToast, useColorMode, color, Image } from '@chakra-ui/react'
import { loginRequest } from '@/helpers/request'
import { useRouter } from 'next/router'
import Head from 'next/head'


export default function Teste() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [load, setload] = useState(false)
    const toast = useToast()
    const router = useRouter()
    const { toggleColorMode, colorMode } = useColorMode();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            router.push('/mainApp')

        } else {
            setload(true)
            return
        }

    }, [])

    async function submit(e: any) {

        e.preventDefault()
        loginRequest(username, password).then((response) => {
            if (response?.data.error) {
                toast({
                    title: 'Houve um Erro!',
                    description: "Verifique o usuário ou a senha.",
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                    position: 'top'
                })
            } else {
                router.push('/mainApp')
            }
        }).catch((err) => {
            if (err.response.data) {
                const data = err.response.data;
                toast({
                    title: 'Falha na Autenticação!',
                    description: data.msg ? data.msg.includes("Authentification failed") ? "Verifique o usuário ou asenha." : data.msg : "Porfavor, entre em contato com o suporte! Code 400",
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                    position: 'top'
                })
            } else {
                toast({
                    title: 'Falha na Autenticação!',
                    description: "Porfavor, entre em contato com o suporte!",
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                    position: 'top'
                })
            }


            console.error(err);
        })

    }

    if (load) {
        return (
            <>
            
                <Head>
                    <title>Helpzap</title>
                    <meta name="description" content="Generated by create next app" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <Flex bg={colorMode === "light" ? 'blue.700' : '#010715'} justifyContent='center' alignItems={'center'} h='100vh' >
                    <Flex bg={colorMode === "light" ? "white" : "#00112f"} borderRadius={'20px'} justifyContent={'center'} alignItems='center' h='400px' w='500px'>
                        <Flex flexDir={'column'} justifyContent='center' alignItems={'center'} w='85%' h='90%'>
                            <Image width={'200px'} src={"/HelpZapblack.png"} />
                            <form onSubmit={submit}>
                                <Input color={colorMode === "light" ? "black" : "white"} onChange={(e) => setUsername(e.target.value)} marginTop={'20px'} h={'50px'} placeholder='Login' type='text' />
                                <Input color={colorMode === "light" ? "black" : "white"} onChange={(e) => setPassword(e.target.value)} mt={'20px'} h={'50px'} placeholder='Senha' type='password' />


                                <Flex mt={'10px'} w='full' justifyContent={'center'}>
                                <Button borderRadius={'20px'} fontSize={'18px'} type='submit' w='60%' bg='blue.700' color='white' h='50px' mt={'20px'}>Fazer login</Button>

                                </Flex>
                                
                            </form>
                        </Flex>
                    </Flex>
                </Flex >
            </>



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
