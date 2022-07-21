export class Technic {
  constructor(
    public type: string,
    public number: string,
    public userId: number,
    public status?: string,
    public coordinateLatitude?: number,
    public coordinateLongitude?: number,
    public id?: number
  ) {}
}
