import { images } from "../../assets/images";
import { colors } from "../colors";

export const LookingForData = [
  "Chat",
  "Dates",
  "Friends",
  "Networking",
  "Hookups",
  "Relationship",
];
export const RelationshipStatusData = [
  {
    id: 1,
    label: "Undisclosed",
    value: "Undisclosed",
  },
  {
    id: 2,
    label: "Single",
    value: "Single",
  },

  {
    id: 3,
    label: "Committed",
    value: "Committed",
  },

  {
    id: 4,
    label: "Dating",
    value: "Dating",
  },

  {
    id: 5,
    label: "Divorced",
    value: "Divorced",
  },

  {
    id: 6,
    label: "Open Relationship",
    value: "Open Relationship",
  },

  {
    id: 7,
    label: "Engaged",
    value: "Engaged",
  },

  {
    id: 8,
    label: "Married",
    value: "Married",
  },
  {
    id: 9,
    label: "Widowed",
    value: "Widowed",
  },
];
export const OrientationData = [
  {
    id: 1,
    label: "Undisclosed",
    value: "Undisclosed",
  },
  {
    id: 2,
    label: "Straight",
    value: "Straight",
  },

  {
    id: 3,
    label: "Bisexual",
    value: "Bisexual",
  },
  {
    id: 4,
    label: "Lesbian",
    value: "Lesbian",
  },
  {
    id: 5,
    label: "Gay",
    value: "Gay",
  },
];

export const planedTaskList = [
  {
    date: "Sun, 10 Sep",
    task: [
      {
        title: "Complete folder organisation",
        complete: true,
        status: "Work",
      },
      {
        title: "Manage project flowstate",
        status: "Work",
      },
      {
        title: "Send mail to Jeffrey",
        status: "Work",
      },
    ],
  },
  {
    date: "Mon, 11 Sep",

    task: [
      {
        title: "Complete folder organisation",
        complete: true,
        status: "Work",
      },
      {
        title: "Manage project flowstate",
        status: "Work",
      },
      {
        title: "Send mail to Jeffrey",
        status: "Work",
      },
    ],
  },

  {
    date: "Tue, 12 Sep",
    task: [
      {
        title: "Complete folder organisation",
        complete: true,
        status: "Work",
      },
      {
        title: "Manage project flowstate",
        status: "Work",
      },
      {
        title: "Send mail to Jeffrey",
        status: "Work",
      },
    ],
  },
];

export const toDoTaskList = [
  {
    status: "Ongoing",
    task: [
      {
        title: "Complete folder organisation",
        complete: true,
        status: "Work",
      },
      {
        title: "Manage project flowstate",
        status: "Work",
      },
      {
        title: "Send mail to Jeffrey",
        status: "Work",
      },
    ],
  },
  {
    status: "Completed",

    task: [
      {
        title: "Daily meeting with team",
        complete: true,
        status: "Work",
        boxColor: colors.purple,
      },
      {
        title: "Pay rent",
        status: "Household",
        boxColor: colors.pink,
      },
      {
        title: "Feed the dogs",
        status: "Personal",
        boxColor: colors.lightGreen,
      },
      {
        title: "Go to the gym",
        status: "Personal",
        boxColor: colors.lightGreen,
      },
    ],
  },
];

export const toDoPlannedTask = [
  {
    title: "Morning routine",
    complete: true,
    status: "Personal",
    color: colors.lightGreen,
  },
  {
    title: "Gym",
    status: "Personal",
    color: colors.lightGreen,
  },
  {
    title: "Call John from Microsoft",
    status: "Work",
    color: colors.purple,
  },

  {
    title: "Pick up kids from school",
    status: "Household",
    color: colors.pink,
  },
  {
    title: "Duolingo lesson",
    status: "Personal",
    color: colors.lightGreen,
  },
];

export const categoriesTaskList = [
  { title: "Work", des: "6/10 tasks", color: colors.purple50 },
  { title: "Personal", des: "9/12 tasks", color: colors.lightGreen50 },
  { title: "Household", des: "7/14 tasks", color: colors.pink50 },
];

export const data = [
  {
    id: 1,
    label: "All planned tasks",
    value: "tasks",
  },
  {
    id: 2,
    label: "All planned tasks",
    value: "All planned tasks",
  },

  {
    id: 3,
    label: "All planned tasks",
    value: "All planned tasks",
  },
  {
    id: 4,
    label: "All planned tasks",
    value: "All planned tasks",
  },
];

