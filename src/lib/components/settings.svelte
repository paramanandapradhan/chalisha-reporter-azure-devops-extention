<script lang="ts">
    import { Button, TextareaField, showToast } from "@cloudparker/moldex.js";
    import { type SettingsService } from "../services/settings.service";

    type PropsType = {
        onChange?: () => void;
        settingsService: SettingsService;
    };

    let { onChange, settingsService }: PropsType = $props();

    let blobSasUrl: string = $state(settingsService.getBlobSasTokenUrl()||'');

    async function handeleSubmit(ev: SubmitEvent) {
        ev.preventDefault();
        let url = (blobSasUrl || "").trim();

        if (settingsService && url) {
            if (
                !url.startsWith("https") ||
                url.indexOf("blob.core.windows.net") == -1 ||
                url.indexOf("sig=") == -1
            ) {
                return showToast({ msg: "Looks like incorrect SAS Token Url" });
            }
            await settingsService.setSettings({ blobSasUrl: url });
            await settingsService.load();
            onChange && onChange();
        }
    }
</script>

<div class="p-4">
    <h3 class="text-xl">Extension Settings</h3>
    <form onsubmit={handeleSubmit}>
        <div class="my-4">
            <div>
                <TextareaField
                    name="blobSasUrl"
                    label="Enter Azure Blob Store SAS URL"
                    placeholder="SAS Token URL"
                    bind:value={blobSasUrl}
                    maxlength={500}
                    required
                />
            </div>

            <div class="text-xs text-base-400 mt-1">
                e.g.
                https://mystorageaccount.blob.core.windows.net/reports?sv=2021-04-10&amp;ss=b&amp;srt=sco&amp;sp=rwdlacupx&amp;se=2023-12-31T23:59:59Z&amp;st=2023-01-01T00:00:00Z&amp;spr=https&amp;sig=J5Ynv1lEXAMPLEjB3O%2BFfO8bU1S65ZqQPRaEXAMPLEqLg%3D
            </div>
        </div>
        <div>
            <Button appearance="primary" type="submit">Save</Button>
        </div>
    </form>
</div>
