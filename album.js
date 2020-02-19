//album.js

let albumCount = 0;

export class Album {
    constructor(title, artist, producer, year, genre, label, runtime, tracklisting, submitter) {
        this.albumId = albumCount;
        albumCount++;
        this.title=title;
        this.artist=artist;
        this.producer=producer;
        this.year=year;
        this.genre=genre;
        this.label=label;
        this.runtime=runtime;
        this.tracklisting=tracklisting;
        this.avgRating=null;
        this.submitter = submitter;
        this.submissionDate = new Date();
    }
}