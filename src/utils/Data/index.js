import { images } from "../../assets";
import { colors } from "../colors";


export const ActiveOrder = {
    Pending: "0",
    Accepted: "1",
    pickUp: "2",
    transit: "3",
  };

  export const PastOrder = {
    Completed: "4",
    Cancelled: "5",
  };

export const pickupData=[
    "Delivery",
    "Self-Pickup / Drive thru",
    "Dine-In"
]

export const featureCardData = [
    {
        title: "Buy One Get One Free*",
        time: "30 minutes",
        delievery: "Free Deleivery",
        rating: "3.4",
        image: images.mask
    },
    {
        title: "Buy One Get One Free***",
        time: "40 minutes",
        delievery: "Free Deleivery",
        rating: "4.4",
        image: images.mask
    },
    {
        title: "Buy One Get One Free***",
        time: "40 minutes",
        delievery: "Free Deleivery",
        rating: "4.4",
        image: images.mask
    },
    {
        title: "Buy One Get One Free***",
        time: "40 minutes",
        delievery: "Free Deleivery",
        rating: "4.4",
        image: images.mask
    },
    {
        title: "Buy One Get One Free***",
        time: "40 minutes",
        delievery: "Free Deleivery",
        rating: "4.4",
        image: images.mask
    },
]
export const homeBanner = [
    {
        title: "Lorem Ipsum",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dictum nec sem a elementum. Ut volutpat metus et metus condimentum...",
        image: images.homeBanner1
    },
    {
        title: "Lorem Ipsum",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dictum nec sem a elementum. Ut volutpat metus et metus condimentum...",
        image: images.homeBanner2
    },
    {
        title: "Lorem Ipsum",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dictum nec sem a elementum. Ut volutpat metus et metus condimentum...",
        image: images.homeBanner1
    },
]


export const orderDesitnationList=[
   {
        latitude: 31.559970380399194,
        longitude: 74.3184922245439,
      },
    
     {
        latitude: 31.549970380399194,
        longitude: 74.3584922245439,
        destination:true
      }
    ]

export const storeList=[
    {
        latitude:31.527670380399194,
        longitude:74.3484922245439

    },
   
    {
        latitude:31.529970380399194,
        longitude:74.3484922245439

    },

    {
        latitude:31.537670380399194,
        longitude:74.3284922245439

    },
   
    {
        latitude:31.529970380399194,
        longitude:74.3184922245439

    },
    {
        latitude:31.549970380399194,
        longitude:74.3584922245439

    },
   


]
export const currentPlan = {
    name: "Golden",
    description: [
        "Lorem ipsum dolor sit amet",
        "Lorem ipsum dolor sit amet ab ipsam reiciendis ut dolores mai",
        "Lorem ipsum dolor sit amet"
    ],
    price: "20.7",
    primaryColor: "#5833C5",
    tintColor: colors.yellow,
    descriptionColor: colors.white
}
export const plans = [
    {
        name: "Bronze",
        description: [
            "Lorem ipsum dolor sit amet",
            "Lorem ipsum dolor sit amet ab ipsam reiciendis ut dolores mai",
            "Lorem ipsum dolor sit amet"
        ],
        price: "12.25",
        primaryColor: "#97B0F4",
        tintColor: colors.lightBlack,
        descriptionColor: colors.lightBlack,
        upgrade:true
    },
    {
        name: "Silver",
        description: [
            "Lorem ipsum dolor sit amet",
            "Lorem ipsum dolor sit amet ab ipsam reiciendis ut dolores mai",
            "Lorem ipsum dolor sit amet"
        ],
        price: "20.7",
        primaryColor: "#3F49C8",
        tintColor: colors.darkGrey,
        descriptionColor: colors.darkGrey,
        upgrade:true

    },
    {
        name: "Platinum",
        description: [
            "Lorem ipsum dolor sit amet",
            "Lorem ipsum dolor sit amet ab ipsam reiciendis ut dolores mai",
            "Lorem ipsum dolor sit amet"
        ],
        price: "20.7",
        primaryColor: "#3E2096",
        tintColor: colors.orange,
        descriptionColor: colors.white,
        upgrade:true
    }
]
export const cartData = [
    {
        title: "Burger with fries",
        addon: [
            "No vegetables",
            "Extra cheese"
        ],
        price: 29,
        images: images.mask
    },
    {
        title: "Vanilla Frappe",
        addon: [
            "White Sugar",
        ],
        price: 13,
        images: images.mask
    },
]
export const popularOrder = [
    {
        title: "Mega Combo",
        description: "Lorem Ipsum",
        price: 13,
        image: images.mask
    },
    {
        title: "Mega Combo",
        description: "Lorem Ipsum",
        price: 13,
        image: images.burger
    },
    {
        title: "Mega Combo",
        description: "Lorem Ipsum",
        price: 13,
        image: images.icecream
    },
]


