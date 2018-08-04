var myChart = document.getElementById("myChart").getContext("2d");
var recomendacionChart = document.getElementById("recomendacionChart").getContext("2d");
var productoChart = document.getElementById("productoChart").getContext("2d");
var servicioChart = document.getElementById("servicioChart").getContext("2d");





$.ajax({
    method: "GET",
    url: "/api/pregunta1"
})
    .then(function (response) {
        console.log(response);
        [{ promedio_1: "valor", fecha: "fecha" }]
        var arrayPregunta1Valores = [];
        var arrayPregunta1Fechas = [];
        for (var i = 0; i < response.length; i++) {
            arrayPregunta1Valores.push(response[i].promedio_1);
            arrayPregunta1Fechas.push(response[i].fecha_visita);
        }

        var recomendacionPopChart = new Chart(recomendacionChart, {
            type: "bar",
            data: {
                labels: ["lunes", "martes", "miercoles", "jueves", "viernes"],
                datasets: [{
                    label: "Quality of Service last 5 days",
                    data: arrayPregunta1Valores,
                    borderWidth: 4,
                    backgroundColor: ['rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)']

                }]
            },
            options: {
                title: {
                    display: true,
                    text: "Customer Service last 5 days"
                },
                legend: {
                    display: false,
                },
                scales: {
                    yAxes: [{
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
        type: "line",
        data: {
            labels: ["Customer Service", "Product Quality", "Overall Experience",],
            datasets: [{
                label: "Overall Service",
                data: [
                    question1 / response.length,
                    question2 / response.length,
                    question3 / response.length
                ],
                borderWidth: 4,
                fill: false,
                borderColor: ['rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)']

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
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }

    })

});

// GRÁFICA 3 --------------------------


$.ajax({
    method: "GET",
    url: "/api/pregunta2"
})
    .then(function (response) {
        console.log(response);
        [{ promedio_1: "valor", fecha: "fecha" }]
        var arrayPregunta2Valores = [];
        var arrayPregunta2Fechas = [];
        for (var i = 0; i < response.length; i++) {
            arrayPregunta2Valores.push(response[i].promedio_2);
            arrayPregunta2Fechas.push(response[i].fecha_visita);
        }

        var productoPopChart = new Chart(productoChart, {
            type: "bar",
            data: {
                labels: ["lunes", "martes", "miercoles", "jueves", "viernes"],
                datasets: [{
                    label: "Product Quality last 5 days",
                    data: arrayPregunta2Valores,
                    borderWidth: 4,
                    backgroundColor: ['rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)']

                }]
            },
            options: {
                title: {
                    display: true,
                    text: "Product Quality last 5 days"
                },
                legend: {
                    display: false,
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }

        })



    })

    // GRÁFICA 4 --------------------------


$.ajax({
    method: "GET",
    url:"/api/pregunta3"
})
.then(function (response) { 
    console.log(response);
    [{promedio_1:"valor", fecha:"fecha"}]
    var arrayPregunta3Valores=[];
    var arrayPregunta3Fechas=[];
    for(var i=0;i<response.length;i++)
    {
        arrayPregunta3Valores.push(response[i].promedio_3);
        arrayPregunta3Fechas.push(response[i].fecha_visita);
    }
    
    var servicioPopChart = new Chart(servicioChart, {
        type: "bar",
        data: {
            labels: ["lunes", "martes", "miercoles", "jueves", "viernes"],
            datasets: [{
                label: "Overall Experience last 5 days",
                data: arrayPregunta3Valores,
                borderWidth: 4,
                backgroundColor: ['rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)']

            }]
        },
        options: {
            title: {
                display: true,
                text: "Overall Experience last 5 days"
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