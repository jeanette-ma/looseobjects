window.addEventListener("load", function () {
    createGraph();
});

async function createGraph() {

    const graphBox = document.getElementById("graph");

    const response = await fetch(`./getGraphData`);
    const jsonArray = await response.json();

    var x = [];
    var bolts = [];
    var other = [];
    var fa = [];
    var currentWf = '';

    jsonArray.forEach(function (wf) {

        if (wf.code != currentWf) {
            x.push(wf.code)
        }

        if (wf.soundId == 0) {
            fa.push(wf.cnt)
        } else if (wf.soundId == 1) {
            bolts.push(wf.cnt)
        } else {
            other.push(wf.cnt)
        }

        currentWf = wf.code
    });

    var traceOther = {
        x: x,
        y: other,
        name: 'Other',
        type: 'bar',
        marker: {
            color: "rgba(142,124,195, 0.7)",
            line: {
                color: "rgba(142,124,195, 1)",
                width: 1
            }
        },
        opacity: 0.5,
    };

    var traceBolts = {
        x: x,
        y: bolts,
        name: 'Bolts',
        type: 'bar',
        marker: {
            color: "rgba(255, 100, 102, 0.7)",
            line: {
                color: "rgba(255, 100, 102, 1)",
                width: 1
            }
        },
        opacity: 0.5,
    };

    var traceFalse = {
        x: x,
        y: fa,
        name: 'False Alarm',
        type: 'bar',
        marker: {
            color: "rgba(100, 200, 102, 0.7)",
            line: {
                color: "rgba(100, 200, 102, 1)",
                width: 1
            }
        },
        opacity: 0.5,
    };

    var data = [traceFalse, traceOther, traceBolts];

    var layout = {
        barmode: 'stack',
        xaxis: {
            title: {
                text: 'Operational Windfarms',
                font: {
                    size: 14,
                    color: '#7f7f7f'
                }
            },
        },
        yaxis: {
            title: {
                text: 'Number of New Recordings',
                font: {
                    size: 14,
                    color: '#7f7f7f'
                }
            }
        }
    };

    Plotly.newPlot('graph', data, layout);

};

