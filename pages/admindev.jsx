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
  Switch, FormControl, FormLabel, Checkbox, Image, Input, Textarea, Select
} from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { getOwnData } from '@/helpers/request'
import emailjs from '@emailjs/browser'

export default function Admindev() {

  const [data, setData] = useState([])
  const [status, setStatus] = useState(null)
  const [id, setId] = useState()
  const [cId, setCId] = useState()
  const [isTrue, setIsTrue] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [ísCheckedBoxed, setIsCheckecBoxed] = useState(false)
  const { isOpen: isEmailOpen, onOpen: OnEmailOpen, onClose: OnEmailClose } = useDisclosure()
  const [selectedOption, setSelectedOption] = useState()
  const [getEmailV, setGetEmail] = useState("")
  const [updateEmail, setUpdateEmail] = useState("")
  const [updateTextEmail, setUpdateTextEmail] = useState("")
  const [whichClicked, setWitchClicked] = useState("")
  const router = useRouter()

  async function getTickets() {
    const response = await axios.get("/api/getTicket")
    setData(response.data)
    console.log(response.data)
  }

  async function setStatusTicket() {
    const StatusFormatado = status ? 1 : 0
    const res = await axios.put(`/api/setStatusTicket/${cId}`, { status: StatusFormatado })
    // getTickets()
  }

  async function getId() {
    const response = await getOwnData()
    setId(response.data.result.id)

  }

  async function deleteTicket() {
    const response = await axios.delete(`/api/deleteTicket/${cId}`)
    getTickets()
  }

  async function getEmail() {
    const response = await axios.get(`/api/getEmails`)
    console.log(response.data)
    setGetEmail(response.data)
  }

  function SendEmailClient() {

    const templeteParams = {
      from_name: 'Dev Samyr Marjoub',
      message: whichClicked === "1" ? getEmailV[0].text : getEmailV[1].text,
      email: whichClicked === "1" ? getEmailV[0].email : getEmailV[1].email,
      title_message: "HelpZap Support"
    }

    emailjs.send('service_dfx64v2',
      'template_payed8r', templeteParams, 'FDb2tJsOx4XRX444P').then((response) => {
        console.log('email Enviado', response.status, response.text)
       
      }, (err) => {
        console.log('failed', err)
      })
  }

  async function editEmail(e) {
    e.preventDefault()
    const response = await axios.post(`/api/emailUpdate/${selectedOption}`, { text: updateTextEmail, email: updateEmail })
    getEmail()
    OnEmailClose()
  }

  useEffect(() => {
    setStatusTicket();

  }, [status])

  useEffect(() => {
    getTickets()
    getEmail()
  }, [])

  useEffect(() => {
    if (!localStorage.getItem("userId")) return
    else getId()

  }, [])

  const MeuComponente = ({ e, index }) => {
    return <Tr key={index}>
      <Td><Text textAlign={'center'} fontSize={'15px'}>{e.id}</Text></Td>
      <Td textAlign={'center'}>{e.nome}</Td>
      <Td textAlign={'center'}>{e.email}</Td>
      <Td textAlign={'center'}>{e.text}</Td>
      <Td><Text cursor={'pointer'} onClick={() => [onOpen(), setCId(e.id), setIsTrue(e.status), setStatus(e.status)]} textAlign={'center'} fontSize={'15px'} color={e.status === 0 ? "red.300" : "green.300"}>{e.status === 0 ? "PENDENTE" : "RESOLVIDO"}</Text></Td>
      <Td textAlign={'center'}>{e.dataCriacaoFormatada}</Td>

    </Tr>
  };

  function EmailOptionsComponent() {
    return (
      <>
        <Box w='full' h='100%'>
          <Button onClick={() => [setWitchClicked("1"), SendEmailClient(), ]} bg='green.400' w='full'>Resolvido.</Button>
          <Button onClick={() => [setWitchClicked("2"), SendEmailClient()]} bg='orange.400' mt={'15px'} w='full'>False Flag.</Button>


        </Box>
      </>
    )
  }

  useEffect(() => {
    setUpdateEmail(selectedOption === "1" ? getEmailV[0].emailpadrao : selectedOption === "2" ? getEmailV[1].emailpadrao : "")
    setUpdateTextEmail(selectedOption === "1" ? getEmailV[0].text : selectedOption === "2" ? getEmailV[1].text : "")
    console.log(selectedOption)
  }, [selectedOption])

  if (id !== 30) {
    return (
      <>
        <Box w='full' h='100vh' display={'flex'} justifyContent={'center'} alignItems={'center'} flexDir={'column'}>
          <Text fontSize={'30px'}>VocÊ não tem permissão pra ver essa pagina</Text>
          <Text _hover={{ color: 'cyan' }} cursor={'pointer'} mt={'20px'} color={'whiteAlpha.500'} onClick={() => router.push("/mainApp")} fontSize={'18px'}>Voltar ao chat..</Text>

        </Box>
      </>
    )
  } else {
    return (
      <>
        <Flex h='100vh' justifyContent={'space-between'} flexDir={'column'} alignItems={'center'} w='full'>
          <Flex as='header' justifyContent={'center'} alignItems={'center'} w='full' top={'0px'} left={'0px'} height={'70px'} bg='#323743'>
            {/* <Icon  fontSize={'30px'}  as={AiFillHome} /> */}
            <Box justifyContent={'space-between'} w='90%' display={'flex'} alignItems={'center'} h='full'>
              <Image width={'100px'} cursor={'pointer'} onClick={() => router.push("/mainApp")} src={"/HelpZapblack.png"} />
              {/* <Icon as={MdOutlineSettings} position={'absolute'} right={'0'} fontSize={'25px'} color={'white'} /> */}
              <Button onClick={OnEmailOpen} bg='blue.600'>Configurar Email</Button>
              <Modal isOpen={isEmailOpen} onClose={() => [OnEmailClose(), setUpdateEmail(""), setUpdateTextEmail(""), setSelectedOption("")]}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Modal Title</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <form onSubmit={editEmail}>
                      <Select placeholder='Escolha uma opção' mb={'15px'} onChange={(e) => setSelectedOption(e.target.value)}>
                        <option value='1'>Sucesso</option>
                        <option value='2'>False Flag</option>
                      </Select>
                      <Input disabled={selectedOption === "" ? true : false} required value={updateEmail} onChange={(e) => setUpdateEmail(e.target.value)} type='email' placeholder='E-mail padrão..' />
                      <Textarea disabled={selectedOption === "" ? true : false} required value={updateTextEmail} onChange={(e) => setUpdateTextEmail(e.target.value)} mt={'15px'} placeholder='Mensagem padrão..'></Textarea>
                      <Input disabled={selectedOption === "" ? true : false} bg='blue.500' cursor={'pointer'} type='submit' w='full' mt='20px' h='40px' value={'Salvar configurações'} />
                    </form>
                  </ModalBody>

                  <ModalFooter>
                    <Button colorScheme='blue' onClick={() => [OnEmailClose(), setUpdateEmail(""), setUpdateTextEmail(""), setSelectedOption("")]}>
                      Fechar
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </Box>
          </Flex>
          <Box mt={'0px'} overflow={'auto'} position={'relative'} w='90%' h='90%'>

            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Gerenciamento de ticket</ModalHeader>
                <ModalCloseButton />
                <ModalBody>

                  <Button onClick={deleteTicket} w='full' bg='red.500' h='40px' fontSize={'16px'}>Deletar ticket</Button>
                  <FormControl display='flex' h='50px' justifyContent={'space-between'} alignItems='center'>
                    <FormLabel htmlFor='email-alerts' mb='0'>
                      Mudar Status
                    </FormLabel>
                    <Switch defaultChecked={isTrue === 1 ? true : false} onChange={() => setStatus(!status)} id='email-alerts' />

                  </FormControl>
                  <Checkbox mb={'15px'} onChange={(e) => setIsCheckecBoxed(e.target.checked)} fontSize={'10px'} mt={'10px'}>Abrir opções de e-mail.</Checkbox>
                  {ísCheckedBoxed ? <EmailOptionsComponent /> : <></>}

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
              <TableContainer overflow={'auto'} h='90%' mt={'50px'}>
                <Table whiteSpace={'normal'} size={'lg'} variant='striped'>
                  <Thead>
                    <Tr>
                      <Th w={'20%'}><Text textAlign={'center'} fontSize={'15px'}>ID</Text></Th>
                      <Th w={'20%'}><Text textAlign={'center'} fontSize={'15px'}>NOME</Text></Th>
                      <Th w={'20%'}><Text textAlign={'center'} fontSize={'15px'}>EMAIL</Text></Th>
                      <Th w={'20%'}><Text textAlign={'center'} fontSize={'15px'}>DESCRIÇÃO</Text></Th>
                      <Th w={'20%'}><Text textAlign={'center'} fontSize={'15px'}>Status</Text> </Th>
                      <Th w={'20%'}><Text textAlign={'center'} fontSize={'15px'}>Data</Text> </Th>


                    </Tr>
                  </Thead>
                  <Tbody>
                    {data.map((e, index) => {
                      return (
                        <MeuComponente e={e} index={index} />
                      )
                    })}


                  </Tbody>

                </Table>
              </TableContainer>
            </Box>
          </Box>

        </Flex>
      </>
    )
  }

}
