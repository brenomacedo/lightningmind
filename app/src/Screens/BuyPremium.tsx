import React, { useMemo, useState } from 'react'
import { Text, View, StyleSheet, Modal, Alert, TouchableOpacity } from 'react-native'
import Lottie from 'lottie-react-native'
import { KEY } from '../consts'
import { TextInput, RectButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import api from '../api/api'
import { useDispatch, useSelector } from 'react-redux'
import IState from '../Reducers/reducersTypes'
import { useNavigation } from '@react-navigation/native'
import { setUser, setUserPremium } from '../ActionCreators/userActions'

const BuyPremium = () => {

    const [isVisible, setIsVisible] = useState(false)
    const [number, setNumber] = useState('')
    const [cvc, setCvc] = useState('')
    const [exp, setExp] = useState('')
    const [status, setStatus] = useState<"LOADING" | "NOTHING">("NOTHING")
    const dispatch = useDispatch()
    const navigation = useNavigation()

    const onChangeNumber = (t: string) => {
        let string = t
        let newString = ''
        for(let n = 0; n < 19; n++) {
            if(string[n]) {
                if(n === 3 || n === 7 || n === 11) {
                    newString = newString + string[n] + ' '
                } else {
                    newString = newString + string[n]
                }
            }
        }
        setNumber(newString)      
    }

    const onChangeExp = (t: string) => {
        let string = t
        let newString = ''
        for(let n = 0; n < 4; n++) {
            if(string[n]) {
                if(n === 1) {
                    newString = newString + `${string[n]}/`
                } else {
                    newString = newString + string[n]
                }
            }
        }

        setExp(newString)
    }

    const pay = async () => {
        const params = new URLSearchParams()
        const cardNumber = number.split(' ').join('')
        params.append('card[number]', cardNumber)
        params.append('card[cvc]', cvc)
        params.append('card[exp_month]', exp.split('/')[0])
        params.append('card[exp_year]', exp.split('/')[1])
        params.append('card[address_country]', 'Brazil')
        
        const resp = await api.post("https://api.stripe.com/v1/tokens", params.toString(), {
            headers: {
                'Content-Type': "application/x-www-form-urlencoded",
                Authorization: 'Bearer pk_test_51HNSflGgw2VXXk4wvRPCtp5J6fbxfolGQiTXIKrURL6nxEW3D2zraZIuVFAiOC2DcCVj7UU6jipyuONHqKWkUJMo00LX7ARr1D'
            }
        })

        const data = {
            token: {...resp.data, email: "zbrenoopvp@gmail.com" },
            product: {
                name: "PREMIUM",
                price: 15,
                productBy: "lightningmind"
            }
        }

        try {
            setStatus("LOADING")
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve('done')
                }, 2000)
            })
            await api.post('/premium/buy', data)
            Alert.alert('Thanks for buying', 'your premium was activated!')
            setStatus("NOTHING")
            setIsVisible(false)
            setNumber('')
            setCvc('')
            setExp('')
            dispatch(setUserPremium())
            navigation.goBack()
        } catch(e) {
            console.log(e)
        }
    }

    const buttonOrAnimation = () => {
        if(status === "NOTHING") {
            return (
                <TouchableOpacity onPress={pay} style={styles.payButton}>
                    <Text style={styles.payText}>Buy for R$10</Text>
                </TouchableOpacity>
            )
        }

        if(status === "LOADING") {
            return (
                <View style={styles.animationContainer}>
                    <Lottie style={{ width: 80 }} source={require('../Animations/loading.json')} loop autoPlay />
                </View>
            )
        }
    }

    return (
        <View style={styles.container}>
            <Lottie style={styles.animation} loop autoPlay source={require('../Animations/star.json')} />
            <View>
                <Text style={styles.text}>Wanna store your favorite videos in a tab just for you? Buy prime now!</Text>
                <RectButton onPress={() => setIsVisible(true)} style={styles.buypremium}>
                    <Text style={styles.buypremiumText}>Buy premium</Text>
                </RectButton>
            </View>
            <Modal transparent animationType="slide" visible={isVisible}>
                <View style={styles.paymentFormContainer}>
                    <TouchableOpacity style={{ marginBottom: 20 }} onPress={() => setIsVisible(false)}>
                        <Feather size={40} name='x' color='white' />
                    </TouchableOpacity>
                    <View style={styles.paymentForm}>
                        <View>
                            <Text style={styles.inputText}>Your card nubmer</Text>
                            <TextInput keyboardType="numeric" maxLength={19}
                            placeholder="1234 1234 1234 1234" style={styles.input100}
                            value={number} onChangeText={t => onChangeNumber(t.replace(/[^0-9]/g, ''))} />
                        </View>
                        <View style={styles.inputContainer}>
                            <View style={styles.input50ContainerR}>
                                <Text style={styles.inputText}>CVC</Text>
                                <TextInput placeholder="123" style={styles.input100} maxLength={3}
                                value={cvc} onChangeText={t => setCvc(t.replace(/[^0-9]/g, ''))} />
                            </View>
                            <View style={styles.input50ContainerL}>
                                <Text style={styles.inputText}>Expires in</Text>
                                <TextInput placeholder="12/12" style={styles.input100} maxLength={5}
                                value={exp} onChangeText={t => onChangeExp(t.replace(/[^0-9]/g, ''))} />
                            </View>
                        </View>
                        {buttonOrAnimation()}
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#009dff",
        alignItems: 'center',
        padding: 40
    },
    animation: {
        width: 300
    },
    text: {
        fontSize: 18,
        fontFamily: "PTSans_700Bold",
        color: 'white',
        textAlign: 'center',
    },
    buypremium: {
        width: 300,
        height: 60,
        backgroundColor: "#00ff77",
        borderRadius: 8,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
    },
    buypremiumText: {
        color: 'white',
        fontFamily: 'PTSans_700Bold',
        fontSize: 18,
        
    },
    paymentFormContainer: {
        paddingVertical: 30,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)'
    },
    paymentForm: {
        borderRadius: 8,
        width: '80%',
        padding: 15,
        backgroundColor: '#d6ffe9'
    },
    input100: {
        width: '100%',
        padding: 10,
        borderRadius: 8,
        borderWidth: 3,
        borderColor: 'blue',
        fontSize: 18,
        fontFamily: 'PTSans_700Bold'
    },
    input50: {
        width: '50%',
        padding: 10,
        borderRadius: 8,
        borderWidth: 3,
        borderColor: 'blue',
        fontSize: 18,
        fontFamily: 'PTSans_700Bold'
    },
    inputContainer: {
        flexDirection: 'row',
        marginTop: 10
    },
    inputText: {
        fontFamily: 'PTSans_400Regular',
        marginBottom: 5,
        fontSize: 18
    },
    input50ContainerL: {
        width: '50%',
        paddingLeft: 4
    },
    input50ContainerR: {
        width: '50%',
        paddingRight: 4
    },
    payButton: {
        paddingVertical: 10,
        backgroundColor: '#4287f5',
        marginTop: 10,
        borderRadius: 8
    },
    payText: {
        fontFamily: 'PTSans_700Bold',
        color: 'white',
        textAlign: 'center'
    },
    animationContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    }
})

export default BuyPremium