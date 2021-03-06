const host = "https://youtubevid-downloader.herokuapp.com/"   //* Heroku hostname
// const host = "http://127.0.0.1:5000/" //* DEBUG Localhost hostname
const urlBox = document.querySelector("#videoURL");
const getVidBtn = document.querySelector("#get-video-info-btn");
const defaultPlaceholder = "https://www.youtube.com/watch?v=video_id_here"

getVidBtn.addEventListener("click", () => {
    let videoURL = urlBox.value.trim();

    if (videoURL.length == 0) {
        urlBox.style.color = "#ff0000";
        urlBox.placeholder = "Please enter a link";
        urlBox.addEventListener("click", () => {
            urlBox.style.color = "#f5f5f5";
            urlBox.placeholder = defaultPlaceholder;
        });
        return;
    }

    if (videoURL.startsWith("www.youtube.com")) {
        videoURL = "https://" + videoURL;
        urlBox.value = videoURL;
    } else if (videoURL.startsWith("youtube.com")) {
        videoURL = "https://www." + videoURL;
        urlBox.value = videoURL;
    } else if (videoURL.startsWith("https://youtube.com")) {
        videoURL = "https://www." + videoURL.substring(8);
        urlBox.value = videoURL;
    }

    fetch(`${host}videoInfo?videoURL=${videoURL}`).then((res) => {
        return res.json();
    }).then((data) => {
        console.log(data);
        let detailsNodes = {
            thumbnail: document.querySelector(".video-data .thumbnail img"),
            title: document.querySelector(".video-data .info h1"),
            description: document.querySelector(".video-data .info p"),
            videoURL: document.querySelector(".video-data .controls #video-url"),
            downloadOptions: document.querySelector(".video-data .controls #download-options"),
        }

        let html = "";

        for (let i = 0; i < data.formats.length; i++) {
            if (data.formats[i].container != "mp4" && (data.formats[i].mimeType != "audio/mp4" || data.formats[i].mimeType != "video/mp4")) {
                continue;
            }

            html += `
            <option value="${data.formats[i].itag}" style='background:#111;color:#f5f5f5;'>
                ${data.formats[i].container != null ? data.formats[i].container.toUpperCase() : data.formats[i].container} - ${data.formats[i].qualityLabel != null ? data.formats[i].qualityLabel.toUpperCase() : "SOUND ONLY"} - ${data.formats[i].mimeType != null ? data.formats[i].mimeType.slice(0, 5).toUpperCase() : data.formats[i].mimeType}
            </option>
            `;

            detailsNodes.thumbnail.src = data.videoDetails.thumbnails[data.videoDetails.thumbnails.length - 1].url; // Get High Quality Thumbnail
            detailsNodes.title.innerText = data.videoDetails.title;
            detailsNodes.description.innerText = data.videoDetails.description != null ? "Description:\n\n" + data.videoDetails.description : "Description:\n\n[NO DESCRIPTION]";
            detailsNodes.videoURL.value = videoURL;
            detailsNodes.downloadOptions.innerHTML = html;

            document.querySelector(".video-data").style.display = "block";
            document.querySelector(".controls").scrollIntoView({
                behavior: "smooth"
            });
        }
    }).catch((error) => {
        alert("Something went wrong :(\nCheck the Console for the error message and contact the website creator for assistance");
        console.error(error);
    });
});

document.querySelector("#download-btn").addEventListener("click", () => {
    let videoURL = document.querySelector("#video-url").value;
    let itag = document.querySelector("#download-options").value;
    window.open(`${host}download?videoURL=${videoURL}&itag=${itag}`);
})