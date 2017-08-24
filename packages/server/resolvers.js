import { Employee } from './connectors';
import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import moment from 'moment';

const resolvers = {
    Date: new GraphQLScalarType({
        name: 'Date',
        description: 'Date custom scalar type',
        parseValue(value) {
            return moment(value).toDate(); // value from the client
        },
        serialize(value) {
            return value.toJSON(); // value sent to the client
        },
        parseLiteral(ast) {
            if (ast.kind === Kind.STRING) {
                return moment(ast.value).toDate(); // ast value is always in string format
            }
            return null;
        },
    }),

    Query: {
        employee(_, args) {
            return Employee.find({ where: args });
        },

        /*
            Example: 
        
            query ($filter: [Filter], $order: [[String]]) {
                employees(filter: $filter, order: $order, limit: 10, offset: 1) {
                    total
                    records {
                        firstName
                        lastName
                        age
                    }
                }
            }      

            parameters:

            {"age": [50, 60], "order": [["age", "ASC"]]} 
        */
        employees(_, { start, limit, sorters = [], filters = [] }) {
            const query = [];

            for (let { property, value } of filters) {
                if (value == null) continue;

                if (property === 'rating') {
                    let [min, max] = value.split(/,/);

                    query.push({
                        rating: {
                            $gte: min,
                            $lte: max
                        }
                    })
                } else if (property === 'firstName') {
                    query.push({
                        firstName: {
                            $like: `%${value}%`
                        }
                    })
                } else if (property === 'lastName') {
                    query.push({
                        lastName: {
                            $like: `%${value}%`
                        }
                    })
                } else if (property === 'gender') {
                    query.push({
                        gender: value
                    })
                } else if (property === 'text') {
                    query.push({
                        $or: [{
                            firstName: {
                                $like: `%${value}%`
                            }
                        }, {
                            lastName: {
                                $like: `%${value}%`
                            }
                        }]
                    })
                }
            }

            const where = { $and: query };
            const order = sorters.map(sorter => [sorter.property, sorter.direction]);
            const now = new Date();

            return {
                total: Employee.count({ where }),
                records: Employee.findAll({ where, order, offset: start, limit }).map(employee => {
                    return { ...employee.dataValues, now: now }
                })
            }
        }
    },

    Mutation: {
        /*
            mutation createEmployee($employee: EmployeeInput!) {
                createEmployee(employee: $employee) {
                    id
                }
            }

            parameters:
            {
                "employee": {
                    "firstName": "Mark",
                    "lastName": "Brocato",
                    "age": 36,
                    "gender": "Male"
                }
            }            
        */
        createEmployee(root, { record }) {
            throw new Error('Testing')
            // return Employee.create(record);
        },

        /*
            mutation updateEmployee($id: Int, $employee: EmployeeInput!) {
                updateEmployee(id: $id, employee: $employee) {
                    id
                }
            }

            parameters:
            {
                "id": 1000,
                "employee": {
                    "firstName": "Mark",
                    "lastName": "Brocato",
                    "age": 36,
                    "gender": "Male"
                }
            }            
        */
        updateEmployee(root, { record }) {
            return Employee.findById(record.id)
                .then(model => model.update(record))
        },

        /*
            mutation deleteEmployee($id: Int) {
                deleteEmployee(id: $id) {
                    success
                }
            }

            parameters:
            {
                "id": 1000
            }            
        */
        deleteEmployee(root, where) {
            return Employee.destroy({ where }).then(() => {
                return { success: true };
            });
        },

        deleteEmployees(root, { ids }) {
            console.log(ids);

            const where = {
                id: {
                    $in: ids
                }
            };

            return Employee.destroy({ where }).then(() => {
                return { success: true };
            });
        }
    }
};

export default resolvers;