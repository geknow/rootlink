/**
 * Created by webhugo on 12/26/16.
 */
const db = require('./../../model/index');
const User = db.models.User;
const Device = db.models.Device;
const Sensor = db.models.Sensor;
const auth = require('./../../helper/auth');
const responser = require('./../../lib/responser');
const EvenImit = require('../../instance/EvenImit');

module.exports = router => {
    router.get("/device/all", async(ctx, next) => {
        let user = ctx.currentUser;
        user = user || (await auth.user(ctx));
        if (!user) {
            responser.reject(ctx, "没登录");
            return;
        }
        // let user = {id: 1}; //测试
        let error;
        let devices;
        try {
            let id = user.id;
            devices = await Device.findAll({
                where: {
                    UserId: id
                }
            });
        } catch (e) {
            error = e;
        }
        if (error) {
            responser.catchErr(ctx, error);
            return;
        }

        responser.success(ctx, devices);
    });

    router.post("/device/add", async(ctx, next) => {
        let body = ctx.request.body;
        let user = ctx.currentUser;
        user = user || (await auth.user(ctx));
        let error;
        let device;
        try {
            device = await Device.create({
                name: body.name,
                label: body.label,
                description: body.description,
                UserId: user.id
            })
        } catch (e) {
            error = e;
        }
        if (error) {
            responser.catchErr(ctx, "参数缺失");
            return;
        } else
            responser.success(ctx, device);
    });

    router.post("/device/delete", async(ctx, next) => {
        let body = ctx.request.body;
        let token = body.token;
        let count;
        let error;
        try {
            count = await Device.destroy({
                where: {
                    token: token
                }
            });
            await Sensor.destroy({
                where: {
                    DeviceId: null
                }
            })
        } catch (e) {
            error = e;
        }
        if (error) {
            responser.catchErr(ctx, error);
            return;
        } else if (!count) {
            responser.reject(ctx, "token 错误");
            return;
        }
        responser.success(ctx, count);
    });
};