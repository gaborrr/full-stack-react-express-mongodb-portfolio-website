import { useState, useEffect } from 'react';

function ProfileDataApi() {

    const [data, setData] = useState([]);

    useEffect(() => {

        fetch('http://localhost:3001/')
            .then((response) => response.json())
            .then((data) => setData(data));

    }, [])

    return data;
}

export default ProfileDataApi;