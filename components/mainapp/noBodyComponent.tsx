import React from "react"
import { Flex, Icon, Box, Text, useColorMode } from '@chakra-ui/react'
import { AiOutlineWechat } from 'react-icons/ai'

export default function NoBodyComponent() {

    const { toggleColorMode, colorMode } = useColorMode();

    return (
        <Flex h='full' w='full' flexDir={'column'} justifyContent={'center'} alignItems='center'>
            <Icon color={colorMode === "light" ? "black" : "white"} as={AiOutlineWechat} fontSize={'200px'} />
            <Box textAlign={'center'}>
                <Text fontSize={'19px'} fontWeight='medium'>Nenhuma conversa selecionada</Text>
                <Text fontSize={'20px'} color={'gray.500'} fontWeight='bold'>Selecione uma conversa para não ver este aviso</Text>

            </Box>
        </Flex>
    )
}