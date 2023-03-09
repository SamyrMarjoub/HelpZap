import React from "react"
import { Box, Icon, Text } from "@chakra-ui/react"
import { FiUserX } from "react-icons/fi"
export default function NoChats() {
    return (
        <Box justifyContent={'center'} display={'flex'} flexDir='column' alignItems={'center'} h='100%'>
            <Box>
                <Icon color={'white'} fontSize={'50px'} as={FiUserX} />
            </Box>
            <Box>
                <Text color={'white'} fontSize={'20px'}>Nenhuma conversa selecionada</Text>
            </Box>
            <Box>
                <Text textAlign='center' color={'whiteAlpha.800'}>Aguardando novos chats..</Text>
            </Box>

        </Box>
    )
}
