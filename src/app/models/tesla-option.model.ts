import { TeslaConfig } from './tesla-config.model';

export class TeslaOption {
  constructor(
    public configs: TeslaConfig[],
    public towHitch: boolean,
    public yoke: boolean
  ) {}
}
