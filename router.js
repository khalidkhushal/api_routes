const express = require(`express`)
const Sequelize = require(`sequilize`)
const router = express.router();
//taking order as a model of mysql

const Op = Sequelize.Op;


router.get(`/api/v1/order/odd`, async(req, res) => {
    const order = await model.findAll({
        where: { id: (() => { if (id % 2 != 0) { return id } }) }
    })
    res.json({ order })
})


router.get(`/api/v1/order`, async(req, res) => {
    const { page, limit } = req.query;
    const order = await model.findAll({
        offset: 10,
        limit: 10,
    })
    const list = [];
    list.push(order)
    res.json({
        "total": 10,
        "page": 1,
        list,
    })
})


router.get(`/api/v1/order`, (req, res) => {
    const { page, limit, sort, direction } = req.query;
    const order = await model.findAll({
        offset: 10,
        limit: 10,
        order: [sort, direction]
    })
    const list = [];
    list.push(order)
    res.json({
        "total": 10,
        "page": 1,
        list,
    })
})


router.get(`/api/v1/order/cursor`, (req, res) => {
    const { id, limit } = req.query;

    const getUsers = async(id, limit) => {
        const cursor = id || 0;
        return await User.findAll({
            limit: limit,
            where: {
                id: {
                    [Op.gt]: cursor
                }
            }
        });
    }
    const list = [];
    list.push(order)
    res.json({
        "id": id,
        list,
    })
})


router.get(`/api/v1/report/sale?month=1&year`, async(req, res) => {
    const { month, year } = req.query;
    const order = await model.findAll({
        attributes: ['month', 'year', [sequelize.fn('sum', sequelize.col('amount'))]],
        group: ['month', ' year']
    })
    res.json({ order })
})
router.get(`/api/v1/report/sale`, async(req, res) => {
    const { from_date, to_date } = req.query;
    from_date = Date(from_date);
    to_date = Date(to_date);
    if (from_date > to_date) {
        to_date = [from_date, to_date = from_date][0];
    }

    const order = await model.findAll({
        where: {
            createdAt: {
                [Op.between]: [from_date, to_date]
            }
        }
    })
    res.json({ order })
})

router.get(`/api/v1/report/monthly`, (req, res) => {
    const { year } = req.query;
    let monthly = [];

    let mon = 1;
    while (mon < 13) {

        const currMonth = await model.findAndCountAll({
            attributes: ['sales'],
            where: {
                sales: {
                    [Op.gt]: 0
                },
                createdAt: {
                    [Op.gte]: moment("0101", "MMDD").add(month - 1, 'months').toDate(),
                    [Op.lt]: moment("0101", "MMDD").add(month, 'months').toDate(),
                },
                year: year
            }
        })

        monthly.push(currMonth);

        month++;


    }
    res.json({ order })
})


router.get(`/api/v1/report/user`, (req, res) => {
    const { year, user_id } = req.query;
    let monthly = [];

    let mon = 1;
    while (mon < 13) {

        const currMonth = await model.findAndCountAll({
            attributes: ['id'],
            where: {
                id: user_id,
                createdAt: {
                    [Op.gte]: moment("0101", "MMDD").add(month - 1, 'months').toDate(),
                    [Op.lt]: moment("0101", "MMDD").add(month, 'months').toDate(),
                },
                year: year
            }
        })

        regMonth.push(currMonth);

        month++;


    }
})


router.get(`/api/v1/report/shipping_dock`, (req, res) => {
    const { year, shipping_dock_id } = req.query;

    let monthly = [];

    let mon = 1;
    while (mon < 13) {
        const currMonth = await model.findAndCountAll({
            attributes: ['shipping_dock_id'],
            where: {
                shipping_dock_id: shipping_dock_id,
                sales: {
                    [Op.gt]: 0
                },
                createdAt: {
                    [Op.gte]: moment("0101", "MMDD").add(month - 1, 'months').toDate(),
                    [Op.lt]: moment("0101", "MMDD").add(month, 'months').toDate(),
                },
                year: year
            }
        })
        monthly.push(currMonth);
        month++;
    }
})

router.get(`/api/v1/report/user/count?year=2022&user_id=1`, (req, res) => {
    const { year, user_id } = req.query;

    let monthly = [];

    let mon = 1;
    while (mon < 13) {
        const currMonth = await model.findAndCountAll({
            attributes: ['id'],
            where: {
                id: user_id,
                sales: {
                    [Op.gt]: 0
                },
                createdAt: {
                    [Op.gte]: moment("0101", "MMDD").add(month - 1, 'months').toDate(),
                    [Op.lt]: moment("0101", "MMDD").add(month, 'months').toDate(),
                },
                year: year
            }
        })
        monthly.push(currMonth);
        month++;
    }
})