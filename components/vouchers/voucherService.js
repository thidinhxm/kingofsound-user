const { models } = require("../../models")
const { Op } = require("sequelize");

exports.getVoucher = (id) => {
    return models.vouchers.findOne({ 
        where: { 
            voucher_id: id 
        }, 
        raw: true 
    });
}

exports.checkValidVoucher = (id, date) => {
    return models.vouchers.findOne({
        where: {
            [Op.and]: [
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
         },
        raw: true
    });
}