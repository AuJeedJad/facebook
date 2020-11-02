module.exports=(sequelize, DataTypes) => {
    const model = sequelize.define("Comment", {
        comment: DataTypes.STRING,
    }, 
    {
        tableName: "comments"
    })

    model.associate = models => {
        model.belongsTo(models.Post, {foreignKey: "post_id"});
        model.belongsTo(models.User, {foreignKey: "user_id"});
    }

    return model
}