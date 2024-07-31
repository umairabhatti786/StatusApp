
import dynamicLinks from "@react-native-firebase/dynamic-links";
export const createDynamicLink = async (data: any,) => {

  try {
    const link = await dynamicLinks().buildShortLink(
      {
        link: `https://loyaltyreferral.page.link/Sohr?id=${data?.id}`,
        domainUriPrefix: "https://loyaltyreferral.page.link",
        navigation: {
          forcedRedirectEnabled: true,
        },
      
        android: {
          packageName: "com.loyalty",
          // fallbackUrl: "https://play.google.com/store/apps/details?id=com.pawspact",
        },
        ios: {
          bundleId: "org.loyalty.app",
          fallbackUrl: "https://apps.apple.com/us/app/pawspact/id6474254451",
          appStoreId: "6474254451",
        },
      },
      // dynamicLinks.ShortLinkType.DEFAULT
    );

    console.log("Dynamic link:", link);
    return link;
  } catch (error) {
    console.error("Error creating dynamic link:", error);
    return null;
  }
};


 export const checkDynamicLink = async () => {
    try {
      const link = await dynamicLinks().getInitialLink();
      if (link?.url) {
        const id = link.url.split("=").pop();
        return id;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error handling dynamic link:", error);
      throw error;
    }
  };