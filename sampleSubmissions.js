//sampleSubmissions.js

import {Album} from "./album.js";

//Simple track class; The fields here are what the admin dashboard expects from a real Track class
class Track {
    constructor(name, runtime){
        this.name = name;
        this.runtime = runtime;
    }
}

//Simple user class, as above; 
class User {
    constructor (name) {
        this.name = name;
    }
}

const trackListing1 = [
    new Track("Intro", "3:09"),
    new Track("Markadelic", "2:36"),
    new Track("Remark Request", "2:53")];

const trackListing2 = [
    new Track("Here Comes the Hammer", "4:32"),
    new Track("U Can't Touch This", "4:17"),
    new Track("Have You Seen Her", "4:42")];

const sampleUser1 = new User("Sample User 1");
const sampleUser2 = new User("Sample User 2")

const album1 = new Album("Bahen...", "NoteWorthy", "NoteWorthy", "2020", "Rock", "MarkUs Records", "29:34", trackListing1, sampleUser1);
const album2 = new Album("Please Hammer Don't Hurt 'Em", "MC Hammer", ["Big Louis Burrel", "MC Hammer", "Scott Folks"], "1990", "Hip hop", "Capitol Records", "59:04", trackListing2, sampleUser2);
export const sampleSubmissions = [album1, album2];