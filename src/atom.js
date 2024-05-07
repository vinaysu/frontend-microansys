import { atom } from "recoil";
import axios from 'axios'; // Import axios for making HTTP requests

const List = atom({
    key: 'list',
    default: getInitialList()
})

export default List;

async function getInitialList() {
    try {
        // Fetch the initial list data from MongoDB
        const response = await axios.get('https://backend-microansys.onrender.com/api/list');
        return response.data; // Return the list data fetched from MongoDB
    } catch (error) {
        console.error('Error fetching initial list data:', error);
        return []; // Return an empty array in case of an error
    }
}



