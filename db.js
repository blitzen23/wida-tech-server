import mysql from 'mysql';

var con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'widatech',
    port: '3306',
});

// Initialize the data at first (assuming the database is created but the table is not created yet for making migrations and seeds)
// con.query(
//     'CREATE TABLE invoices (id INT AUTO_INCREMENT PRIMARY KEY, date DATE, customer VARCHAR(255), sales_person VARCHAR(255), payment_type VARCHAR(255), notes TEXT)',
//     function (err, result) {
//         if (err) {
//             throw err;
//         }
//         console.log('Table invoices created!');
//     }
// );

// con.query(
//     'CREATE TABLE products_sold (invoice_id INT, item VARCHAR(255), quantity INT, total_cogs INT, total_price INT, FOREIGN KEY(invoice_id) REFERENCES invoices(id) ON DELETE CASCADE ON UPDATE CASCADE)',
//     function (err, result) {
//         if (err) {
//             throw err;
//         }
//         console.log('Table products_sold created!');
//     }
// );

// var insert =
//     'INSERT INTO invoices (date, customer, sales_person, payment_type, notes) VALUES ?';
// var values = [
//     [new Date('01/01/2021'), 'John', 'Doe', 'CASH', 'Lorem ipsum'],
//     [new Date('01/01/2021'), 'John', 'Doe', 'CASH', 'Lorem ipsum'],
//     [new Date('01/03/2021'), 'Jane', 'Doe', 'CREDIT', 'Lorem ipsum'],
//     [new Date('04/01/2021'), 'Rock', 'Pete', 'NOTCASHORCREDIT', 'Lorem ipsum'],
//     [new Date('01/04/2021'), 'Frank', 'Pete', 'CASH', 'Lorem ipsum'],
//     [new Date('01/01/2021'), 'John', 'Doe', 'CASH', 'Lorem ipsum'],
//     [new Date('01/05/2021'), 'Jeff', 'Pete', 'CREDIT', 'Lorem ipsum'],
// ];
// con.query(insert, [values], function (err, result) {
//     if (err) {
//         throw err;
//     }
//     console.log('Data inserted to table invoices');
// });

// insert =
//     'INSERT INTO products_sold (invoice_id, item, quantity, total_cogs, total_price) VALUES ?';
// values = [
//     [1, 'Bluetooth Speaker', 3, 630000, 756000],
//     [1, 'Headphone', 8, 400000, 480000],
//     [2, 'Laptop Charger', 4, 800000, 960000],
//     [3, 'LCD Monitor', 1, 500000, 600000],
//     [7, 'Bluetooth Speaker', 2, 420000, 504000],
//     [4, 'Headphone', 1, 50000, 60000],
//     [5, 'Laptop Charger', 3, 600000, 720000],
//     [3, 'Bluetooth Speaker', 1, 210000, 252000],
//     [6, 'Bluetooth Speaker', 1, 210000, 252000],
//     [6, 'Headphone', 2, 0, 120000],
// ];
// con.query(insert, [values], function (err, result) {
//     if (err) {
//         throw err;
//     }
//     console.log('Data inserted to table products sold');
// });
export { con };
