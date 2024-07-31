import { Image, Pressable, Text, View } from 'react-native'
import { images } from '../../assets'
import { colors } from '../../utils/colors'
import {
    LoginButton,
    AccessToken,
    LoginManager,
    Profile,
    Settings,
} from "react-native-fbsdk-next";
import { useEffect } from 'react';
type Props = {
    bgColor?: string
    respanseData?: any
}

const FacebookButton = ({ bgColor, respanseData }: Props) => {

    useEffect(() => {
        Settings.setAppID('371059782002541');
    }, [])
    const loginAuto = async () => {
        try {
            const result = await LoginManager.logInWithPermissions([
                "public_profile",
                "email",
            ]);
            AccessToken.getCurrentAccessToken().then(async (data: any) => {
                const profile = await Profile.getCurrentProfile();
                let obj = {
                    accessToken: data.accessToken.toString(),
                    ...profile,
                };
                respanseData(obj);
            });
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Pressable
            style={{
                height: 56,
                width: 56,
                backgroundColor: colors.white,
                borderRadius: 12,
                justifyContent: "center",
                alignItems: "center",
                elevation: 5,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 2,
            }}
            onPress={loginAuto}
        >
            <View style={{ width: 60, height: 60, borderRadius: 15, justifyContent: "center", alignItems: "center", backgroundColor: bgColor }}>
                <Image
                    source={images.faceboook}
                    style={{ width: 35, height: 35 }}
                />
            </View>
        </Pressable>
    )
}
export default FacebookButton
