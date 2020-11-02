module.exports=(sequelize, DataTypes) => {
    const model = sequelize.define("Friend", {
        status: DataTypes.ENUM("FRIEND","PENDING")
    }, 
    {
        tableName: "friends"
    })

    model.associate = models => {
        model.belongsTo(models.User, {foreignKey: "request_to_id"})
        model.belongsTo(models.User, {foreignKey: "request_by_id"})
    }

    return model
}