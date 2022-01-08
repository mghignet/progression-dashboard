export enum MilestoneState {
  DONE = "done",
  WARNING = "warning",
}

export interface MilestoneModel {
  id: string;
  text: string;
  state?: MilestoneState;
  date: Date;
}
