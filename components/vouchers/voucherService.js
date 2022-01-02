const { DATE } = require("sequelize/dist");
const { models, sequelize } = require("../../models")
const { Op } = require("sequelize");

exports.getVoucher = (id) => {
    return models.vouchers.findOne({ where: { voucher_id: id }, raw: true });
}
exports.checkValidVoucher = (id, date) => {
    return models.vouchers.findOne({
        where: {
            [Op.and]: [
                //sequelize.where( sequelize.fn('start_date'), sequelize.fn('GETDATE'), '<='),
                //sequelize.where( sequelize.fn('end_date'), sequelize.fn('GETDATE'), '>='),
                {voucher_id: id},
                {
                    start_date:
                    {
                        [Op.lt]:date
                    }
                },
                {
                    end_date:
                    {
                        [Op.gt]:date
                    }
                }
             ]
           
        //     start_date:{
        //         [Op.lte]:now
        //     },
        //     end_date:
        //     {
        //         [Op.gte]: now
        //     }

         },
        raw: true
    });
}