import { Technic } from './technic.model';

export class ArchiveToTechnic {
  constructor(
    public status: string,
    public coordinateLatitude: number,
    public coordinateLongitude: number,
    public archiveId: number,
    public technicId: number,
    public technic?: Technic,
    public id?: number
  ) {}
}
