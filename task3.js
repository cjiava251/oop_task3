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
        this.employees = [];
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
        return this.employees.filter(function (item) {
            return item.busy == false;
        });
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