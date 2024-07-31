import { BlurView, VibrancyView } from '@react-native-community/blur';
import React from 'react';
import { ScrollView, Text, useWindowDimensions, SafeAreaView, View, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import Modal from 'react-native-modal';
import { colors } from '../../utils/colors';

interface Props {
    isModalVisible?: boolean;
    setModalVisible?: React.Dispatch<React.SetStateAction<boolean>>;
    children?: React.ReactNode;
    backdropStyle?: any
    paddingTop?:any
    justifyContent?:any
    onbackDropPress?:any
}

const CustomModal: React.FC<Props> = ({ isModalVisible, setModalVisible, children, backdropStyle,justifyContent,paddingTop,onbackDropPress }) => {
    const windowWidth = useWindowDimensions().width;

    return (
        <Modal
            style={{...styles.modalContainer,
                justifyContent: justifyContent ||"flex-start",
                paddingTop:paddingTop || "40%"
            }}
            animationIn='slideInUp'
            animationOut='slideOutDown'
            deviceWidth={windowWidth}
            isVisible={isModalVisible}
            onBackButtonPress={() => setModalVisible?.(false)}
            onBackdropPress={() => setModalVisible?.(false)}
            backdropColor='transparent'
            customBackdrop={

                <BlurView
                    blurAmount={100}
                    blurRadius={15}
                    blurType="light"
                    style={{
                        flex: 1,
                        opacity: 1,
                        backgroundColor: colors.offWhite,
                        ...backdropStyle
                    }} >
                    <Pressable
                        style={{ height: "100%", width: "100%" }}
                        onPress={
                            () =>
                            {
                                if(onbackDropPress){
                                    onbackDropPress()
    
                                    return
                                }
                                setModalVisible?.(false)

                            }
                           

                        }
                        // onPress={
                        //     () =>

                        //         setModalVisible?.(false)
                        // }
                    >
                    </Pressable>
                </BlurView>
            }
        >
            {children}
        </Modal >
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        margin: 0,
      
    },
});

export default CustomModal;
