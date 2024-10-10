<script lang="ts">
    import Prism from "prismjs";
    import "prismjs/themes/prism.css"; // Import the default theme or use a custom theme
    let { error, test }: { error: any; test: any } = $props();

    // Load any additional language you want to support, for example:
    import "prismjs/components/prism-javascript";
    import "prismjs/components/prism-typescript";

    // Function to highlight the code snippet using Prism
    function highlightSnippet(snippet: string): string {
        if (!snippet) return "";
        // Clean ANSI codes from the snippet
        const cleanedSnippet = snippet.replace(/\u001b\[\d+m/g, "");
        return Prism.highlight(
            cleanedSnippet,
            Prism.languages.javascript,
            "javascript",
        );
    }

    // Function to format the error message by adding HTML tags for colors and formatting
    function formatErrorMessage(message: string): string {
        if (!message) return "";
        return escapeHtml(message) // Escape HTML characters
            .replace(/\u001b\[31m/g, '<span class="text-red-500">') // Red color for errors
            .replace(/\u001b\[32m/g, '<span class="text-green-500">') // Green color for expected values
            .replace(/\u001b\[39m/g, "</span>") // Reset color
            .replace(/\u001b\[90m/g, '<span class="text-gray-400">') // Gray color for logs
            .replace(/\u001b\[2m/g, '<span class="opacity-60">') // Dim color for secondary info
            .replace(/\u001b\[22m/g, "</span>") // Reset dim
            .replace(/\u001b\[1m/g, "<strong>") // Bold text
            .replace(/\u001b\[0m/g, "</strong>") // Reset all
            .replace(
                /Error: (.*?)<br>/g,
                '<span class="text-red-500 font-semibold">Error:</span> <strong>$1</strong><br>',
            ) // Highlight "Error" text
            .replace(
                /Locator:\s(.*?)(<br>|$)/g,
                '<strong>Locator:</strong> <span class="text-green-500">$1</span><br>',
            ) // Highlight Locator
            .replace(
                /Expected pattern:\s(.*?)(<br>|$)/g,
                '<strong>Expected pattern:</strong> <span class="text-green-500">$1</span><br>',
            ) // Highlight Expected pattern
            .replace(
                /Received string:\s(.*?)(<br>|$)/g,
                '<strong>Received string:</strong> <span class="text-red-500">$1</span><br>',
            ) // Highlight Received string
            .replace(/Call log:<br>/g, "<strong>Call log:</strong><br>") // Highlight "Call log"
            .replace(
                /- (.*?)(<br>|$)/g,
                '<span class="block pl-4">- $1</span><br>',
            ) // Format log lines with indentation
            .replace(/\n/g, "<br>"); // Replace newlines with <br>
    }

    // Function to escape HTML characters to prevent them from being rendered as HTML
    function escapeHtml(unsafe: string): string {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
    function getOnlyFilePath(path: string) {
        if (path) {
            return path.split(":")[0] || "";
        }
        return "";
    }
</script>

{#if error}
    <div class="w-full">
        <!-- Error Message Section -->
        <div class="text-lg text-red-500 mb-2">Error Message:</div>
        <div
            class="bg-gray-800 text-gray-200 p-4 rounded-lg whitespace-pre-wrap border-l-4 border-red-500 mb-4 overflow-x-auto"
        >
            {@html formatErrorMessage(error.message)}
        </div>

        <!-- Code Snippet Section -->
        <div class="text-lg mb-2">Code Snippet:</div>
        <div
            class="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto mb-4"
        >
            <pre><code>{@html highlightSnippet(error.snippet)}</code></pre>
        </div>

        {#if test?.test.location}
            <div class="pl-10">
                at <a
                    class="text-primary"
                    href={getOnlyFilePath(test?.test.location)}
                    target="_blank"
                >
                    {getOnlyFilePath(test?.test.location)}:{error?.location
                        ?.line || ""}:{error?.location?.column || ""}
                </a>
            </div>
        {/if}
    </div>
{:else}
    <p class="text-red-500">No error data available.</p>
{/if}
