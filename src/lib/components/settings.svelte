<script lang="ts">
    import { Button, TextField, showToast } from "@cloudparker/moldex.js";
    import { type SettingsService } from "../services/settings.service";

    type PropsType = {
        onChange?: () => void;
        onClose?: () => void;
        settingsService: SettingsService;
    };

    let { onChange, onClose, settingsService }: PropsType = $props();

    let blobStorageAccount: string = $state(
        settingsService.settings?.blobStorageAccount || "",
    );
    let blobStorageContainer: string = $state(
        settingsService.settings?.blobStorageContainer || "",
    );
    let blobStorageSasToken: string = $state(
        settingsService.settings?.blobStorageSasToken || "",
    );

    async function handeleSubmit(ev: SubmitEvent) {
        ev.preventDefault();
        blobStorageAccount = (blobStorageAccount || "").trim();
        blobStorageContainer = (blobStorageContainer || "").trim();
        blobStorageSasToken = (blobStorageSasToken || "").trim();

        if (
            settingsService &&
            blobStorageAccount &&
            blobStorageContainer &&
            blobStorageSasToken
        ) {
            await settingsService.setSettings({
                blobStorageAccount,
                blobStorageContainer,
                blobStorageSasToken,
            });
            await settingsService.load();
            onChange && onChange();
        }
    }

    function handleClose(){
        onClose && onClose();
    }
</script>

<div class="p-4">
    <h3 class="text-xl">Extension Settings</h3>
    <form onsubmit={handeleSubmit}>
        <div class="my-4">
            <TextField
                name="blobStorageAccount"
                label="Account Name"
                placeholder="Azure Blob Storage Account Name"
                bind:value={blobStorageAccount}
                maxlength={100}
                required
            />
        </div>
        <div class="my-4">
            <TextField
                name="blobStorageContainer"
                label="Container Name"
                placeholder="Azure Blob Storage Container Name"
                bind:value={blobStorageContainer}
                maxlength={100}
                required
            />
        </div>
        <div class="my-4">
            <TextField
                name="blobStorageSasToken"
                label="SAS Token"
                placeholder="Add only SAS token"
                bind:value={blobStorageSasToken}
                maxlength={300}
                required
            />
        </div>
        <div class="flex gap-3">
            <Button appearance="primary" type="submit">Save</Button>
            <Button onClick={handleClose} appearance="base">Close</Button>
        </div>
    </form>
</div>
