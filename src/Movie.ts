export interface Movie {
    name:             string;
    shortDescription: string;
    longDescription:  string;
    duration:         string;
    releaseDate:      string;
    movieUrl:         string;
    posterUrl:        string;
    categoriesIds:    number[];
    directorsIds:     number[];
    actorsIds:        number[];
}