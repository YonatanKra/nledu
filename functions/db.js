const Sequelize = require('sequelize');

const sequelize = new Sequelize('d3lhr997fs4s47', 'ztuqhnkbhhwcgl', '76bbecf6b927b8c80c00b0701f1b18b5a7cc9af29da5796945629ea230a243ad', {
  host: 'ec2-54-228-243-238.eu-west-1.compute.amazonaws.com',
  dialect: 'postgres',
  dialectOptions : {ssl:true},
  port: '5432',
      define: {
        timestamps: false
    }
});

const Story = require('./models/tbl_stories')(sequelize, Sequelize.DataTypes);
const Asset = require('./models/tbl_assets')(sequelize, Sequelize.DataTypes);
const AssetType = require('./models/lov_assets_types')(sequelize, Sequelize.DataTypes);
const Person = require('./models/tbl_persons')(sequelize, Sequelize.DataTypes);
const Lesson = require('./models/tbl_lessons')(sequelize, Sequelize.DataTypes);
const LessonStories = require('./models/rel_lessons_stories')(sequelize, Sequelize.DataTypes);
const Goal = require('./models/lov_goals')(sequelize, Sequelize.DataTypes);
const LessonGoals = require('./models/rel_lessons_goals')(sequelize, Sequelize.DataTypes);
const Assignment = require('./models/tbl_assignments')(sequelize, Sequelize.DataTypes);
const AssignmentLessons = require('./models/rel_assignments_lessons')(sequelize, Sequelize.DataTypes);
const Edit = require('./models/tbl_edits')(sequelize, Sequelize.DataTypes);

module.exports = {
    Story,Asset, AssetType, Person, Lesson, LessonStories, Goal, LessonGoals,Assignment,AssignmentLessons,Edit
}