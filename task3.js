class Company {
    constructor() {
        this.day=1;

    }
}

//добавить счет дней

class Director {
    constructor() {
        this.numberOfProjects = [];
        this.numberOfWebDevelopers = 0;
        this.numberOfMobileDevelopers = 0;
        this.numberOfQATesters = 0;
        this.numberOfEmplyees = 0;
        this.webProjects = [];
        this.mobileProjects=[];
        this.numberOfWebProjects=[];
        this.numberOfMobileProjects=[];
        this.webDevelopers=[];
        this.mobileDevelopers=[];
        this.qaTesters=[];
    }

    getNewProjects(day) {
        //if (this.numberOfProjects[day-1] != undefined)
        this.numberOfProjects[day] = Math.round(Math.random() * 4);
        num = this.numberOfProjects[day];
        if (num != 0) {
            for (i = 1; i <= num; i++) {
                //this.projects[++this.numberOfProjects] = new Project;
                projects=new Project;
               /* if (projects.type==Project.typeOfProject(0))
                    this.webProjects[++this.numberOfWebProjects[day]][day]=projects;
                else 
                    this.mobileProjects[++this.numberOfMobileProjects[day]][day]=projects;
                    */
            }
        }
    }

    getEmployees(day) {
        numQ=0;     //количество готовых к тестированию проектов 

        for (var i=0;i<=this.numberOfMobileProjects;i++) {
            if (this.mobileProjects[i].readyToTest==true)
                numQ++;
        }
        for (i=0;i<=this.numberOfWebProjects;i++)
            if (this.webProjects[i].readyToTest==true)
                numQ++;
        if (this.numberOfWebDevelopers<this.numberOfWebProjects) 
            for (i=1;i<=this.numberOfWebProjects-this.numberOfWebDevelopers;i++) 
                this.webDevelopers[this.numberOfWebDevelopers++]=new Employee(Employee.typeOfEmployee(0));
            
        if (this.numberOfMobileDevelopers<this.numberOfMobileProjects) 
            for (i=1;i<=this.numberOfMobileProjects-this.numberOfMobileDevelopers;i++)
                this.mobileDevelopers[this.numberOfMobileDevelopers++]=new Employee(Employee.typeOfEmployee(1));
        /*
        if (this.numberOfQATesters<)
            for (i=1;i<=numQ-this.numberOfQATesters;i++) 
                this.qaTesters[this.numberOfQATesters++]=new Employee(Employee.typeOfEmployee(2));
                */

    }

    getNumberOfEmployees() {
        return this.numberOfEmplyees = this.numberOfWebDevelopers + this.numberOfMobileDevelopers + this.numberOfQATesters;
    }

    sentProjectToDepartment(webDept, mobDept) {
        wNum = 0;       
        mNum = 0;
        wNumIndex = [];
        mNumIndex = [];
        for (i = 1; i <= this.numberOfProjects; i++) {
            if (this.projects[i].readyForDev == true) {
                if (this.projects[i].type == Project.typeOfProject(0)) {
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
                this.projects[wNumIndex[i]].readyForDev = false;
                this.projects[wNumIndex[i]].inDevelopment = true;
                webDept.recieveProject(this.projects[wNumIndex[i]]);
                
            }
        }
        if ((mNum > 0) && (m > 0)) {
            if (mNum <= m)
                m = mNum;
            for (i = 1; i <= m; i++) {
                this.projects[mNumIndex[i]].readyForDev = false;
                this.projects[mNumIndex[i]].inDevelopment = true;
                mobDept.recieveProject(this.projects[mNumIndex[i]]);
                
            }
        }

    }

    sentEmployeeToDepartment() {

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
        this.employees=[];
        this.numberOfProjects = 0;
    }

    recieveProject(proj) {
        this.projects[this.numberOfProjects++] = proj;
    }

    recieveEmployees(employees) {
        this.employees[this.numberOfEmployees++]=employees;
    }

    completeProject() {
        /*
        if (this.numberOfEmployees-this.numberOfBusyEmployees<) {

        }
        */
    }
}

class Employee {
    static typeOfEmployee(i) {
        return ['Web developer', 'Mobile developer', 'QA tester'][i];
    }
    constructor(type) {
        this.type = Employee.typeOfEmployee(type);
        this.completedProjects = 0;
        this.busy = false;
        //this.dayOfStartCompleteProject = 0;   добавить в начале работы над проектом
    }
}

class Project {
    static typeOfProject(i) {
        return ['Web project', 'Mobile project'][i];
    }
    constructor(day) {
        this.type = Project.typeOfProject(Math.round(Math.random()));
        this.difficulty = Math.round(Math.random() * 2 + 1);
        this.readyForDev = true;
        this.inDevelopment = false;
        this.readyToTest = false;
        this.dayOfCreate=day;
    }



    completeProject(emp,day) {
        if (this.readyForDev==true) {
            this.dayOfStartDevelopment=day;
            this.readyForDev=false;
            this.inDevelopment=true;
            emp.busy=true;
        }
        else if (this.inDevelopment==true) {
            if (day-this.dayOfStartDevelopment==this.difficulty) {
                this.inDevelopment=false;
                this.readyToTest=true;
                emp.busy=false;
            }
        } 
        else {

        }
    }
}

/*
var webDept = new Department(Department.typeOfDepartment[0]);
var mobileDept = new Department(Department.typeOfDepartment[1]);
var testDept = new Department(Department.typeOfDepartment[2]);
*/