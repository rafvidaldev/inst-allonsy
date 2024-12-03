import React, {useState, useEffect, memo} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground, ImageSourcePropType} from 'react-native';
import { IFeedPost } from '@/interfaces/feedPost';
import { Link, Href, useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import Video from './Video';

interface FeedItemProps {
    item: IFeedPost
    autoPlay?: boolean,
    userId?: number | null,
    endPost?: boolean,
    playingMediaURI?: string,
    handlePlayOnFeed?: (mediaURI:string) => void
}

function FeedItem({item, autoPlay, userId, endPost, playingMediaURI, handlePlayOnFeed}:FeedItemProps){    
    const router = useRouter();
    const [playing, setPlaying] = useState<boolean>(autoPlay ? true : false);

    useEffect(() => {
        if(playingMediaURI !== item.mediaURI) setPlaying(false);
    }, [playingMediaURI])

    const handlePlay = ():void => {
        setPlaying(true);
        if(handlePlayOnFeed) handlePlayOnFeed(item.mediaURI);
    }

    let videoSource = getVideoSource(item.mediaURI);
    let thumbSource = getVideoThumbSource(item.mediaURI);
    let avatarSource = getAvatarSource(item.userId);
    let thumbColor = picRandomThumbColor();

    return(
        <View style={styles.mainContainer}>
            {userId ?
                <View>
                    {userId.toString() === item.userId.toString() ?
                        <Text>Postado por {item.userName}</Text>
                    :
                        <Text>Compartilhado de {item.userName}</Text>
                    }
                </View>                      
            :
                <Link href={`/user-profile/${item.userId}` as Href}>
                    <View style={styles.avatarContainer}>
                        <Image source={avatarSource} style={styles.avatar}></Image>
                    </View>      
                    <View style={styles.userNameContainer}>
                        <Text style={styles.userName}>{item.userName}</Text>                        
                    </View>
                </Link> 
            }
            <View>
                {playing ? 
                    <Video source={videoSource} stop={() => setPlaying(false)}/>
                :
                    <View>
                        {thumbSource ?
                            <ImageBackground source={thumbSource} style={styles.mediaContainer}>
                                <TouchableOpacity onPress={handlePlay}>                                    
                                    <View style={styles.titleContainer}>
                                        <Ionicons name={'play'} size={60} color="white" />
                                        <Text style={styles.titleLabel}>{item.title}</Text> 
                                    </View>                                    
                                </TouchableOpacity>
                            </ImageBackground>
                        :
                            <View style={[styles.mediaContainer, {backgroundColor: thumbColor}]}>
                                <TouchableOpacity onPress={handlePlay}>
                                    
                                    <View style={styles.titleContainer}>
                                        <Ionicons name={'play'} size={60} color="white" />
                                        <Text style={styles.titleLabel}>{item.title}</Text> 
                                    </View>
                                </TouchableOpacity>
                            </View>
                        }
                        
                    </View>
                    
                }
            </View>
            
            {(!userId && !endPost) &&
                <View style={styles.actionsContainer}>
                    <TouchableOpacity onPress={() => router.push(`/post/${item.id}`)}>
                        <Text style={styles.actionsLabel}>Ver (curtir | comentar | compartilhar {userId})</Text>
                    </TouchableOpacity>
                </View>
            }
        </View>
    )
}

export default memo(FeedItem);

const styles = StyleSheet.create({
    mainContainer: {
        paddingVertical: 10,
        backgroundColor: '#def1ff',
        marginVertical: 5,
        padding: 5
    },
    avatarContainer: {
        marginLeft: 8,
        height: 45,
        width: 45,
        borderRadius: 40
    },
    avatar: {
        height: 45,
        width: 45,
        borderRadius: 40,
    },
    userNameContainer: {
        marginLeft: 80
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    mediaContainer: {
        marginTop: 5,
        paddingBottom: 2,
        paddingTop: 100,
        width: '100%',
        height: 300,
        alignItems: 'center'
    },
    video: {
        width: '100%',
        height: 300,
    },
    controlContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center'
    },
    btnPlayPauseContainer: {
        backgroundColor: 'white',
        borderRadius: 3,
        padding: 2,
        margin: 5
    },
    titleContainer: {
        padding: 20,
        borderRadius: 15,
        opacity: .7,
        backgroundColor: 'black',
        alignItems: 'center'
    },
    titleLabel: {
        fontSize: 25,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white'
    },
    actionsContainer: {
        paddingLeft: 10
    },
    actionsLabel: {
        fontSize: 15,
        textAlign: 'right',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        color: 'rgb(16, 93, 147)',
        paddingBottom: 5,
        paddingRight: 5
    }
});

const getAvatarSource = (userId:number):ImageSourcePropType => {
    switch(userId){
        case 1: return require('../assets/images/avatar/1.png');
        case 2: return require('../assets/images/avatar/2.png');
        case 3: return require('../assets/images/avatar/3.png');
        default: return require('../assets/images/avatar/0.png');
    }
}

const getVideoSource =  (videoURI:string):string => {
    switch(videoURI){
        case '1': return require('../assets/videos/1.mp4');
        case '2': return require('../assets/videos/2.mp4');
        case '3': return require('../assets/videos/3.mp4');
        case '4': return require('../assets/videos/4.mp4');
        case '5': return require('../assets/videos/5.mp4');
        case '6': return require('../assets/videos/6.mp4');
        default: return videoURI;
    }
}

const getVideoThumbSource =  (videoURI:string):ImageSourcePropType | undefined => {
    switch(videoURI){
        case '1': return require('../assets/images/thumbnails/1.png');
        case '2': return require('../assets/images/thumbnails/2.png');
        case '3': return require('../assets/images/thumbnails/3.png');
        case '4': return require('../assets/images/thumbnails/4.png');
        case '5': return require('../assets/images/thumbnails/5.png');
        case '6': return require('../assets/images/thumbnails/6.png');
        default: return undefined;
    }
}

const picRandomThumbColor = ():string => {
    let code = Math.floor(Math.random() * 10);

    switch(code){
        case 0: return '#ff0000';
        case 1: return '#4287f5';        
        case 2: return '#ffa600';
        case 3: return '#ffbf00';
        case 4: return '#11b853';
        case 5: return '#d138b8';
        case 6: return '#752238';
        case 7: return '#22756a';
        case 8: return '#432275';
        case 9: return '#733a14';
        default: return '#ff0000'
    }
}

