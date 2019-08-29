import { Avis } from './avis.model';

export class Restaurant {
    constructor(public restaurantName: string,
                public address: string,
                public lat: number,
                public long: number,
                public ratings: Avis[] = [],
                public showDetails: boolean = false,
                public showOpinions: boolean = false,
                public addOpinion: boolean = false) {}
}
