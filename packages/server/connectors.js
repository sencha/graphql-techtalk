import Sequelize from 'sequelize';
import casual from 'casual';
import _ from 'lodash';
import data from './data';
import moment from 'moment';

const db = new Sequelize('employees', null, null, {
  dialect: 'sqlite',
  storage: './db.sqlite',
});

const EmployeeModel = db.define('employee', {
  firstName: { type: Sequelize.STRING },
  lastName: { type: Sequelize.STRING },
  yearsActive: { type: Sequelize.INTEGER },
  age: { type: Sequelize.INTEGER },
  gender: { type: Sequelize.STRING },
  dateOfBirth: { type: Sequelize.DATE },
  active: { type: Sequelize.BOOLEAN },
  rating: { type: Sequelize.FLOAT }
});

// create mock data with a seed, so we always get the same
casual.seed(123);

db.sync({ force: true }).then(() => {
  data.forEach(record => {
    Employee.create({
      firstName: record.firstName,
      lastName: record.lastName,
      yearsActive: record.yearsActive,
      gender: record.gender,
      dateOfBirth: moment(record.dateOfBirth),
      active: record.active,
      rating: record.rating
    });
  })
});

const Employee = db.models.employee;

export { Employee };