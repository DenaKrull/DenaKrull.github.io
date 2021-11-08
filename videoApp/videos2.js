(function() {
    'use strict';

    const videoSelect = $('#videos');
    const eachVideo = $('#video');
    const videoNameElem = $('#video h2');
    const videoPictureElem = $('#video video').hide();
    const errorElem = $('#error');

    async function loadJson(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }
            const result = await response.json();
            return result;
        } catch (e) {
            errorElem.text(e.message);
        }
    }
    async function videoSelected(videoToLoad) {
        const video = await loadJson(`${videoToLoad}.json`);
        if (video) {
            // console.log(video);

            videoNameElem.text(video.title);
            // videoPictureElem.attr('src', video.url); 
            videoPictureElem.attr('src', video.url).show();
            videoPictureElem[0].play();

        }
    }
    async function loadVideos() {
        const videos = await loadJson('videos.json');
        if (videos) {
            videos.forEach(video => {
                videoSelect.append(`<option value="${video.id}">${video.title}</option>`);
                // videoNameElem.append(video.title);
                // videoNameElem.value = video.id;

            });
        }

        videoSelect.change(function() {
            // console.log(this.value);
            videoSelected(this.value);


        });

    }

    // videoNameElem.empty();



    loadVideos();

}());