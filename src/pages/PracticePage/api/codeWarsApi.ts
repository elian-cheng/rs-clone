import { codeWarsTasks } from './codeWarsTasks';

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
  async getSingleTask(task: string) {
    const res = await fetch(`https://www.codewars.com/api/v1/code-challenges/${task}`)
      .then((res) => res.json())
      .then((res) => res);
    return res;
  }

  async getUserCompletedTasks(name: string) {
    const res: IUser = await fetch(
      `https://www.codewars.com/api/v1/users/${name}/code-challenges/completed`
    )
      .then((res) => res.json())
      .then((res) => res)
      .catch(() => {
        throw Error;
      });
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

  async checkTasks(tasks: ITask[], user: IUser) {
    const userCompletedTasks = user.data;
    tasks.forEach((item) => {
      if (
        userCompletedTasks.find(
          (task) => task.completedLanguages.includes('typescript') && task.id === item.id
        )
      ) {
        item.done = true;
      }
    });
    return tasks;
  }

  async renderTasks(name: string, status: string) {
    const storageName = localStorage.getItem('CodeWarsLogin');
    storageName ? (name = storageName) : name;
    const user = await this.getUserCompletedTasks(name);
    const tasks = await this.getAllTasks(status);
    if (user.data) {
      const checkedTasks = await this.checkTasks(tasks, user);
      return checkedTasks;
    } else {
      return tasks;
    }
  }
}
