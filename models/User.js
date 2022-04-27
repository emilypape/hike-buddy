const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

// create our User Model

class User extends Model {}

User.init ({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        profile_picture: {
            type: DataTypes.STRING,
            allowNull: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        hashed_password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4]
            }
        }
    },
    {
        // hashes the user password
        hooks: {
            // set up beforeCreate lifecylce "hook" functionality
            async beforeCreate(newUserData) {
                newUserData.hashed_password = await bcrypt.hash(newUserData.hashed_password, 10);
                return newUserData;
            }
        },
        sequelize,
        timestamps: true,
        freezeTableName: false,
        underscored: true, 
        modelName: 'user'

    }
);

module.exports = User;