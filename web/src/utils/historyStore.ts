import { GenericProps, GenericReference } from './genericTypes';

type HistoryDescription = string;
type HistoryFullPath = string;
type HistoryFaIcon = string;


type HistorySeason = number | string;
type HistoryChampions = string;
type HistoryRunnersUp = string;
type HistoryMvp = string;
type HistoryMvpTeam = string;
type HistoryMvpPlayed = number | string;
type HistoryMvpWon = number | string;
type HistoryMvpLost = number | string;


type HistoryTableEntry = {
  season: HistorySeason,
  champion: HistoryChampions,
  runnersup: HistoryRunnersUp,
  mvp: HistoryMvp,
  mvpTeam: HistoryMvpTeam,
  mvpPlayed: HistoryMvpPlayed
  mvpWon: HistoryMvpWon,
  mvpLost: HistoryMvpLost
};

interface HistoryProps extends GenericProps {
  description: HistoryDescription;
  fullPath?: HistoryFullPath;
  icon: HistoryFaIcon;
  history: HistoryTableEntry[];
}

type HistoryDirectory = {
  [key: string]: HistoryProps;
};

export class HistoryStore {
  private static historyDir: HistoryDirectory = {}

  static registerContent(props: HistoryProps): void {
    this.historyDir[props.reference] = props;
  }

  static getContent(reference: GenericReference): HistoryProps {
    return Object.assign({}, this.historyDir[reference]);
  }
}

