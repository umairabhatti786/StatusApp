import { BlurView, VibrancyView } from '@react-native-community/blur';
import React from 'react';
import { ScrollView, Text, useWindowDimensions, SafeAreaView, View, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import Modal from 'react-native-modal';

interface Props {
    isModalVisible?: boolean;
    setModalVisible?: React.Dispatch<React.SetStateAction<boolean>>;
    children?: React.ReactNode;
    backdropStyle?: any
    paddingTop?:any
    justifyContent?:any
    modalBackgroundColor?:any
}

const CustomModal: React.FC<Props> = ({ isModalVisible, setModalVisible, children, backdropStyle,justifyContent,paddingTop,modalBackgroundColor }) => {
    const windowWidth = useWindowDimensions().width;

    return (
        <Modal
            style={{...styles.modalContainer,
                justifyContent: justifyContent ||"flex-start",
                paddingTop:paddingTop || "50%",
                backgroundColor:modalBackgroundColor
            }}
            animationIn='slideInUp'
            animationOut='slideOutDown'
            deviceWidth={windowWidth}
            isVisible={isModalVisible}
            onBackButtonPress={() => setModalVisible?.(false)}
            onBackdropPress={() => setModalVisible?.(false)}
            backdropColor='transparent'
            customBackdrop={

               
                    <Pressable
                        style={{ height: "100%", width: "100%" }}
                        onPress={
                            () =>
                                setModalVisible?.(false)
                        }
                    >
                    </Pressable>
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
