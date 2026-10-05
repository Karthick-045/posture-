const API_URL =
    "http://localhost:5000";

export async function savePostureData(
    postureData
) {

    try {

        const response =
            await fetch(
                `${API_URL}/api/posture/save`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify(
                        postureData
                    )
                }
            );

        return await response.json();

    }
    catch (error) {

        console.error(
            "API Error:",
            error
        );

    }

}