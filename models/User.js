module.exports=(sequelize, DataTypes) => {
    const model = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false, 
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false, 
        },
        image: {
            type: DataTypes.STRING(6000),
            allowNull: false
        },
        passwordUpdate: DataTypes.DATE
    },
        {
            tableName: "users",
            timestamps: false
        }    
    )
    
    model.associate = models => {
        model.hasMany(models.Post, {foreignKey: "user_id"});
        model.hasMany(models.Comment, {foreignKey: "user_id"});
        // model.belongsTomany(model.User, {foreignKey: "request_to_id", }) ยังไม่เสร็จ
        model.hasMany(models.Friend, {foreignKey: "request_to_id"});
        model.hasMany(models.Friend, {foreignKey: "request_by_id"});
    } 



    return model 
}