let db = require('./../model/index');

async function testCreate() {
    let result;
    try {
        result = await db.models.User.create({
            username: 'admin6',
            password: '',
            email: 'test@education.com',
            avatar: 'NULL',
            // 1 => Teacher 100=>adminer
            type: 1//管理员  或  普通用户
        });
        console.log('Result : ' + result);
    } catch (e) {
        console.log('Error : ' + e);
    }
}

// testCreate();

// db.models.User.create({
//     username: 'admin2',
//     password: 'pass_word',
//     email: 'test@education.com',
//     avatar: 'NULL',
//     // 1 => Teacher 100=>adminer
//     type: 1//管理员  或  普通用户
// }).then((success)=> {
//     console.log(success);
//     return db.models.User.sync();
// }).then(()=> {
//     console.log('Add User passed');
//     return db.models.User.findAll({
//         where: {
//             username: {
//                 $like: '%'
//             }
//         }
//     });
// }).then(results=> {
//     console.log(results);
// });

db.models.User.findOne({
    where: {
        username: 'admin6'
    }
}).then(par => {
    console.log(par.getDataValue('mobile')); //null
}).catch(err => {
    console.log('Error : ' + err);
});