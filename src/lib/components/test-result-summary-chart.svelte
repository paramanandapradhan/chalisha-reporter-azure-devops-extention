<script lang="ts">
    import Chart, { type ChartOptions, type ChartData } from "chart.js/auto";
    import type { TestResultType } from "../services/report.service";
    import { dateFormat } from "@cloudparker/moldex.js";

    let chartCanvas: HTMLCanvasElement | null = null; // Reference to the canvas element
    let chart: Chart | null = null; // Chart.js instance
    let clientWidth: number = $state(0);
    let clientHeight: number = $state(0);

    export function setTestResults(testResults: TestResultType[]) {
        // Prepare the data for the stacked bar chart
        const labels = testResults.map((result) =>
            dateFormat(new Date(result.startTime!), "DD/MM"),
        );

        const chartData: ChartData = {
            labels,
            datasets: [
                {
                    label: "Passed",
                    data: testResults.map((result) => result.passedTests || 0),
                    backgroundColor: "#16a34a", // Green 600
                },
                {
                    label: "Failed",
                    data: testResults.map((result) => result.failedTests || 0),
                    backgroundColor: "#dc2626", // Red 600
                },
                {
                    label: "Interrupted",
                    data: testResults.map(
                        (result) => result.interruptedTests || 0,
                    ),
                    backgroundColor: "#facc15", // Yellow 400
                },
                {
                    label: "Skipped",
                    data: testResults.map((result) => result.skippedTests || 0),
                    backgroundColor: "#06b6d4", // Cyan 400
                },
                {
                    label: "TimedOut ",
                    data: testResults.map(
                        (result) => result.timedOutTests || 0,
                    ),
                    backgroundColor: "#334155", // Slate 800
                },
            ],
        };

        const chartOptions: ChartOptions = {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: "bottom",
                    align: "end",
                    labels: {
                        boxWidth: 10,
                        boxHeight: 10,
                    },
                },
                title: {
                    display: true,
                    text: "All Tests",
                    position: "top",
                },
            },
            scales: {
                x: {
                    stacked: true,
                    title: {
                        display: true,
                        text: "Date",
                    },
                },
                y: {
                    stacked: true,
                    title: {
                        display: true,
                        text: "Text Result",
                    },
                },
            },
        };

        if (chartCanvas && chartData && chartOptions) {
            if (chart) {
                chart.data = chartData;
                chart.options = chartOptions;
                chart.update();
            } else {
                chart = new Chart(chartCanvas, {
                    type: "bar",
                    data: chartData,
                    options: chartOptions,
                }) as any;
            }
        }
    }

    $effect(() => {
        return () => {
            if (chart) {
                chart?.destroy();
                console.log("Chart Destroyed");
            }
        };
    });
</script>

<div
    class="flex justify-center items-center border p-1 rounded-md bg-base-200 w-full h-64"
    bind:clientHeight
    bind:clientWidth
>
    <canvas bind:this={chartCanvas} width={clientWidth} height={clientHeight}
    ></canvas>
</div>
