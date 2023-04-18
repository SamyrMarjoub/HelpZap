import React, { useState, useEffect } from 'react'
import {
  Box, Flex, Text, Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Switch,FormControl,FormLabel
} from '@chakra-ui/react'
import axios from 'axios'
import Router, { useRouter } from 'next/router'
export default function admindev() {

  const [data, setData] = useState([])
  const [status, setStatus] = useState(null)
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()

  async function getTickets() {
    const response = await axios.get("/api/getTicket")
    setData(response.data)
    console.log(response.data)
  }

  // async function setStatusTicket() {
  //   const res = await axios.put(`/api/setStatusTicket`, { status: updateMessage })
  //   getFastmsgs()
  //   setIsOpenAddMsg(false)
  // }

  useEffect(() => {
    getTickets()
  }, [])

  useEffect(()=>{
console.log(status)
  }, [status])

  return (
    <>
      <Flex h='100vh' justify={'center'} alignItems={'center'} w='full'>
        <Box position={'relative'} w='90%' h='90%'>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Modal Title</ModalHeader>
              <ModalCloseButton />
              <ModalBody>

                <Button w='full' bg='red.500' h='40px' fontSize={'16px'}>Deletar ticket</Button>
                <FormControl display='flex' h='50px' justifyContent={'space-between'} alignItems='center'>
                  <FormLabel htmlFor='email-alerts' mb='0'>
                    Mudar Status
                  </FormLabel>
                  <Switch onChange={setStatus} id='email-alerts' />
                </FormControl>


              </ModalBody>

              <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={onClose}>
                  Fechar
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          <Flex justifyContent={'space-between'} w='full'>
            <Text as={'span'} fontSize={'30px'}>Tickets ({data.length})</Text>
            <Text as={'span'} fontSize={'30px'}>Área do Suporte</Text>
          </Flex>
          <Box w='full'>
            <TableContainer mt={'50px'}>
              <Table size={'lg'} variant='striped'>
                <Thead>
                  <Tr>
                    <Th w={'20%'}><Text textAlign={'center'} fontSize={'15px'}>ID</Text></Th>
                    <Th w={'20%'}><Text textAlign={'center'} fontSize={'15px'}>NOME</Text></Th>
                    <Th w={'20%'}><Text textAlign={'center'} fontSize={'15px'}>EMAIL</Text></Th>
                    <Th w={'20%'}><Text textAlign={'center'} fontSize={'15px'}>DESCRIÇÃO</Text></Th>
                    <Th w={'20%'}><Text textAlign={'center'} fontSize={'15px'}>Status</Text> </Th>


                  </Tr>
                </Thead>
                <Tbody>
                  {data.map((e, index) => {
                    return (
                      <>
                        <Tr key={index}>
                          <Td><Text textAlign={'center'} fontSize={'15px'}>{e.id}</Text></Td>
                          <Td textAlign={'center'}>{e.nome}</Td>
                          <Td textAlign={'center'}>{e.email}</Td>
                          <Td textAlign={'center'}>{e.text}</Td>
                          <Td><Text cursor={'pointer'} onClick={onOpen} textAlign={'center'} fontSize={'15px'} color={'red.300'}>{e.status === 0 ? "PENDENTE" : "RESOLVIDO"}</Text></Td>

                        </Tr>
                      </>
                    )
                  })}


                </Tbody>

              </Table>
            </TableContainer>
          </Box>
          <Text right={'0'} bottom={'0'} cursor={'pointer'} position={'absolute'} onClick={() => router.push("/mainApp")}>VOLTAR AO CHAT</Text>
        </Box>
      </Flex>
    </>
  )
}
