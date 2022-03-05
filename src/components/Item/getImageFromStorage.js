import { getDownloadURL, ref } from "firebase/storage";
import { stg } from "../../firebase/config";

//ITS IMPORTANT TO SET THE RULES FOR THE STORAGE, FOR EXAMPLE WHEN I STARTED THIS
// THE WRITE/READ ACCES WAS GIVEN ON THE CONFITION if: false (MEANING NEVER, BUT 
//YOU CAN ACTUALLY ADD AUTHENTICATION AND SUCH)

export const getImageFromStorage = (fileName, setImageURL) => {
    
    const imageRef = ref(stg, 'img/' + fileName);

    getDownloadURL(imageRef)
        .then( (url) => setImageURL(url));
}