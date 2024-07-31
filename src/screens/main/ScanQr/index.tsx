import React, { useEffect, useRef, useState } from 'react';
import { Image, Pressable, SafeAreaView, ScrollView, StatusBar, Text, View } from 'react-native';
import { appStyles } from '../../../utils/AppStyles';
import { colors } from '../../../utils/colors';
import CustomText from '../../../components/CustomText';
import { font } from '../../../utils/font';
import { images } from '../../../assets';
import InfoHeader from '../../../components/InfoHeader';
import { useCameraPermissions } from './Permissions/useCameraPermission';

type Props = {
    navigation?: any;
};

const ScanQr: React.FC<Props> = ({ navigation }: Props) => {

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                backgroundColor: colors.white,
            }}
            style={{
                backgroundColor: colors.white,
                flex: 1,
            }}
        >
           
        </ScrollView>
    );
};

export default ScanQr;
