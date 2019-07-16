const storagePath = require('../../common/servicePathes').storage

module.exports.getImage = person=>{
    if(person && person.profile_img==='image'){
        const path = 'images/persons/' + person.id + '.png';
        return  storagePath.storageURL +  encodeURIComponent(path) + storagePath.imageSuffix;
        

    }
    switch (person.role) {
        case 1: //administrator
        case 'administrator':
            return require('./images/administrator.svg');
        case 2: //instructor
        case 'instructor':
            return require('./images/instructor.svg');
        case 3: //teacher
        case 'teacher':
            return require('./images/teacher.svg');
        case 4: //student
        case 'student':
            return require('./images/student.svg');
    }
};