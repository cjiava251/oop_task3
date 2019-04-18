/*

class Company {
    constructor() {
        this.director = new Director;
        this.webDepartment = new Department(0);
        this.mobileDepartment = new Department(1);
        this.testDepartment = new Department(2);
        this.quantityOfRealizedProjects = 0;  //количество реализованных проектов
        this.quantityOfHiredEmployees = 0;  //количество нанятых разработчиков
        this.quantityOfFiredEmployees = 0;  //количество уволенных разработчиков

    }

    startWorking(day) {
        var s1 = [];
        for (var i = 1; i <= day; i++) {
            s1[0] = this.director.getEmployees(i, this.webDepartment);
            s1[1] = this.director.getEmployees(i, this.mobileDepartment);
            s1[2] = this.director.getEmployees(i, this.testDepartment);
            this.quantityOfHiredEmployees += s1[0] + s1[1] + s1[2];
            this.director.getProjects(i);
            this.director.sentProjects(this.webDepartment);
            this.director.sentProjects(this.mobileDepartment);
            this.webDepartment.giveProjectsToEmployees(i);
            this.mobileDepartment.giveProjectsToEmployees(i);
            this.testDepartment.giveProjectsToEmployees(i);
            this.webDepartment.completeProjects(i, this.testDepartment);
            this.mobileDepartment.completeProjects(i, this.testDepartment);
            this.testDepartment.completeProjects(i, this.testDepartment);
            this.quantityOfFiredEmployees += this.webDepartment.fireOut() + this.mobileDepartment.fireOut() + this.testDepartment.fireOut();
            this.quantityOfRealizedProjects = this.testDepartment.getRealizedProjects();
        }
        console.log('Кол-во реализованных проектов: ' + this.quantityOfRealizedProjects + '. Kол-во нанятых программистов: ' + this.quantityOfHiredEmployees + '. Kол-во уволенных программистов: ' + this.quantityOfFiredEmployees);

    }
}


class Director {
    constructor() {
        this.projects = [];
        this.quantityOfAllProjects = 0;  //количество всех проектов, полученных компанией
    }

    getProjects(day) {
        var num = Math.round(Math.random() * 4);
        if (num > 0)
            for (var i = 0; i <= num - 1; i++)
                this.projects[this.projects.length] = new Project(day, ++this.quantityOfAllProjects);
    }

    getEmployee(dept) {
        var emp = new Employee(dept.getType());
        dept.getEmployees(emp);
        return 1;
    }

    getEmployees(day, dept) {
        var s = 0;
        if (day != 1) {
            if (this.projects.length > 0)
                for (var i = 0; i <= this.projects.length - 1; i++)
                    if ((dept.getType() != 'Test') && (dept.getType() == this.projects[i].type))
                        s += this.getEmployee(dept)

            if ((dept.getProjectsLength() > 0) && (dept.getFreeEmployeesLength() < dept.getFreeProjectsLength()) && (dept.getType() == 'Test'))
                for (i = 0; i <= dept.getFreeProjectsLength() - dept.getFreeEmployeesLength() - 1; i++)
                    s += this.getEmployee(dept);
        }
        return s;
    }

    sentProjects(dept) {
        var k;
        if (dept.getFreeEmployeesLength() > 0) {
            var pr = this.projects.filter(function (item) {
                return item.type == dept.getType();
            });
            if (pr.length <= dept.getFreeEmployeesLength())
                k = pr.length;
            else
                k = dept.getFreeEmployeesLength();

            for (var i = 0; i <= this.projects.length - 1; i++) {
                if ((this.projects[i].type == dept.getType()) && (k > 0)) {
                    this.projects[i].stage = 1;
                    dept.getProject(this.projects[i]);
                    k--;
                }
            }
        }
        this.projects = this.projects.filter(function (item) {
            return item.stage == 0;
        });
    }
}

class Department {
    static typeOfDepartment(i) {
        return ['Web', 'Mobile', 'Test'][i];
    }
    constructor(type) {
        this.projects = [];
        this.employee = [];
        this.type = Department.typeOfDepartment(type);
        this.realizedProjects = 0;
    }

    getType() {
        return this.type;
    }

    getRealizedProjects() {
        return this.realizedProjects;
    }

    getProjectsLength() {
        return this.projects.length;
    }

    getProject(pr) {
        this.projects[this.projects.length] = pr;
    }

    getEmployees(emp) {
        this.employees[this.employees.length] = emp;
    }

    getFreeEmployees() {
        return this.employees.filter(({busy}) => (!busy))
    }

    getFreeEmployeesLength() {
        return this.getFreeEmployees().length;
    }

    getFreeProjects() {
        return this.projects.filter(function (item) {
            return item.inProcess == false;
        });
    }

    getFreeProjectsLength() {
        return this.getFreeProjects().length;
    }

    fireOut() { //увольнение
        var arr = [], min = 100, minID, s = 0;
        for (var i = 0; i <= this.employees.length - 1; i++)
            if (this.employees[i].getEmployment() > 3)
                arr[arr.length] = i;
        if (arr.length != 0)
            if (arr.length == 1) {
                this.employees[arr[0]] = null;
                s++;
            }
            else {
                for (i = 0; i <= arr.length - 1; i++) {
                    if (this.employees[arr[i]].completedProjects < min) {
                        min = this.employees[arr[i]].completedProjects;
                        minID = arr[i];
                    }
                }
                this.employees[minID] = null;
                s++;
            }
        this.employees = this.employees.filter(function (item) {
            return item != null;
        });
        return s;
    }

    giveProject(emp, proj, quant, day) {
        emp.busy = true;
        proj.inProcess = true;
        proj.quantityOfDevelopers = quant;
        proj.dayOfStartDev = day;
        emp.getProject(proj);
    }

    giveProjectsToEmployees(day) {  //передача проектов в руки разработчиков
        var s;
        switch (this.type) {
            case 'Web': {
                for (var i = 0; i <= this.projects.length - 1; i++) {
                    for (var j = 0; j <= this.employees.length - 1; j++) {
                        if (this.employees[j].busy == false) {
                            this.giveProject(this.employees[j], this.projects[i], 1, day);
                            break;
                        }
                    }
                }
                break;
            }
            case 'Mobile': {
                for (i = 0; i <= this.projects.length - 1; i++)
                    for (j = 0; j <= this.employees.length - 1; j++)
                        if (this.employees[j].busy == false) {
                            this.giveProject(this.employees[j], this.projects[i], 1, day);
                            break;
                        }
                if (this.getFreeEmployeesLength() > this.getFreeProjectsLength()) {
                    for (i = 0; i <= this.projects.length - 1; i++) {
                        s = this.projects[i].difficulty - this.projects[i].quantityOfDevelopers;
                        if ((this.projects[i].difficulty != this.projects[i].quantityOfDevelopers) && (this.getFreeEmployeesLength() >= s))
                            for (j = 0; j <= this.employees.length - 1; j++)
                                if ((this.employees[j].busy == false) && (s != 0)) {
                                    this.giveProject(this.employees[j], this.projects[i], this.projects[i].quantityOfDevelopers++, day);
                                    s--;
                                }
                    }

                    for (i = 0; i <= this.projects.length - 1; i++)
                        for (j = 0; j <= this.employees.length - 1; j++)
                            if ((this.employees[j].project != undefined) && (this.projects[i].ID == this.employees[j].project.getID()))
                                this.employees[j].project.quantityOfDevelopers = this.projects[i].quantityOfDevelopers;
                }
                break;
            }
            case 'Test': {
                for (i = 0; i <= this.projects.length - 1; i++) {
                    for (j = 0; j <= this.employees.length - 1; j++)
                        if ((this.employees[j].busy == false) && (this.projects[i].inProcess == false)) {
                            this.giveProject(this.employees[j], this.projects[i], 1, day);
                            break;
                        }
                }
                break;
            }
        }

        this.projects = this.projects.filter(function (item) {
            return item.inProcess == false;
        });
    }

    completeProjects(day, testDept) {
        for (var i = 0; i <= this.employees.length - 1; i++)
            this.realizedProjects += this.employees[i].completeProject(day, testDept);
    }
}

class Employee {
    constructor(type) {
        this.type = type;
        this.completedProjects = 0;
        this.project;
        this.busy = false;
        this.notWorkingDays = 0;
    }

    getEmployment() {
        if (this.busy == false)
            this.notWorkingDays++;
        else
            this.notWorkingDays = 0;
        return this.notWorkingDays;
    }

    getProject(proj) {
        this.project = proj;
    }


    sentProjectToTestDept(dept) {
        this.project.stage = 2;
        this.project.inProcess = false;
        dept.getProject(this.project);
    }

    projectCompleteAndDelete() {
        this.project = null;
        this.busy = false;
        this.completedProjects++;
        this.notWorkingDays = 0;
        return 1;
    }

    completeProject(day, testDept) {
        var s = 0;
        switch (this.type) {
            case 'Web': {
                if ((this.project != undefined) && (this.project != null) && (day - this.project.dayOfStartDev == this.project.difficulty)) {
                    this.sentProjectToTestDept(testDept);
                    this.projectCompleteAndDelete();
                }
                break;
            }
            case 'Mobile': {
                if ((this.project != undefined) && (this.project != null) && (((this.project.quantityOfDevelopers == this.project.difficulty) && (day - this.project.dayOfStartDev == 1)) || ((day - this.project.dayOfStartDev == this.project.difficulty) && (this.project.quantityOfDevelopers == 1)))) {
                    this.sentProjectToTestDept(testDept);
                    this.projectCompleteAndDelete();
                }
                break;
            }
            case 'Test': {
                if ((this.project != undefined) && (this.project != null) && (day - this.project.dayOfStartDev == 1))
                    s = this.projectCompleteAndDelete();
                break;
            }
        }
        return s;

    }
}

class Project {
    static typeOfProject(i) {
        return ['Web', 'Mobile'][i];
    }
    constructor(day, id) {
        this.type = Project.typeOfProject(Math.round(Math.random()));
        this.difficulty = Math.round(Math.random() * 2 + 1);
        this.ID = id;
        this.quantityOfDevelopers = 0;
        this.dayOfAdding = day;
        this.dayOfStartDev = 0;
        this.stage = 0;  //0 - проект у директора, 1 - проект разрабатывается(веб или мобильный отдел), 2 - проект в отделе тестирования
        this.inProcess = false;
    }

    getID() {
        return this.ID;
    }

}

var apple = new Company;
apple.startWorking(40);

*/

