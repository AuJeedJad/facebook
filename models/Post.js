module.exports=(sequelize, DataTypes) => {
    const model = sequelize.define("Post", {
        message: DataTypes.STRING,
        image: DataTypes.STRING(6000),
    }, 
    {
        tableName: "posts"
    })
    model.associate = models => {
        model.belongsTo(models.User, {foreignKey: "user_id"})
        model.hasMany(models.Comment, {foreignKey: "post_id"})
    }



    return model
}