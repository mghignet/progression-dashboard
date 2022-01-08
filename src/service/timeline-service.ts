import { MilestoneState } from "@/model/Milestone";
import { TimelineModel } from "@/model/Timeline";

export function getTimeline(): TimelineModel {
  return {
    beginDate: new Date("01/01/2022"),
    endDate: new Date("12/31/2022"),
    periods: [
      {
        id: "1",
        text: "Q1",
        beginDate: new Date("01/01/2022"),
        endDate: new Date("03/31/2022"),
      },
      {
        id: "2",
        text: "Q2",
        beginDate: new Date("04/01/2022"),
        endDate: new Date("06/30/2022"),
      },
      {
        id: "3",
        text: "Q3",
        beginDate: new Date("07/01/2022"),
        endDate: new Date("09/30/2022"),
      },
      {
        id: "4",
        text: "Q4",
        beginDate: new Date("10/01/2022"),
        endDate: new Date("12/31/2022"),
      },
    ],
    milestones: [
      {
        id: "1",
        text: "Odin est décommissionné",
        state: MilestoneState.WARNING,
        date: new Date("03/31/2022"),
      },
      {
        id: "2",
        text: "Moins de 10% de RTs annulés",
        state: MilestoneState.DONE,
        date: new Date("06/30/2022"),
      },
      {
        id: "3",
        text: "+40% de forfaits dans Instala",
        date: new Date("09/30/2022"),
      },
      {
        id: "4",
        text: "L'équipe est plus heureuse de 50%",
        date: new Date("11/30/2022"),
      },
    ],
  };
}
