/**
 * Created by webhugo on 12/26/16.
 */
const db = require('./../../model/index');
const User = db.models.User;
const Device = db.models.Device;
const auth = require('./../../helper/auth');
const responser = require('./../../lib/responser');
const EvenImit = require('../../instance/EvenImit');

module.exports = router => {
    router.get("/device/all", async(ctx, next) => {
        let user = ctx.currentUser;
        user = user ? user : (await auth.user(ctx));
        if (!user) {
            responser.reject(ctx, "没登录");
            return;
        }
        let error;
        let devices;
        try {
            let id = user.id;
            devices = Device.findAll({
                where: {
                    UserId: id
                }
            })
        }catch (e){
            error = e;
        }
        if(error){
            responser.catchErr(ctx, error);
            return;
        }
        responser(ctx,devices);
    });

    router.post("/device/add", async(ctx, next) => {

    });

    router.post("/device/delete", async(ctx, next) => {

    });

};