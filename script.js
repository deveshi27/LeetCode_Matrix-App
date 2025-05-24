document.addEventListener("DOMContentLoaded", function () {
    const searchButton = document.getElementById("search-btn")
    const usernameInput = document.getElementById("user-input")
    const statsContainer = document.querySelector(".stats-container")
    const easyProgressCircle = document.querySelector(".easy-progress")
    const mediumProgressCricle = document.querySelector(".medium-progress")
    const hardProgressCircle = document.querySelector(".hard-progress")
    const easyLabel = document.getElementById("easy-label")
    const mediumLabel = document.getElementById("medium-label")
    const hardLabel = document.getElementById("hard-label")
    const cardStatsContainer = document.querySelector(".stats-card")

    //return true or false based on a regex
    function validateUsername(username) {
        if (username.trim() === "") {
            alert("Username should not be empty")
            return false;
        }
        const regex = /^[a-zA-Z][a-zA-Z0-9_-]{0,14}$/;
        const isMatching = regex.test(username);
        if (!isMatching) {
            alert("Invalid Username")
        }
        return isMatching
    }
    async function fetchUserDetails(username) {
        //Fetching Data from This URL 
        // const url = `https://leetcode-stats-api.herokuapp.com/${username}`
        try {
            searchButton.textContent = "Searching...";
            searchButton.disabled = true
            //Posting our Data taken form the graphql end point then  apply get reuqest
            const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
            const targetUrl = 'https://leetcode.com/graphql/'
            const myHeader = new Headers();
            myHeader.append("content-type", "application/json")

            const graphql = JSON.stringify(
                {
                    query: "\n query userSessionProgress($username:String!){\n allQuestionsCount {\n    difficulty\n   count\n  }\n matchedUser(username:$username) {\n     submitStats {\n     acSubmissionNum{\n         difficulty\n         count\n     submissions\n }\n      totalSubmissionNum{\n      difficulty\n        count\n     submissions\n       }\n     }\n}\n}\n    ",
                    variables: { "username": `${username}` }


                })
            const requestOptions =
            {
                method: "POST",
                headers: myHeader,
                body: graphql,
                redirect: "follow"

            }
            const response = await fetch(proxyUrl + targetUrl, requestOptions);
            if (!response.ok) {
                throw new Error("Unable to fetch the User details")
            }
            const parsedData = await response.json()
            console.log("Logging Data", parsedData);

            displayUserData(parsedData)
        }
        catch (error) {
            statsContainer.innerHTML = "<p>No Data Found</p>"
            console.log(error);
        }
        finally {
            searchButton.textContent = "Search";
            searchButton.disabled = false
        }

    }

    function updateProgress(Solved, total, label, circle) {
        const progressDegree = (Solved / total) * 100
        circle.style.setProperty("--progress-degree", `${progressDegree}%`)
        label.textContent = `${Solved}/${total}`

    }




    function displayUserData(parsedData) {
        const totalQues = parsedData.data.allQuestionsCount[0].count;
        const totalEasyQues = parsedData.data.allQuestionsCount[1].count;
        const totalMediumQues = parsedData.data.allQuestionsCount[2].count;
        const totalHardQues = parsedData.data.allQuestionsCount[3].count;


        const solvedTotalQues = parsedData.data.matchedUser.submitStats.acSubmissionNum[0].count;
        const solvedTotalEasyQues = parsedData.data.matchedUser.submitStats.acSubmissionNum[1].count
        const solvedTotalMediumQues = parsedData.data.matchedUser.submitStats.acSubmissionNum[2].count
        const solvedTotalHardQues = parsedData.data.matchedUser.submitStats.acSubmissionNum[3].count


        updateProgress(solvedTotalEasyQues, totalEasyQues, easyLabel, easyProgressCircle)
        updateProgress(solvedTotalMediumQues, totalMediumQues, mediumLabel, mediumProgressCricle)
        updateProgress(solvedTotalHardQues, totalHardQues, hardLabel, hardProgressCircle)


        const cardsData =
            [

                {
                    label: "Overall Submission",
                    value: parsedData.data.matchedUser.submitStats.totalSubmissionNum[0].submissions
                },
                {
                    label: "Overall Easy Submission",
                    value: parsedData.data.matchedUser.submitStats.totalSubmissionNum[1].submissions
                },

                {
                    label: "Overall Medium Submission",
                    value: parsedData.data.matchedUser.submitStats.totalSubmissionNum[2].submissions
                },
                {
                    label: "Overall Hard Submission",
                    value: parsedData.data.matchedUser.submitStats.totalSubmissionNum[3].submissions
                },

            ]
        console.log("Card Data:", cardsData)
        cardStatsContainer.innerHTML = cardsData.map(
            data => {
                return `<div class ="card">
                           <h3>${data.label}</h3>
                           <p>${data.value}</p>
                        </div>`
                        
            }
        ).join('')
    }
    searchButton.addEventListener('click', function () {
        const username = usernameInput.value;
        console.log("Loggin username: ", username);
        if (validateUsername(username)) {
            fetchUserDetails(username)
        }
    })
})