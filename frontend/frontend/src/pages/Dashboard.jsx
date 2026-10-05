import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {

    const [data, setData] = useState({

        totalRecords: 0,
        goodPosture: 0,
        badPosture: 0,
        averageScore: 0,
        goodPercentage: 0,
        badPercentage: 0,
        postureIQ: 0

    });

    useEffect(() => {

        fetchDashboard();

    }, []);

    async function fetchDashboard() {

        try {

            const response =
                await axios.get(
                    "http://127.0.0.1:5000/api/analytics/summary"
                );

            const dashboardData =
                response.data;

            const total =
                dashboardData.totalRecords || 0;

            const good =
                dashboardData.goodPosture || 0;

            const bad =
                dashboardData.badPosture || 0;

            const avgScore =
                Number(
                    dashboardData.averageScore || 0
                );

            const goodPercentage =
                total > 0
                    ? ((good / total) * 100)
                    : 0;

            const badPercentage =
                total > 0
                    ? ((bad / total) * 100)
                    : 0;

            const postureIQ =
                (
                    goodPercentage * 0.7
                    +
                    avgScore * 0.3
                );

            setData({

                totalRecords: total,

                goodPosture: good,

                badPosture: bad,

                averageScore: avgScore,

                goodPercentage,

                badPercentage,

                postureIQ

            });

        }
        catch (error) {

            console.log(
                "Dashboard Error:",
                error
            );

        }

    }

    const cardStyle = {

        border: "1px solid #ddd",

        borderRadius: "12px",

        padding: "20px",

        textAlign: "center",

        backgroundColor: "#060b10",

        boxShadow:
            "0px 2px 5px rgba(0,0,0,0.1)"

    };

    return (

        <div
            style={{
                padding: "30px",
                fontFamily: "Arial"
            }}
        >

            <h1
                style={{
                    textAlign: "center",
                    marginBottom: "30px"
                }}
            >
                PostureQuest AI Dashboard
            </h1>

            <div
                style={{
                    display: "grid",

                    gridTemplateColumns:
                        "repeat(auto-fit, minmax(250px, 1fr))",

                    gap: "20px"
                }}
            >

                <div style={cardStyle}>
                    <h2>Total Records</h2>
                    <h1>
                        {data.totalRecords}
                    </h1>
                </div>

                <div style={cardStyle}>
                    <h2>Good Posture</h2>
                    <h1>
                        {data.goodPosture}
                    </h1>
                </div>

                <div style={cardStyle}>
                    <h2>Bad Posture</h2>
                    <h1>
                        {data.badPosture}
                    </h1>
                </div>

                <div style={cardStyle}>
                    <h2>Average Score</h2>
                    <h1>
                        {data.averageScore.toFixed(2)}
                    </h1>
                </div>

                <div style={cardStyle}>
                    <h2>Good %</h2>
                    <h1>
                        {data.goodPercentage.toFixed(2)}%
                    </h1>
                </div>

                <div style={cardStyle}>
                    <h2>Bad %</h2>
                    <h1>
                        {data.badPercentage.toFixed(2)}%
                    </h1>
                </div>

                <div style={cardStyle}>
                    <h2>Posture IQ</h2>
                    <h1>
                        {data.postureIQ.toFixed(2)}
                    </h1>
                </div>

            </div>

        </div>

    );

}

export default Dashboard;