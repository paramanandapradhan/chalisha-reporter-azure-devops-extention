<script lang="ts">
	import { Navbar } from "@cloudparker/moldex.js";
	import * as SDK from "azure-devops-extension-sdk";
	import logoUrl from "../../icons/logo.png";

	type PropsType = {
		onCreate?: () => void;
	};
	let { onCreate }: PropsType = $props();

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
</script>

<Navbar hasLogo logoImgSrc={logoUrl} hasTitle title="Chalisha Reporter" />
