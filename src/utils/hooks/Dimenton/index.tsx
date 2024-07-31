import { useEffect, useState } from "react";
import { Dimensions } from "react-native";
export const getDimensions = () => {
    const [windowDimensions, setWindowDimensions] = useState({
        windowWidth: Dimensions.get("screen").width,
        windowHeight: Dimensions.get("screen").height,
        isPortrait: Dimensions.get("screen").height > Dimensions.get("screen").width,
    });

    useEffect(() => {
        const updateDimensions = () => {
            const newWidth = Dimensions.get("screen").width;
            const newHeight = Dimensions.get("screen").height;
            const isPortrait = newHeight > newWidth;

            setWindowDimensions({
                windowWidth: newWidth,
                windowHeight: newHeight,
                isPortrait,
            });
        };

        Dimensions.addEventListener('change', updateDimensions);

        return () => {
            Dimensions.removeEventListener('change', updateDimensions);
        };
    }, []);

    return windowDimensions;
};