class Project {
  constructor(number, day) {
    this.difficulty = Math.round(Math.random() * 2) + 1;
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
    this.quantityOfDevelopers = 1;
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
  addEmployees(employee) {
    this.employees.push(employee);
  }
  getFreeEmployees() {
    return this.employees.filter(({ busy }) => (!busy));
  }
  getFreeEmployeesLength() {
    return this.getFreeEmployees().length;
  }
  fireOut() {
    var employee = this.employees.filter((employee) => {
      return employee.getEmployment() > 3;
    });
    employee.sort((a, b) => {
      return a.getQuantityOfCompletedProjects() - b.getQuantityOfCompletedProjects();
    });
    if (employee[0])
      var filteredEmployees = this.employees.filter((employee) => {
        return employee.getPersonalID() != employee[0].getPersonalID();
      });
    this.employees = filteredEmployees;
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
            if ((project.getDifficulty() == 2) && (project.getDayOfStartDev() == day) && (flag != true)) {
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
    this.projects = [];
    this.quantityOfAllProjects = 0;
    this.quantityOfAllHiredEmployees = 0;
  }
  getProjects(day) {
    var rndNumber1 = Math.round(Math.random() * 4);  //общее количество полученных проектов за день
    var rndNumber2 = Math.round(Math.random() * rndNumber1);  //количество веб проектов
    for (let i = 0; i <= rndNumber1 - 1; i++)
      if (i <= rndNumber2)
        this.projects.push(new WebProject(++this.quantityOfAllProjects, day));
      else
        this.projects.push(new MobileProject(++this.quantityOfAllProjects, day));
  }

  giveProjectsToDepartments(dept) {
    this.projects.forEach(function (project) {
      if (((project instanceof WebProject) && (dept instanceof WebDepartment)) || ((project instanceof MobileProject) && (dept instanceof MobileDepartment)))
        dept.addProject(project, 1);
    });
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
      this.quantityOfHiredEmployees += this.director.hireEmployees(i, this.webDepartment) + this.director.hireEmployees(i, this.mobileDepartment) + this.director.hireEmployees(i, this.testDepartment);
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
    console.log(this.mobileDepartment.projects);
    //console.log('Кол-во реализованных проектов: ' + this.quantityOfCompletedProjects + '. Kол-во нанятых программистов: ' + this.quantityOfHiredEmployees + '. Kол-во уволенных программистов: ' + this.quantityOfFiredEmployees);
  }
}

var apple = new Company;
apple.startWorking(10);
