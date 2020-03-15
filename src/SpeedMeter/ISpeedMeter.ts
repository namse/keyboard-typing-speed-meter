export default interface ISpeedMeter {
  addCount(): void;
  getTotalCount(): number;
  getCount(): number;
}
