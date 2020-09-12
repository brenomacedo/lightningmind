import React, { FC, useEffect, useMemo, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Video } from 'expo-av'
import { AVPlaybackStatus } from 'expo-av/build/AV'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'

interface VideoComponentProps {
    uri: string
}

const VideoComponent: FC<VideoComponentProps> = ({ uri }) => {

    let video: Video | null

    useEffect(() => {
        const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
            if(status.isLoaded) {

                if(status.durationMillis) {
                    const durationMillis = status.durationMillis
                    const progress = status.positionMillis / status.durationMillis
                    setProgress(progress)
                }
                setStatus(status)
            }
        }
        video?.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate)
    }, [])

    const [status, setStatus] = useState<AVPlaybackStatus>()
    const [progress, setProgress] = useState(0)
    const [isPaused, setIsPaused] = useState(true)

    const durationMillis = useMemo(() => status?.isLoaded && status.durationMillis, [status?.isLoaded])

    const pausePlay = async () => {
        if(isPaused) {
            await video?.playAsync()
        } else {
            await video?.pauseAsync()
        }
        setIsPaused(!isPaused)
    }

    const backFiveSeconds = async () => {
        if(durationMillis) {
            await video?.setPositionAsync((progress * durationMillis) - 5000)
        }
    }

    const forwardFiveSeconds = async () => {
        if(durationMillis) {
            await video?.setPositionAsync((progress * durationMillis) + 5000)
        }
    }

    return (
        <>
            <Video isLooping source={{ uri }} volume={1} style={{ height: 300, borderRadius: 8, backgroundColor: 'black' }}
            resizeMode='contain' ref={ref => {video = ref}} />
            <View style={styles.videoOptions}>
                <View style={styles.bar}>
                    <View style={[styles.progress, { width: `${progress * 100}%` }]}>
                        <View style={styles.progressBall}></View>
                    </View>
                </View>
                <View style={styles.controllers}>
                    <TouchableOpacity style={{ marginRight: 30 }} onPress={backFiveSeconds}>
                        <Feather color='black' size={30} name='skip-back' />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={pausePlay}>
                        {isPaused ? <Feather color='black' size={30} name='play' />
                        : <Feather color='black' size={30} name='pause' />}
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginLeft: 30 }} onPress={forwardFiveSeconds}>
                        <Feather color='black' size={30} name='skip-forward' />
                    </TouchableOpacity>
                </View>
            </View> 
        </>  
    )
}

const styles = StyleSheet.create({
    bar: {
        width: '90%',
        height: 10,
        backgroundColor: '#a3a2a3',
        borderRadius: 10,
        marginTop: 12
    },
    progress: {
        height: 10,
        backgroundColor: '#00a6ff',
        borderRadius: 10,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    progressBall: {
        width: 15,
        height: 15,
        borderRadius: 15,
        backgroundColor: '#5522ff',
        transform: [
            { translateX: 6 }
        ]
    },
    videoOptions: {
        alignItems: 'center'
    },
    controllers: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 70,
        flexDirection: 'row'
    }
})

export default VideoComponent