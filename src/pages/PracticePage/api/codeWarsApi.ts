import { codeWarsTasks } from './tasksId';

export interface ITask {
  id: string;
  name: string;
  url: string;
  done: boolean;
}
export interface IUser {
  data: Array<ICompletedTask>;
}
export interface ICompletedTask {
  id: string;
  name: string;
  completedLanguages: Array<string>;
}

export type codeWarsTasksType = { [status: string]: string[] };

export class CodeWarsAPI {
  codeWarsLogin: string;
  constructor() {
    this.codeWarsLogin = '';
  }
  async getSingleTask(task: string) {
    const res = await fetch(`https://www.codewars.com/api/v1/code-challenges/${task}`)
      .then((res) => res.json())
      .then((res) => res);
    return res;
  }

  async getUser() {
    const res: IUser = await fetch(
      // elian-cheng
      // rsschool_d64fb9cd409b7f9b
      `https://www.codewars.com/api/v1/users/${this.codeWarsLogin}/code-challenges/completed`,
      {
        method: 'GET',
      }
    )
      .then((res) => res.json())
      .then((res) => res)
      .catch(() => console.log('incorrect name of user'));
    return res;
  }

  async getAllTasks(key: string) {
    const obj: codeWarsTasksType = codeWarsTasks;
    const tasksArr: ITask[] = await Promise.all(
      obj[key].map((item: string) => this.getSingleTask(item))
    ).then((res) => res);
    tasksArr.forEach((item) => (item.done = false));
    return tasksArr;
  }

  async checkTasks(tasks: ITask[]) {
    const userCompletedTasks = await this.getUser();
    tasks.forEach((item) => {
      if (
        userCompletedTasks.data.find(
          (task) => task.completedLanguages.includes('typescript') && task.id === item.id
        )
      ) {
        item.done = true;
      }
    });
    return tasks;
  }
}
