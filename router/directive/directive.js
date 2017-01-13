/**
 * Created by webhugo on 12/28/16.
 */
const db = require('./../../model/index');
const User = db.models.User;
const Device = db.models.Device;
const Sensor = db.models.Sensor;
const Directive = db.models.Directive;
const auth = require('./../../helper/auth');
const responser = require('./../../lib/responser');
const EvenImit = require('../../instance/EvenImit');

module.exports = router => {
    router.post("/directive/do", async(ctx, next) => {
        let body = ctx.request.body;
        //参数
        let directive = body.directive;
        let sensorId = body.sensorId;
        
        let user = ctx.currentUser;
        let userId = user.id;
        let error;
        try{
            directive = await Directive.findOne({
                where: {
                    UserId: userId,
                    directive: directive,
                    SensorId: sensorId
                },
                attributes: [['operation']]
            })
        }catch (e){
            error = e;
        }
        
        if(error){
            responser.catchErr(ctx,e);
            return;
        }else if(!directive){
            responser.reject(ctx,"no such directive");
            return;
        }
        /**
         * do the directive
         */
        responser.success(ctx);
    });
};