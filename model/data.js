/**
 * Created by webhugo.
 */
module.exports = (sequelize,DataTypes) => {
    return sequelize.define("Data",{
        /**
         * 数据的值
         */
        value : {
            type:DataTypes.STRING,
            allowNull:false
        },
        /**
         *  数据的种类
         *  temperature 温度
         *  humidity 湿度
         *  wind 风速
         *  state 状态
         *  json 对象
         *  plan 计划
         */
        type : {
            type:DataTypes.STRING,
            allowNull:false
        },

        /**
         * 数据所属设备的种类
         * intelAri 空调
         * intelDoorbell 门铃
         * intelPatch 插线板
         * intelBody 人体感应
         * intelSensor 传感器
         */
        equipment : {
            type : DataTypes.STRING,
            allowNull : false
        }
    },{
        associate: function(models){
            models.Data.belongsTo(models.Device,{foreignKey : "DeviceID"});
        }
    });
};