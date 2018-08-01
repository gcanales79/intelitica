var myChart = document.getElementById("myChart").getContext("2d");
$.ajax({
    method: "GET",
    url: "/api/examples"
}).then(function (response) {
    var surveyAverages = [];
    var question1 = 0;
    var question2 = 0;
    var question3 = 0;


    for (i = 0; i < response.length; i++) {
        question1 += (parseInt(response[i].pregunta_1));
        question2 +=(parseInt(response[i].pregunta_2));
        question3 +=(parseInt(response[i].pregunta_3));

    }
    var massPopChart = new Chart(myChart, {
        type: "bar",
        data: {
            labels: ["Question 1", "Question 2", "Question 3", ],
            datasets: [{
                label: "Survey Results",
                data: [
                    question1/response.length,
                    question2/response.length,
                    question3/response.length


                ],
                borderWidth: 4,
                backgroundColor: ["green", "blue", "red"]

            }]
        },
        options: {
            title: {
                display: true,
                text: "Survey Results"
            },
            legend: {
                display: false,
            }
        }
            
    })
        console.log(response);

});
