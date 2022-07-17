const Blogs = require("./Blogs")
const Comments = require("./Comments")
const Users = require("./Users")

Blogs.belongsTo(Users, {
    foreignKey: "user_id"
})

Blogs.hasMany(Comments, {
    foreignKey: "comment_id"
})

Comments.belongsTo(Blogs, {
    foreignKey: "blog_id"
})

Comments.belongsTo(Users, {
    foreignKey: "user_id"
})

Users.hasMany(Blogs, {
    foreignKey: "user_id"
})

Users.hasMany(Comments, {
    foreignKey: "user_id"
})

module.exports = { Blogs, Comments, Users}
