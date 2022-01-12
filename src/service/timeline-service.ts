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
        text: "Blue Team : fin",
        state: MilestoneState.WARNING,
        date: new Date("01/31/2022"),
      },
      {
        id: "2",
        text: "Team Alignment",
        state: MilestoneState.DONE,
        date: new Date("02/15/2022"),
      },
      {
        id: "3",
        text: "Initialisation des composants",
        date: new Date("03/15/2022"),
      },
      {
        id: "4",
        text: "Matching / exécution",
        date: new Date("05/15/2022"),
      },
      {
        id: "5",
        text: "Facturation",
        date: new Date("06/15/2022"),
      },
      {
        id: "6",
        text: "Evaluation",
        date: new Date("07/15/2022"),
      },
    ],
  };
}