export const messagesList = [
  {
    img: images.defimage12,
    name: "Todd Mason",
    message: "I will be free to talk in a few hours.",
    time: "8:34 AM",
    isOnline: true,
    inBox: true,
  },
  {
    img: images.defimage13,
    name: "Lauren Connors",
    message: "Typing...",
    time: "8:34 AM",
    favorite: true,
    isOnline: true,
  },
  {
    img: images.defimage17,
    name: "Lauren Connors",
    message: "Hey everyone. Status is great. Here is my view right now.",
    time: "8:34 AM",
    favorite: true,
    isOnline: true,
  },
  {
    img: images.defimage14,
    name: "Lauren Connors",
    message: "Hey everyone. Status is great. Here is my view right now.",
    time: "8:34 AM",
    count: "10",
  },
  {
    img: images.defimage15,
    name: "Lauren Connors",
    message: "Hey everyone. Status is great. Here is my view right now.",
    time: "8:34 AM",
    count: "5",
  },
  {
    img: images.defimage14,
    name: "Lauren Connors",
    message: "Hey everyone. Status is great. Here is my view right now.",
    time: "8:34 AM",
    count: "10",
  },
  {
    img: images.defimage15,
    name: "Lauren Connors",
    message: "Hey everyone. Status is great. Here is my view right now.",
    time: "8:34 AM",
    count: "5",
  },
];

export const messages = [
  {
    img: images.defimage100,
    name: "Me",
    message: "Todd you are a very nice person.",
    time: "11:09 PM",
  },
  {
    img: images.man5,
    name: "Todd Mason",
    message:
      "Hi. I was wondering if you had any plans for tonight. I would love to take you to dinner. I know a great place in town we can have food and drinks. Are you interested?",
    time: "2:05 PM",
    chatDate: "Jan 12,2024",
  },
  {
    img: images.defimage100,
    name: "Me",
    message: "Todd, I am very busy tonight. Sorry.",
    time: "2:09 PM",
  },
  {
    img: images.man5,
    name: "Todd Mason",
    message: "I understand. Do you have free time later on in the week? ",
    time: "7:33 AM",
    chatDate: "    Today    ",
  },
  {
    img: images.defimage100,
    name: "Me",
    message: "We should talk on the phone first.\n 344-554-4432",
    time: "9:55 AM",
  },
  {
    img: images.man5,
    name: "Todd Mason",
    message: "Great. When are good times to call?",
    time: "11:45 AM",
  },
  {
    img: images.defimage100,
    name: "Me",
    message: "I will be free to talk in a few hours.",
    time: "12:05 PM",
  },
];

export const activityData = [
  {
    image: images.man2,
    name: "Joe Rogan",
    time: "2d ago",
    comment: "Started following you.",
    isShowFollow: true,
  },
  {
    image: images.man2,
    name: "Joe Rogan",
    time: "2d ago",
    comment: "Wrote on your wall.",
    isShowFollow: false,
  },
  {
    image: images.man5,
    name: "Bobby D",
    time: "3d ago",
    comment: "Started following you.",
    isShowFollow: true,
  },
  {
    image: images.man5,
    name: "Kimmy",
    time: "3d ago",
    comment: "Wrote on your wall.",
    isShowFollow: false,
  },
];

export const comments = [
  {
    img: images.man6,
    name: "Mike O'Dea",
    message: "Nice view. Where is that?",
    time: "7:33 AM",
    chatDate: "5 Comments",
  },
  {
    img: images.man9,
    name: "Lauren Connors",
    message: "Thanks you.it's Rio!",
    time: "8:09 AM",
    edit: true,
  },
  {
    img: images.man5,
    name: "Todd Mason",
    message:
      "Looks great! I always wanted to go to Rio. It’s so beautiful there. Do you live there or vacationing?",
    time: "9:33 AM",
    chatDate: "Jan 12,2024",
  },
  {
    img: images.man3,
    name: "Lexi Reegan",
    message: "Beautiful",
    time: "7:55 AM",
  },
  {
    img: images.man7,
    name: "Laura Jessy",
    message: "Great. When are good times to call?",
    time: "11:45 AM",
  },
];

export const statusComments = [
  {
    img: images.man9,
    name: "Lauren Connors",
    message: "Thanks you.it's Rio!",
    time: "8:09 AM",
    edit: true,
    chatDate: "2 Comments",
  },
  {
    img: images.man6,
    name: "Mike O'Dea",
    message: "Nice view. Where is that?",
    time: "7:33 AM",
  },
];

export const profileComments = [
  {
    img: images.defimage18,
    name: "John Kennedy",
    message: "Hey.Thanks for add.",
    time: "7:33 AM",
  },
  {
    img: images.defimage20,
    name: "Mike O'Dea",
    message: "Happy New Year!",
    time: "JAN 13",
  },
];
