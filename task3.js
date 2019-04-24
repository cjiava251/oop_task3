class Project {
  constructor(number, day) {
    this.difficulty = Math.round(Math.random() * 2) + 1;
    this.stage = 0;
    this.number = number;
    this.dayOfStartDev = day;
  }
  setDayOfStartDev(day) {
    this.dayOfStartDev = day;
  }
  getDayOfStartDev() {
    return this.dayOfStartDev;
  }
  getNumber() {
    return this.number;
  }

  setStage(stage) {
    this.stage = stage;
  }
  getStage() {
    return this.stage;
  }
  getDifficulty() {
    return this.difficulty;
  }
}

class WebProject extends Project {
  constructor(number, day) {
    super(number, day);
  }
}

class MobileProject extends Project {
  constructor(number, day) {
    super(number, day);
    this.quantityOfDevelopers = 0;
  }
  setQuantityOfDevelopers(quantityOfDevelopers) {
    this.quantityOfDevelopers = quantityOfDevelopers;
  }
  getQuantityOfDevelopers() {
    return this.quantityOfDevelopers;
  }
}

class Employee {
  constructor(id) {
    this.completedProjects = 0;
    this.project = null;
    this.notWorkingDays = 0;
    this.busy = false;
    this.personalID = id;
  }
  setProject(project) {
    this.project = project;
  }
  getEmployment() {
    return this.notWorkingDays;
  }
  getQuantityOfCompletedProjects() {
    return this.completedProjects;
  }
  getPersonalID() {
    return this.personalID;
  }
  setBusy(busy) {
    this.busy = busy;
  }
}

class WebDeveloper extends Employee {
  constructor(id) {
    super(id);
  }
  completeProject(day, testDept, dept) {
    if ((this.project) && (day - this.project.getDayOfStartDev() == this.project.getDifficulty())) {
      this.project.setStage(2);
      this.project.setDayOfStartDev(day);
      testDept.getProjects(this.project);
      dept.deleteProject(this.project.getNumber());
      this.project = null;
      this.busy = false;
      this.completedProjects++;
      this.notWorkingDays = 0;
    } else
      this.notWorkingDays++;
  }
}

class MobileDeveloper extends Employee {
  constructor(id) {
    super(id);
  }
  completeProject(day, testDept, dept) {
    if (this.project) {
      if (((day - this.project.getDayOfStartDev() == this.project.getDifficulty()) && (this.project.getQuantityOfDevelopers() == 1)) || ((day - this.project.getDayOfStartDev() == 1) && (this.project.getQuantityOfDevelopers() == this.project.getDifficulty()))) {
        this.project.setStage(2);
        this.project.setDayOfStartDev(day);
        testDept.getProjects(this.project);
        dept.deleteProject(this.project.getNumber());
        this.project = null;
        this.busy = false;
        this.completedProjects++;
        this.notWorkingDays = 0;
      } else
        this.notWorkingDays++;
    }
  }
}

class QATester extends Employee {
  constructor(id) {
    super(id);
  }
  completeProject(day, dept) {
    if ((this.project) && (day - this.project.getDayOfStartDev() == 1)) {
      dept.deleteProject(this.project.getNumber());
      this.project = null;
      this.busy = false;
      this.completedProjects++;
      dept.quantityOfCompletedProjects++;
      this.notWorkingDays = 0;
    } else
      this.notWorkingDays++;
  }
}

class Department {
  constructor() {
    this.projects = [];
    this.employees = [];
  }
  getProjects(projects) {
    this.projects = this.projects.concat(projects);
  }
  getProjectsLength() {
    return this.projects.length;
  }
  getEmployees(employees) {
    this.employees = this.employees.concat(employees);
  }
  getEmployeesLength() {
    return this.employees.length;
  }
  getFreeEmployees() {
    return this.employees.filter(({ busy }) => (!busy));
  }
  getFreeEmployeesLength() {
    return this.getFreeEmployees().length;
  }
  deleteProject(num) {
    this.projects = this.projects.filter(({ number }) => {
      return number != num;
    });
  }
  giveProjectsToEmployees() {
// допилить добавление проекта программисту

    /*
    this.employees=this.employees.map((element) => {
      if (element.project==null)
        element.setProject()
    });
    */
  }
}

class WebDepartment extends Department {
  constructor() {
    super();
  }
  completingProjects(day, testDept, dept) {
    for (let i = 0; i <= this.getEmployeesLength() - 1; i++)
      this.employees[i].completeProject(day, testDept, dept);
  }
}

