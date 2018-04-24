/**
 * Created by webhugo on 12/28/16.
 */
const db = require('./../../model/index');
const User = db.models.User;
const Sensor = db.models.Sensor;
const Trigger = db.models.Trigger;
const Directive = db.models.Directive;
const auth = require('./../../helper/auth');
const responser = require('./../../lib/responser');
const EvenImit = require('../../instance/EvenImit');
const logger = require("../../log/index").logger;
const utilx = require("../../lib/utilx");
const generatorStr = utilx.generatorStr;
const async = require("async");
var server = require("../../config/config").server;

module.exports = router => {
    router.get("/:str", async(ctx, next) => {
        let str = ctx.params.str;
        logger.debug(str);
        str = utilx.getStrInfo(str);
        logger.debug(str);
        ctx.redirect(str)
    });


    router.post("/directive/add", async(ctx, next) => {
        let operationUrl;
        try {
            let body = ctx.request.body;
            let operation = body.operation;
            let sensorId = body.sensorId;
            let triggerId = body.triggerId;
            if (!!sensorId && !!triggerId) {
                throw Error("sensorId和triggerId都存在");
            }
            if (!operation) {
                throw Error("operation null");
            }

            let u = await User.findOne({
                where: {
                    userId: ctx.currentUser.userId
                },
                attributes: ["key"]
            });
            let key = u.key;


            if (!!sensorId) {
                operationUrl = `http://www.rootlink.cn/api/` + generatorStr(`/wxdata?sensorId=${sensorId}&key=${key}`);
            } else if (!!triggerId) {
                let status = body.status;
                status = parseInt(status);
                if (status !== 0 && status !== 1) {
                    throw Error("status参数错误");
                }
                operationUrl = `http://www.rootlink.cn/api/` + generatorStr(`/wxcontrol?status=${status}&triggerId=${triggerId}&key=${key}`);
            } else {
                throw Error("sensorId或triggerId缺失");
            }


            let user = ctx.currentUser;
            let directive = await Directive.findOne({
                where: {
                    UserId: user.userId,
                    operation
                }
            });
            if (!!directive) {
                throw Error("operation exist");
            }

            await Directive.create({
                operation,
                operationUrl,
                UserId: user.userId,
                TriggerId: triggerId,
                SensorId: sensorId
            })
        } catch (e) {
            logger.error(e);
            responser.catchErr(ctx, e);
            return;
        }

        responser.success(ctx, operationUrl);
    });

    router.get("/directive/all", async(ctx, next) => {

        let directives = [];
        try {
            let operations = await Directive.findOne({
                where: {
                    UserId: ctx.currentUser.userId
                },
                attributes: ["operation", "directiveId", "UserId", "TriggerId", "SensorId", "operationUrl"]
            });
            if (!!operations) {
                directives = [{
                    operation: operations.operation,
                    directiveId: operations.directiveId,
                    UserId: operations.UserId,
                    TriggerId: operations.TriggerId,
                    SensorId: operations.SensorId,
                    operationUrl:operations.operationUrl
                }];
                let p = new Promise((resolve, reject) => {
                    async.eachSeries(directives, async(operation, callback) => {
                        let sensorId = operation.SensorId;
                        let triggerId = operation.TriggerId;

                        if (!!sensorId) {
                            Sensor.findOne({
                                where: {
                                    sensorId
                                }
                            }).then((sensor) => {
                                operation.sensor = {
                                    name: sensor.name,
                                    unit: sensor.unit,
                                    description: sensor.description,
                                    SensorId: sensor.SensorId,
                                    UserId: sensor.UserId,
                                    DeviceId: sensor.DeviceId
                                };
                                callback()
                            });
                        } else if (!!triggerId) {
                            Trigger.findOne({
                                where: {
                                    triggerId
                                }
                            }).then((trigger) => {
                                operation.trigger = {
                                    name: trigger.name,
                                    status: trigger.status,
                                    triggerId: trigger.triggerId,
                                    DeviceId: trigger.DeviceId,
                                    UserId: trigger.UserId
                                };
                                callback();
                            })
                        }
                    }, function (err) {
                        if (err)
                            reject(err);
                        else
                            resolve(directives);
                    });
                });
                directives = await p;


            }


            responser.success(ctx, {
                directives
            })

        } catch (e) {
            logger.error(e);
            responser.catchErr(ctx, e);
        }


    });

    router.post("/directive/update", async(ctx, next) => {
        let operationUrl;
        try {
            let body = ctx.request.body;

            let operation = body.operation;

            let status = body.status;
            let triggerId = body.triggerId;
            let sensorId = body.sensorId;
            if (!!sensorId && !!triggerId) {
                throw Error("sensorId和triggerId都存在");
            }

            let u = await User.findOne({
                where: {
                    userId: ctx.currentUser.userId
                },
                attributes: ["key"]
            });
            let key = u.key;

            if (!!sensorId) {
                operationUrl = `http://www.rootlink.cn/api/` + generatorStr(`/wxdata?sensorId=${sensorId}&key=${key}`);
            } else if (!!triggerId) {
                status = parseInt(status);
                if (status !== 0 && status !== 1) {
                    throw Error("参数缺失或错误");
                }

                operationUrl = `http://www.rootlink.cn/api/` + generatorStr(`/wxcontrol?status=${status}&triggerId=${triggerId}&key=${key}`);

            } else {
                throw Error("参数缺失");
            }

            await Directive.update({
                operationUrl
            }, {
                where: {
                    operation,
                    UserId: ctx.currentUser.userId
                }
            })
        } catch (e) {
            logger.error(e);
            responser.catchErr(ctx, e);
            return;
        }
        responser.success(ctx, operationUrl)
    });

    router.post("/directive/delete", async(ctx, next) => {

        try {
            let body = ctx.request.body;
            let operation = body.operation;

            await Directive.destroy({
                where: {
                    operation,
                    UserId: ctx.currentUser.userId
                }
            })
        } catch (e) {
            logger.error(e);
            responser.catchErr(ctx, e);
            return;
        }
        responser.success(ctx);
    })
};