export const notificationCardData = [
    {
        title: "Speeding your way",
        description: "Lorem ipsum dolor sit amet ab ipsam reiciendis ut dolores mai",
        image: images.shippingFast
    },
    {
        title: "Order Delivered",
        description: "Lorem ipsum dolor sit amet ab ipsam reiciendis ut dolores mai",
        image: images.checkCircle
    },
    {
        title: "Order Cancelled",
        description: "Lorem ipsum dolor sit amet ab ipsam reiciendis ut dolores mai",
        image: images.crossCircle
    },
    {
        title: "Order Delivered",
        description: "Lorem ipsum dolor sit amet ab ipsam reiciendis ut dolores mai",
        image: images.checkCircle
    },
    {
        title: "Order Delivered",
        description: "Lorem ipsum dolor sit amet ab ipsam reiciendis ut dolores mai",
        image: images.checkCircle
    },
]
export const onBoardingData = [
    {
        title: "Browse through your favourite meals",
        description: "Lorem ipsum dolor sit amet ab ipsam reiciendis ut dolores mai",
        image: images.onBoarding1
    },
    {
        title: "Select from multiple locations near you",
        description: "Lorem ipsum dolor sit amet ab ipsam reiciendis ut dolores mai",
        image: images.onBoarding2
    },
    {
        title: "Unlock a variety of rewards",
        description: "Lorem ipsum dolor sit amet ab ipsam reiciendis ut dolores mai",
        image: images.onBoarding3
    },
]

export const paymentsCards = [
    {
        title: "Apple Pay",
        image: images.applePay
    },
  
]
export const OrderCards = [
    {
        title: "Lorem Ipsum",
        subTitle: "Lorem ipsum, dolor sit.",
        image: images.order1,
        price: 12.25
    },
    {
        title: "Lorem Ipsum",
        subTitle: "Lorem ipsum, dolor sit.",
        image: images.order1,
        price: 12.25
    },
    {
        title: "Lorem Ipsum",
        subTitle: "Lorem ipsum, dolor sit.",
        image: images.order1,
        price: 12.25
    },
    {
        title: "Lorem Ipsum",
        subTitle: "Lorem ipsum, dolor sit.",
        image: images.order1,
        price: 12.25
    },
    {
        title: "Lorem Ipsum",
        subTitle: "Lorem ipsum, dolor sit.",
        image: images.order1,
        price: 12.25
    },
    {
        title: "Lorem Ipsum",
        subTitle: "Lorem ipsum, dolor sit.",
        image: images.order1,
        price: 12.25
    },
    {
        title: "Lorem Ipsum",
        subTitle: "Lorem ipsum, dolor sit.",
        image: images.order1,
        price: 12.25
    },
]
export const rewardData = [
    [
        images.reward1,
        images.reward2,
        images.reward1,
    ],
    [
        images.reward3,
        images.reward4,
        images.reward3,
    ],
    [
        images.reward5,
        images.reward6,
        images.reward5,
    ],
]
export const filterData = [
  
    {
        title: "Cuisine",
        category: [
            {
                id: 10,
                name: "Chinese"
            },
            {
                id: 11,
                name: "Italian"
            },
            {
                id: 12,
                name: "Thai"
            },
            {
                id: 13,
                name: "Indian"
            },
            {
                id: 14,
                name: "Indonesian"
            },
            {
                id: 15,
                name: "American"
            },
            {
                id: 16,
                name: "Japanese"
            },
            {
                id: 17,
                name: "Mexican"
            },
        ]
    },

    {
        title: "Category",
        category: [
            {
                id: 1,
                name: "Burger"
            },
            {
                id: 2,
                name: "Pizza"
            },
            {
                id: 3,
                name: "Pasta"
            },
            {
                id: 4,
                name: "Steak"
            },
            {
                id: 5,
                name: "Sandwich"
            },
            {
                id: 6,
                name: "Seafood"
            },
            {
                id: 7,
                name: "Salad"
            },
            {
                id: 8,
                name: "Dessert"
            },
            {
                id: 9,
                name: "Beverages"
            },
        ]
    },
    
]