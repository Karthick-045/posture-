function Reports() {

    return (

        <div
            style={{
                padding: "30px"
            }}
        >

            <h1>
                Reports Center
            </h1>

            <a
                href="http://127.0.0.1:5000/api/report/csv"
                target="_blank"
                rel="noreferrer"
            >

                <button>

                    Download Dataset CSV

                </button>

            </a>

        </div>

    );

}

export default Reports;