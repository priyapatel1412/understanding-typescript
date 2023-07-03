// Component base class
export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement; // project list template
  hostElement: T; // app div element
  element: U; // this is the section

  constructor(
    templateId: string,
    hostElementId: string,
    newElementId?: string,
    insertAtStart?: boolean
  ) {
    this.templateElement = document.getElementById(
      templateId
    ) as HTMLTemplateElement;
    this.hostElement = document.getElementById(hostElementId) as T;
    // import node form template and create a deep clone copy of it
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );

    //element is the form element
    this.element = importedNode.firstElementChild as U;
    if (newElementId) {
      this.element.id = newElementId;
    }
    this.attach(insertAtStart);
  }

  // Insert lists in a DOM
  private attach(insertAtBeginning: boolean | undefined) {
    this.hostElement.insertAdjacentElement(
      insertAtBeginning ? 'afterbegin' : 'beforeend',
      this.element
    );
  }

  abstract configure(): void;
  abstract renderContent(): void;
}
