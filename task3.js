class Company {
    constructor() {

    }
}

class Director {
    constructor() {
        this.numberOfProjects = 0;
        this.numberOfEmplyees = 0;
        this.projects = [];
        this.employees = [];
    }
    getNewProjects(projects) {
        if (this.numberOfProjectsToday != undefined)
            this.numberOfProjectsTomorrow = this.numberOfProjectsToday;
        this.numberOfProjectsToday = Math.round(Math.random() * 4);
        num = this.numberOfProjectsToday;
        if (num != 0) {
            for (i = 1; i <= num; i++) {
                this.projects[this.numberOfProjects + i] = new projects;
            }
        }
        this.numberOfProjects = this.numberOfProjects + num;
        //return this.numberOfProjects;
    }
    getEmployee() {

    }
    sentProjectToDepartment(webDept, mobDept) {
        for (i = 1; i <= this.numberOfProjects; i++) {
            if (this.projects[i].readyForDev == true) {
                if (this.projects[i].type == 'Web project') {
                    webDept.recieveProject(this.projects[i]);
                    this.projects[i].readyForDev = false;
                    this.projects[i].inDevelopment = true;
                }
                else {
                    mobDept.recieveProject(this.projects[i]);
                    this.projects[i].readyForDev = false;
                    this.projects[i].inDevelopment = true;
                }
            }
        }
    }
}

class Department {
    static typeOfDepartment(i) {
        return ['Department of Web Development', 'Department of Mobile Development', 'Department of QA Testing'][i];
    }
    constructor(type) {
        this.type = Department.typeOfDepartment(type);
        this.numberOfEmployees = 0;
        this.projects = [];
        this.numberOfProjects = 0;

        //this.typeOfDepartment=type;
    }

    recieveProject(proj) {
        this.projects[this.numberOfProjects] = proj;
        this.numberOfProjects++;

    }
}

class Employee {
    static typeOfEmployee(i) {
        return ['Web developer', 'Mobile developer', 'QA tester'][i];
    }
    constructor() {
        this.type = Employee.typeOfEmployee(type);
        //this.speedOfDevelopment = 1;
        this.completedProjects = 0;
        //this.projectInDevelopment
        this.busy = false;
        this.daysToCompleteProject = 0;
    }
    /*
        completeProject(proj) {
            if (proj.type=='Web project') {
    
            }
            else
            if (proj.type=='Mobile project') {
    
            }
        } */
}

class Project {
    static typeOfProject(i) {
        return ['Web project', 'Mobile project'][i];
    }
    constructor() {
        this.type = Project.typeOfProject(Math.round(Math.random() + 1));
        this.difficulty = Math.round(Math.random() * 2 + 1);
        this.readyForDev = true;
        this.inDevelopment = false;
        this.readyToTest = false;
    }

    completeProject(emp) {
        if (this.type == Project.typeOfProject(0)) {

        } else
            if (this.type == Project.typeOfProject(1)) {
                if (this.difficulty == 1) {
                    emp = new Employee;
                }
                else {
                    emp = [];

                    //emp[this.difficulty]=new Employee;
                }
            }
    }
}

var webDept = new Department(Department.typeOfDepartment[0]);
var mobileDept = new Department(Department.typeOfDepartment[1]);
var testDept = new Department(Department.typeOfDepartment[2]);




//var dep=new Department(1);
//console.log(dep.type);