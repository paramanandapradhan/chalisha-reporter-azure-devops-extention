<script lang="ts">
    import Chart, { type ChartOptions } from "chart.js/auto";
    import type { TestResultType } from "../services/report.service";

    let chartCanvas: HTMLCanvasElement | null = $state(null); // Reference to the canvas element
    // Chart.js instance

    let chart: Chart | null;

    export function setTestResult(testResult: TestResultType) {
        const chartData = {
            labels: ["Passed", "Failed", "Interrupted", "Skipped", "Timed Out"],
            datasets: [
                {
                    label: "Test Results",
                    data: [
                        testResult?.passedTests,
                        testResult?.failedTests,
                        testResult?.interruptedTests,
                        testResult?.skippedTests,
                        testResult?.timedOutTests,
                    ],
                    backgroundColor: [
                        "#16a34a", // Green 600
                        "#dc2626", // Red 600
                        "#facc15", // Yellow 400
                        "#06b6d4", // Cyan 400
                        "#334155", // Slate 800
                    ],
                    hoverOffset: 4,
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
                    text: `${new Date(testResult?.startTime!).toLocaleString()}`, // Display start time as title
                    position: "top",
                    font: {
                        size: 13,
                    },
                },
            },
        };

        if (chartCanvas && chartData && chartOptions) {
            if (chart) {
                chart.destroy();
            }
            chart = new Chart(chartCanvas, {
                type: "doughnut",
                data: chartData,
                options: chartOptions,
            }) as any;
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

<!-- Tailwind classes to set size and center the canvas -->
<div
    class="flex justify-center items-center border p-1 rounded-md bg-base-200 w-full h-64"
>
    <canvas bind:this={chartCanvas} class="w-full h-full"></canvas>
</div>
