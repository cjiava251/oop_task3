class Company {
    constructor() {

    }
}

//добавить счет дней

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
    }

    getEmployees() {

    }

    sentProjectToDepartment(webDept, mobDept) {
        wNum = 0;
        mNum = 0;
        wNumIndex = [];
        mNumIndex = [];
        for (i = 1; i <= this.numberOfProjects; i++) {
            if (this.projects[i].readyForDev == true) {
                if (this.projects[i].type == 'Web project') {
                    wNum++;
                    wNumIndex[wNum] = i;

                }
                else {
                    mNum++;
                    mNumIndex[mNum] = i;

                }
            }
        }
        w = webDept.numberOfEmployees - webDept.numberOfBusyEmployees;  //свободные работники веб отдела
        m = mobDept.numberOfEmployees - mobDept.numberOfBusyEmployees;  //свободные работники мобильного отдела
        if ((wNum > 0) && (c > 0)) {
            if (wNum <= w)       //если проектов меньше/равно, чем разрабов
                w = wNum;
            for (i = 1; i <= w; i++) {
                webDept.recieveProject(this.projects[wNumIndex[i]]);
                this.projects[wNumIndex[i]].readyForDev = false;
                this.projects[wNumIndex[i]].inDevelopment = true;
            }
        }
        if ((mNum > 0) && (m > 0)) {
            if (mNum <= m)
                m = mNum;
            for (i = 1; i <= m; i++) {
                mobDept.recieveProject(this.projects[mNumIndex[i]]);
                this.projects[mNumIndex[i]].readyForDev = false;
                this.projects[mNumIndex[i]].inDevelopment = true;
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
        this.numberOfBusyEmployees = 0;
        this.projects = [];
        this.numberOfProjects = 0;
    }

    recieveProject(proj) {
        this.projects[this.numberOfProjects] = proj;
        this.projects[this.numberOfProjects].readyForDev=false;
        this.projects[this.numberOfProjects].inDevelopment=true;
        this.numberOfProjects++;

    }

    recieveEmployees() {

    }
}

class Employee {
    static typeOfEmployee(i) {
        return ['Web developer', 'Mobile developer', 'QA tester'][i];
    }
    constructor() {
        this.type = Employee.typeOfEmployee(type);
        this.completedProjects = 0;
        this.busy = false;
        this.daysToCompleteProject = 0;
    }
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
        //добавить день начала выполнения
        if (this.type == Project.typeOfProject(0)) {

        } else
            if (this.type == Project.typeOfProject(1)) {
                if (this.difficulty == 1) {
                    emp = new Employee;
                }
                else {
                    emp = [];
                }
            }
    }
}

/*
var webDept = new Department(Department.typeOfDepartment[0]);
var mobileDept = new Department(Department.typeOfDepartment[1]);
var testDept = new Department(Department.typeOfDepartment[2]);
*/