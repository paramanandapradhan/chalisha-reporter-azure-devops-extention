<script lang="ts">
	import { Navbar , Button} from "@cloudparker/moldex.js";
	import * as SDK from "azure-devops-extension-sdk";
	import logoUrl from "../../icons/logo.png";
    import { mdiCog } from "../services/icon-service";

	type PropsType = {
		onSettings?:()=>void
	};

	let { onSettings }: PropsType = $props();

	let isDarkMode: boolean | null = $state(null);

	$effect(() => {
		if (isDarkMode == null) {
			initTheme();
		}
	});

	async function initTheme() {
		SDK.ready().then(async () => {
			isDarkMode = (await SDK.getConfiguration().theme) == "dark";
			if (isDarkMode) {
				setTheme(isDarkMode);
			}
		});
	}

	async function setTheme(isDark: boolean) {
		if (isDark) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}

	function handleSettings() {
		onSettings && onSettings();
	}
</script>

{#snippet rightSnippet()}
	<div class="flex h-full items-center">
		<Button iconPath={mdiCog} className="!px-2" iconClassName="text-base-500" onClick={handleSettings} />
	</div>
{/snippet}

<Navbar hasLogo logoImgSrc={logoUrl} hasTitle title="Chalisha Reporter" {rightSnippet} />
