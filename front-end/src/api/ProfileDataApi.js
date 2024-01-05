import { useState, useEffect } from 'react';
import axios from "axios";

function ProfileDataApi() {

    const [data, setData] = useState([]);

    useEffect(() => {

        // fetch('http://localhost:3001/')
        //     .then((response) => response.json())
        //     .then((data) => setData(data));

        (async () => {
            const response = await axios.get('http://localhost:3001/');
        })();

    }, [])

    return data;
}

export default ProfileDataApi;