export interface ILibrary {
    name: string;
    building: string;
    floor_count: number;
    capacity: number;
    image: string;
    id: number;
    place_id: string;
    fullness: number | null;
    selected: string;
    summary: string;
};