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
  constructor() {
    super();
  }
}

class MobileProject extends Project {
  constructor() {
    super();
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
  setNotWorkingDays() {
    this.notWorkingDays++;
  }
  getQuantityOfCompletedProjects() {
    return this.completedProjects;
  }
  getPersonalID() {
    return this.personalID;
  }
}

class WebDeveloper extends Employee {
  constructor() {
    super();
  }
  completeProject(day, dept) {
    if ((this.project) && (day - this.project.getDayOfStartDev() == this.project.getDifficulty())) {
      this.project.setStage(2);
      this.project.setDayOfStartDev(day);
      dept.getProjects(this.project);
      this.project = null;
      this.busy = false;
      this.completedProjects++;
    }
  }
}

class MobileDeveloper extends Employee {
  constructor() {
    super();
  }
  completeProject(day, dept) {
    if (this.project) {
      if (((day - this.project.getDayOfStartDev() == this.project.getDifficulty()) && (this.project.getQuantityOfDevelopers() == 1)) || ((day - this.project.getDayOfStartDev() == 1) && (this.project.getQuantityOfDevelopers() == this.project.getDifficulty()))) {
        this.project.setStage(2);
        this.project.setDayOfStartDev(day);
        dept.getProjects(this.project);
        this.project = null;
        this.busy = false;
        this.completedProjects++;
      }
    }
  }
}

class QATester extends Employee {
  constructor() {
    super();
  }
  completeProject() {
    if ((this.project) && (day - this.project.getDayOfStartDev() == 1)) {
      this.project = null;
      this.busy = false;
      this.completedProjects++;
    }
  }
}

class Department {
  constructor() {
    this.projects = [];
    this.employees = [];
  }
  getProjects(projects) {
    this.projects.concat(projects);
  }
  getProjectsLength() {
    return this.projects.length;
  }
  getEmployees(employees) {
    this.employees.concat(employees);
  }
  getFreeEmployees() {
    return this.employees.filter(({ busy }) => (!busy));
  }
  getFreeEmployeesLength() {
    return getFreeEmployees().length;
  }
  deleteProject(num) {
    this.projects = this.projects.filter(({ number }) => {
      return number != num;
    });
  }

}

class WebDepartment extends Department {
  constructor() {
    super();
  }
}

class MobileDepartment extends Department {
  constructor() {
    super();
  }
}

class TestDepartment extends Department {
  constructor() {
    super();
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

  getProjects() {
    var rndNumber1 = Math.round(Math.random() * 4);  //общее количество полученных проектов за день
    var rndNumber2 = Math.round(Math.random() * rndNumber1);  //количество веб проектов
    for (let i = 0; i <= rndNumber1 - 1; i++)
      if (i <= rndNumber2)
        this.webProjects.push(new WebProject);
      else
        this.mobileProjects.push(new MobileProject);
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
        employees.push(new WebDeveloper);
    } else
      if (dept instanceof MobileDepartment) {
        for (let i = 0; i <= this.mobileProjects.length - dept.getFreeEmployeesLength() - 1; i++)
          employees.push(new MobileDeveloper);
      } else
        if (dept instanceof TestDepartment) {
          for (let i = 0; i <= dept.getProjectsLength() - dept.getFreeEmployeesLength() - 1; i++) {
            employees.push(new QATester);
          }
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
      dept.employees = dept.employees.filter((emplyee) => {
        return emplyee.getPersonalID() != employees[0].getPersonalID();
      });
      this.quantityOfFiredEmployees++;
    }
  }
}


class Company {
  constructor() {
    this.director=new Director;
    this.webDepartment=new WebDepartment;
    this.mobileDepartment=new MobileDepartment;
    this.testDepartment=new TestDepartment;
    this.quantityOfCompletedProjects=0;
    this.quantityOfHiredEmployees=0;
    this.quantityOfFiredEmployees=0;
  }
  startWorking(day) {
    for (let i=0;i<=day-1;i++) {
      this.director.getProjects();
      this.director.giveProjects(this.webDepartment);
      this.director.giveProjects(this.mobileDepartment);
      this.director.hireEmployees(this.webDepartment);
      this.director.hireEmployees(this.mobileDepartment);
      this.director.hireEmployees(this.testDepartment);
      

    }
  }
}

/*

class Company {
  constructor() {
    this.director = new Director;
    this.webDepartment = new WebDepartment();
    this.mobileDepartment = new MobileDepartment();
    this.testDepartment = new TestDepartment();
    this.quantityOfCompletedProjects = 0;  //количество реализованных проектов
    this.quantityOfHiredEmployees = 0;  //количество нанятых разработчиков
    this.quantityOfFiredEmployees = 0;  //количество уволенных разработчиков
  }

  startWorking(day) {
    for (let i = 0; i <= day - 1; i++) {
      //this.quantityOfHiredEmployees += this.director.hireEmployees(i, this.webDepartment) + this.director.hireEmployees(i, this.mobileDepartment) + this.director.hireEmployees(i, this.testDepartment);
      this.director.hireEmployees(i,this.webDepartment);
      this.director.hireEmployees(i,this.mobileDepartment);
      this.director.hireEmployees(i,this.testDepartment);
      this.director.getProjects(i);
      this.director.giveProjectsToDepartments(this.webDepartment);
      this.director.giveProjectsToDepartments(this.mobileDepartment);
      this.webDepartment.giveProjectsToEmployees(i);
      this.mobileDepartment.giveProjectsToEmployees(i);
      this.testDepartment.giveProjectsToEmployees(i);
      this.webDepartment.workingDay(i, this.testDepartment);
      this.mobileDepartment.workingDay(i, this.testDepartment);
      this.testDepartment.workingDay(i);
      this.quantityOfFiredEmployees += this.webDepartment.fireOut() + this.mobileDepartment.fireOut() + this.testDepartment.fireOut();
      this.quantityOfCompletedProjects = this.testDepartment.getCompletedProjects();
    }
    this.quantityOfHiredEmployees=this.director.quantityOfAllHiredEmployees;
    this.quantityOfFiredEmployees=this.webDepartment.getQuantityOfFiredEmployees();
    //console.log(this.mobileDepartment.projects);
    console.log('Кол-во реализованных проектов: ' + this.quantityOfCompletedProjects + '. Kол-во нанятых программистов: ' + this.quantityOfHiredEmployees + '. Kол-во уволенных программистов: ' + this.quantityOfFiredEmployees);
  }
}
*/


/*
class Project {
  constructor(number, day) {

    this.number = number;
    this.dayOfStartDev = day;
    this.stage = 0;
  }
  getNumber() {
    return this.number;
  }
  getDifficulty() {
    return this.difficulty;
  }
  getDayOfStartDev() {
    return this.dayOfStartDev;
  }

}

class WebProject extends Project {
  constructor(number, day) {
    super(number, day);
    //this.quantityOfDevelopers = 1;
  }
}

class MobileProject extends Project {
  constructor(number, day) {
    super(number, day);
  }
  increaseQuantityOfDevelopers() {
    this.quantityOfDevelopers++;
  }
}

class Employee {
  constructor(id) {
    this.completedProjects = 0;
    this.project = null;
    this.busy = false;
    this.notWorkingDays = 0;
    this.personalID = id;
  }

  getEmployment() {
    if (this.busy == false)
      this.notWorkingDays++;
    else
      this.notWorkingDays = 0;
    return this.notWorkingDays;
  }

  getBusy() {
    return this.busy;
  }

  setProject(project) {
    this.project = project;
  }
  getPersonalID() {
    return this.personalID;
  }

  getQuantityOfCompletedProjects() {
    return this.completedProjects;
  }

  sentOrDeleteProject() {
    this.project = null;
    this.busy = false;
    this.completedProjects++;
    this.notWorkingDays = 0;
  }
  getDayOfStartDevProject() {
    return this.project.dayOfStartDev;
  }
  getProjectDifficulty() {
    return this.project.difficulty;
  }
  getQuantityOfDevelopersOnProject() {
    return this.project.quantityOfDevelopers;
  }
}

class WebDeveloper extends Employee {
  constructor(id) {
    super(id);
  }

  completeAndSentProjectForTest(day, testDept) {
    if (this.project && (day - this.project.dayOfStartDev == this.project.difficulty)) {
      testDept.addProject(this.project, 2);
      this.sentOrDeleteProject();
    }
  }
}

class MobileDeveloper extends Employee {
  constructor(id) {
    super(id);
  }

  completeAndSentProjectForTest(day, testDept) {
    if ((this.project != null) && (((this.project.quantityOfDevelopers == this.project.difficulty) && (day - this.project.dayOfStartDev == 1)) || ((day - this.project.dayOfStartDev == this.project.difficulty) && (this.project.quantityOfDevelopers == 1)))) {
      testDept.addProject(this.project, 2);
      this.sentOrDeleteProject();
    }
  }
}

class QATester extends Employee {
  constructor(id) {
    super(id);
  }

  completeProject(day, quantityOfCompletedProjects) {
    if ((this.project != null) && (day - this.project.dayOfStartDev == 1)) {
      this.sentOrDeleteProject();
      quantityOfCompletedProjects++;
    }
  }
}

class Department {
  constructor() {
    this.projects = [];
    this.employees = [];
    this.quantityOfFiredEmployees=0;
  }
  getQuantityOfFiredEmployees() {
    return this.quantityOfFiredEmployees;
  }
  getFreeEmployees() {
    return this.employees.filter(({ busy }) => (!busy));
  }
  addEmployees(employee) {
    this.employees.push(employee);
  }
  addProject(project, stage) {
    if (this.getFreeEmployeesLength() > 0) {
      this.projects.push(project);
      project.stage = stage;
    }
  }
  getProjectsLength() {
    return this.projects.length;
  }
  getFreeProjectsLength() {
    let array = this.projects.filter(({ quantityOfDevelopers }) => (quantityOfDevelopers == 0));
    return array.length;
  }

  getFreeEmployeesLength() {
    return this.getFreeEmployees().length;
  }

  fireOut() {
    var employees = [], firedEmployee;
    employees = this.employees.filter((employee) => {
      return employee.getEmployment() > 3;
    });
    if (employees) {
      employees.sort((a, b) => {
        return a.getQuantityOfCompletedProjects() - b.getQuantityOfCompletedProjects();
      });
      if (employees[0]) {
        firedEmployee = employees[0].getPersonalID();
        this.employees = this.employees.filter((employee) => {
          return employee.getPersonalID() != firedEmployee;
        });
        this.quantityOfFiredEmployees++;
      }
    }
  }

  giveProject(employee, project, quantity, day) {
    employee.busy = true;
    project.quantityOfDevelopers = quantity;
    project.dayOfStartDev = day;
    if (project) employee.setProject(project);
  }

}

class WebDepartment extends Department {
  constructor() {
    super();
  }

  giveProjectsToEmployees(day) {
    var i = 0;
    this.employees.forEach((item) => {
      if ((item.getBusy() == false) && (i < this.projects.length))
        this.giveProject(item, this.projects[i++], 1, day);
    });
  }
  workingDay(day, testDept) {
    for (let i = 0; i <= this.employees.length - 1; i++)
      this.employees[i].completeAndSentProjectForTest(day, testDept);
  }
}

class MobileDepartment extends Department {
  constructor() {
    super();
  }

  workingDay(day, testDept) {
    for (let i = 0; i <= this.employees.length - 1; i++)
      this.employees[i].completeAndSentProjectForTest(day, testDept);
  }

  giveProjectsToEmployees(day) {
    var i = 0, flag;
    this.employees = this.employees.map((employee) => {
      if ((!employee.getBusy()) && (i < this.projects.length))
        this.giveProject(employee, this.projects[i++], 1, day);
      return employee;
    });
    if (this.getFreeEmployeesLength() > 0) {
      this.employees = this.employees.map((employee) => {
        if (!employee.getBusy()) {
          flag = false;
          this.projects = this.projects.map((project) => {
            if ((project.getDifficulty() == 2) && (project.getDayOfStartDev() == day) && (!flag)) {
              this.giveProject(employee, project, 2, day);
              flag = true;
            }
            return project;
          });
        }
        return employee;
      });
    }
    this.projects = this.projects.map((project) => {
      if ((this.getFreeEmployeesLength() > 1) && (project.getDifficulty() == 3) && (project.getDayOfStartDev() == day))
        this.employees = this.employees.map((employee) => {
          if ((!employee.getBusy()) && (project.getQuantityOfDevelopersOnProject() != 3))
            this.giveProject(employee, project, ++project.quantityOfDevelopers, day);
          return employee;
        });
      return project;
    });
  }
}

class TestDepartment extends Department {
  constructor() {
    super();
    this.completedProjects = 0;
  }

  getCompletedProjects() {
    return this.completedProjects;
  }

  checkProjectsForDublicates() {
    for (let i = 0; i <= this.projects.length - 1; i++)
      for (let j = 0; j <= this.projects.length - 1; j++)
        if ((this.projects[i].number == this.projects[j].number) && (i != j))
          this.projects[j] = null;
    this.projects.filter(function (project) {
      if (project != null) return project;
    });
  }


  giveProjectsToEmployees() {
    this.checkProjectsForDublicates();
    this.employees.forEach(function (item) {
      if (item.busy == false)
        this.giveProject(item, this.projects.splice(0, 1), 1, day);
    });
  }

  workingDay(day) {
    for (let i = 0; i <= this.employees.length - 1; i++)
      this.employees[i].completeProject(day, this.completedProjects);
  }
}

class Director {
  constructor() {
    this.webProjects = [];
    this.mobileProjects=[];
    this.quantityOfAllProjects = 0;
    this.quantityOfAllHiredEmployees = 0;
  }

  getProjects(day) {
    var rndNumber1 = Math.round(Math.random() * 4);  //общее количество полученных проектов за день
    var rndNumber2 = Math.round(Math.random() * rndNumber1);  //количество веб проектов
    for (let i = 0; i <= rndNumber1 - 1; i++)
      if (i <= rndNumber2)
        this.webProjects.push(new WebProject(++this.quantityOfAllProjects, day));
      else
        this.mobileProjects.push(new MobileProject(++this.quantityOfAllProjects, day));
  }

  giveProjectsToDepartments(webDept,mobileDept) {
    var minProjectsCount=Math.min(webDept.getFreeEmployeesLength(),this.webProjects.length);
    var array=this.mobileProjects.splice(0,minProjectsCount);
    webDept.projects.concat(array);
    minProjectsCount=Math.min(mobileDept.getFreeEmployeesLength(),this.mobileProjects.length);
    array=this.webProjects.splice(0,minProjectsCount);
    mobileDept.projects.concat(array);
    //webDept.projects.concat(this.webProjects.splice(0,min1));
    //mobileDept.projects.concat(this.mobileProjects.splice(0,min2));
  }


  addEmployee(dept) {
    if (dept instanceof WebDepartment)
      dept.addEmployees(new WebDeveloper(this.quantityOfAllHiredEmployees++));
    if (dept instanceof MobileDepartment)
      dept.addEmployees(new MobileDeveloper(this.quantityOfAllHiredEmployees++));
    if (dept instanceof TestDepartment)
      dept.addEmployees(new QATester(this.quantityOfAllHiredEmployees++));
  }

  hireEmployees(day, dept) {
    if (day != 0) {
      for (let i = 0; i <= this.projects.length - 1; i++)
        if (((dept instanceof WebDepartment) && (this.projects[i] instanceof WebProject)) || ((dept instanceof MobileDepartment) && (this.projects[i] instanceof MobileProject)))
          this.addEmployee(dept);

      if ((dept.getProjectsLength() > 0) && (dept.getFreeEmployeesLength() < dept.getProjectsLength()) && (dept instanceof TestDepartment))
        for (let i = 0; i <= dept.getFreeProjectsLength() - dept.getFreeEmployeesLength() - 1; i++)
          this.addEmployee(dept);
    }
  }
}

class Company {
  constructor() {
    this.director = new Director;
    this.webDepartment = new WebDepartment();
    this.mobileDepartment = new MobileDepartment();
    this.testDepartment = new TestDepartment();
    this.quantityOfCompletedProjects = 0;  //количество реализованных проектов
    this.quantityOfHiredEmployees = 0;  //количество нанятых разработчиков
    this.quantityOfFiredEmployees = 0;  //количество уволенных разработчиков
  }

  startWorking(day) {
    for (let i = 0; i <= day - 1; i++) {
      //this.quantityOfHiredEmployees += this.director.hireEmployees(i, this.webDepartment) + this.director.hireEmployees(i, this.mobileDepartment) + this.director.hireEmployees(i, this.testDepartment);
      this.director.hireEmployees(i,this.webDepartment);
      this.director.hireEmployees(i,this.mobileDepartment);
      this.director.hireEmployees(i,this.testDepartment);
      this.director.getProjects(i);
      this.director.giveProjectsToDepartments(this.webDepartment);
      this.director.giveProjectsToDepartments(this.mobileDepartment);
      this.webDepartment.giveProjectsToEmployees(i);
      this.mobileDepartment.giveProjectsToEmployees(i);
      this.testDepartment.giveProjectsToEmployees(i);
      this.webDepartment.workingDay(i, this.testDepartment);
      this.mobileDepartment.workingDay(i, this.testDepartment);
      this.testDepartment.workingDay(i);
      this.quantityOfFiredEmployees += this.webDepartment.fireOut() + this.mobileDepartment.fireOut() + this.testDepartment.fireOut();
      this.quantityOfCompletedProjects = this.testDepartment.getCompletedProjects();
    }
    this.quantityOfHiredEmployees=this.director.quantityOfAllHiredEmployees;
    this.quantityOfFiredEmployees=this.webDepartment.getQuantityOfFiredEmployees();
    //console.log(this.mobileDepartment.projects);
    console.log('Кол-во реализованных проектов: ' + this.quantityOfCompletedProjects + '. Kол-во нанятых программистов: ' + this.quantityOfHiredEmployees + '. Kол-во уволенных программистов: ' + this.quantityOfFiredEmployees);
  }
}

var apple = new Company;
apple.startWorking(10);

*/