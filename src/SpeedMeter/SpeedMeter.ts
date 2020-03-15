import ISpeedMeter from "./ISpeedMeter";

export default class SpeedMeter implements ISpeedMeter {
  private tempCount: number = 0;
  private totalCount: number = 0;
  constructor(
    private readonly countKeepDurationMs: number,
  ) {

  }
  public getTotalCount(): number {
    return this.totalCount;
  }

  public addCount(): void {
    this.tempCount += 1;
    this.totalCount += 1;

    setTimeout(() => {
      this.tempCount -= 1;
    }, this.countKeepDurationMs);
  }

  public getCount(): number {
    return this.tempCount;
  }
}
