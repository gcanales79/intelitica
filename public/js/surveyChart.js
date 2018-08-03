var myChart = document.getElementById("myChart").getContext("2d");
var recomendacionChart = document.getElementById("recomendacionChart").getContext("2d");


$.ajax({
    method: "GET",
    url:"/api/pregunta1"
})
.then(function (response) { 
    console.log(response);
    [{promedio_1:"valor", fecha:"fecha"}]
    var arrayPregunta1Valores=[];
    var arrayPregunta1Fechas=[];
    for(var i=0;i<response.length;i++)
    {
        arrayPregunta1Valores.push(response[i].promedio_1);
        arrayPregunta1Fechas.push(response[i].fecha_visita);
    }
    
    var recomendacionPopChart = new Chart(recomendacionChart, {
        type: "line",
        data: {
            labels: ["lunes", "martes", "miercoles", "jueves", "viernes"],
            datasets: [{
                label: "Customer service by day",
                data: arrayPregunta1Valores,
                borderWidth: 4,
                backgroundColor: ["green", "blue", "red", "black", "pink"]

            }]
        },
        options: {
            title: {
                display: true,
                text: "Overall Averages"
            },
            legend: {
                display: false,
            },
            scales:{
                yAxes:[{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }

    })



})
    // GRÁFICA 2 --------------------------


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
        question2 += (parseInt(response[i].pregunta_2));
        question3 += (parseInt(response[i].pregunta_3));

    }
    var massPopChart = new Chart(myChart, {
        type: "bar",
        data: {
            labels: ["Customer Service", "Product Quality", "Overall Experience",],
            datasets: [{
                label: "Overall Averages",
                data: [
                    question1 / response.length,
                    question2 / response.length,
                    question3 / response.length
                ],
                borderWidth: 4,
                backgroundColor: ["green", "blue", "red"]

            }]
        },
        options: {
            title: {
                display: true,
                text: "Overall Averages"
            },
            legend: {
                display: false,
            },
            scales:{
                yAxes:[{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }

    })
    
    console.log(response);
});
