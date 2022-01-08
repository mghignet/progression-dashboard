import { MilestoneModel } from "@/model/Milestone";
import { PeriodModel } from "@/model/Period";

export interface TimelineModel {
  beginDate: Date;
  endDate: Date;
  periods: PeriodModel[];
  milestones: MilestoneModel[];
}
