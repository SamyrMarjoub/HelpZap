import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import {HiOutlineGlobeAlt} from 'react-icons/hi'
import {Box, Icon,Text} from '@chakra-ui/react'
export default function noNetwork() {
    const router = useRouter()

    useEffect(() => {
        const time = setInterval(() => {
            if (navigator.onLine) {
                router.push("/mainApp")
            } else {
                return
            }
        }, 5000)
    }, [])

    return (
      <Box flexDir={'column'} minHeight={'100vh'} display='flex' justifyContent={'center'} alignItems='center'>
        <Icon fontSize={'100px'} as={HiOutlineGlobeAlt}/>
        <Text>Sem conexão com a internet</Text>
      </Box>
    )
}
