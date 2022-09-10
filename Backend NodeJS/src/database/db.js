import { Sequelize } from 'sequelize';
import { AWS_DB_HOST, AWS_DB_NAME,AWS_DB_USER, AWS_DB_PASSWORD} from '../config/config.js';


export const db = new Sequelize(AWS_DB_NAME, AWS_DB_USER, AWS_DB_PASSWORD, {
  host: AWS_DB_HOST,
  dialect: 'mysql',
  define: {
    freezeTableName: true,
    timestamps: false,
  },
});