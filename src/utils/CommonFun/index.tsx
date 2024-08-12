import moment from "moment";

export const isInteger = (value: number): boolean => {
    return Number.isInteger(value);
}


export function capitalizeFirstLetter(str) {
    return str?.split(' ').map(word => {
      return word?.charAt(0)?.toUpperCase() + word?.slice(1);
    })?.join(' ');
  }


  export const dateFormat = date => {
    const now = moment();
    const inputDate = moment(date);
  
    if (now.isSame(inputDate, 'day')) {
      // Same day: show time difference
      const duration = moment.duration(now.diff(inputDate));
      const hours = duration.hours();
      const minutes = duration.minutes();
      console.log("hours",hours)
  
      if (hours > 0) {
        return `${hours}h ago`;
      }
      if (minutes > 0) {
        return `${minutes}m ago`;
      }
      return 'few second ago';
    }
  
    if (now.diff(inputDate, 'days') === 1) {
      // Yesterday: show "Yesterday"
      return 'Yesterday';
    }
  
    if (now.diff(inputDate, 'days') < 7) {
      // Within the last week: show day of the week
      return inputDate.format('dddd');
    }
  
    // Older than a week: show date
    return inputDate.format('DD MMM YY');
  };


 export const formatTimeDifference = (date) => {
    const now = moment();
    const inputDate = moment(date);
  
    const diffInSeconds = now.diff(inputDate, 'seconds');
    const diffInMinutes = now.diff(inputDate, 'minutes');
    const diffInHours = now.diff(inputDate, 'hours');
    const diffInDays = now.diff(inputDate, 'days');
    const diffInWeeks = now.diff(inputDate, 'weeks');
    const diffInMonths = now.diff(inputDate, 'months');
    const diffInYears = now.diff(inputDate, 'years');
    if (diffInSeconds == 0) {
      return `1s ago`;
    }
  
    if (diffInSeconds < 60) {
      return `${diffInSeconds}s ago`;
    }
     else if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else if (diffInDays === 1) {
      return `1d ago`;
    } else if (diffInDays < 7) {
      return `${diffInDays}d ago`;
    } else if (diffInWeeks < 4) {
      return `${diffInWeeks}w ago`;
    } else if (diffInMonths < 12) {
      return `${diffInMonths}mo ago`;
    } else {
      return `${diffInYears}y ago`;
    }
  };

  export const StatusUpdatesFormatTimeDifference = (date) => {
    const now = moment();
    const inputDate = moment(date);
  
    const diffInSeconds = now.diff(inputDate, 'seconds');
    const diffInMinutes = now.diff(inputDate, 'minutes');
    const diffInHours = now.diff(inputDate, 'hours');
    const diffInDays = now.diff(inputDate, 'days');
    const diffInWeeks = now.diff(inputDate, 'weeks');
    const diffInMonths = now.diff(inputDate, 'months');
    const diffInYears = now.diff(inputDate, 'years');
    if (diffInSeconds == 0) {
      return `1s`;
    }
  
    if (diffInSeconds < 60) {
      return `${diffInSeconds}s`;
    }
     else if (diffInMinutes < 60) {
      return `${diffInMinutes}m`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else if (diffInDays === 1) {
      return `1d`;
    } else if (diffInDays < 7) {
      return `${diffInDays}d`;
    } else if (diffInWeeks < 4) {
      return `${diffInWeeks}w`;
    } else if (diffInMonths < 12) {
      return `${diffInMonths}mo`;
    } else {
      return `${diffInYears}y`;
    }
  };

  export const formatMessageTime = (date) => {
    const now = moment();
    const inputDate = moment(date);
  
    const diffInSeconds = now.diff(inputDate, 'seconds');
    const diffInMinutes = now.diff(inputDate, 'minutes');
    const diffInHours = now.diff(inputDate, 'hours');
    const diffInDays = now.diff(inputDate, 'days');
    const diffInWeeks = now.diff(inputDate, 'weeks');
    const diffInMonths = now.diff(inputDate, 'months');
    const diffInYears = now.diff(inputDate, 'years');
    // if (diffInSeconds == 0) {
    //   return `1s ago`;
    // }
  
    // if (diffInSeconds < 60) {
    //   return `${diffInSeconds}s ago`;
    // }
    //  else if (diffInMinutes < 60) {
    //   return `${diffInMinutes}m ago`;
    // }
      if (diffInHours < 24) {
      return inputDate.format("h:mm a");
    } 

                // text={moment(lastMessage?.created_at).format("h:mm a")}

    
    else if (diffInDays === 1) {
      return `1d ago`;
    }
     else if (diffInDays < 7) {
      return `${diffInDays}d ago`;
    } else if (diffInWeeks < 4) {
      return `${diffInWeeks}w ago`;
    } else if (diffInMonths < 12) {
      return `${diffInMonths}mo ago`;
    } else {
      return `${diffInYears}y ago`;
    }
  };

  export const formatChannelDate = (date) => {
    const now = moment();
    const inputDate = moment(date);
  
    if (inputDate.isSame(now, 'day')) {
      return inputDate.format('dddd MMMM DD');
    } else if (inputDate.isSame(now.add(1, 'year'), 'day')) {
      return inputDate.format('dddd MMMM DD YYY');
    } else {
      return inputDate.format('dddd MMMM DD');
    }
  };

 export const calculateAgeString = (dateString:any) => {
    let birthDate;
    if (moment(dateString, 'MM/DD/YYYY', true).isValid()) {
      birthDate = moment(dateString, 'MM/DD/YYYY');
    } else if (moment(dateString, 'MM/DD/YY', true).isValid()) {
      birthDate = moment(dateString, 'MM/DD/YY');
    } else {
      return null; // Invalid date format
    }
    const currentDate = moment();
    return currentDate.diff(birthDate, 'years');
  };

 export const calculateAge = (birthday:any) => {
    // Parse the birthday string into a Date object
    console.log("AllBirthdat", typeof birthday)
    const birthDate = new Date(birthday);
    
    // Get today's date
    const today = new Date();
  
    // Calculate the difference in years
    let age = today.getFullYear() - birthDate.getFullYear();
  
    // Adjust the age if the birthday hasn't occurred yet this year
    const monthDifference = today.getMonth() - birthDate.getMonth();
    const dayDifference = today.getDate() - birthDate.getDate();
  
    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      age--;
    }
  
    return age;
  };
  
