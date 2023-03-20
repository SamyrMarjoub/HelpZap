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
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Checkbox,
    Stack,
    CheckboxGroup,
    useCheckbox,
    Select

} from '@chakra-ui/react'
import { BiDetail } from 'react-icons/bi'
import { BsClock, } from 'react-icons/bs'
import { useGlobalState, setGlobalState } from "@/globalStates"
import dayjs from 'dayjs'
import { MdOutlineClose, MdSubject } from 'react-icons/md'
import axios from 'axios'

export default function Acorddions(chatdata: any) {

    const [chatdatas, setChatdata] = useGlobalState<any>("chatData")
    const [jsonData, setJsonData] = useState([{}])
    const [Assuntos, setAssuntos] = useState([])
    const [ownData, setOwnData] = useGlobalState("OwnData")
    const [id, setId] = useGlobalState("defaultCurrency")
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [allSubjects, setAllSubjects] = useState([])
    const [isChecked, setIsChecked] = useState(false);
    const [ids, setIds] = useState("")
    const [isRepetido, setIsRepetido] = useState(false)
    const [subject_id, setsubjectId] = useState("")

    async function getAssuntos() {
        const response = await axios.get(`http://localhost:3000/api/getAssunto/${id}`)
        setAssuntos(response.data)
        // console.log(response.data)
        setIds(response.data.map((id) => String(id.subject_id)))

    }

    async function getAllAssuntos() {
        const response = await axios.get(`http://localhost:3000/api/getAllAssuntos/${ownData.departments_ids}`)
        let uniqueArr = response.data.filter((obj, index, self) =>
            index === self.findIndex((o) => o.id === obj.id && o.name === obj.name)
        );
        setAllSubjects(uniqueArr)
    }

    async function removerAssunto(Id: number) {
        const subject_id = Id
        const response = await axios.delete(`http://localhost:3000/api/removeAssunto/${id}`, { data: { subject_id: subject_id } })
        getAssuntos()
    }

    function addAssunto() {
        const response = axios.get(`http://localhost:3000/api/existsAssunto/assunto`, { params: { subject_id: subject_id, id: id } }).then(async (res) => {
            // console.log(res.data)
            if (res.data.length !== 0) {
                // console.log("Assunto já colocado!")
                setIsRepetido(false)
            } else {
                const res = axios.post(`http://localhost:3000/api/inserirAssunto/${id}`, { subject_id: subject_id }).then((res) => {
                    getAssuntos()
                })


            }
        })

    }

    useEffect(() => {
        if (ownData.length !== 0) {
            getAssuntos()
            getAllAssuntos()
        } else {
            return
        }
    }, [ownData])

    useEffect(() => {
        // console.log(isChecked)
    }, [isChecked])

    useEffect(() => {
        if (chatdatas.additional_data) {
            setJsonData(JSON.parse(chatdatas.additional_data))
        } else
            return
    }, [])

    return (
        <Flex w='100%' h='auto'>

            <Box w={'100%'} display='flex' alignItems='flex-end' h='100%'>
                <Accordion w='100%' allowToggle>
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
                                {/* <ListItem color={'whiteAlpha.900'}>ID do chat: {useGlobalState("defaultCurrency")}</ListItem> */}
                                {jsonData.map((e: any, index: any) => {
                                    return (
                                        <>
                                            <ListItem key={"aaa" + index} color={'whiteAlpha.900'}>{e.key} - {e.value}</ListItem>

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
                                <ListItem>Criado em:
                                    { } {dayjs.unix(chatdata.chatdata.time).date() < 10 ? `0${dayjs.unix(chatdata.chatdata.time).date()}` : dayjs.unix(chatdata.chatdata.time).date()}/
                                    {dayjs.unix(chatdata.chatdata.time).month() < 10 ? `0${dayjs.unix(chatdata.chatdata.time).month()}` : dayjs.unix(chatdata.chatdata.time).month()}/
                                    {dayjs.unix(chatdata.chatdata.time).year() < 10 ? `0${dayjs.unix(chatdata.chatdata.time).year()}` : dayjs.unix(chatdata.chatdata.time).year()} - { }
                                    {dayjs.unix(chatdata.chatdata.time).hour() < 10 ? `0${dayjs.unix(chatdata.chatdata.time).hour()}`
                                        : dayjs.unix(chatdata.chatdata.time).hour()}:
                                    {dayjs.unix(chatdata.chatdata.time).minute() < 10 ? `0${dayjs.unix(chatdata.chatdata.time).minute()}`
                                        : dayjs.unix(chatdata.chatdata.time).minute()}
                                </ListItem>

                                <ListItem color={'whiteAlpha.900'}>Started wait at: {dayjs.unix(chatdata?.chatdata.pnd_time).fromNow()}</ListItem>

                            </UnorderedList>
                        </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem>
                        <h2>
                            <AccordionButton>
                                <Box color={'white'} mt={'10px'} as="span" flex='1' textAlign='left'>
                                    <Icon mr={'10px'} fontSize={'23px'} float='left' color='white' as={MdSubject} />
                                    Assuntos
                                </Box>
                                <AccordionIcon color={'white'} />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            <UnorderedList position={'relative'} listStyleType={'none'} fontSize={'13px'} mt={'-5px'} color={'white'}>


                                {Assuntos.map((e, index) => {

                                    function Item({ e, index }) {

                                        const [selected, setSelected] = useState(false)

                                        return (
                                            <>
                                                <ListItem onMouseEnter={() => setSelected(true)} onMouseLeave={() => setSelected(false)} key={"acc" + index} marginBottom='5px' color={'cyan'}>{e.name}

                                                    {selected ? <Icon onClick={() => removerAssunto(e.subject_id)} fontSize={'20px'} color='white' position={'absolute'} right='0' as={MdOutlineClose} cursor='pointer' />
                                                        : null}
                                                </ListItem>

                                            </>
                                        )

                                    }
                                    return <Item key={"ttt"+index} e={e} index={index} />
                                })}

                            </UnorderedList>
                            <Button onClick={onOpen} mt={'15px'} width='100%'>Adicionar assuntos</Button>

                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Edição de assuntos</ModalHeader>
                        <ModalCloseButton />


                        <ModalBody>

                            {/* <CheckboxGroup onChange={setIds} value={ids}>
                                <Stack spacing={1} direction='column'>
                                    {allSubjects.map(((e, index) =>

                                    (<Checkbox onChange={()=>setIsChecked(!isChecked)} key={index} value={String(e.subject_id)} >{e.name}</Checkbox>
                                    )))}
                                </Stack>
                            </CheckboxGroup> */}
                            <Select onChange={(e) => setsubjectId(e.target.value)} placeholder='Selecione um assunto'>
                                {allSubjects.map(((e, index) =>

                                (<option key={"uuuu"+index} value={String(e.subject_id)} >{e.name}</option>
                                )))}
                            </Select>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='gray' mr={'10px'} onClick={onClose}>
                                Fechar
                            </Button>
                            <Button colorScheme='blue' mr={'10px'} onClick={() => addAssunto()}>
                                Adicionar
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Box>
        </Flex >
    )
}
