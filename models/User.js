module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("User", {
        firstName: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
          },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        hash_password: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        role: {
            type: Sequelize.STRING,
            default: "admin",
        },
    })
    return User
}