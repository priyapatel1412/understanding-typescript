import {Project, ProjectStatus} from '../models/project';

type Listener<T> = (items: T[]) => void;
// Project State management class

class State<T> {
  protected listeners: Listener<T>[] = []; // array of listenerFn
  addListeners(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}
export class ProjectState extends State<Project> {
  private projects: Project[] = []; // array of project lists
  private static instance: ProjectState;

  private constructor() {
    super();
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }

    this.instance = new ProjectState();
    return this.instance;
  }
  addProject(title: string, description: string, numOfPeople: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      numOfPeople,
      ProjectStatus.Active
    );

    this.projects.push(newProject);
    this.updateListener();
  }

  // Move project state from one list to another - on drag and drop event
  moveProject(projectId: string | undefined, newStatus: ProjectStatus) {
    const project = this.projects.find((project) => project.id === projectId);
    if (project && project.projectStatus !== newStatus) {
      project.projectStatus = newStatus;
      this.updateListener();
    }
  }

  // update project on change in project state
  private updateListener() {
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice()); // call listenerFn when the new project is added with the copy of projects using slice method
    }
  }
}

export const projectState = ProjectState.getInstance();
