/// <reference path="base-component.ts" />
/// <reference path="../util/validation.ts" />
/// <reference path="../decorators/autobind.ts" />
/// <reference path="../state/project-state.ts" />

namespace App {
  // Project input
  export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
      super('project-input', 'app', 'user-input', true);

      // title
      this.titleInputElement = this.element.querySelector(
        '#title'
      ) as HTMLInputElement;

      // title
      this.descriptionInputElement = this.element.querySelector(
        '#description'
      ) as HTMLInputElement;

      // title
      this.peopleInputElement = this.element.querySelector(
        '#people'
      ) as HTMLInputElement;
      this.configure();
      this.renderContent();
    }

    // gather input return tuple types
    private gatheruserInput(): [string, string, number] | void {
      const enteredTitle = this.titleInputElement.value;
      const enteredDescription = this.descriptionInputElement.value;
      const enteredPeople = this.peopleInputElement.value;

      const titleValidatable: Validatable = {
        value: enteredTitle,
        required: true,
      };

      const descriptionValidatable: Validatable = {
        value: enteredDescription,
        required: true,
        minLength: 5,
      };

      const peopleValidatable: Validatable = {
        value: +enteredPeople,
        required: true,
        min: 1,
        max: 5,
      };

      if (
        // If any of this validation fails retutn with alert message
        !validate(titleValidatable) ||
        !validate(descriptionValidatable) ||
        !validate(peopleValidatable)
      ) {
        alert('Invalid input');
        return;
      } else {
        return [enteredTitle, enteredDescription, +enteredPeople];
      }
    }

    private clearInputs() {
      this.titleInputElement.value = '';
      this.descriptionInputElement.value = '';
      this.peopleInputElement.value = '';
    }
    @autoBind // use @autoBind decorator to bind this to the method
    private submitHandler(event: Event) {
      event.preventDefault();
      const userInput = this.gatheruserInput();

      if (Array.isArray(userInput)) {
        const [title, description, people] = userInput;

        projectState.addProject(title, description, people);

        this.clearInputs();
      }
    }

    configure() {
      this.element.addEventListener('submit', this.submitHandler);
    }

    renderContent() {}
  }
}
