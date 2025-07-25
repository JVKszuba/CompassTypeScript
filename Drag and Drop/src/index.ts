interface Draggable {

    dragStartHandler(event: DragEvent): void
    dragEndHandler(event: DragEvent): void
}

interface DragTarget {

    dragOverHandler(event: DragEvent): void
    dropHandler(event: DragEvent): void
    dragLeaveHandler(event: DragEvent): void
}

enum ProjectStatus { Active, Finished }

class Project {

    id: string;
    title: string;
    description: string;
    people: number;
    status: ProjectStatus;

    constructor(id: string, title: string, description: string, people: number, status: ProjectStatus) {

        this.id = id;
        this.title = title;
        this.description = description;
        this.people = people;
        this.status = status;
    }
}

type Listener<T> = (items: T[]) => void

class State<T> {

    protected listeners: Listener<T>[] = [];

    addListener(listenerFunction: Listener<T>) {

        this.listeners.push(listenerFunction);
    }
}

class ProjectState extends State<Project> {

    private projects: Project[] = [];
    private static instance: ProjectState;

    private constructor() { super(); }

    static get getInstance() {

        if (this.instance) return this.instance;

        return this.instance = new ProjectState();
    }

    addProject(title: string, description: string, numPeople: number) {

        const newProject = new Project(Math.random().toString(), title, description, numPeople, ProjectStatus.Active);

        this.projects.push(newProject);

        this.updateListeners();
    }

    moveProject(projectId: string, newStatus: ProjectStatus) {

        const project = this.projects.find(project => project.id == projectId);

        if (project && project.status !== newStatus) {

            project.status = newStatus;
            this.updateListeners();
        }
    }

    private updateListeners() {

        for (const listenerFunction of this.listeners) { listenerFunction(this.projects.slice()); }
    }
}

const projectState = ProjectState.getInstance;

interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    max?: number;
    min?: number;
}

function validate(validatableInput: Validatable): boolean {

    let isValid = true;

    if (validatableInput.required) isValid = isValid && validatableInput.value.toString().trim().length !== 0;

    if (validatableInput.minLength != null && typeof validatableInput.value === 'string') isValid = isValid && validatableInput.value.length >= validatableInput.minLength;

    if (validatableInput.maxLength != null && typeof validatableInput.value === 'string') isValid = isValid && validatableInput.value.length <= validatableInput.maxLength;

    if (validatableInput.min != null && typeof validatableInput.value === 'number') isValid = isValid && validatableInput.value >= validatableInput.min;

    if (validatableInput.max != null && typeof validatableInput.value === 'number') isValid = isValid && validatableInput.value <= validatableInput.max;

    return isValid;
}

function autoBind(_: any, __: string, descriptor: PropertyDescriptor) {

    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {

        configurable: true,

        get() { return originalMethod.bind(this); }
    }

    return adjDescriptor;
}

abstract class Component<T extends HTMLElement, U extends HTMLElement> {

    templateElement: HTMLTemplateElement;
    hostElement: T;
    element: U;

    protected constructor(templateId: string, hostElementId: string, insertPosition: InsertPosition, newElementId?: string) {

        this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement;
        this.hostElement = document.getElementById(hostElementId)! as T;

        const importedNode = document.importNode(this.templateElement.content, true);

        this.element = importedNode.firstElementChild as U;
        if (newElementId) {this.element.id = newElementId;}

        this.attach(insertPosition);
    }

    private attach(insertPosition: InsertPosition) {

        this.hostElement.insertAdjacentElement(insertPosition, this.element);
    }

    abstract configure(): void
    abstract renderContent(): void
}

class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {

    private project: Project;

    constructor(hostId: string, project: Project) {

        super('single-project', hostId, 'beforeend', project.id);

        this.project = project;

        this.configure();
        this.renderContent();
    }

    get persons() {

        if (this.project.people === 1) return '1 person';
        else return `${this.project.people} persons`;
    }

    @autoBind
    dragStartHandler(event: DragEvent) {

        event.dataTransfer!.setData('text/plain', this.project.id)
        event.dataTransfer!.effectAllowed = 'move';
    }

    @autoBind
    dragEndHandler(_: DragEvent) {

        console.log('Drag End');
    }

    configure() {

        this.element.addEventListener('dragstart', this.dragStartHandler);
        this.element.addEventListener('dragend', this.dragEndHandler);
    }

    renderContent() {

        this.element.querySelector('h2')!.textContent = this.project.title;
        this.element.querySelector('h3')!.textContent = this.persons + ' assigned.';
        this.element.querySelector('p')!.textContent = this.project.description;
    }
}

class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {

    assignedProjects: Project[];

    constructor(private type: 'active' | 'finished') {

        super('project-list', 'app', 'beforeend', `${type}-projects`)

        this.assignedProjects = [];

        this.configure()
        this.renderContent();
    }

    @autoBind
    dragOverHandler(event: DragEvent) {

        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {

            event.preventDefault();

            const listElement = this.element.querySelector('ul')!;

            listElement.classList.add('droppable')
        }
    }

    @autoBind
    dropHandler(event: DragEvent) {

        const projectId = event.dataTransfer!.getData('text/plain');

        projectState.moveProject(projectId, this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished);
    }

    @autoBind
    dragLeaveHandler(_: DragEvent) {

        const listElement = this.element.querySelector('ul')!;

        listElement.classList.remove('droppable')
    }

    configure() {

        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);
        this.element.addEventListener('drop', this.dropHandler);

        projectState.addListener((projects: Project[]) => {

            this.assignedProjects = projects.filter(project => {

                if (this.type === 'active') return project.status === ProjectStatus.Active;
                return project.status === ProjectStatus.Finished;
            });

            this.renderProjects()
        });
    }

    renderContent() {

        this.element.querySelector('ul')!.id = `${this.type}-projects-list`;
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';
    }

    private renderProjects() {

        const listElement = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;

        listElement.innerHTML = '';

        for (const projectItem of this.assignedProjects) { new ProjectItem(this.element.querySelector('ul')!.id, projectItem); }
    }
}

class ProjectInput extends Component<HTMLDivElement, HTMLFormElement>{

    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {

        super('project-input', 'app', 'afterbegin', 'user-input');

        this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;

        this.configure();
    }

    configure() {

        this.element.addEventListener('submit', this.submitHandler);
    }

    renderContent() {

    }

    private gatherUserInput(): [string, string, number] | void {

        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;

        const titleValidatable: Validatable = {value: enteredTitle, required: true}
        const descriptionValidatable: Validatable = {value: enteredDescription, required: true, minLength: 5}
        const peopleValidatable: Validatable = {value: +enteredPeople, required: true, min: 1, max: 5}

        if (!validate(titleValidatable) || !validate(descriptionValidatable) || !validate(peopleValidatable)) {

            return alert('Invalid input: please try again!');

        } else { return [enteredTitle, enteredDescription, +enteredPeople] }
    }

    private clearInputs() {

        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';
    }

    @autoBind
    private submitHandler(event: Event) {

        event.preventDefault();

        const userInput = this.gatherUserInput();

        if (Array.isArray(userInput)) {

            const [title, description, people] = userInput;
            projectState.addProject(title, description, people);
            this.clearInputs();
        }
    }
}

const projectInput = new ProjectInput();
const activeProjectList = new ProjectList('active');
const finishedProjectList = new ProjectList('finished');
