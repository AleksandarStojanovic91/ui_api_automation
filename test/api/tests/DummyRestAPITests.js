const expectChai = require('chai').expect;
const helpers = require('../support/helpers.js');
let data = require('../test_data/data.json');

describe('Dummy REST API Tests - Positive Scenarios',()=>{
    it('should get an employee ID 1', async()=> {
        //Wait out 429
        await helpers.timeout(12000);

        const res = await helpers.getRequest(data.urls.url,data.apis.getEmployeeByID+'/'+data.employee1.id,data.commonHeaders);

        expectChai(await res.statusCode).to.equal(200);
        expectChai(await res.body.status).to.equal('success');
        expectChai(await res.body.data.id).to.equal(data.employee1.id);
        expectChai(await res.body.data.employee_name).to.equal(data.employee1.name);
        expectChai(await res.body.data.employee_salary).to.equal(data.employee1.salary);
        expectChai(await res.body.data.employee_age).to.equal(data.employee1.age);
        expectChai(await res.body.data.profile_image).to.equal(data.employee1.image);
        expectChai(await res.body.message).to.equal('Successfully! Record has been fetched.');
    });
    it('should get an employee ID 1000', async()=> {
        //Wait out 429
        await helpers.timeout(12000);

        const res = await helpers.getRequest(data.urls.url,data.apis.getEmployeeByID+"/1000",data.commonHeaders);

        expectChai(await res.statusCode).to.equal(200);
        expectChai(await res.body.status).to.equal('success');
        expectChai(await res.body.data).to.equal(null);
        expectChai(await res.body.message).to.equal('Successfully! Record has been fetched.');
    });
    it('should create an employee', async ()=> {
        //Wait out 429
        await helpers.timeout(12000);

        data.createEmployeeBody.age = '30';
        data.createEmployeeBody.name = 'Aleksandar'
        data.createEmployeeBody.salary = '360000'

        const res = await helpers.postRequest(data.urls.url,data.apis.createEmployee,data.createEmployeeBody,data.commonHeaders);

        expectChai(await res.statusCode).to.equal(200);
        expectChai(await res.body.status).to.equal('success');
        expectChai(await res.body.data.name).to.equal(data.createEmployeeBody.name);
        expectChai(await res.body.data.salary).to.equal(data.createEmployeeBody.salary);
        expectChai(await res.body.data.age).to.equal(data.createEmployeeBody.age);
        expectChai(await res.body.data.id).to.be.a('number');
        expectChai(await res.body.message).to.equal('Successfully! Record has been added.');
    });
});
describe('Dummy REST API Tests - Negative Scenarios',()=>{
    Object.entries(data.getEmployeeTest_Data).forEach(([variant, testData]) => {
        it('should get an employee with '+variant, async () => {
            //Wait out 429
            await helpers.timeout(12000);

            const res = await helpers.getRequest(data.urls.url, data.apis.getEmployeeByID +'/'+ testData.id, data.commonHeaders);

            expectChai(await res.statusCode).to.equal(testData.expectedStatusCode);
            if(await res.statusCode === 200){
                expectChai(await res.body.status).to.equal('success');
                expectChai(await res.body.data).to.equal(null);
                expectChai(await res.body.message).to.equal('Successfully! Record has been fetched.');
            } else {
                expectChai(await res.body).to.be.an('object');
            }
        });
    });
    Object.entries(data.createEmployeeTest_Data).forEach(([variant, testData]) => {
        it('should create an employee with '+variant, async () => {
            //Wait out 429
            await helpers.timeout(12000);

            data.createEmployeeBody.age = testData.age;
            data.createEmployeeBody.name = testData.name;
            data.createEmployeeBody.salary = testData.salary;

            const res = await helpers.postRequest(data.urls.url, data.apis.createEmployee, data.createEmployeeBody, data.commonHeaders);

            expectChai(await res.statusCode).to.equal(200);
            expectChai(await res.body.status).to.equal('success');
            expectChai(await res.body.message).to.equal('Successfully! Record has been added.');

            expectChai(await res.body.data.name).to.equal(testData.name);
            expectChai(await res.body.data.age).to.equal(testData.age);
            expectChai(await res.body.data.salary).to.equal(testData.salary);

        });
    });
});