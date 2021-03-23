const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullname: { type: String },
    token:    { type: String },
    email:    { type: String },
    password: { type: String },
    jobTitle: { type: String },
    completeProfile: { type: Boolean },
    imageUrl: { type: String },
    cvLayout: { type: String },
    skills: [{
        skillName: { type: String },
        skillPercent: { type: Number }
    }],
    socialMedia: {
        facebook: { type: String },
        twitter: { type: String },
        linkedin: { type: String },
        github: { type: String }
    },
    address: { type: String },
    phone: { type: String },
    nationality: { type: String },
    headerMessage: { type: String },
    birthDate: { type: String },
    educations: [{
        certificateName: {type: String },
        collegeName: {type: String },
        from: {type: String },
        to: {type: String },
    }],
    experiences: [{
        jobName: { type: String },
        companyName: { type: String },
        from: {type: String },
        to: {type: String },
        wid: {type: String }
    }]
}, {
    collection: 'users'
});

module.exports = mongoose.model('Users', userSchema)

