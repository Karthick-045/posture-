import { useEffect, useState } from "react";
import axios from "axios";

function Analytics() {

    const [data, setData] = useState({
        totalRecords: 0,
        goodPosture: 0,
        badPosture: 0,
        averageScore: 0
    });

    useEffect(() => {
        fetchAnalytics();
    }, []);

    async function fetchAnalytics() {

        try {

            const response = await axios.get(
                "http://127.0.0.1:5000/api/analytics/summary"
            );

            setData(response.data);

        } catch (error) {

            console.log(error);

        }

    }

    return (

        <div style={{ padding: "20px" }}>

            <h1>Analytics</h1>

            <h2>Total Records: {data.totalRecords}</h2>

            <h2>Good Posture: {data.goodPosture}</h2>

            <h2>Bad Posture: {data.badPosture}</h2>

            <h2>
                Average Score:
                {Number(data.averageScore).toFixed(2)}
            </h2>

        </div>

    );

}

export default Analytics;