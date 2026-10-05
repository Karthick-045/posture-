import { useState } from "react";
import axios from "axios";

function Prediction() {

    const [neckAngle, setNeckAngle] = useState(170);
    const [shoulderDrop, setShoulderDrop] = useState(0.03);
    const [score, setScore] = useState(15);

    const [prediction, setPrediction] = useState("");

    async function predict() {

        try {

            const response = await axios.post(
                "http://127.0.0.1:5000/api/ml/predict",
                {
                    neck_angle: Number(neckAngle),
                    shoulder_drop: Number(shoulderDrop),
                    score: Number(score)
                }
            );

            setPrediction(
                response.data.prediction
            );

        }
        catch (error) {

            console.log(error);

        }

    }

    return (

        <div style={{ padding: "20px" }}>

            <h1>AI Prediction</h1>

            <input
                type="number"
                value={neckAngle}
                onChange={(e) =>
                    setNeckAngle(e.target.value)
                }
            />

            <br /><br />

            <input
                type="number"
                step="0.01"
                value={shoulderDrop}
                onChange={(e) =>
                    setShoulderDrop(e.target.value)
                }
            />

            <br /><br />

            <input
                type="number"
                value={score}
                onChange={(e) =>
                    setScore(e.target.value)
                }
            />

            <br /><br />

            <button onClick={predict}>
                Predict
            </button>

            <h2>
                Prediction: {prediction}
            </h2>

        </div>

    );

}

export default Prediction;