class MobileDepartment extends Department {
  constructor() {
    super();
  }
  checkForFreeDevelopers() {
    if (this.getFreeEmployeesLength()) {
      this.projects = this.projects.map((element) => {
        while (element.getQuantityOfDevelopers() != element.getDifficulty()) {
          element.setQuantityOfDevelopers(element.getQuantityOfDevelopers() + 1);
          if (this.getFreeEmployees()[0]) {
            this.getFreeEmployees()[0].setProject(element);
            this.getFreeEmployees()[0].setBusy(true);
          }
        }
        return element;
      });
    }
  }

  completingProjects(day, testDept, dept) {
    for (let i = 0; i <= this.getEmployeesLength() - 1; i++)
      this.employees[i].completeProject(day,testDept, dept);
  }
}

class TestDepartment extends Department {
  constructor() {
    super();
    this.quantityOfCompletedProjects=0;
  }
  completingProjects(day,dept) {
    for (let i = 0; i <= this.getEmployeesLength() - 1; i++)
      this.employees[i].completeProject(day,dept);
  }
  getQuantityOfCompletedProjects() {
    return this.quantityOfCompletedProjects;
  }
}

class Director {
  constructor() {
    this.webProjects = [];
    this.mobileProjects = [];
    this.quantityOfAllProjects = 0;
    this.quantityOfAllHiredEmployees = 0;
    this.quantityOfFiredEmployees = 0;
  }

  getProjects(day) {
    var allProjects = Math.round(Math.random() * 4);  //общее количество полученных проектов за день
    var webProjects = Math.round(Math.random() * allProjects);  //количество веб проектов
    for (let i = 0; i <= allProjects - 1; i++)
      if (i <= webProjects)
        this.webProjects.push(new WebProject(this.quantityOfAllProjects++, day));
      else
        this.mobileProjects.push(new MobileProject(this.quantityOfAllProjects++, day));
  }

  giveProjects(dept) {
    var projects = [];
    if (dept instanceof WebDepartment) {
      projects = this.webProjects.splice(0, Math.min(this.webProjects.length, dept.getFreeEmployeesLength()));
    }
    else if (dept instanceof MobileDepartment)
      projects = this.mobileProjects.splice(0, Math.min(this.mobileProjects.length, dept.getFreeEmployeesLength()));
    dept.getProjects(projects);
  }

  hireEmployees(dept) {
    var employees = [];
    if (dept instanceof WebDepartment) {
      for (let i = 0; i <= this.webProjects.length - dept.getFreeEmployeesLength() - 1; i++)
        employees.push(new WebDeveloper(this.quantityOfAllHiredEmployees++));
    } else
      if (dept instanceof MobileDepartment) {
        for (let i = 0; i <= this.mobileProjects.length - dept.getFreeEmployeesLength() - 1; i++)
          employees.push(new MobileDeveloper(this.quantityOfAllHiredEmployees++));
      } else
        if (dept instanceof TestDepartment) {
          for (let i = 0; i <= dept.getProjectsLength() - dept.getFreeEmployeesLength() - 1; i++)
            employees.push(new QATester(this.quantityOfAllHiredEmployees++));
        }
    dept.getEmployees(employees);
  }

  fireOut(dept) {
    var employees = dept.employees.filter((employee) => {
      return employee.getEmployment() > 3;
    });
    employees.sort((a, b) => {
      return a.getQuantityOfCompletedProjects() - b.getQuantityOfCompletedProjects();
    });
    if (employees[0]) {
      dept.employees = dept.employees.filter((employee) => {
        return employee.getPersonalID() != employees[0].getPersonalID();
      });
      this.quantityOfFiredEmployees++;
    }
  }
}

class Company {
  constructor() {
    this.director = new Director;
    this.webDepartment = new WebDepartment;
    this.mobileDepartment = new MobileDepartment;
    this.testDepartment = new TestDepartment;
  }
  startWorking(day) {
    for (let i = 0; i <= day - 1; i++) {
      this.director.getProjects(i);
      this.director.giveProjects(this.webDepartment);
      this.director.giveProjects(this.mobileDepartment);
      this.director.hireEmployees(this.webDepartment);
      this.director.hireEmployees(this.mobileDepartment);
      this.director.hireEmployees(this.testDepartment);
      this.webDepartment.completingProjects(i, this.testDepartment, this.webDepartment);
      this.mobileDepartment.completingProjects(i, this.testDepartment, this.mobileDepartment);
      this.testDepartment.completingProjects(i,this.testDepartment);
      this.mobileDepartment.checkForFreeDevelopers();
      this.director.fireOut(this.webDepartment);
      this.director.fireOut(this.mobileDepartment);
      this.director.fireOut(this.testDepartment);
    }
  }
}

var apple = new Company;
apple.startWorking(15);
//console.log(apple.webDepartment.getEmployeesLength());
console.log(apple);