const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Preferences extends Model {}

Preferences.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        // user_id: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     references: {
        //         model: 'users',
        //         key: 'id'
        //     }
        // },
        location_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        gender_identification: {
            type: DataTypes.STRING,
            allowNull: false
        },
        gender_preference: {
            type: DataTypes.STRING,
            allowNull: false
        },
        hike_distance: {
            type: DataTypes.STRING,
            allowNull: false
        },
        hike_pace: {
            type: DataTypes.STRING,
            allowNull: false
        },
        hike_with_pet: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        hike_climate: {
            type: DataTypes.STRING,
            allowNull: false
        },
        hike_in_snow: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        water_feature: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        mountain_peak: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        special_equipment: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        biography: {
            type: DataTypes.STRING,
            allowNull: true
        }
        
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: false,
        underscored: true,
        modelName: 'preferences'
    }
);

module.exports = Preferences;