export const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%'^&*()_¥•€+/\-|~={}\\\[\]’";><:/£?.>,<|\\])[A-Za-€z\d@$#??/!%*'?^.&>=(¥•"){}?\[\]\-+_~;><.,|:/£'"]{6,}$/
export var alphabetRegex = /^[A-Za-z ]*$/;
export const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,4}$/;
export const numericRegex = /^[0-9]+$/;




  export  const   isUrlValid=(str:any)=> {
    const pattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', // fragment locator
      'i'
    );
    return pattern.test(str);
   }
