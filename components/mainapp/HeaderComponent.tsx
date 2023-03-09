import React, { useState, useEffect } from 'react'
import {
    Flex, Icon, Box, Text, Button, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Radio, RadioGroup, Stack, useColorMode, Input, Select
} from '@chakra-ui/react'
import { MdOutlineKeyboardBackspace } from 'react-icons/md'
import { IoIosPerson } from 'react-icons/io'
import { useGlobalState, setGlobalState } from "@/globalStates"
import {
    getOnlineOperators,
    setChatStatus
} from '@/helpers/request'
import { BiTransferAlt } from 'react-icons/bi'
import { transferirChat, addMsgSystem, getDepartaments } from '@/helpers/request'
export default function HeaderComponent() {

    const [name, setName] = useGlobalState<any>("chatData")
    const [id, setId] = useGlobalState("defaultCurrency")
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    const [uid, setUid] = useState('')
    const { toggleColorMode, colorMode } = useColorMode();
    const [filtered, setFiltered] = useState("")
    const [names, setNames] = useGlobalState("names")
    const [dep_id, setDep_id] = useState("")
    const [selected, setSelected] = useState("0")
    const [chatTransferidoTo, setChatTransferidoTo] = useState("")
    const [departaments, setDepartaments] = useState([]);
    let datas: Array<any> = []

    function closeChat() {
        addMsgSystem(id, "2", "").then(response => {

        })
        setChatStatus(id, 2).then(() => {
            setId(0)
        })

    }

    function getClientOnlineOperators() {
        getOnlineOperators().then(response => {

            datas = response.data.map(data => ({ id: data.user.id, name: data.user.name, dep_id: data.dep_id }))
            datas.sort((a, b) => a.id - b - id)
            setNames(datas)
            // console.log(response)
        })
    }

    function transferChat() {
        addMsgSystem(id, "0", chatTransferidoTo).then(response => {
            // console.log("feito")
        })
        transferirChat(id, uid, dep_id).then(response => {
            // console.log(response)
            setGlobalState("defaultCurrency", 0)

        })

    }

    function filtermsgs() {
        const onlineOps = names.filter(name =>
            Object.values(name).some(valor =>
                typeof valor === "string" && valor.toLocaleLowerCase().includes(filtered.toLocaleLowerCase())
            )
        );
        // console.log(onlineOps)
        setNames(onlineOps)
    }

    function getDepartamentos() {
        const res = getDepartaments().then((res) => {
            // console.log(res.data.result)
            setDepartaments(res.data.result)
        })

    }

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         getClientOnlineOperators()
    //         console.log('ok')
    //     }, 10000)
    //     return () => {
    //         clearInterval(interval);
    //     };

    // }, [])

    useEffect(() => {
        if (filtered.length === 0) {
            getClientOnlineOperators()
            return
        } else filtermsgs()
    }, [filtered])

    useEffect(() => {
        getClientOnlineOperators()
    }, [])

    useEffect(() => {
        getDepartamentos()
    }, [])

    let namesShow = names.slice();
    if (selected !== "0") {
        const filtereds = names.slice().filter(id => id.dep_id.toString() === selected.toString())
        namesShow = filtereds;
    }
    namesShow = namesShow.sort((a, b) => a.name.localeCompare(b.name));

    return (
        <Flex justifyContent={'center'} w='95%' h='100%'>

            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Transferir chat para</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Box>
                            <Select onChange={(e) => setSelected(e.target.value)} mb={'10px'}>
                                <option value={'0'}>Todos</option>
                                {departaments.map(e => {
                                    return (
                                        <option value={e.id}>{e.name}</option>
                                    )
                                })}
                            </Select>
                            <Input value={filtered} onChange={(e) => setFiltered(e.target.value)} mb={'10px'} placeholder='Pesquisar usuario..' type='text' />
                        </Box>
                        <RadioGroup onChange={(e) => { setUid(e) }} value={uid}>
                            <Stack direction='column'>
                                {namesShow.map(e => {
                                    const department = departaments.find(item => e.dep_id === item.id);

                                    return (
                                        <Box onClick={() => [setDep_id(e.dep_id), setChatTransferidoTo(e.name)]}>
                                            <Radio id={e.dep_id} value={(e.id).toString()}>
                                                {e.name} -
                                                <Text as={'span'} color={colorMode === "dark" ? "cyan" : "blue.300"}>
                                                    {" "} {department?.name}
                                                </Text>
                                            </Radio>
                                        </Box>
                                    )
                                })}
                            </Stack>
                        </RadioGroup>

                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={transferChat} colorScheme='blue' mr={3}>
                            Transferir
                        </Button>
                        <Button onClick={onClose}>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Flex flex={1} alignItems={'center'} h='full'>

                <Icon onClick={() => [setGlobalState("defaultCurrency", 0), setGlobalState("isOpenChat", false)]} transition={'0.1s all linear'} cursor={'pointer'} _hover={{ color: 'blue.700' }}
                    mr={'10px'} fontSize={'30px'} as={MdOutlineKeyboardBackspace} />
                <Flex justifyContent={'center'} alignItems='center'>
                    <Box mr={'10px'} borderRadius={'full'} alignItems={'center'} w='40px' h='40px' bg={colorMode === "light" ? "gray.200" : "transparent"}
                        display='flex' justifyContent={'center'}>
                        <Icon fontSize={'30px'} as={IoIosPerson} />
                    </Box>
                    <Box>
                        <Text fontSize={'17px'}>{name.nick}</Text>
                        <Text color={'gray.500'} mt={'-5px'} fontSize={'15px'}>T.I</Text>

                    </Box>
                </Flex>
            </Flex>

            <Flex justifyContent={'flex-end'} alignItems='center' flex={'1'}>
                <Button id={String(id)} onClick={() => closeChat()} transition={'0.1s all linear'} cursor={'pointer'} mr={'15px'} bg='blue.400' fontWeight={'300'} color={'white'}>Encerrar</Button>
                <Icon onClick={onOpen} transition={'0.1s all linear'} cursor={'pointer'} _hover={{ color: 'green' }} fontSize={'30px'} as={BiTransferAlt} />

            </Flex>


        </Flex>
    )
}
