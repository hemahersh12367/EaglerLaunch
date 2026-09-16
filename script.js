// ==========================================
// EaglerLaunch Download Configuration
// ==========================================

const GOOGLE_DRIVE_URL =
    "https://drive.google.com/file/d/1scY3ZVciT_tZBPVHXXhuL2HqPFlWmI5E/view?usp=drive_link";


// ==========================================
// Convert Google Drive sharing link
// into a direct-download URL
// ==========================================

function convertGoogleDriveUrl(url) {

    if (!url) {
        return null;
    }

    const match = url.match(
        /\/d\/([a-zA-Z0-9_-]+)/
    );

    if (match && match[1]) {

        const fileId = match[1];

        return `https://drive.usercontent.google.com/download?id=${fileId}&export=download&confirm=t`;
    }

    if (url.includes("drive.usercontent.google.com")) {
        return url;
    }

    return url;
}


// ==========================================
// Download Button
// ==========================================

const downloadButton =
    document.getElementById("downloadButton");

const downloadStatus =
    document.getElementById("downloadStatus");


downloadButton.addEventListener("click", () => {

    const downloadUrl =
        convertGoogleDriveUrl(GOOGLE_DRIVE_URL);

    if (!downloadUrl) {

        downloadStatus.textContent =
            "Download link is not configured.";

        return;
    }

    downloadStatus.textContent =
        "Preparing your download...";

    downloadButton.disabled = true;
    downloadButton.style.opacity = "0.7";


    const link =
        document.createElement("a");

    link.href = downloadUrl;

    link.download = "EaglerLaunch.zip";

    link.target = "_blank";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);


    setTimeout(() => {

        downloadStatus.textContent =
            "Your EaglerLaunch download should now be starting.";

        downloadButton.disabled = false;
        downloadButton.style.opacity = "1";

    }, 1500);

});


// ==========================================
// Page Loaded
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    document.body.classList.add("loaded");

});