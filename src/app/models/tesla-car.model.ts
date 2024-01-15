export class TeslaCar {
  public configId: number | undefined;
  public towHitch: boolean = false;
  public yoke: boolean = false;

  constructor(public model: string, public color: string) {}
}
