import express from 'express';
import cors from 'cors';
import { con } from './db.js';

const app = express();

app.use(express.json());
app.use(cors());
app.listen(5000, () => {
    console.log('Running on port 5000');
});

app.post('/api/add-invoice', function (req, res) {
    var insert =
        'INSERT INTO invoices (date, customer, sales_person, payment_type, notes) VALUES ?';
    var values = [
        [
            new Date(req.body.date),
            req.body.customerName,
            req.body.salesPersonName,
            '',
            req.body.notes,
        ],
    ];

    var invoiceId;
    con.query(insert, [values], function (err, result) {
        if (err) {
            return res.status(500).json({
                error: err,
            });
        }
        invoiceId = result.insertId;
        insert =
            'INSERT INTO products_sold (invoice_id, item, quantity, total_cogs, total_price) VALUES ?';
        var length = req.body.products.length;
        values = [];
        for (let i = 0; i < length; i++) {
            const product = req.body.products[i];
            values.push([
                invoiceId,
                product.name,
                product.quantity,
                0,
                product.price,
            ]);
        }
        con.query(insert, [values], function (err, result) {
            if (err) {
                return res.status(500).json({
                    error: err,
                });
            }
            return res
                .status(200)
                .json({ success: 'Successfully added the invoice!' });
        });
    });
});

app.get('/api/total-invoice', function (req, res) {
    const select = 'SELECT COUNT(*) AS total_invoice FROM invoices';

    con.query(select, function (err, result) {
        if (err) {
            return res.status(500).json({
                error: err,
            });
        }
        return res.status(200).json({ total_invoice: result[0].total_invoice });
    });
});

app.get('/api/get-invoice', async function (req, res) {
    const currentPage = parseInt(req.query.page) || 1;
    const perPage = 8;
    const offset = (currentPage - 1) * perPage;
    var select = `SELECT * FROM invoices LIMIT ${perPage} OFFSET ${offset}`;

    con.query(select, async function (err, result) {
        if (err) {
            return res.status(500).json({
                error: err,
            });
        }
        var invoices = [];
        for (const invoice of result) {
            try {
                const products = await new Promise((resolve, reject) => {
                    select =
                        'SELECT * FROM products_sold WHERE invoice_id =' +
                        invoice.id;
                    con.query(select, function (err, result) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    });
                });
                invoice.products = products;
                invoices.push(invoice);
            } catch (error) {
                return res.status(500).json({
                    error: error,
                });
            }
        }

        return res.status(200).json({ invoices: invoices });
    });
});

app.get('/api/get-project-revenue', function (req, res) {
    const select =
        'SELECT i.date, (p.total_price) FROM invoices AS i JOIN products_sold AS p ON i.id = p.invoice_id ORDER BY i.date';

    con.query(select, function (err, result) {
        if (err) {
            return res.status(500).json({
                error: err,
            });
        }
        return res.status(200).json({ data: result });
    });
});

app.get('/', function (req, res) {
    res.send('test');
});
