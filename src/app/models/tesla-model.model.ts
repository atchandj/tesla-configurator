import { Color } from './color.model';

export class TeslaModel {
  constructor(
    public code: string,
    public description: string,
    public colors: Color[]
  ) {}
}
