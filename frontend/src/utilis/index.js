import {WindowSize} from '../utilis/windowSize.js';

export const isMobile = () => {

    const {width, height} = WindowSize();
    console.log("screen width:", width)
    const IM = width < 450 ? true : false;
    return IM
}

// export const isMobile = (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent))

// export default {
//     isMobile
// }//只能使用一次