const {models} = require('../../models');
const Op = require('sequelize').Op;
const bcrypt = require('bcrypt');

exports.getUserByEmail = (email) => {
    return models.users.findOne({
        where: {
            email: email,
            is_blocked: false
        },
        // include: [{
        //     model: models.userroles,
        //     as: 'userroles',
        //     attributes: [],
        //     where: {
        //         role_id: 3
        //     },
        // }],
        raw: true
    });
}

exports.getUserById = (id) => {
    return models.users.findOne({
        where: {user_id: id},
        raw: true
    });
}
exports.createUser = (user) => {
    user.password = bcrypt.hashSync(user.password, 10);
    return models.users.create(user);
}

exports.createUserRole = (role) => {
    return models.userroles.create(role);
}

exports.getCart = (id) =>
{
    return models.detailcarts.findAll({
        include:[{
            model:models.products,
            as:'product',
            include:[
               {
                model:models.images,
                as:'images',
                where:{image_stt:1}
               },
               {
                model:models.categories,
                as:'category',
               }
            ]
        }],
        where:{
            user_id:id
        },
        raw:true
    })
}
exports.updateUser = (user) =>
{
    return models.users.update
    ({
        firstname:user.firstname,
        lastname:user.lastname,
        email:user.email,
        phone:user.phone,
        address:user.address
    },
   {
    where:{
        user_id:user.user_id
    },
    raw:true
   }
    )
}
